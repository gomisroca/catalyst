import 'server-only';
import { eq, inArray, sql } from 'drizzle-orm';
import { db } from '../db';
import {
  branches,
  branchesInteractions,
  branchesPermissions,
  posts,
  postsInteractions,
  postsMedia,
  projects,
  projectsInteractions,
  projectsPermissions,
  users,
} from '../db/schema';
import { auth } from '../auth';
import { getUserFollows } from './users';
import { type Session } from 'next-auth';
import {
  type TimelineBranch,
  type TimelinePost,
  type TimelineBranchInteraction,
  type TimelinePostInteraction,
  type TimelineProjectInteraction,
  type TimelineProject,
} from 'types';

async function getTrendingProjects({
  session,
  page = 1,
  pageSize = 10,
}: {
  session: Session | null;
  page?: number;
  pageSize?: number;
}): Promise<TimelineProject[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoString = sevenDaysAgo.toISOString().split('T')[0];

  const sortedProjects = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      picture: projects.picture,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      authorId: projects.authorId,
      interactionCount: sql`COUNT(CASE WHEN ${projectsInteractions.createdAt} >= ${sevenDaysAgoString} THEN ${projectsInteractions.id} ELSE NULL END)`,
      permissions: projectsPermissions,
    })
    .from(projects)
    .leftJoin(projectsInteractions, eq(projects.id, projectsInteractions.projectId))
    .leftJoin(projectsPermissions, eq(projects.id, projectsPermissions.projectId))
    .groupBy(projects.id, projectsPermissions.id)
    .orderBy(
      sql`COUNT(CASE WHEN ${projectsInteractions.createdAt} >= ${sevenDaysAgoString} THEN ${projectsInteractions.id} ELSE NULL END) DESC`,
      sql`${projects.createdAt} DESC`
    )
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return sortedProjects.filter(({ permissions }) => {
    if (!permissions?.private) return true;
    return session?.user.id && permissions?.allowedUsers.includes(session.user.id);
  });
}

async function getTrendingBranches({
  session,
  page = 1,
  pageSize = 10,
}: {
  session: Session | null;
  page?: number;
  pageSize?: number;
}): Promise<TimelineBranch[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoString = sevenDaysAgo.toISOString().split('T')[0];

  const sortedBranches = await db
    .select({
      id: branches.id,
      name: branches.name,
      description: branches.description,
      createdAt: branches.createdAt,
      updatedAt: branches.updatedAt,
      authorId: branches.authorId,
      projectId: branches.projectId,
      projectName: projects.name,
      projectPicture: projects.picture,
      interactionCount: sql`COUNT(CASE WHEN ${branchesInteractions.createdAt} >= ${sevenDaysAgoString} THEN ${branchesInteractions.id} ELSE NULL END)`,
      permissions: branchesPermissions,
    })
    .from(branches)
    .leftJoin(branchesInteractions, eq(branches.id, branchesInteractions.branchId))
    .leftJoin(branchesPermissions, eq(branches.id, branchesPermissions.branchId))
    .leftJoin(projects, eq(branches.projectId, projects.id))
    .groupBy(branches.id, projects.name, projects.picture, branchesPermissions.id)
    .orderBy(
      sql`COUNT(CASE WHEN ${branchesInteractions.createdAt} >= ${sevenDaysAgoString} THEN ${branchesInteractions.id} ELSE NULL END) DESC`,
      sql`${branches.createdAt} DESC`
    )
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return sortedBranches.filter(({ permissions }) => {
    if (!permissions?.private) return true;
    return session?.user.id && permissions?.allowedUsers.includes(session.user.id);
  });
}

