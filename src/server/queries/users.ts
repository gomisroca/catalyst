import 'server-only';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import {
  branchesInteractions,
  branches as branchesSchema,
  follows,
  postsInteractions,
  postsMedia,
  posts as postsSchema,
  projectsInteractions,
  projects as projectsSchema,
  users,
} from '../db/schema';

export async function getUserProfile(userId: string) {
  const data = await db
    .select({
      user: users,
    })
    .from(users)
    .where(eq(users.id, userId))
    .groupBy(users.id);

  if (!data[0]) throw new Error('User with the given ID does not exist');

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

  if (!followersData) throw new Error('Could not find followers for the given user');

  return {
    ...data[0].user,
    followers: followersData.map((user) => ({
      ...user,
      name: user.name ?? user.email?.split('@')[0],
    })),
  };
}

export async function getUserContributions(userId: string) {
  const [projects, branches, posts] = await Promise.all([
    await db
      .select()
      .from(projectsSchema)
      .where(eq(projectsSchema.authorId, userId))
      .orderBy(sql`${projectsSchema.createdAt} DESC`),
    await db
      .select({
        branch: branchesSchema,
        project: projectsSchema,
      })
      .from(branchesSchema)
      .where(eq(branchesSchema.authorId, userId))
      .leftJoin(projectsSchema, eq(branchesSchema.projectId, projectsSchema.id))
      .orderBy(sql`${branchesSchema.createdAt} DESC`),
    await db
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
  const branchInteractions = await db
    .select()
    .from(branchesInteractions)
    .where(eq(branchesInteractions.userId, userId))
    .leftJoin(branchesSchema, eq(branchesInteractions.branchId, branchesSchema.id))
    .leftJoin(users, eq(branchesSchema.authorId, users.id));

  const postInteractions = await db
    .select()
    .from(postsInteractions)
    .where(eq(postsInteractions.userId, userId))
    .leftJoin(postsSchema, eq(postsInteractions.postId, postsSchema.id))
    .leftJoin(postsMedia, eq(postsSchema.id, postsMedia.postId))
    .leftJoin(users, eq(postsSchema.authorId, users.id));

  console.log(postInteractions);

  const projectInteractions = await db
    .select()
    .from(projectsInteractions)
    .where(eq(projectsInteractions.userId, userId))
    .leftJoin(projectsSchema, eq(projectsInteractions.projectId, projectsSchema.id))
    .leftJoin(users, eq(projectsSchema.authorId, users.id));

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
