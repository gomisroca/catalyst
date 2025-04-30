import 'server-only';
import { auth } from '@/server/auth';
import { db } from '@/server/db';

export async function getPost(id: string) {
  try {
    const session = await auth();
    const post = await db.post
      .findFirstOrThrow({
        where: {
          id,
          authorId: session?.user.id,
        },
        include: {
          author: true,
          media: true,
        },
      })
      .catch(() => {
        throw new Error('Post with the given ID does not exist or you do not have access to it');
      });

    return post;
  } catch (error) {
    console.error('Failed to get branch:', error);
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
