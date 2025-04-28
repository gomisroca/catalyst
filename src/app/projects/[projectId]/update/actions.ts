'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { projects, projectsPermissions } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
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
  name: z.string().min(3, 'Project name must be at least 3 characters long'),
  description: z.string().optional(),
  picture: z.string(MediaUrlSchema).optional(),
  private: z.boolean(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
});

export async function updateProject({ formData, projectId }: { formData: FormData; projectId: string }) {
  const session = await auth();
  if (!session?.user) return { msg: 'You must be signed in to update a project' };

  // Check if branch exists
  const existingProject = await db.query.projects.findFirst({
    where: and(eq(projects.id, projectId), eq(projects.authorId, session.user.id)),
  });
  if (!existingProject) {
    console.log(`Project ${projectId} not found in the database`);
    return { msg: 'Project not found in the database' };
  }

  // Extract and validate the data
  const validatedFields = ProjectSchema.safeParse({
    name: formData.get('name') ?? existingProject.name,
    description: formData.get('description') ?? existingProject.description,
    picture: formData.get('picture') ?? undefined,
    private: formData.get('private') === 'on',
    allowCollaborate: formData.get('allowCollaborate') === 'on',
    allowShare: formData.get('allowShare') === 'on',
  });
  if (!validatedFields.success) {
    return {
      msg: validatedFields.error.toString(),
    };
  }

  const { data } = validatedFields;
  try {
    await db.transaction(async (trx) => {
      await trx
        .update(projects)
        .set({
          name: data.name,
          description: data.description,
        })
        .where(eq(projects.id, projectId));

      await trx
        .update(projectsPermissions)
        .set({
          private: data.private,
          allowCollaborate: data.allowCollaborate,
          allowShare: data.allowShare,
        })
        .where(eq(projectsPermissions.projectId, projectId));
    });
    console.log(`Project ${projectId} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${projectId}`);
  } catch (error) {
    console.error('Failed to update project:', error);
    return { msg: 'An unexpected error occurred' };
  }
  redirect(`/projects/${projectId}`);
}
