import 'server-only';

import { type ForYouTimelineItem } from 'types';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

export async function getUserProfile(userId: string) {
  // Get user
  // Include posts, branches and projects
  const cacheKey = `user:${userId}`;
  const user = await cached(
    cacheKey,
    async () => {
      try {
        return await db.user.findUniqueOrThrow({
          where: {
            id: userId,
          },
          include: {
            posts: true,
            branches: true,
            projects: true,
          },
        });
      } catch (error) {
        console.error(`Failed to get user ${userId}:`, error);
        throw new Error('User with the given ID does not exist');
      }
    },
    60 * 5 // Cache for 5 minutes
  );

  return user;
}

export async function getUserFollowers(userId: string) {
  const followers = await db.follow.findMany({
    where: {
      followedId: userId,
    },
    include: {
      follower: true,
    },
  });
  return followers;
}

export async function getUserFollows(userId: string) {
  const follows = await db.follow.findMany({
    where: {
      followerId: userId,
    },
    include: {
      followed: true,
    },
  });
  return follows;
}

export async function getUserContributions(userId: string) {
  const contributions = await db.$transaction(async (trx) => {
    const projects = await trx.project.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    const branches = await trx.branch.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        project: true,
      },
    });
    const posts = await trx.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
        media: true,
        branch: {
          include: {
            project: true,
          },
        },
      },
    });
    const typedContributions: ForYouTimelineItem[] = [
      ...projects.map((project) => ({ type: 'project', content: project }) as const satisfies ForYouTimelineItem),
      ...branches.map((branch) => ({ type: 'branch', content: branch }) as const satisfies ForYouTimelineItem),
      ...posts.map((post) => ({ type: 'post', content: post }) as const satisfies ForYouTimelineItem),
    ];

    return typedContributions;
  });

  return contributions;
}

async function getUserInteractions(userId: string) {
  const interactions = await db.$transaction(async (trx) => {
    const projectInteractions = await trx.projectInteraction.findMany({
      where: {
        userId: userId,
      },
      include: {
        project: true,
        user: true,
      },
    });

    const branchInteractions = await trx.branchInteraction.findMany({
      where: {
        userId: userId,
      },
      include: {
        branch: true,
        user: true,
      },
    });

    const postInteractions = await trx.postInteraction.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: {
          include: {
            media: true,
          },
        },
        user: true,
      },
    });

    const typedInteractions: ForYouTimelineItem[] = [
      ...projectInteractions.map(
        (int) =>
          ({
            type: 'project-interaction',
            content: { ...int, updatedAt: int.createdAt },
          }) as const satisfies ForYouTimelineItem
      ),
      ...branchInteractions.map(
        (int) =>
          ({
            type: 'branch-interaction',
            content: { ...int, updatedAt: int.createdAt },
          }) as const satisfies ForYouTimelineItem
      ),
      ...postInteractions.map(
        (int) =>
          ({
            type: 'post-interaction',
            content: { ...int, updatedAt: int.createdAt },
          }) as const satisfies ForYouTimelineItem
      ),
    ];

    return typedInteractions;
  });

  return interactions;
}

export async function getUserProfileTimeline(userId: string) {
  // Get contributions and interactions for the user
  const contributions = await getUserContributions(userId);
  const interactions = await getUserInteractions(userId);

  // Combine the contributions and interactions into a single array
  const timeline: ForYouTimelineItem[] = [...contributions, ...interactions];

  timeline.sort(
    (a, b) =>
      new Date(b.content.updatedAt ?? b.content.createdAt).getTime() -
      new Date(a.content.updatedAt ?? a.content.createdAt).getTime()
  );

  return timeline;
}

export async function getUserSidebar(userId: string) {
  const session = await auth();

  // Get contributions for the user
  const contributions = await getUserContributions(userId);

  // Get bookmarks for the user
  const dbBookmarks = await db.$transaction(async (trx) => {
    const postBookmarks = await trx.postInteraction.findMany({
      where: {
        userId: userId,
        type: 'BOOKMARK',
      },
      include: {
        post: {
          include: {
            media: true,
            branch: {
              include: {
                permissions: {
                  include: {
                    allowedUsers: true,
                  },
                },
                project: true,
              },
            },
          },
        },
        user: true,
      },
    });

    const branchBookmarks = await trx.branchInteraction.findMany({
      where: {
        userId: userId,
        type: 'BOOKMARK',
      },
      include: {
        branch: {
          include: {
            permissions: {
              include: {
                allowedUsers: true,
              },
            },
            project: true,
          },
        },
        user: true,
      },
    });

    const projectBookmarks = await trx.projectInteraction.findMany({
      where: {
        userId: userId,
        type: 'BOOKMARK',
      },
      include: {
        project: {
          include: {
            permissions: {
              include: {
                allowedUsers: true,
              },
            },
          },
        },
        user: true,
      },
    });

    return {
      postBookmarks,
      branchBookmarks,
      projectBookmarks,
    };
  });

  // Map the bookmarks to a pre-formatted object
  const bookmarks = [
    ...dbBookmarks.postBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      postId: bookmark.postId,
      branchId: bookmark.post.branchId,
      projectId: bookmark.post.branch.projectId,
      postTitle: bookmark.post.title,
      branchName: bookmark.post.branch.name,
      projectName: bookmark.post.branch.project.name,
      permissions: bookmark.post.branch.permissions,
    })),
    ...dbBookmarks.branchBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      projectId: bookmark.branch.projectId,
      branchId: bookmark.branchId,
      branchName: bookmark.branch.name,
      projectName: bookmark.branch.project.name,
      permissions: bookmark.branch.permissions,
    })),
    ...dbBookmarks.projectBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      projectId: bookmark.projectId,
      projectName: bookmark.project.name,
      permissions: bookmark.project.permissions,
    })),
  ];

  // Filter and sort the bookmarks by permissions and createdAt
  bookmarks
    .filter((bookmark) => {
      if (!bookmark.permissions?.private) return true;
      return session?.user.id && bookmark.permissions?.allowedUsers.some((user) => user.id === session.user.id);
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Return the contributions and bookmarks
  return {
    contributions: {
      projects: contributions.filter((item) => item.type === 'project'),
      branches: contributions.filter((item) => item.type === 'branch'),
    },
    bookmarks,
  };
}
