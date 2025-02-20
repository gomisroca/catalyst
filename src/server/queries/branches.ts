import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { branches as branchesSchema, branchesPermissions, posts } from '../db/schema';

export async function getBranch(id: string) {
  const session = await auth();

  const branch = await db
    .select({
      branch: branchesSchema,
      permissions: branchesPermissions,
      posts: posts,
    })
    .from(branchesSchema)
    .where(eq(branchesSchema.id, id))
    .leftJoin(branchesPermissions, eq(branchesSchema.id, branchesPermissions.branchId))
    .leftJoin(posts, eq(posts.branchId, id));

  if (!branch[0]) throw new Error('Branch with the given ID does not exist');
  if (
    branch[0].permissions?.private &&
    (!session?.user.id || !branch[0].permissions.allowedUsers.includes(session?.user.id))
  )
    throw new Error('Unauthorized');

  return {
    ...branch[0].branch,
    posts: [branch[0].posts],
  };
}
