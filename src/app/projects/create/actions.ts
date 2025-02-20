'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { branches, branchesPermissions, projects, projectsPermissions } from '@/server/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ProjectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters long'),
  description: z.string().optional(),
  picture: z.string().optional(),
  private: z.boolean(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
});

export async function createProject(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a project');

  // Extract and validate the data
  const validatedFields = ProjectSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    picture: formData.get('picture') ?? undefined,
    private: formData.get('private') === 'true',
    allowCollaborate: formData.get('allowCollaborate') === 'true',
    allowShare: formData.get('allowShare') === 'true',
  });

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.toString(),
    };
  }

  let projectId: string | undefined;
  try {
    const { id } = await db.transaction(async (trx) => {
      const [result] = await trx
        .insert(projects)
        .values({
          name: validatedFields.data.name,
          description: validatedFields.data.description,
          picture: validatedFields.data.picture,
          authorId: session.user.id,
        })
        .returning({ id: projects.id });

      if (!result) throw new Error('Failed to create project');

      await trx.insert(projectsPermissions).values({
        projectId: result.id,
        allowedUsers: [session.user.id],
        private: validatedFields.data.private,
        allowCollaborate: validatedFields.data.allowCollaborate,
        allowShare: validatedFields.data.allowShare,
      });

      const [branch] = await trx
        .insert(branches)
        .values({
          name: 'main',
          description: null,
          default: true,
          projectId: result.id,
          authorId: session.user.id,
        })
        .returning({ id: branches.id });

      if (!branch) throw new Error('Failed to create main branch of project');

      await trx.insert(branchesPermissions).values({
        branchId: branch.id,
        allowedUsers: [session.user.id],
        private: validatedFields.data.private,
        allowCollaborate: validatedFields.data.allowCollaborate,
        allowShare: validatedFields.data.allowShare,
        allowBranch: validatedFields.data.allowCollaborate,
      });

      return result;
    });

    projectId = id;
  } catch (error) {
    console.error('Failed to create project:', error);
    return { error: 'An unexpected error occurred' };
  }

  if (projectId) {
    console.log(`Project created: ${projectId} by user: ${session.user.id}`);
    revalidatePath('/projects');
    redirect(`/projects/${projectId}`);
  }

  return { error: 'Failed to create project' };
}
