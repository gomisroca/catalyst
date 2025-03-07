'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { follows } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function unfollowUser({ followedId }: { followedId: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to remove a follow');

    const deletedRows = await db
      .delete(follows)
      .where(and(eq(follows.followerId, session.user.id), eq(follows.followedId, followedId)))
      .returning({ id: follows.id });
    if (deletedRows.length === 0) {
      return { msg: 'No follow found to remove' };
    }

    revalidatePath(`/profile/${followedId}`);
    return { msg: 'User unfollowed successfully' };
  } catch (error) {
    console.error('Failed to unfollow user:', error);
    return { msg: 'An unexpected error occurred' };
  }
}

export async function followUser({ followedId }: { followedId: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to add a follow');

    const existingFollow = await db
      .select()
      .from(follows)
      .where(and(eq(follows.followerId, session.user.id), eq(follows.followedId, followedId)))
      .limit(1);
    if (existingFollow.length > 0) return { msg: 'Follow already exists' };

    await db.insert(follows).values({
      followerId: session.user.id,
      followedId,
    });

    revalidatePath(`/profile/${followedId}`);
    return { msg: 'User followed successfully' };
  } catch (error) {
    console.error('Failed to follow user:', error);
    return { msg: 'An unexpected error occurred' };
  }
}
