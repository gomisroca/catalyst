'use server';

// Libraries
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/server/db';
import { auth } from '@/server/auth';
import { toErrorMessage } from '@/utils/errors';
// Queries
import { getProject } from '@/server/queries/projects';
// Types
import { type InteractionType } from 'types';

// Define the schema for the branch data
const BranchSchema = z.object({
  name: z.string().min(3, 'Branch name must be at least 3 characters long').max(100, 'Branch name is too long'),
  description: z.string().optional(),
  private: z.boolean(),
  allowedUsers: z.string().array().optional(),
  allowCollaborate: z.boolean(),
  allowShare: z.boolean(),
  allowBranch: z.boolean(),
});

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
  // Check if user is signed in, and if they are authorized to create a branch
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a branch');

  const project = await getProject(createData.projectId);
  if (!project.permissions?.allowCollaborate && session.user.id !== project.authorId)
    throw new Error('You do not have permission to collaborate in this project');

  // Validate the data
  const validatedFields = BranchSchema.safeParse({
    name: createData.name,
    description: createData.description,
    private: createData.private,
    allowCollaborate: createData.allowCollaborate,
    allowShare: createData.allowShare,
    allowBranch: createData.allowBranch,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  // Check if a branch with the same name already exists in the project
  const existingBranch = await db.branch.findFirst({
    where: {
      AND: [{ name: data.name }, { projectId: createData.projectId }],
    },
  });
  if (existingBranch) throw new Error('A branch with this name already exists in this project');

  try {
    // DB transaction to create the branch and its permissions
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

    // Revalidate the project page and pass the redirect path to the client
    revalidatePath(`/projects/${createData.projectId}`);
    return { message: 'Branch created successfully.', redirect: `/projects/${createData.projectId}/${newBranchId}` };
  } catch (error) {
    console.error('Failed to create branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to create branch'));
  }
}

// Define the structure of the data expected by the server action
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
  // Check if user is signed in, and if they are authorized to update the branch
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a branch');

  // Check if branch exists
  const existingBranch = await db.branch.findFirst({
    where: {
      id: updateData.branchId,
      authorId: session.user.id,
      projectId: updateData.projectId,
    },
  });
  if (!existingBranch) throw new Error('Branch not found or you do not have permission to update it.');

  // Validate the data
  const validatedFields = BranchSchema.safeParse({
    name: updateData.name ?? existingBranch.name,
    description: updateData.description ?? existingBranch.description,
    private: updateData.private,
    allowedUsers: updateData.allowedUsers ?? [],
    allowCollaborate: updateData.allowCollaborate,
    allowShare: updateData.allowShare,
    allowBranch: updateData.allowBranch,
  });

  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    // DB transaction to update the branch and its permissions
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

    console.log(`Branch ${updateData.branchId} updated by user ${session.user.id}`);

    // Revalidate the project page and pass the redirect path to the client
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

    // Check if user is authorized to delete the branch
    const existingBranch = await db.branch.findFirst({
      where: {
        id: branchId,
        authorId: session.user.id,
        projectId,
      },
    });
    if (!existingBranch) throw new Error('You do not have permission to delete this branch');

    // Delete the branch
    await db.branch.delete({
      where: {
        id: branchId,
      },
    });

    // Revalidate the project page and pass the redirect path to the client
    revalidatePath(`/projects/${projectId}}`);
    return { message: 'Branch deleted successfully', redirect: `/projects/${projectId}` };
  } catch (error) {
    console.log('Failed to delete branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete branch'));
  }
}

export async function interactionAction(type: InteractionType, projectId: string, branchId: string) {
  try {
    // Check if user is signed in
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact with a branch');

    // Check if user has already interacted with the branch
    const where = {
      branchId,
      userId: session.user.id,
      type,
    };
    const existing = await db.branchInteraction.findUnique({
      where: { branchId_userId_type: where },
    });

    // If the user has already interacted, delete the interaction and revalidate the branch page
    if (existing) {
      await db.branchInteraction.delete({ where: { branchId_userId_type: where } });
      revalidatePath(`/projects/${projectId}/${branchId}`);
      return { message: 'Interaction removed successfully' };
    }

    // Otherwise, create a new interaction and revalidate the branch page
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

  // Revalidate the branch page and pass the redirect path to the client
  return {
    message: 'Redirecting...',
    redirect: `/projects/${projectId as string}/${branchId as string}`,
  };
}
