import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import { branches as branchesSchema, branchesPermissions, users as userSchema } from '../db/schema';

export async function getBranch(id: string) {
  const session = await auth();

  const branch = await db
    .select({
      branch: branchesSchema,
      author: sql<{ name: string | null; email: string }>`
      json_build_object(
        'name', ${userSchema.name},
        'email', ${userSchema.email}
      )
    `.as('author'),
      permissions: branchesPermissions,
    })
    .from(branchesSchema)
    .where(eq(branchesSchema.id, id))
    .leftJoin(userSchema, eq(userSchema.id, branchesSchema.authorId))
    .leftJoin(branchesPermissions, eq(branchesSchema.id, branchesPermissions.branchId));

  if (!branch[0]) throw new Error('Branch with the given ID does not exist');
  if (
    branch[0].permissions?.private &&
    (!session?.user.id || !branch[0].permissions.allowedUsers.includes(session?.user.id))
  )
    throw new Error('Unauthorized');

  return {
    ...branch[0].branch,
    author: branch[0].author?.name ? branch[0].author?.name : branch[0].author?.email.split('@')[0],
    permissions: branch[0].permissions,
  };
}
