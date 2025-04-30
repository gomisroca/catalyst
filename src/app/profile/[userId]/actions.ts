'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';

export async function followUser({ followedId }: { followedId: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to follow or unfollow a user');

    const where = {
      followerId: session.user.id,
      followedId,
    };

    const follow = await db.follow.findUnique({
      where: {
        followerId_followedId: where,
      },
    });
    if (follow) {
      await db.follow.delete({
        where: { followerId_followedId: where },
      });
      revalidatePath(`/profile/${followedId}`);
      return { msg: 'User unfollowed successfully' };
    }

    await db.follow.create({ data: where });

    revalidatePath(`/profile/${followedId}`);
    return { msg: 'User followed successfully' };
  } catch (error) {
    console.error('Failed to follow or unfollow user:', error);
    return { msg: 'An unexpected error occurred while following or unfollowing' };
  }
}
