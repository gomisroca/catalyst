'use server';

import { revalidatePath } from 'next/cache';
import { type InteractionType } from 'types';
import { z } from 'zod';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';
import { MediaUrlSchema } from '@/utils/schemas';

const ProjectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters long').max(100, 'Project name is too long'),
  description: z.string().optional(),
  picture: z.string(MediaUrlSchema).optional(),
  private: z.boolean(),
  allowedUsers: z.string().array().optional(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
});

type ProjectSchemaData = z.infer<typeof ProjectSchema>;

function buildPermissionsData(data: ProjectSchemaData) {
  return {
    private: data.private,
    allowCollaborate: data.allowCollaborate,
    allowShare: data.allowShare,
  };
}

type CreateProjectData = {
  name: string;
  description?: string;
  picture?: string;
  private: boolean;
  allowCollaborate: boolean;
  allowShare: boolean;
};

export async function createProject(createData: CreateProjectData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a project');

  const validatedFields = ProjectSchema.safeParse(createData);
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  const existingProject = await db.project.findFirst({ where: { name: data.name } });
  if (existingProject) throw new Error('A project with this name already exists');

  try {
    const newProjectId = await db.$transaction(async (trx) => {
      const newProject = await trx.project.create({
        data: {
          name: data.name,
          description: data.description,
          picture: data.picture,
          authorId: session.user.id,
        },
      });

      const permissions = buildPermissionsData(data);

      await trx.projectPermissions.create({
        data: { projectId: newProject.id, ...permissions },
      });

      const mainBranch = await trx.branch.create({
        data: {
          name: 'main',
          description: null,
          default: true,
          projectId: newProject.id,
          authorId: session.user.id,
        },
      });

      await trx.branchPermissions.create({
        data: {
          branchId: mainBranch.id,
          allowedUsers: { connect: { id: session.user.id } },
          ...permissions,
          allowBranch: data.allowCollaborate,
        },
      });

      return newProject.id;
    });

    console.log(`Project ${newProjectId} created by user ${session.user.id}`);
    revalidatePath('/projects');
    return { message: 'Project created successfully.', redirect: `/projects/${newProjectId}` };
  } catch (error) {
    console.error('Failed to create project:', error);
    throw new Error(toErrorMessage(error, 'Failed to create project'));
  }
}

type UpdateProjectData = {
  id: string;
  name: string;
  description?: string;
  picture?: string;
  private: boolean;
  allowedUsers?: string[];
  allowCollaborate: boolean;
  allowShare: boolean;
};

export async function updateProject(updateData: UpdateProjectData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a project');

  const existingProject = await db.project.findFirst({
    where: { id: updateData.id, authorId: session.user.id },
  });
  if (!existingProject) throw new Error('Project not found or you do not have permission to update it.');

  const validatedFields = ProjectSchema.safeParse({
    ...updateData,
    name: updateData.name ?? existingProject.name,
    description: updateData.description ?? existingProject.description,
    picture: updateData.picture ?? undefined,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  try {
    await db.$transaction(async (trx) => {
      await trx.project.update({
        where: { id: updateData.id },
        data: {
          name: data.name,
          description: data.description,
          picture: data.picture,
          updatedAt: new Date(),
        },
      });

      await trx.projectPermissions.update({
        where: { projectId: updateData.id },
        data: {
          ...buildPermissionsData(data),
          allowedUsers: {
            set: data.allowedUsers?.map((id) => ({ id })) ?? [],
          },
        },
      });
    });

    console.log(`Project ${updateData.id} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${updateData.id}`);
    return { message: 'Project updated successfully.', redirect: `/projects/${updateData.id}` };
  } catch (error) {
    console.error('Failed to update project:', error);
    throw new Error(toErrorMessage(error, 'Failed to update project'));
  }
}

export async function deleteProject({ projectId }: { projectId: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to delete a project');

    const existingProject = await db.project.findFirst({
      where: { id: projectId, authorId: session.user.id },
    });
    if (!existingProject) throw new Error('You do not have permission to delete this project');

    await db.project.delete({ where: { id: projectId } });

    revalidatePath('/projects');
    return { message: 'Project deleted successfully', redirect: '/' };
  } catch (error) {
    console.log('Failed to delete project:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete project'));
  }
}

export async function toggleProjectInteraction(type: InteractionType, projectId: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact');

    const where = { projectId, userId: session.user.id, type };
    const existing = await db.projectInteraction.findUnique({
      where: { projectId_userId_type: where },
    });

    if (existing) {
      await db.projectInteraction.delete({ where: { projectId_userId_type: where } });
      revalidatePath(`/projects/${projectId}`);
      return { message: 'Interaction removed successfully' };
    }

    await db.projectInteraction.create({ data: where });
    revalidatePath(`/projects/${projectId}`);
    return { message: 'Interaction added successfully' };
  } catch (error) {
    console.error('Failed to interact:', error);
    throw new Error(toErrorMessage(error, 'Failed to interact'));
  }
}
