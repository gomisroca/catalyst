import 'server-only';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

export async function getPost(id: string) {
  try {
    const session = await auth();

    // Get post
    // Include media and author
    const cacheKey = `post:${id}`;
    const post = await cached(
      cacheKey,
      async () => {
        try {
          return await db.post.findFirstOrThrow({
            where: {
              id,
              authorId: session?.user.id,
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
      60 * 5 // Cache for 5 minutes
    );

    return post;
  } catch (error) {
    console.error('Failed to get post:', error);
    throw new Error('An unexpected error occurred');
  }
}

export async function getPostInteractions(postId: string) {
  const interactions = await db.postInteraction.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
    },
  });

  const likes = interactions.filter((data) => data.type === 'LIKE');
  const shares = interactions.filter((data) => data.type === 'SHARE');
  const bookmarks = interactions.filter((data) => data.type === 'BOOKMARK');

  const reports = interactions.filter((data) => data.type === 'REPORT');
  const hides = interactions.filter((data) => data.type === 'HIDE');

  // Return a pre-formatted object with interactions and extra interactions
  return {
    interactions: {
      likes,
      shares,
      bookmarks,
    },
    extraInteractions: {
      reports,
      hides,
    },
  };
}
