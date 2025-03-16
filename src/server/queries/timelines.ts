import { eq, sql } from 'drizzle-orm';
import { db } from '../db';
import { projects, projectsInteractions } from '../db/schema';
import { auth } from '../auth';

export async function getTrendingTimeline() {
  const sortedProjects = await db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      picture: projects.picture,
      createdAt: projects.createdAt,
      updatedAt: projects.updatedAt,
      authorId: projects.authorId,
      interactionCount: sql`COUNT(${projectsInteractions.id})`,
    })
    .from(projects)
    .leftJoin(projectsInteractions, eq(projects.id, projectsInteractions.projectId))
    .groupBy(projects.id)
    .orderBy(sql`COUNT(${projectsInteractions.id}) DESC`, sql`${projects.createdAt} DESC`);

  return sortedProjects.map((project) => ({
    id: project.id,
    name: project.name,
    description: project.description ?? '',
    picture: project.picture,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt ?? project.createdAt,
    authorId: project.authorId,
    interactionCount: project.interactionCount,
  }));
}

export async function getForYouTimeline() {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  return [];
}
