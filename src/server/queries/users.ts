import 'server-only';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import {
  branches as branchesSchema,
  follows,
  postsMedia,
  posts as postsSchema,
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
      })
      .from(postsSchema)
      .where(eq(postsSchema.authorId, userId))
      .leftJoin(postsMedia, eq(postsSchema.id, postsMedia.postId))
      .groupBy(postsSchema.id),
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
    })),
  };
}
