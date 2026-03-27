import 'server-only';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

function buildPermissionsFilter(userId?: string) {
  return {
    OR: [
      { permissions: { private: false } },
      ...(userId ? [{ permissions: { private: true, allowedUsers: { some: { id: userId } } } }] : []),
    ],
  };
}

export async function getBranch(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  const cacheKey = `branch:${id}:${userId ?? 'anonymous'}`;

  return cached(
    cacheKey,
    async () => {
      try {
        return await db.branch.findFirstOrThrow({
          where: {
            id,
            ...buildPermissionsFilter(userId),
          },
          include: {
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
            permissions: { include: { allowedUsers: true } },
            author: true,
          },
        });
      } catch (error) {
        console.error(`Failed to get branch ${id}:`, error);
        throw new Error('Branch with the given ID does not exist or you do not have access to it');
      }
    },
    60 * 5
  );
}

export async function getBranchInteractions(branchId: string) {
  const interactions = await db.branchInteraction.findMany({
    where: { branchId },
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
