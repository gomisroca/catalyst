import 'server-only';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import { branches, follows, posts, projects, users } from '../db/schema';

export async function getUserProfile(userId: string) {
  const data = await db
    .select({
      user: users,
      followers: sql<Array<{ id: string; followerId: string; followedId: string }>>`
      json_agg(
        json_build_object(
          'id', ${follows.id},
          'followerId', ${follows.followerId},
          'followedId', ${follows.followedId}
        )
      )
    `.as('followers'),
      projects: sql<Array<{ id: string; name: string }>>`
      json_agg(
        json_build_object(
          'id', ${projects.id},
          'name', ${projects.name}
        )
      )
    `.as('projects'),
      branches: sql<Array<{ id: string; name: string }>>`
      json_agg(
        json_build_object(
          'id', ${branches.id},
          'name', ${branches.name}
        )
      )
      `.as('branches'),
      posts: sql<Array<{ id: string; name: string }>>`
      json_agg(
        json_build_object(
          'id', ${posts.id},
          'title', ${posts.title}
        )
      )
      `.as('posts'),
    })
    .from(users)
    .where(eq(users.id, userId))
    .leftJoin(follows, eq(follows.followedId, userId))
    .leftJoin(projects, eq(projects.authorId, userId))
    .leftJoin(branches, eq(branches.authorId, userId))
    .leftJoin(posts, eq(posts.authorId, userId))
    .groupBy(users.id);

  if (!data[0]) throw new Error('User with the given ID does not exist');

  return {
    ...data[0].user,
    followers: data[0].followers.filter((follower) => follower.id),
    projects: data[0].projects,
    branches: data[0].branches,
    posts: data[0].posts,
  };
}
