'use server';

// Libraries
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/server/db';
import { auth } from '@/server/auth';
import { toErrorMessage } from '@/utils/errors';
// Types
import { type InteractionType } from 'types';

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

export async function createProject(formData: FormData) {
  // Check if user is signed in, and if they are authorized to create a project
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a project');

  // Extract and validate the data
  const privateFlag = formData.get('private') === 'on';
  const allowCollaborateFlag = formData.get('allowCollaborate') === 'on';
  const allowShareFlag = formData.get('allowShare') === 'on';

  // Validate the data
  const validatedFields = ProjectSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    picture: formData.get('picture') ?? undefined,
    private: privateFlag,
    allowCollaborate: allowCollaborateFlag,
    allowShare: allowShareFlag,
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

export async function updateProject({ formData, projectId }: { formData: FormData; projectId: string }) {
  // Check if user is signed in, and if they are authorized to update the project
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a project');

  // Check if project exists
  const existingProject = await db.project.findFirst({
    where: {
      id: projectId,
      authorId: session.user.id,
    },
  });
  if (!existingProject) throw new Error('Project not found or you do not have permission to update it.');

  // Extract and validate the data
  const privateFlag = formData.get('private') === 'on';
  const allowCollaborateFlag = formData.get('allowCollaborate') === 'on';
  const allowShareFlag = formData.get('allowShare') === 'on';

  // Validate the data
  const validatedFields = ProjectSchema.safeParse({
    name: formData.get('name') ?? existingProject.name,
    description: formData.get('description') ?? existingProject.description,
    picture: formData.get('picture') ?? undefined,
    private: privateFlag,
    allowedUsers: formData.getAll('allowedUsers'),
    allowCollaborate: allowCollaborateFlag,
    allowShare: allowShareFlag,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    // DB transaction to update the project and its permissions
    await db.$transaction(async (trx) => {
      await trx.project.update({
        where: { id: projectId },
        data: {
          name: data.name,
          description: data.description,
          picture: data.picture,
          updatedAt: new Date(),
        },
      });
      await trx.projectPermissions.update({
        where: { projectId },
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
    console.log(`Project ${projectId} updated by user ${session.user.id}`);
    // Revalidate the project page and pass the redirect path to the client
    revalidatePath(`/projects/${projectId}`);
    return { message: 'Project updated successfully.', redirect: `/projects/${projectId}` };
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
