import 'server-only';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

export async function getPost(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  const cacheKey = `post:${id}:${userId ?? 'anonymous'}`;

  return cached(
    cacheKey,
    async () => {
      try {
        return await db.post.findFirstOrThrow({
          where: {
            id,
            authorId: userId,
          },
          include: {
            author: true,
            media: true,
          },
        });
      } catch (error) {
        console.error(`Failed to get post ${id}:`, error);
        throw new Error('Post with the given ID does not exist or you do not have access to it');
      }
    },
    60 * 5
  );
}

export async function getPostInteractions(postId: string) {
  const interactions = await db.postInteraction.findMany({
    where: { postId },
    include: { user: true },
  });

  return {
    interactions: {
      likes: interactions.filter((i) => i.type === 'LIKE'),
      shares: interactions.filter((i) => i.type === 'SHARE'),
      bookmarks: interactions.filter((i) => i.type === 'BOOKMARK'),
    },
    extraInteractions: {
      reports: interactions.filter((i) => i.type === 'REPORT'),
      hides: interactions.filter((i) => i.type === 'HIDE'),
    },
  };
}
