import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { branches, projectsPermissions, projects as projectsSchema } from '../db/schema';

export async function getProject(id: string) {
  const session = await auth();

  const project = await db
    .select({
      project: projectsSchema,
      permissions: projectsPermissions,
      branches: {
        id: branches.id,
        name: branches.name,
      },
    })
    .from(projectsSchema)
    .where(eq(projectsSchema.id, id))
    .leftJoin(projectsPermissions, eq(projectsSchema.id, projectsPermissions.projectId))
    .leftJoin(branches, eq(branches.projectId, id));

  if (!project[0]) throw new Error('Project with the given ID does not exist');
  if (
    project[0].permissions?.private &&
    (!session?.user.id || !project[0].permissions.allowedUsers.includes(session?.user.id))
  ) {
    throw new Error('Unauthorized');
  }

  return {
    ...project[0].project,
    branches: [project[0].branches],
  };
}

export async function getProjects() {
  const session = await auth();

  // Start with getting all projects
  const projects = await db
    .select({
      project: projectsSchema,
      permissions: projectsPermissions,
    })
    .from(projectsSchema)
    .leftJoin(projectsPermissions, eq(projectsSchema.id, projectsPermissions.projectId));

  // Filter projects based on permissions
  const filteredProjects = projects.filter(({ permissions }) => {
    // If project is not private, allow access
    if (!permissions?.private) return true;

    // If project is private, check if user is logged in and has permission
    if (session?.user.id && permissions?.allowedUsers.includes(session.user.id)) {
      return true;
    }

    return false;
  });

  // Return only the project data, not the permissions
  return filteredProjects.map(({ project }) => project);
}
