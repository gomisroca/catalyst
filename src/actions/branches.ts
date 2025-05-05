'use server';

import { db } from '@/server/db';
import { auth } from '@/server/auth';
import { type InteractionType } from 'types';
import { toErrorMessage } from '@/utils/errors';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getProject } from '@/server/queries/projects';

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

export async function createBranch(formData: FormData, projectId: string) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a branch');

  const project = await getProject(projectId);
  if (!project.permissions?.allowCollaborate && session.user.id !== project.authorId)
    throw new Error('You do not have permission to collaborate in this project');

  // Extract and validate the data
  const privateFlag = formData.get('private') === 'on';
  const allowCollaborateFlag = formData.get('allowCollaborate') === 'on';
  const allowShareFlag = formData.get('allowShare') === 'on';
  const allowBranchFlag = formData.get('allowBranch') === 'on';

  const validatedFields = BranchSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    private: privateFlag,
    allowCollaborate: allowCollaborateFlag,
    allowShare: allowShareFlag,
    allowBranch: allowBranchFlag,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  // Check if a branch with the same name already exists in the project
  const existingBranch = await db.branch.findFirst({
    where: {
      AND: [{ name: data.name }, { projectId: projectId }],
    },
  });
  if (existingBranch) throw new Error('A branch with this name already exists in this project');

  try {
    const newBranchId = await db.$transaction(async (trx) => {
      const newBranch = await trx.branch.create({
        data: {
          name: data.name,
          description: data.description,
          authorId: session.user.id,
          projectId: projectId,
        },
      });
      await trx.branchPermissions.create({
        data: {
          branchId: newBranch.id,
          allowedUsers: {
            connect: {
              id: session.user.id,
            },
          },
          private: data.private,
          allowCollaborate: data.allowCollaborate,
          allowShare: data.allowShare,
          allowBranch: data.allowBranch,
        },
      });

      return newBranch.id;
    });

    console.log(`Branch ${newBranchId} created by user ${session.user.id}`);
    revalidatePath(`/projects/${projectId}`);
    return { message: 'Branch created successfully.', redirect: `/projects/${projectId}/${newBranchId}` };
  } catch (error) {
    console.error('Failed to create branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to create branch'));
  }
}

export async function updateBranch(params: UpdateBranchParams) {
  const { projectId, branchId } = params.ids;
  const formData = params.formData;

  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a branch');

  // Check if branch exists
  const existingBranch = await db.branch.findFirst({
    where: {
      id: branchId,
      authorId: session.user.id,
      projectId,
    },
  });
  if (!existingBranch) throw new Error('Branch not found or you do not have permission to update it.');

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

  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

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
    return { message: 'Branch updated successfully.', redirect: `/projects/${projectId}/${branchId}` };
  } catch (error) {
    console.error('Failed to update branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to update branch'));
  }
}

export async function deleteBranch({ projectId, branchId }: { projectId: string; branchId: string }) {
  try {
    await db.branch.delete({
      where: {
        id: branchId,
      },
    });
    revalidatePath(`/projects/${projectId}}`);
    return { message: 'Branch deleted successfully', redirect: `/projects/${projectId}` };
  } catch (error) {
    console.log('Failed to delete branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete branch'));
  }
}

export async function interactionAction(type: InteractionType, projectId: string, branchId: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact with a branch');

    const where = {
      branchId,
      userId: session.user.id,
      type,
    };

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

export async function goToBranch(formData: FormData) {
  const projectId = formData.get('projectId');
  const branchId = formData.get('branchId');
  return {
    message: 'Redirecting...',
    redirect: `/projects/${projectId as string}/${branchId as string}`,
  };
}
