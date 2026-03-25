'use server';

import { revalidatePath } from 'next/cache';
import { type InteractionType } from 'types';
import { z } from 'zod';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { getProject } from '@/server/queries/projects';
import { toErrorMessage } from '@/utils/errors';

const BranchSchema = z.object({
  name: z.string().min(3, 'Branch name must be at least 3 characters long').max(100, 'Branch name is too long'),
  description: z.string().optional(),
  private: z.boolean(),
  allowedUsers: z.string().array().optional(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
  allowBranch: z.boolean(),
});

type BranchSchemaData = z.infer<typeof BranchSchema>;

function buildPermissionsData(data: BranchSchemaData) {
  return {
    private: data.private,
    allowCollaborate: data.allowCollaborate,
    allowShare: data.allowShare,
    allowBranch: data.allowBranch,
  };
}

type CreateBranchData = {
  projectId: string;
  name: string;
  description?: string;
  private: boolean;
  allowCollaborate: boolean;
  allowShare: boolean;
  allowBranch: boolean;
};

export async function createBranch(createData: CreateBranchData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a branch');

  const project = await getProject(createData.projectId);
  if (!project.permissions?.allowCollaborate && session.user.id !== project.authorId)
    throw new Error('You do not have permission to collaborate in this project');

  const validatedFields = BranchSchema.safeParse(createData);
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  const existingBranch = await db.branch.findFirst({
    where: { name: data.name, projectId: createData.projectId },
  });
  if (existingBranch) throw new Error('A branch with this name already exists in this project');

  try {
    const newBranchId = await db.$transaction(async (trx) => {
      const newBranch = await trx.branch.create({
        data: {
          name: data.name,
          description: data.description,
          authorId: session.user.id,
          projectId: createData.projectId,
        },
      });

      await trx.branchPermissions.create({
        data: {
          branchId: newBranch.id,
          allowedUsers: { connect: { id: session.user.id } },
          ...buildPermissionsData(data),
        },
      });

      return newBranch.id;
    });

    console.log(`Branch ${newBranchId} created by user ${session.user.id}`);
    revalidatePath(`/projects/${createData.projectId}`);
    return { message: 'Branch created successfully.', redirect: `/projects/${createData.projectId}/${newBranchId}` };
  } catch (error) {
    console.error('Failed to create branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to create branch'));
  }
}

type UpdateBranchData = {
  projectId: string;
  branchId: string;
  name: string;
  description?: string;
  private: boolean;
  allowedUsers?: string[];
  allowCollaborate: boolean;
  allowShare: boolean;
  allowBranch: boolean;
};

export async function updateBranch(updateData: UpdateBranchData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a branch');

  const existingBranch = await db.branch.findFirst({
    where: { id: updateData.branchId, authorId: session.user.id, projectId: updateData.projectId },
  });
  if (!existingBranch) throw new Error('Branch not found or you do not have permission to update it.');

  const validatedFields = BranchSchema.safeParse({
    ...updateData,
    name: updateData.name ?? existingBranch.name,
    description: updateData.description ?? existingBranch.description,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  try {
    await db.$transaction(async (trx) => {
      await trx.branch.update({
        where: { id: updateData.branchId },
        data: {
          name: data.name,
          description: data.description,
          updatedAt: new Date(),
        },
      });

      await trx.branchPermissions.update({
        where: { branchId: updateData.branchId },
        data: {
          ...buildPermissionsData(data),
          // Use `set` to replace allowed users list entirely rather than only adding
          allowedUsers: {
            set: data.allowedUsers?.map((id) => ({ id })) ?? [],
          },
        },
      });
    });

    console.log(`Branch ${updateData.branchId} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${updateData.projectId}`);
    return {
      message: 'Branch updated successfully.',
      redirect: `/projects/${updateData.projectId}/${updateData.branchId}`,
    };
  } catch (error) {
    console.error('Failed to update branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to update branch'));
  }
}

export async function deleteBranch({ projectId, branchId }: { projectId: string; branchId: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to delete a branch');

    const existingBranch = await db.branch.findFirst({
      where: { id: branchId, authorId: session.user.id, projectId },
    });
    if (!existingBranch) throw new Error('You do not have permission to delete this branch');

    await db.branch.delete({ where: { id: branchId } });

    revalidatePath(`/projects/${projectId}`);
    return { message: 'Branch deleted successfully', redirect: `/projects/${projectId}` };
  } catch (error) {
    console.log('Failed to delete branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete branch'));
  }
}

export async function toggleBranchInteraction(type: InteractionType, projectId: string, branchId: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact with a branch');

    const where = { branchId, userId: session.user.id, type };
    const existing = await db.branchInteraction.findUnique({
      where: { branchId_userId_type: where },
    });

    if (existing) {
      await db.branchInteraction.delete({ where: { branchId_userId_type: where } });
      revalidatePath(`/projects/${projectId}/${branchId}`);
      return { message: 'Interaction removed successfully' };
    }

    await db.branchInteraction.create({ data: where });
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { message: 'Interaction added successfully' };
  } catch (error) {
    console.error('Failed to interact:', error);
    throw new Error(toErrorMessage(error, 'Failed to interact'));
  }
}
