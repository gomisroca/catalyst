'use server';

import { type SearchItem } from 'types';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';

const SEARCH_LIMIT = 10;

function buildPermissionsFilter(userId?: string) {
  return {
    OR: [
      { permissions: { private: false } },
      ...(userId ? [{ permissions: { private: true, allowedUsers: { some: { id: userId } } } }] : []),
    ],
  };
}

export async function searchDatabase(query: string) {
  if (!query?.trim()) return [];

  const session = await auth();
  const userId = session?.user?.id;
  const search = { contains: query, mode: 'insensitive' as const };
  const permissionsFilter = buildPermissionsFilter(userId);

  try {
    const [projects, branches, posts, users] = await Promise.all([
      db.project.findMany({
        where: {
          AND: [{ OR: [{ name: search }, { description: search }] }, permissionsFilter],
        },
        include: { author: true, permissions: true },
        take: SEARCH_LIMIT,
      }),

      db.branch.findMany({
        where: {
          AND: [{ OR: [{ name: search }, { description: search }] }, permissionsFilter],
        },
        include: { author: true, project: true, permissions: true },
        take: SEARCH_LIMIT,
      }),

      db.post.findMany({
        where: {
          AND: [
            { OR: [{ title: search }, { content: search }] },
            {
              branch: {
                OR: [
                  { permissions: { private: false } },
                  ...(userId ? [{ permissions: { private: true, allowedUsers: { some: { id: userId } } } }] : []),
                ],
              },
            },
          ],
        },
        include: {
          author: true,
          media: true,
          branch: { include: { permissions: true, project: true } },
        },
        take: SEARCH_LIMIT,
      }),

      db.user.findMany({
        where: { OR: [{ name: search }, { email: search }] },
        take: SEARCH_LIMIT,
      }),
    ]);

    return [
      ...projects.map((project) => ({ type: 'project', content: project }) as const satisfies SearchItem),
      ...branches.map((branch) => ({ type: 'branch', content: branch }) as const satisfies SearchItem),
      ...posts.map((post) => ({ type: 'post', content: post }) as const satisfies SearchItem),
      ...users.map((user) => ({ type: 'user', content: user }) as const satisfies SearchItem),
    ];
  } catch (error) {
    console.error('Failed to search database:', error);
    throw new Error(toErrorMessage(error, 'Failed to search database'));
  }
}
