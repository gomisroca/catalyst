'use server';

import { type SearchItem } from 'types';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';

export async function searchDatabase(query: string) {
  const session = await auth();

  // If the query is empty, return an empty array
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
      include: {
        author: true,
        permissions: true,
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
      include: {
        author: true,
        project: true,
        permissions: true,
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
      include: {
        author: true,
        media: true,
        branch: {
          include: {
            permissions: true,
            project: true,
          },
        },
      },
    });

    // Search for users
    const users = await db.user.findMany({
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }],
      },
    });

    // Return an array of search items, with each item containing its type and content
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
