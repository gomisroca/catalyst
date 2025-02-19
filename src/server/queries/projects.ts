import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { projects } from '../db/schema';

export async function getProject(id: string) {
  // Ensure branch exists, and user has access to it
  const session = await auth();
  const projectPermissions = await db.query.projectsPermissions.findFirst({
    where: (permissions, { eq }) => eq(permissions.projectId, id),
  });
  if (!projectPermissions) throw new Error('Project with the given ID does not exist');
  if (projectPermissions.private && (!session?.user.id || !projectPermissions.allowedUsers.includes(session?.user.id)))
    throw new Error('Unauthorized');

  // If all checks pass, return project
  const project = await db.select().from(projects).where(eq(projects.id, id));

  return project[0];
}
