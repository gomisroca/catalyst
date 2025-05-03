'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';

export async function searchDatabase(query: string) {
  const session = await auth();

  if (!query || query.trim() === '') {
    return [];
  }

  try {
    // Search for projects
    const projects = await db.project.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
          {
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
        ],
      },
    });

    // Search for branches
    const branches = await db.branch.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
          {
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
        ],
      },
    });

    // Search for posts
    const posts = await db.post.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
            ],
          },
          {
            OR: [
              {
                branch: {
                  permissions: { private: false },
                },
              },
              {
                branch: {
                  permissions: {
                    private: true,
                    allowedUsers: {
                      some: {
                        id: session?.user.id,
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
    });

    // Search for users
    const users = await db.user.findMany({
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }],
      },
    });

    return [
      ...projects.map((project) => ({ type: 'project', content: project })),
      ...branches.map((branch) => ({ type: 'branch', content: branch })),
      ...posts.map((post) => ({ type: 'post', content: post })),
      ...users.map((user) => ({ type: 'user', content: user })),
    ];
  } catch (error) {
    console.error('Failed to search database:', error);
    throw new Error(toErrorMessage(error, 'Failed to search database'));
  }
}
