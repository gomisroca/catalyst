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

export async function getProject(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  const cacheKey = `project:${id}:${userId ?? 'anonymous'}`;

  return cached(
    cacheKey,
    async () => {
      try {
        return await db.project.findFirstOrThrow({
          where: { id, ...buildPermissionsFilter(userId) },
          include: {
            branches: {
              where: buildPermissionsFilter(userId),
            },
            permissions: { include: { allowedUsers: true } },
            author: true,
          },
        });
      } catch (error) {
        console.error(`Failed to get project ${id}:`, error);
        throw new Error('Project with the given ID does not exist or you do not have access to it');
      }
    },
    60 * 5
  );
}

export async function getProjects() {
  const session = await auth();
  const userId = session?.user?.id;

  const cacheKey = `projects:${userId ?? 'anonymous'}`;

  return cached(
    cacheKey,
    async () => {
      try {
        return await db.project.findMany({
          where: buildPermissionsFilter(userId),
          include: { permissions: true, author: true },
        });
      } catch (error) {
        console.error('Failed to get projects:', error);
        throw new Error('Failed to get projects');
      }
    },
    60 * 5
  );
}

export async function getProjectInteractions(projectId: string) {
  const interactions = await db.projectInteraction.findMany({
    where: { projectId },
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
