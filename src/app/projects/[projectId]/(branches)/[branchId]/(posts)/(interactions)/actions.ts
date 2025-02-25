'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { postsInteractions } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addInteractionAction(
  type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE',
  projectId: string,
  branchId: string,
  postId: string
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to add an interaction');

    const existingInteraction = await db
      .select()
      .from(postsInteractions)
      .where(
        and(
          eq(postsInteractions.postId, branchId),
          eq(postsInteractions.userId, session.user.id),
          eq(postsInteractions.type, type)
        )
      )
      .limit(1);
    if (existingInteraction.length > 0) return { msg: 'Interaction already exists' };

    await db.insert(postsInteractions).values({
      type,
      postId,
      userId: session.user.id,
    });
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { msg: 'Interaction created successfully' };
  } catch (error) {
    console.error('Failed to create interaction:', error);
    return { msg: 'An unexpected error occurred' };
  }
}

export async function removeInteractionAction(
  type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE',
  projectId: string,
  branchId: string,
  postId: string
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to remove an interaction');

    const deletedRows = await db
      .delete(postsInteractions)
      .where(
        and(
          eq(postsInteractions.postId, postId),
          eq(postsInteractions.userId, session.user.id),
          eq(postsInteractions.type, type)
        )
      )
      .returning({ id: postsInteractions.id });
    if (deletedRows.length === 0) {
      return { msg: 'No interaction found to remove' };
    }

    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { msg: 'Interaction removed successfully' };
  } catch (error) {
    console.error('Failed to remove interaction:', error);
    return { msg: 'An unexpected error occurred' };
  }
}
