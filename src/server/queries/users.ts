import 'server-only';
import { db } from '../db';
import { and, eq, sql } from 'drizzle-orm';
import {
  branchesInteractions,
  branchesPermissions,
  branches as branchesSchema,
  follows,
  postsInteractions,
  postsMedia,
  posts as postsSchema,
  projectsInteractions,
  projectsPermissions,
  projects as projectsSchema,
  users,
} from '../db/schema';
import { auth } from '../auth';

export async function getUserProfile(userId: string) {
  const userData = await db.select({ user: users }).from(users).where(eq(users.id, userId)).groupBy(users.id);

  if (!userData[0]) {
    throw new Error('User with the given ID does not exist');
  }

  return userData[0].user;
}

export async function getUserFollowers(userId: string) {
  const followersData = await db
    .select({
      followerId: follows.followerId,
      followedId: follows.followedId,
      email: users.email,
      name: users.name,
      avatar: users.image,
    })
    .from(follows)
    .leftJoin(users, eq(follows.followerId, users.id))
    .where(eq(follows.followedId, userId))
    .groupBy(follows.id, users.id);

  if (!followersData.length) {
    throw new Error('Could not find followers for the given user');
  }

  return followersData.map((user) => ({
    ...user,
    name: user.name ?? user.email?.split('@')[0],
  }));
}

export async function getUserFollows(userId: string) {
  const followsData = await db
    .select({
      followerId: follows.followerId,
      followedId: follows.followedId,
      email: users.email,
      name: users.name,
      avatar: users.image,
    })
    .from(follows)
    .leftJoin(users, eq(follows.followedId, users.id))
    .where(eq(follows.followerId, userId))
    .groupBy(follows.id, users.id);

  if (!followsData.length) {
    throw new Error('Could not find follows for the given user');
  }

  return followsData.map((user) => ({
    ...user,
    name: user.name ?? user.email?.split('@')[0],
  }));
}

export async function getUserContributions(userId: string) {
  const [projects, branches, posts] = await Promise.all([
    db
      .select()
      .from(projectsSchema)
      .where(eq(projectsSchema.authorId, userId))
      .orderBy(sql`${projectsSchema.createdAt} DESC`),
    db
      .select({ branch: branchesSchema, project: projectsSchema })
      .from(branchesSchema)
      .where(eq(branchesSchema.authorId, userId))
      .leftJoin(projectsSchema, eq(branchesSchema.projectId, projectsSchema.id))
      .orderBy(sql`${branchesSchema.createdAt} DESC`),
    db
      .select({
        post: postsSchema,
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
        branch: branchesSchema,
        project: projectsSchema,
      })
      .from(postsSchema)
      .where(eq(postsSchema.authorId, userId))
      .leftJoin(postsMedia, eq(postsSchema.id, postsMedia.postId))
      .leftJoin(branchesSchema, eq(postsSchema.branchId, branchesSchema.id))
      .leftJoin(projectsSchema, eq(branchesSchema.projectId, projectsSchema.id))
      .groupBy(postsSchema.id, branchesSchema.id, projectsSchema.id),
  ]);

  return {
    projects: projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      picture: project.picture,
      updatedAt: project.updatedAt ?? project.createdAt,
    })),
    branches: branches.map((data) => ({
      id: data.branch.id,
      name: data.branch.name,
      description: data.branch.description,
      updatedAt: data.branch.updatedAt ?? data.branch.createdAt,
      projectId: data.branch.projectId,
      projectName: data.project?.name,
      projectPicture: data.project?.picture,
    })),
    posts: posts.map((data) => ({
      id: data.post.id,
      title: data.post.title,
      content: data.post.content,
      updatedAt: data.post.updatedAt ?? data.post.createdAt,
      media: data.media,
      branchName: data.branch?.name,
      branchId: data.branch?.id,
      projectName: data.project?.name,
      projectId: data.project?.id,
    })),
  };
}

