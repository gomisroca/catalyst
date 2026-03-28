import 'server-only';

import { type TimelineItem } from 'types';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { cached } from '@/utils/redis';

export async function getUserProfile(userId: string) {
  const cacheKey = `user:${userId}`;
  return cached(
    cacheKey,
    async () => {
      try {
        return await db.user.findUniqueOrThrow({
          where: { id: userId },
          include: { posts: true, branches: true, projects: true },
        });
      } catch (error) {
        console.error(`Failed to get user ${userId}:`, error);
        throw new Error('User with the given ID does not exist');
      }
    },
    60 * 5
  );
}

export async function getUserFollowers(userId: string) {
  return db.follow.findMany({
    where: { followedId: userId },
    include: { follower: true },
  });
}

export async function getUserFollows(userId: string) {
  return db.follow.findMany({
    where: { followerId: userId },
    include: { followed: true },
  });
}

export async function getUserContributions(userId: string) {
  const [projects, branches, posts] = await Promise.all([
    db.project.findMany({
      where: { authorId: userId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.branch.findMany({
      where: { authorId: userId },
      include: { author: true, project: true },
      orderBy: { createdAt: 'desc' },
    }),
    db.post.findMany({
      where: { authorId: userId },
      include: { author: true, media: true, branch: { include: { project: true } } },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return [
    ...projects.map((project) => ({ type: 'project', content: project }) as const satisfies TimelineItem),
    ...branches.map((branch) => ({ type: 'branch', content: branch }) as const satisfies TimelineItem),
    ...posts.map((post) => ({ type: 'post', content: post }) as const satisfies TimelineItem),
  ];
}

async function getUserInteractions(userId: string) {
  const [projectInteractions, branchInteractions, postInteractions] = await Promise.all([
    db.projectInteraction.findMany({
      where: { userId },
      include: { project: true, user: true },
    }),
    db.branchInteraction.findMany({
      where: { userId },
      include: { branch: true, user: true },
    }),
    db.postInteraction.findMany({
      where: { userId },
      include: { post: { include: { media: true } }, user: true },
    }),
  ]);

  return [
    ...projectInteractions.map(
      (int) => ({ type: 'project-interaction', content: int }) as const satisfies TimelineItem
    ),
    ...branchInteractions.map((int) => ({ type: 'branch-interaction', content: int }) as const satisfies TimelineItem),
    ...postInteractions.map((int) => ({ type: 'post-interaction', content: int }) as const satisfies TimelineItem),
  ];
}

export async function getUserProfileTimeline(userId: string) {
  const [contributions, interactions] = await Promise.all([getUserContributions(userId), getUserInteractions(userId)]);

  return [...contributions, ...interactions].sort(
    (a, b) =>
      new Date(
        'updatedAt' in b.content ? (b.content.updatedAt ?? b.content.createdAt) : b.content.createdAt
      ).getTime() -
      new Date('updatedAt' in a.content ? (a.content.updatedAt ?? a.content.createdAt) : a.content.createdAt).getTime()
  );
}

export async function getUserSidebar(userId: string) {
  const session = await auth();

  const [contributions, dbBookmarks] = await Promise.all([
    getUserContributions(userId),
    db.$transaction(async (trx) => {
      const [postBookmarks, branchBookmarks, projectBookmarks] = await Promise.all([
        trx.postInteraction.findMany({
          where: { userId, type: 'BOOKMARK' },
          include: {
            post: {
              include: {
                media: true,
                branch: {
                  include: {
                    permissions: { include: { allowedUsers: true } },
                    project: true,
                  },
                },
              },
            },
            user: true,
          },
        }),
        trx.branchInteraction.findMany({
          where: { userId, type: 'BOOKMARK' },
          include: {
            branch: {
              include: {
                permissions: { include: { allowedUsers: true } },
                project: true,
              },
            },
            user: true,
          },
        }),
        trx.projectInteraction.findMany({
          where: { userId, type: 'BOOKMARK' },
          include: {
            project: {
              include: { permissions: { include: { allowedUsers: true } } },
            },
            user: true,
          },
        }),
      ]);
      return { postBookmarks, branchBookmarks, projectBookmarks };
    }),
  ]);

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
  ]
    .filter((bookmark) => {
      if (!bookmark.permissions?.private) return true;
      return session?.user?.id && bookmark.permissions.allowedUsers.some((user) => user.id === session.user.id);
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    contributions: {
      projects: contributions.filter((item) => item.type === 'project'),
      branches: contributions.filter((item) => item.type === 'branch'),
    },
    bookmarks,
  };
}
