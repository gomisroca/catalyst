'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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
  allowedUsers: z.string().array().optional(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
});

export async function updateProject({ formData, projectId }: { formData: FormData; projectId: string }) {
  const session = await auth();
  if (!session?.user) return { msg: 'You must be signed in to update a project' };

  // Check if project exists
  const existingProject = await db.project.findFirst({
    where: {
      id: projectId,
      authorId: session.user.id,
    },
  });
  if (!existingProject) {
    console.log(`Project ${projectId} not found for user ${session.user.id}`);
    return { msg: 'Project not found or you do not have permission to update it.' };
  }

  // Extract and validate the data
  const privateFlag = formData.get('private') === 'on';
  const allowCollaborateFlag = formData.get('allowCollaborate') === 'on';
  const allowShareFlag = formData.get('allowShare') === 'on';

  const validatedFields = ProjectSchema.safeParse({
    name: formData.get('name') ?? existingProject.name,
    description: formData.get('description') ?? existingProject.description,
    picture: formData.get('picture') ?? undefined,
    private: privateFlag,
    allowedUsers: formData.getAll('allowedUsers'),
    allowCollaborate: allowCollaborateFlag,
    allowShare: allowShareFlag,
  });
  if (!validatedFields.success) {
    return {
      msg: validatedFields.error.toString(),
    };
  }

  const { data } = validatedFields;
  try {
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
    revalidatePath(`/projects/${projectId}`);
  } catch (error) {
    console.error('Failed to update project:', error);
    return { msg: 'An unexpected error occurred while updating the project' };
  }
  redirect(`/projects/${projectId}`);
}
