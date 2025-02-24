'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { branches, branchesPermissions } from '@/server/db/schema';
import { getProject } from '@/server/queries/projects';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const BranchSchema = z.object({
  name: z.string().min(3, 'Branch name must be at least 3 characters long'),
  description: z.string().optional(),
  private: z.boolean(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
  allowBranch: z.boolean(),
});

export async function createBranch(formData: FormData, projectId: string) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a branch');

  const project = await getProject(projectId);
  if (!project.permissions?.allowCollaborate && session.user.id !== project.authorId)
    throw new Error('You do not have permission to collaborate in this project');

  // Extract and validate the data
  const validatedFields = BranchSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    private: formData.get('private') === 'on',
    allowCollaborate: formData.get('allowCollaborate') === 'on',
    allowShare: formData.get('allowShare') === 'on',
    allowBranch: formData.get('allowBranch') === 'on',
  });

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.toString(),
    };
  }

  let branchId: string | undefined;
  try {
    const [branch] = await db
      .insert(branches)
      .values({
        name: validatedFields.data.name,
        description: validatedFields.data.description,
        authorId: session.user.id,
        projectId: projectId,
      })
      .returning({ id: branches.id });

    if (!branch) throw new Error('Failed to create branch');

    await db.insert(branchesPermissions).values({
      branchId: branch.id,
      allowedUsers: [session.user.id],
      private: validatedFields.data.private,
      allowCollaborate: validatedFields.data.allowCollaborate,
      allowShare: validatedFields.data.allowShare,
      allowBranch: validatedFields.data.allowBranch,
    });

    branchId = branch.id;
  } catch (error) {
    console.error('Failed to create branch:', error);
    return { error: 'An unexpected error occurred' };
  }

  if (branchId) {
    console.log(`Branch created: ${branchId} by user: ${session.user.id}`);
    revalidatePath(`/projects/${projectId}`);
    redirect(`/projects/${projectId}/${branchId}`);
  }

  return { error: 'Failed to create branch' };
}
