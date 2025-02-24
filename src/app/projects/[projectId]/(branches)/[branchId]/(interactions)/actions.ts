'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { branchesInteractions } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addInteractionAction(
  type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE',
  projectId: string,
  branchId: string
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to add an interaction');

    const existingInteraction = await db
      .select()
      .from(branchesInteractions)
      .where(
        and(
          eq(branchesInteractions.branchId, branchId),
          eq(branchesInteractions.userId, session.user.id),
          eq(branchesInteractions.type, type)
        )
      )
      .limit(1);
    if (existingInteraction.length > 0) return { msg: 'Interaction already exists' };

    await db.insert(branchesInteractions).values({
      type,
      branchId,
      userId: session.user.id,
    });
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { msg: 'Interaction created successfully' };
  } catch (error) {
    console.error('Failed to create interaction:', error);
    return { msg: 'An unexpected error occurred' };
  }
}
