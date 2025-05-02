'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

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

const ProjectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters long').max(100, 'Project name is too long'),
  description: z.string().optional(),
  picture: z.string(MediaUrlSchema).optional(),
  private: z.boolean(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
});

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a project');

  // Extract and validate the data
  const privateFlag = formData.get('private') === 'on';
  const allowCollaborateFlag = formData.get('allowCollaborate') === 'on';
  const allowShareFlag = formData.get('allowShare') === 'on';

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
    revalidatePath('/projects');
    return { message: 'Project created successfully.', redirect: `/projects/${newProjectId}` };
  } catch (error) {
    console.error('Failed to create project:', error);
    throw new Error(toErrorMessage(error, 'Failed to create project'));
  }
}