export async function getTrendingTimeline({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const session = await auth();
  const [sortedProjects, sortedBranches] = await Promise.all([
    getTrendingProjects({ session, page, pageSize }),
    getTrendingBranches({ session, page, pageSize }),
  ]);

  return {
    branches: sortedBranches.map((branch) => ({ content: branch, type: 'branch', timestamp: branch.createdAt })),
    projects: sortedProjects.map((project) => ({ content: project, type: 'project', timestamp: project.createdAt })),
  };
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
}): Promise<TimelinePostInteraction[]> {
  const interactions = await db
    .select({
      interactionType: postsInteractions.type,
      createdAt: postsInteractions.createdAt,
      updatedAt: postsInteractions.createdAt,
      userId: postsInteractions.userId,
      postId: postsInteractions.postId,
      title: posts.title,
      content: posts.content,
      id: postsInteractions.id,
      type: postsInteractions.type,
      author: sql<{ id: string; name: string | null; email: string }>`
        json_build_object(
          'id', ${users.id},
          'name', ${users.name},
          'email', ${users.email}
        )
      `.as('author'),
      media: sql<Array<{ id: string; name: string; url: string }>>`
        COALESCE(
          json_agg(
            json_build_object(
              'id', ${postsMedia.id},
              'name', ${postsMedia.name},
              'url', ${postsMedia.url}
            )
          ) FILTER (WHERE ${postsMedia.id} IS NOT NULL),
          '[]'::json
        )
      `.as('media'),
      permissions: branchesPermissions,
    })
    .from(postsInteractions)
    .leftJoin(posts, eq(postsInteractions.postId, posts.id))
    .leftJoin(branchesPermissions, eq(posts.branchId, branchesPermissions.branchId))
    .leftJoin(postsMedia, eq(posts.id, postsMedia.postId))
    .leftJoin(users, eq(postsInteractions.userId, users.id))
    .where(inArray(postsInteractions.userId, followsIds))
    .groupBy(
      postsInteractions.id,
      postsInteractions.type,
      postsInteractions.createdAt,
      postsInteractions.userId,
      postsInteractions.postId,
      posts.title,
      posts.content,
      users.id,
      branchesPermissions.id
    )
    .orderBy(sql`${postsInteractions.createdAt} DESC`)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return interactions.filter((interaction) => {
    if (!interaction.permissions?.private) return true;
    return session?.user.id && interaction.permissions?.allowedUsers.includes(session.user.id);
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
}): Promise<TimelineBranchInteraction[]> {
  const interactions = await db
    .select({
      interactionType: branchesInteractions.type,
      createdAt: branchesInteractions.createdAt,
      updatedAt: branchesInteractions.createdAt,
      userId: branchesInteractions.userId,
      branchId: branchesInteractions.branchId,
      name: branches.name,
      description: branches.description,
      id: branchesInteractions.id,
      author: sql<{ id: string; name: string | null; email: string }>`
        json_build_object(
          'id', ${users.id},
          'name', ${users.name},
          'email', ${users.email}
        )
      `.as('author'),
      type: branchesInteractions.type,
      permissions: branchesPermissions,
    })
    .from(branchesInteractions)
    .leftJoin(branches, eq(branchesInteractions.branchId, branches.id))
    .leftJoin(branchesPermissions, eq(branches.id, branchesPermissions.branchId))
    .leftJoin(users, eq(branchesInteractions.userId, users.id))
    .where(inArray(branchesInteractions.userId, followsIds))
    .groupBy(
      branchesInteractions.id,
      branchesInteractions.type,
      branchesInteractions.createdAt,
      branchesInteractions.userId,
      branchesInteractions.branchId,
      branches.name,
      branches.description,
      branchesPermissions.id,
      users.id
    )
    .orderBy(sql`${branchesInteractions.createdAt} DESC`)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return interactions.filter((interaction) => {
    if (!interaction.permissions?.private) return true;
    return session?.user.id && interaction.permissions?.allowedUsers.includes(session.user.id);
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
}): Promise<TimelineProjectInteraction[]> {
  const interactions = await db
    .select({
      interactionType: projectsInteractions.type,
      createdAt: projectsInteractions.createdAt,
      updatedAt: projectsInteractions.createdAt,
      userId: projectsInteractions.userId,
      projectId: projectsInteractions.projectId,
      name: projects.name,
      description: projects.description,
      id: projectsInteractions.id,
      author: sql<{ id: string; name: string | null; email: string }>`
        json_build_object(
          'id', ${users.id},
          'name', ${users.name},
          'email', ${users.email}
        )
      `.as('author'),
      type: projectsInteractions.type,
      permissions: projectsPermissions,
    })
    .from(projectsInteractions)
    .leftJoin(projects, eq(projectsInteractions.projectId, projects.id))
    .leftJoin(projectsPermissions, eq(projects.id, projectsPermissions.projectId))
    .leftJoin(users, eq(projectsInteractions.userId, users.id))
    .where(inArray(projectsInteractions.userId, followsIds))
    .groupBy(
      projectsInteractions.id,
      projectsInteractions.type,
      projectsInteractions.createdAt,
      projectsInteractions.userId,
      projectsInteractions.projectId,
      projects.name,
      projects.description,
      projectsPermissions.id,
      users.id
    )
    .orderBy(sql`${projectsInteractions.createdAt} DESC`)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return interactions.filter((interaction) => {
    if (!interaction.permissions?.private) return true;
    return session?.user.id && interaction.permissions?.allowedUsers.includes(session.user.id);
  });
}

async function getUserPosts({
  followsIds,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  page?: number;
  pageSize?: number;
}): Promise<TimelinePost[]> {
  return db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      authorId: posts.authorId,
      branchId: posts.branchId,
      branchName: branches.name,
      projectId: branches.projectId,
      projectName: projects.name,
      projectPicture: projects.picture,
      media: sql<Array<{ id: string; name: string; url: string }>>`
        COALESCE(
          json_agg(
            json_build_object(
              'id', ${postsMedia.id},
              'name', ${postsMedia.name},
              'url', ${postsMedia.url}
            )
          ) FILTER (WHERE ${postsMedia.id} IS NOT NULL),
          '[]'::json
        )
      `.as('media'),
      branch: branches,
      project: projects,
    })
    .from(posts)
    .leftJoin(postsMedia, eq(posts.id, postsMedia.postId))
    .leftJoin(branches, eq(posts.branchId, branches.id))
    .leftJoin(projects, eq(branches.projectId, projects.id))
    .where(inArray(posts.authorId, followsIds))
    .groupBy(posts.id, projects.id, branches.id, posts.authorId, projects.description)
    .orderBy(sql`${posts.updatedAt} DESC`)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

async function getUserBranches({
  followsIds,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  page?: number;
  pageSize?: number;
}): Promise<TimelineBranch[]> {
  return db
    .select({
      id: branches.id,
      name: branches.name,
      description: branches.description,
      createdAt: branches.createdAt,
      updatedAt: branches.updatedAt,
      authorId: branches.authorId,
      projectId: branches.projectId,
      projectName: projects.name,
      projectPicture: projects.picture,
    })
    .from(branches)
    .where(inArray(branches.authorId, followsIds))
    .leftJoin(projects, eq(branches.projectId, projects.id))
    .groupBy(branches.id, branches.authorId, projects.name, projects.picture)
    .orderBy(sql`${branches.updatedAt} DESC`)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

async function getUserProjects({
  followsIds,
  page = 1,
  pageSize = 10,
}: {
  followsIds: string[];
  page?: number;
  pageSize?: number;
}): Promise<TimelineProject[]> {
  return db
    .select()
    .from(projects)
    .where(inArray(projects.authorId, followsIds))
    .groupBy(projects.id, projects.name, projects.authorId)
    .orderBy(sql`${projects.updatedAt} DESC`)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getForYouTimeline({ page = 1, pageSize = 10 }: { page?: number; pageSize?: number }) {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  const follows = await getUserFollows(session.user.id);
  const followsIds = follows.map((follow) => follow.followedId);

  const [userPostInteractions, userBranchInteractions, userProjectInteractions, userPosts, userBranches, userProjects] =
    await Promise.all([
      getPostInteractions({ followsIds, session, page, pageSize }),
      getBranchInteractions({ followsIds, session, page, pageSize }),
      getProjectInteractions({ followsIds, session, page, pageSize }),
      getUserPosts({ followsIds, page, pageSize }),
      getUserBranches({ followsIds, page, pageSize }),
      getUserProjects({ followsIds, page, pageSize }),
    ]);

  const postInteractions = userPostInteractions.map((post) => ({ ...post, type: 'post-interaction' }));
  const branchInteractions = userBranchInteractions.map((branch) => ({ ...branch, type: 'branch-interaction' }));
  const projectInteractions = userProjectInteractions.map((project) => ({ ...project, type: 'project-interaction' }));

  return {
    postInteractions: postInteractions
      .map((interaction) => ({
        content: interaction,
        type: 'postInteraction',
        timestamp: interaction.updatedAt,
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    branchInteractions: branchInteractions
      .map((interaction) => ({
        content: interaction,
        type: 'branchInteraction' as const,
        timestamp: interaction.updatedAt,
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    projectInteractions: projectInteractions
      .map((interaction) => ({
        content: interaction,
        type: 'projectInteraction' as const,
        timestamp: interaction.updatedAt,
      }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    posts: userPosts
      .map((post) => ({ content: post, type: 'post' as const, timestamp: post.createdAt }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    branches: userBranches
      .map((branch) => ({ content: branch, type: 'branch' as const, timestamp: branch.createdAt }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    projects: userProjects
      .map((project) => ({ content: project, type: 'project' as const, timestamp: project.createdAt }))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
  };
}
