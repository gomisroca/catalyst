import { eq, inArray, sql } from 'drizzle-orm';
import { db } from '../db';
import { branches, branchesInteractions, posts, postsInteractions, projects, projectsInteractions } from '../db/schema';
import { auth } from '../auth';
import { getUserFollows } from './users';

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

  const follows = await getUserFollows(session.user.id);
  const followsIds = follows.map((follow) => follow.followedId);

  const [userPostInteractions, userBranchInteractions, userProjectInteractions] = await Promise.all([
    await db
      .select()
      .from(postsInteractions)
      .where(inArray(postsInteractions.userId, followsIds))
      .orderBy(sql`${postsInteractions.createdAt} DESC`),
    await db
      .select()
      .from(branchesInteractions)
      .where(inArray(branchesInteractions.userId, followsIds))
      .orderBy(sql`${branchesInteractions.createdAt} DESC`),
    await db
      .select()
      .from(projectsInteractions)
      .where(inArray(projectsInteractions.userId, followsIds))
      .orderBy(sql`${projectsInteractions.createdAt} DESC`),
  ]);

  const [userPosts, userBranches, userProjects] = await Promise.all([
    await db
      .select()
      .from(posts)
      .where(inArray(posts.authorId, followsIds))
      .orderBy(sql`${posts.updatedAt} DESC`),
    await db
      .select()
      .from(branches)
      .where(inArray(branches.authorId, followsIds))
      .orderBy(sql`${branches.updatedAt} DESC`),
    await db
      .select()
      .from(projects)
      .where(inArray(projects.authorId, followsIds))
      .orderBy(sql`${projects.updatedAt} DESC`),
  ]);

  return [
    ...userPostInteractions.map((interaction) => ({
      ...interaction,
      type: 'postInteraction',
      timestamp: interaction.createdAt,
    })),
    ...userBranchInteractions.map((interaction) => ({
      ...interaction,
      type: 'branchInteraction',
      timestamp: interaction.createdAt,
    })),
    ...userProjectInteractions.map((interaction) => ({
      ...interaction,
      type: 'projectInteraction',
      timestamp: interaction.createdAt,
    })),
    ...userPosts.map((post) => ({ ...post, type: 'post', timestamp: post.createdAt })),
    ...userBranches.map((branch) => ({ ...branch, type: 'branch', timestamp: branch.createdAt })),
    ...userProjects.map((project) => ({ ...project, type: 'project', timestamp: project.createdAt })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
