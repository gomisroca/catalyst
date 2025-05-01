'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const BranchSchema = z.object({
  name: z.string().min(3, 'Branch name must be at least 3 characters long').max(100, 'Branch name is too long'),
  description: z.string().optional(),
  private: z.boolean(),
  allowedUsers: z.string().array().optional(),
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
  const existingBranch = await db.branch.findFirst({
    where: {
      id: branchId,
      authorId: session.user.id,
      projectId,
    },
  });
  if (!existingBranch) {
    console.log(`Branch ${branchId} not found for user ${session.user.id}`);
    return { msg: 'Branch not found or you do not have permission to update it.' };
  }

  // Extract and validate the data
  const privateFlag = formData.get('private') === 'on';
  const allowCollaborateFlag = formData.get('allowCollaborate') === 'on';
  const allowShareFlag = formData.get('allowShare') === 'on';
  const allowBranchFlag = formData.get('allowBranch') === 'on';

  const validatedFields = BranchSchema.safeParse({
    name: formData.get('name') ?? existingBranch.name,
    description: formData.get('description') ?? existingBranch.description,
    private: privateFlag,
    allowedUsers: formData.getAll('allowedUsers'),
    allowCollaborate: allowCollaborateFlag,
    allowShare: allowShareFlag,
    allowBranch: allowBranchFlag,
  });

  if (!validatedFields.success) {
    return {
      msg: validatedFields.error.toString(),
    };
  }

  const { data } = validatedFields;
  try {
    await db.$transaction(async (trx) => {
      await trx.branch.update({
        where: { id: branchId },
        data: {
          name: data.name,
          description: data.description,
          updatedAt: new Date(),
        },
      });
      await trx.branchPermissions.update({
        where: { branchId },
        data: {
          private: data.private,
          allowedUsers: {
            connect: data.allowedUsers?.map((userId: string) => ({ id: userId })),
          },
          allowCollaborate: data.allowCollaborate,
          allowShare: data.allowShare,
          allowBranch: data.allowBranch,
        },
      });
    });

    console.log(`Branch ${branchId} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${projectId}`);
  } catch (error) {
    console.error('Failed to update branch:', error);
    return { msg: 'An unexpected error occurred while updating the branch' };
  }
  redirect(`/projects/${projectId}/${branchId}`);
}
