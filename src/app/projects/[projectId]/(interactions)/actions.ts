'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { type InteractionType } from 'types';

export async function interactionAction(type: InteractionType, projectId: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact');

    const where = {
      projectId,
      userId: session.user.id,
      type,
    };

    const existing = await db.projectInteraction.findUnique({
      where: { projectId_userId_type: where },
    });

    if (existing) {
      await db.projectInteraction.delete({ where: { projectId_userId_type: where } });
      revalidatePath(`/projects/${projectId}`);
      return { msg: 'Interaction removed successfully' };
    }

    await db.projectInteraction.create({ data: where });
    revalidatePath(`/projects/${projectId}`);
    return { msg: 'Interaction added successfully' };
  } catch (error) {
    console.error('Failed to interact:', error);
    return { msg: 'An unexpected error occurred' };
  }
}
