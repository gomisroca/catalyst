'use server';

import { revalidatePath } from 'next/cache';
import { type InteractionType } from 'types';
import { z } from 'zod';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';

// Define the schema for the media data
const MediaUrlSchema = z
  .string()
  .url('Media URL must be a valid URL')
  .refine(
    (url) => {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm'];
      return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
    },
    { message: 'Media URL must point to a supported file type' }
  );

// Define the schema for the project data
const ProjectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters long').max(100, 'Project name is too long'),
  description: z.string().optional(),
  picture: z.string(MediaUrlSchema).optional(),
  private: z.boolean(),
  allowedUsers: z.string().array().optional(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
});

type CreateProjectData = {
  name: string;
  description?: string;
  picture?: string;
  private: boolean;
  allowCollaborate: boolean;
  allowShare: boolean;
};

export async function createProject(createData: CreateProjectData) {
  // Check if user is signed in, and if they are authorized to create a project
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a project');

  // Validate the data
  const validatedFields = ProjectSchema.safeParse({
    name: createData.name,
    description: createData.description,
    picture: createData.picture,
    private: createData.private,
    allowCollaborate: createData.allowCollaborate,
    allowShare: createData.allowShare,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  // Check if a project with the same name already exists
  const existingProject = await db.project.findFirst({
    where: {
      name: data.name,
    },
  });
  if (existingProject) throw new Error('A project with this name already exists');

  try {
    // DB transaction to create the project and its permissions
    const newProjectId = await db.$transaction(async (trx) => {
      const newProject = await trx.project.create({
        data: {
          name: data.name,
          description: data.description,
          picture: data.picture,
          authorId: session.user.id,
        },
      });

      await trx.projectPermissions.create({
        data: {
          projectId: newProject.id,
          private: data.private,
          allowCollaborate: data.allowCollaborate,
          allowShare: data.allowShare,
        },
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
          allowedUsers: {
            connect: {
              id: session.user.id,
            },
          },
          private: validatedFields.data.private,
          allowCollaborate: validatedFields.data.allowCollaborate,
          allowShare: validatedFields.data.allowShare,
          allowBranch: validatedFields.data.allowCollaborate,
        },
      });

      return newProject.id;
    });

    console.log(`Project ${newProjectId} created by user ${session.user.id}`);

    // Revalidate the projects page and pass the redirect path to the client
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
  // Check if user is signed in, and if they are authorized to update the project
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a project');

  // Check if project exists
  const existingProject = await db.project.findFirst({
    where: {
      id: updateData.id,
      authorId: session.user.id,
    },
  });
  if (!existingProject) throw new Error('Project not found or you do not have permission to update it.');

  // Validate the data
  const validatedFields = ProjectSchema.safeParse({
    name: updateData.name ?? existingProject.name,
    description: updateData.description ?? existingProject.description,
    picture: updateData.picture ?? undefined,
    private: updateData.private,
    allowedUsers: updateData.allowedUsers ?? [],
    allowCollaborate: updateData.allowCollaborate,
    allowShare: updateData.allowShare,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    // DB transaction to update the project and its permissions
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
          private: data.private,
          allowedUsers: {
            connect: data.allowedUsers?.map((userId: string) => ({ id: userId })),
          },
          allowCollaborate: data.allowCollaborate,
          allowShare: data.allowShare,
        },
      });
    });
    console.log(`Project ${updateData.id} updated by user ${session.user.id}`);
    // Revalidate the project page and pass the redirect path to the client
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

    // Check if user is authorized to delete the project
    const existingProject = await db.project.findFirst({
      where: {
        id: projectId,
        authorId: session.user.id,
      },
    });
    if (!existingProject) throw new Error('You do not have permission to delete this project');

    // Delete the project
    await db.project.delete({
      where: {
        id: projectId,
      },
    });

    // Revalidate the projects page and pass the redirect path to the client
    return { message: 'Project deleted successfully', redirect: '/' };
  } catch (error) {
    console.log('Failed to delete project:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete project'));
  }
}

export async function interactionAction(type: InteractionType, projectId: string) {
  try {
    // Check if user is signed in
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact');

    // Check if user has already interacted with the project
    const where = {
      projectId,
      userId: session.user.id,
      type,
    };
    const existing = await db.projectInteraction.findUnique({
      where: { projectId_userId_type: where },
    });

    // If the user has already interacted, delete the interaction and revalidate the project page
    if (existing) {
      await db.projectInteraction.delete({ where: { projectId_userId_type: where } });
      revalidatePath(`/projects/${projectId}`);
      return { message: 'Interaction removed successfully' };
    }

    // Otherwise, create a new interaction and revalidate the project page
    await db.projectInteraction.create({ data: where });
    revalidatePath(`/projects/${projectId}`);
    return { message: 'Interaction added successfully' };
  } catch (error) {
    console.error('Failed to interact:', error);
    throw new Error(toErrorMessage(error, 'Failed to interact'));
  }
}
