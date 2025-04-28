import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import { postsInteractions, postsMedia, posts as postsSchema, users as usersSchema } from '../db/schema';

export async function getPost(postId: string) {
  // Ensure post exists
  const post = await db.query.posts.findFirst({
    where: eq(postsSchema.id, postId),
    with: {
      author: true,
      media: true,
    },
  });
  if (!post) throw new Error('Post with the given ID does not exist');

  // Ensure user has access to post
  const session = await auth();
  if (post.authorId !== session?.user.id) throw new Error('Unauthorized');

  return post;
}

export async function getPosts(branchId: string) {
  // Ensure branch exists, and user has access to it
  const session = await auth();
  const branchPermissions = await db.query.branchesPermissions.findFirst({
    where: (permissions, { eq }) => eq(permissions.branchId, branchId),
  });
  if (!branchPermissions) throw new Error('Branch with the given ID does not exist');
  if (branchPermissions.private && (!session?.user.id || !branchPermissions.allowedUsers.includes(session?.user.id)))
    throw new Error('Unauthorized');

  // If all checks pass, return posts in branch
  const posts = await db
    .select({
      data: postsSchema,
      author: sql<{ id: string; name: string | null; email: string }>`
      json_build_object(
        'id', ${usersSchema.id},
        'name', ${usersSchema.name},
        'email', ${usersSchema.email}
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
    })
    .from(postsSchema)
    .where(eq(postsSchema.branchId, branchId))
    .leftJoin(postsMedia, eq(postsSchema.id, postsMedia.postId))
    .leftJoin(usersSchema, eq(usersSchema.id, postsSchema.authorId))
    .groupBy(postsSchema.id, usersSchema.name, usersSchema.email);

  return posts;
}

export async function getPostInteractions(postId: string) {
  const interactions = await db
    .select({
      interaction: postsInteractions,
      user: sql<{ id: string; name: string | null; email: string }>`
      json_build_object(
        'id', ${usersSchema.id},
        'name', ${usersSchema.name},
        'email', ${usersSchema.email}
      )
    `.as('user'),
    })
    .from(postsInteractions)
    .where(eq(postsInteractions.postId, postId))
    .leftJoin(usersSchema, eq(usersSchema.id, postsInteractions.userId));

  if (!interactions.length) {
    throw new Error('Post with the given ID does not exist');
  }

  const likes = interactions.filter((data) => data.interaction.type === 'LIKE');
  const shares = interactions.filter((data) => data.interaction.type === 'SHARE');
  const bookmarks = interactions.filter((data) => data.interaction.type === 'BOOKMARK');

  const reports = interactions.filter((data) => data.interaction.type === 'REPORT');
  const hides = interactions.filter((data) => data.interaction.type === 'HIDE');

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
