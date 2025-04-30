'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { type InteractionType } from 'types';

export async function interactionAction(type: InteractionType, projectId: string, branchId: string) {
  try {
    const session = await auth();
    if (!session?.user) return { msg: 'You must be signed in to interact' };

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
      return { msg: 'Interaction removed successfully' };
    }

    await db.branchInteraction.create({ data: where });
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { msg: 'Interaction added successfully' };
  } catch (error) {
    console.error('Failed to interact:', error);
    return { msg: 'An unexpected error occurred' };
  }
}