export async function getUserInteractions(userId: string) {
  const [branchInteractions, postInteractions, projectInteractions] = await Promise.all([
    db
      .select()
      .from(branchesInteractions)
      .where(eq(branchesInteractions.userId, userId))
      .leftJoin(branchesSchema, eq(branchesInteractions.branchId, branchesSchema.id))
      .leftJoin(users, eq(branchesSchema.authorId, users.id)),
    db
      .select()
      .from(postsInteractions)
      .where(eq(postsInteractions.userId, userId))
      .leftJoin(postsSchema, eq(postsInteractions.postId, postsSchema.id))
      .leftJoin(postsMedia, eq(postsSchema.id, postsMedia.postId))
      .leftJoin(users, eq(postsSchema.authorId, users.id)),
    db
      .select()
      .from(projectsInteractions)
      .where(eq(projectsInteractions.userId, userId))
      .leftJoin(projectsSchema, eq(projectsInteractions.projectId, projectsSchema.id))
      .leftJoin(users, eq(projectsSchema.authorId, users.id)),
  ]);

  return {
    postInteractions: postInteractions.map((interaction) => ({
      id: interaction.post_interaction.id,
      postId: interaction.post_interaction.postId,
      userId: interaction.post_interaction.userId,
      interactionType: interaction.post_interaction.type,
      updatedAt: interaction.post_interaction.createdAt,
      title: interaction.post?.title,
      content: interaction.post?.content,
      author: {
        id: interaction.user?.id,
        name: interaction.user?.name,
        email: interaction.user?.email,
      },
      media: interaction.post_media,
      type: 'post-interaction',
    })),
    branchInteractions: branchInteractions.map((interaction) => ({
      id: interaction.branch_interaction.id,
      branchId: interaction.branch_interaction.branchId,
      userId: interaction.branch_interaction.userId,
      interactionType: interaction.branch_interaction.type,
      updatedAt: interaction.branch_interaction.createdAt,
      name: interaction.branch?.name,
      description: interaction.branch?.description,
      author: {
        id: interaction.user?.id,
        name: interaction.user?.name,
        email: interaction.user?.email,
      },
      type: 'branch-interaction',
    })),
    projectInteractions: projectInteractions.map((interaction) => ({
      id: interaction.project_interaction.id,
      projectId: interaction.project_interaction.projectId,
      userId: interaction.project_interaction.userId,
      interactionType: interaction.project_interaction.type,
      updatedAt: interaction.project_interaction.createdAt,
      name: interaction.project?.name,
      description: interaction.project?.description,
      author: {
        id: interaction.user?.id,
        name: interaction.user?.name,
        email: interaction.user?.email,
      },
      type: 'project-interaction',
    })),
  };
}

export async function getUserSidebar(userId: string) {
  const session = await auth();

  const contributions = await getUserContributions(userId);
  const [postBookmarks, branchBookmarks, projectBookmarks] = await Promise.all([
    db
      .select({
        createdAt: postsInteractions.createdAt,
        postId: postsSchema.id,
        branchId: branchesSchema.id,
        projectId: projectsSchema.id,
        postTitle: postsSchema.title,
        branchName: branchesSchema.name,
        projectName: projectsSchema.name,
        permissions: branchesPermissions,
      })
      .from(postsInteractions)
      .leftJoin(postsSchema, eq(postsInteractions.postId, postsSchema.id))
      .leftJoin(branchesSchema, eq(postsSchema.branchId, branchesSchema.id))
      .leftJoin(projectsSchema, eq(branchesSchema.projectId, projectsSchema.id))
      .leftJoin(branchesPermissions, eq(branchesSchema.id, branchesPermissions.branchId))
      .where(and(eq(postsInteractions.type, 'BOOKMARK'), eq(postsInteractions.userId, userId))),
    db
      .select({
        createdAt: branchesInteractions.createdAt,
        projectId: projectsSchema.id,
        branchId: branchesSchema.id,
        branchName: branchesSchema.name,
        projectName: projectsSchema.name,
        permissions: branchesPermissions,
      })
      .from(branchesInteractions)
      .leftJoin(branchesSchema, eq(branchesInteractions.branchId, branchesSchema.id))
      .leftJoin(projectsSchema, eq(branchesSchema.projectId, projectsSchema.id))
      .leftJoin(branchesPermissions, eq(branchesSchema.id, branchesPermissions.branchId))
      .where(and(eq(branchesInteractions.type, 'BOOKMARK'), eq(branchesInteractions.userId, userId))),
    db
      .select({
        createdAt: projectsInteractions.createdAt,
        projectId: projectsSchema.id,
        projectName: projectsSchema.name,
        permissions: projectsPermissions,
      })
      .from(projectsInteractions)
      .leftJoin(projectsSchema, eq(projectsInteractions.projectId, projectsSchema.id))
      .leftJoin(projectsPermissions, eq(projectsSchema.id, projectsPermissions.projectId))
      .where(and(eq(projectsInteractions.type, 'BOOKMARK'), eq(projectsInteractions.userId, userId))),
  ]);

  const bookmarks = [
    ...postBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      postId: bookmark.postId,
      branchId: bookmark.branchId,
      projectId: bookmark.projectId,
      postTitle: bookmark.postTitle,
      branchName: bookmark.branchName,
      projectName: bookmark.projectName,
      permissions: bookmark.permissions,
    })),
    ...branchBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      projectId: bookmark.projectId,
      branchId: bookmark.branchId,
      branchName: bookmark.branchName,
      projectName: bookmark.projectName,
      permissions: bookmark.permissions,
    })),
    ...projectBookmarks.map((bookmark) => ({
      createdAt: bookmark.createdAt,
      projectId: bookmark.projectId,
      projectName: bookmark.projectName,
      permissions: bookmark.permissions,
    })),
  ];

  bookmarks
    .filter((bookmark) => {
      if (!bookmark.permissions?.private) return true;
      return session?.user.id && bookmark.permissions?.allowedUsers.includes(session.user.id);
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    contributions: {
      projects: contributions.projects,
      branches: contributions.branches,
    },
    bookmarks,
  };
}
