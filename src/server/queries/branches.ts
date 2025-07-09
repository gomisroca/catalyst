import 'server-only';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

export async function getBranch(id: string) {
  try {
    const session = await auth();

    // Get branch, ensuring the user has access to it
    // Include permissions, author and posts
    const cacheKey = `branch:${id}`;
    const branch = await cached(
      cacheKey,
      async () => {
        try {
          return await db.branch.findFirstOrThrow({
            where: {
              id,
              OR: [
                { permissions: { private: false } },
                {
                  permissions: {
                    private: true,
                    allowedUsers: {
                      some: {
                        id: session?.user.id,
                      },
                    },
                  },
                },
              ],
            },
            include: {
              permissions: {
                include: {
                  allowedUsers: true,
                },
              },
              author: true,
              posts: {
                include: {
                  author: true,
                  media: true,
                  interactions: {
                    include: {
                      user: true,
                    },
                  },
                },
              },
            },
          });
        } catch (error) {
          console.error(`Failed to get branch ${id}:`, error);
          throw new Error('Branch with the given ID does not exist or you do not have access to it');
        }
      },
      60 * 5 // Cache for 5 minutes
    );

    return branch;
  } catch (error) {
    console.error('Failed to get branch:', error);
    throw new Error('An unexpected error occurred');
  }
}

export async function getBranchInteractions(branchId: string) {
  const interactions = await db.branchInteraction.findMany({
    where: {
      branchId,
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
