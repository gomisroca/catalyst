'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { getProject } from '@/server/queries/projects';
import { toErrorMessage } from '@/utils/errors';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const BranchSchema = z.object({
  name: z.string().min(3, 'Branch name must be at least 3 characters long').max(100, 'Branch name is too long'),
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
