import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import { postsMedia, posts as postsSchema, users as usersSchema } from '../db/schema';

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
      author: {
        name: usersSchema.name,
        email: usersSchema.email,
      },
      media: sql<Array<{ id: string; name: string; url: string }>>`
      json_agg(
        json_build_object(
          'id', ${postsMedia.id},
          'name', ${postsMedia.name},
          'url', ${postsMedia.url}
        )
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
