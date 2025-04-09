import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import {
  branches as branchesSchema,
  branchesPermissions,
  users as userSchema,
  branchesInteractions,
} from '../db/schema';

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

export async function getBranchInteractions(branchId: string) {
  const interactions = await db
    .select({
      interaction: branchesInteractions,
      user: sql<{ name: string | null; email: string }>`
      json_build_object(
        'name', ${userSchema.name},
        'email', ${userSchema.email}
      )
    `.as('user'),
    })
    .from(branchesInteractions)
    .where(eq(branchesInteractions.branchId, branchId))
    .leftJoin(userSchema, eq(userSchema.id, branchesInteractions.userId));

  if (!interactions.length) {
    throw new Error('Branch with the given ID does not exist');
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
