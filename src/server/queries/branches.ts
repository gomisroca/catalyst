import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { branches as branchesSchema, branchesPermissions } from '../db/schema';

export async function getBranch(id: string) {
  const session = await auth();

  const branch = await db
    .select({
      branch: branchesSchema,
      permissions: branchesPermissions,
    })
    .from(branchesSchema)
    .where(eq(branchesSchema.id, id))
    .leftJoin(branchesPermissions, eq(branchesSchema.id, branchesPermissions.branchId));

  if (!branch[0]) throw new Error('Branch with the given ID does not exist');
  if (
    branch[0].permissions?.private &&
    (!session?.user.id || !branch[0].permissions.allowedUsers.includes(session?.user.id))
  )
    throw new Error('Unauthorized');

  return {
    ...branch[0].branch,
    permissions: branch[0].permissions,
  };
}
