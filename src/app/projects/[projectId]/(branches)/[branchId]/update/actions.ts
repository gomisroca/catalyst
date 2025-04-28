'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { branches, branchesPermissions } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
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

type UpdateBranchParams = {
  formData: FormData;
  ids: {
    projectId: string;
    branchId: string;
  };
};

export async function updateBranch(params: UpdateBranchParams) {
  const { projectId, branchId } = params.ids;
  const formData = params.formData;

  const session = await auth();
  if (!session?.user) return { msg: 'You must be signed in to update a branch' };

  // Check if branch exists
  const existingBranch = await db.query.branches.findFirst({
    where: and(eq(branches.id, branchId), eq(branches.authorId, session.user.id), eq(branches.projectId, projectId)),
  });
  if (!existingBranch) {
    console.log(`Branch ${branchId} not found in the database`);
    return { msg: 'Branch not found in the database' };
  }

  // Extract and validate the data
  const validatedFields = BranchSchema.safeParse({
    name: formData.get('name') ?? existingBranch.name,
    description: formData.get('description') ?? existingBranch.description,
    private: formData.get('private') === 'on',
    allowCollaborate: formData.get('allowCollaborate') === 'on',
    allowShare: formData.get('allowShare') === 'on',
    allowBranch: formData.get('allowBranch') === 'on',
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
        .update(branches)
        .set({
          name: data.name,
          description: data.description,
        })
        .where(eq(branches.id, branchId));

      await trx
        .update(branchesPermissions)
        .set({
          private: data.private,
          allowCollaborate: data.allowCollaborate,
          allowShare: data.allowShare,
          allowBranch: data.allowBranch,
        })
        .where(eq(branchesPermissions.branchId, branchId));
    });
    console.log(`Branch ${branchId} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${projectId}`);
  } catch (error) {
    console.error('Failed to update branch:', error);
    return { msg: 'An unexpected error occurred' };
  }
  redirect(`/projects/${projectId}/${branchId}`);
}
