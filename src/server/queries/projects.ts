import 'server-only';
import { auth } from '@/server/auth';
import { db } from '../db';
import { eq, sql } from 'drizzle-orm';
import {
  branches as branchesSchema,
  projectsInteractions,
  projectsPermissions,
  projects as projectsSchema,
  users as userSchema,
} from '../db/schema';

export async function getProject(id: string) {
  const session = await auth();

  const project = await db
    .select({
      project: projectsSchema,
      author: sql<{ id: string; name: string | null; email: string }>`
      json_build_object(
        'id', ${userSchema.id},
        'name', ${userSchema.name},
        'email', ${userSchema.email}
      )
    `.as('author'),
      permissions: projectsPermissions,
      branches: sql<Array<{ id: string; name: string }>>`
      json_agg(
        json_build_object(
          'id', ${branchesSchema.id},
          'name', ${branchesSchema.name}
        )
      )
    `.as('branches'),
    })
    .from(projectsSchema)
    .where(eq(projectsSchema.id, id))
    .leftJoin(userSchema, eq(userSchema.id, projectsSchema.authorId))
    .leftJoin(projectsPermissions, eq(projectsSchema.id, projectsPermissions.projectId))
    .leftJoin(branchesSchema, eq(branchesSchema.projectId, id))
    .groupBy(projectsSchema.id, userSchema.id, userSchema.email, projectsPermissions.id);

  if (!project[0]) throw new Error('Project with the given ID does not exist');
  if (
    project[0].permissions?.private &&
    (!session?.user.id || !project[0].permissions.allowedUsers.includes(session?.user.id))
  ) {
    throw new Error('Unauthorized');
  }

  return {
    ...project[0].project,
    author: {
      id: project[0].author?.id,
      name: project[0].author?.name ? project[0].author?.name : project[0].author?.email.split('@')[0],
    },
    branches: project[0].branches,
    permissions: project[0].permissions,
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

export async function getProjectInteractions(projectId: string) {
  const interactions = await db
    .select({
      interaction: projectsInteractions,
      user: sql<{ name: string | null; email: string }>`
      json_build_object(
        'name', ${userSchema.name},
        'email', ${userSchema.email}
      )
    `.as('user'),
    })
    .from(projectsInteractions)
    .where(eq(projectsInteractions.projectId, projectId))
    .leftJoin(userSchema, eq(userSchema.id, projectsInteractions.userId));
  if (!interactions) throw new Error('Project with the given ID does not exist');

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
