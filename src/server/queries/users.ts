import 'server-only';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import { branches, follows, posts, projects, users } from '../db/schema';

export async function getUserProfile(userId: string) {
  const data = await db
    .select({
      user: users,
      projects: sql<Array<{ id: string; name: string }>>`
      json_agg(
        DISTINCT jsonb_build_object(
          'id', ${projects.id},
          'name', ${projects.name}
        )
      )
    `.as('projects'),
      branches: sql<Array<{ id: string; name: string }>>`
      json_agg(
        DISTINCT jsonb_build_object(
          'id', ${branches.id},
          'name', ${branches.name}
        )
      )
      `.as('branches'),
      posts: sql<Array<{ id: string; name: string }>>`
      json_agg(
        DISTINCT jsonb_build_object(
          'id', ${posts.id},
          'title', ${posts.title}
        )
      )
      `.as('posts'),
    })
    .from(users)
    .where(eq(users.id, userId))
    .leftJoin(projects, eq(projects.authorId, userId))
    .leftJoin(branches, eq(branches.authorId, userId))
    .leftJoin(posts, eq(posts.authorId, userId))
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
    projects: data[0].projects,
    branches: data[0].branches,
    posts: data[0].posts,
    followers: followersData.map((user) => ({
      ...user,
      name: user.name ?? user.email?.split('@')[0],
    })),
  };
}
