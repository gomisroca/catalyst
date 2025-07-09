import 'server-only';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

export async function getProject(id: string) {
  const session = await auth();

  // Get project, ensuring the user has access to it
  // Include permissions, author and branches the user has access to
  const cacheKey = `project:${id}`;
  const project = await cached(
    cacheKey,
    async () => {
      try {
        return await db.project.findFirstOrThrow({
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
            branches: {
              where: {
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
            },
            permissions: {
              include: {
                allowedUsers: true,
              },
            },
            author: true,
          },
        });
      } catch (error) {
        console.error(`Failed to get project ${id}:`, error);
        throw new Error('Project with the given ID does not exist or you do not have access to it');
      }
    },
    60 * 5 // Cache for 5 minutes
  );

  return project;
}

export async function getProjects() {
  const session = await auth();

  // Get projects, ensuring the user has access to them
  // Include permissions and author
  const cacheKey = `projects:${session?.user.id ?? 'global'}`;
  const projects = await cached(
    cacheKey,
    async () => {
      try {
        return await db.project.findMany({
          where: {
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
            permissions: true,
            author: true,
          },
        });
      } catch (error) {
        console.error(`Failed to get projects:`, error);
        return [];
      }
    },
    60 * 5 // Cache for 5 minutes
  );

  return projects;
}

export async function getProjectInteractions(projectId: string) {
  const interactions = await db.projectInteraction.findMany({
    where: {
      projectId,
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
