'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';
import { revalidatePath } from 'next/cache';
import { type InteractionType } from 'types';

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
