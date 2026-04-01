import 'server-only';

import { type Session } from 'next-auth';
import { type TimelineItem } from 'types';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { getUserFollows } from '@/server/queries/users';

function buildPermissionsFilter(userId?: string) {
  return {
    OR: [
      { permissions: { private: false } },
      ...(userId ? [{ permissions: { private: true, allowedUsers: { some: { id: userId } } } }] : []),
    ],
  };
}

function buildBranchPermissionsFilter(userId?: string) {
  return {
    branch: {
      permissions: {
        OR: [{ private: false }, ...(userId ? [{ private: true, allowedUsers: { some: { id: userId } } }] : [])],
      },
    },
  };
}

const sevenDaysAgo = () => {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d;
};

async function getTrendingProjects({
  session,
  page = 1,
  pageSize = 10,
}: {
  session: Session | null;
  page?: number;
  pageSize?: number;
}) {
  const projects = await db.project.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: buildPermissionsFilter(session?.user.id),
    include: {
      author: true,
      permissions: true,
      _count: { select: { interactions: { where: { createdAt: { gte: sevenDaysAgo() } } } } },
    },
    orderBy: [{ interactions: { _count: 'desc' } }, { createdAt: 'desc' }],
  });

  return projects.map(({ _count: _, ...project }) => project);
}

async function getTrendingBranches({
  session,
  page = 1,
  pageSize = 10,
}: {
  session: Session | null;
  page?: number;
  pageSize?: number;
}) {
  const branches = await db.branch.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: buildPermissionsFilter(session?.user.id),
    include: {
      author: true,
      project: true,
      permissions: true,
      _count: { select: { interactions: { where: { createdAt: { gte: sevenDaysAgo() } } } } },
    },
    orderBy: [{ interactions: { _count: 'desc' } }, { createdAt: 'desc' }],
  });

  return branches.map(({ _count: _, ...branch }) => branch);
}

export async function getTrendingTimeline({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const session = await auth();
  const [projects, branches] = await Promise.all([
    getTrendingProjects({ session, page, pageSize }),
    getTrendingBranches({ session, page, pageSize }),
  ]);

  return [
    ...branches.map((branch) => ({ type: 'branch', content: branch }) as const satisfies TimelineItem),
    ...projects.map((project) => ({ type: 'project', content: project }) as const satisfies TimelineItem),
  ].sort(
    (a, b) =>
      new Date(b.content.updatedAt ?? b.content.createdAt).getTime() -
      new Date(a.content.updatedAt ?? a.content.createdAt).getTime()
  );
}

async function getPostInteractions({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  return db.postInteraction.findMany({
    where: { userId: { in: followsIds }, ...buildBranchPermissionsFilter(session.user.id) },
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      post: { include: { media: true, branch: { include: { permissions: true } } } },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
}

async function getBranchInteractions({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  return db.branchInteraction.findMany({
    where: {
      userId: { in: followsIds },
      branch: buildPermissionsFilter(session.user.id),
    },
    orderBy: { createdAt: 'desc' },
    include: { user: true, branch: { include: { permissions: true } } },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
}

async function getProjectInteractions({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  return db.projectInteraction.findMany({
    where: {
      userId: { in: followsIds },
      project: buildPermissionsFilter(session.user.id),
    },
    orderBy: { createdAt: 'desc' },
    include: { user: true, project: { include: { permissions: true } } },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
}

async function getUserPosts({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  return db.post.findMany({
    where: { authorId: { in: followsIds }, ...buildBranchPermissionsFilter(session.user.id) },
    include: { author: true, media: true, branch: { include: { permissions: true, project: true } } },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
}

async function getUserBranches({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  return db.branch.findMany({
    where: {
      authorId: { in: followsIds },
      ...buildPermissionsFilter(session.user.id),
    },
    include: { author: true, project: true },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
}

async function getUserProjects({
  followsIds,
  session,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  session: Session;
  page?: number;
  pageSize?: number;
}) {
  return db.project.findMany({
    where: {
      authorId: { in: followsIds },
      ...buildPermissionsFilter(session.user.id),
    },
    include: { author: true },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });
}

export async function getForYouTimeline({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  const follows = await getUserFollows(session.user.id);
  const followsIds = follows.map((follow) => follow.followedId);

  const [postInteractions, branchInteractions, projectInteractions, posts, branches, projects] = await Promise.all([
    getPostInteractions({ followsIds, session, page, pageSize }),
    getBranchInteractions({ followsIds, session, page, pageSize }),
    getProjectInteractions({ followsIds, session, page, pageSize }),
    getUserPosts({ followsIds, session, page, pageSize }),
    getUserBranches({ followsIds, session, page, pageSize }),
    getUserProjects({ followsIds, session, page, pageSize }),
  ]);

  return [
    ...postInteractions.map((i) => ({ type: 'post-interaction', content: i }) as const satisfies TimelineItem),
    ...branchInteractions.map((i) => ({ type: 'branch-interaction', content: i }) as const satisfies TimelineItem),
    ...projectInteractions.map((i) => ({ type: 'project-interaction', content: i }) as const satisfies TimelineItem),
    ...posts.map((p) => ({ type: 'post', content: p }) as const satisfies TimelineItem),
    ...branches.map((b) => ({ type: 'branch', content: b }) as const satisfies TimelineItem),
    ...projects.map((p) => ({ type: 'project', content: p }) as const satisfies TimelineItem),
  ].sort(
    (a, b) =>
      new Date(
        'updatedAt' in b.content ? (b.content.updatedAt ?? b.content.createdAt) : b.content.createdAt
      ).getTime() -
      new Date('updatedAt' in a.content ? (a.content.updatedAt ?? a.content.createdAt) : a.content.createdAt).getTime()
  );
}
