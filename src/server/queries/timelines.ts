import { eq, inArray, sql } from 'drizzle-orm';
import { db } from '../db';
import {
  branches,
  branchesInteractions,
  posts,
  postsInteractions,
  postsMedia,
  projects,
  projectsInteractions,
  users,
} from '../db/schema';
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

  const sortedBranches = await db
    .select({
      id: branches.id,
      name: branches.name,
      description: branches.description,
      createdAt: branches.createdAt,
      updatedAt: branches.updatedAt,
      authorId: branches.authorId,
      projectId: branches.projectId,
      projectName: projects.name,
      projectPicture: projects.picture,
      interactionCount: sql`COUNT(${branchesInteractions.id})`,
    })
    .from(branches)
    .leftJoin(branchesInteractions, eq(branches.id, branchesInteractions.branchId))
    .leftJoin(projects, eq(branches.projectId, projects.id))
    .groupBy(branches.id, projects.name, projects.picture)
    .orderBy(sql`COUNT(${branchesInteractions.id}) DESC`, sql`${branches.createdAt} DESC`);

  return [
    ...sortedBranches.map((branch) => ({ content: branch, type: 'branch', timestamp: branch.createdAt })),
    ...sortedProjects.map((project) => ({ content: project, type: 'project', timestamp: project.createdAt })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function getForYouTimeline() {
  const session = await auth();
  if (!session) throw new Error('Not authenticated');

  const follows = await getUserFollows(session.user.id);
  const followsIds = follows.map((follow) => follow.followedId);

  const [userPostInteractions, userBranchInteractions, userProjectInteractions, userPosts, userBranches, userProjects] =
    await Promise.all([
      await db
        .select({
          interactionType: postsInteractions.type,
          updatedAt: postsInteractions.createdAt,
          userId: postsInteractions.userId,
          postId: postsInteractions.postId,
          title: posts.title,
          content: posts.content,
          id: postsInteractions.id,
          author: sql<{ name: string | null; email: string }>`
        json_build_object(
          'name', ${users.name},
          'email', ${users.email}
        )
      `.as('author'),
          media: sql<Array<{ id: string; name: string; url: string }>>`
        COALESCE(
          json_agg(
            json_build_object(
              'id', ${postsMedia.id},
              'name', ${postsMedia.name},
              'url', ${postsMedia.url}
            )
          ) FILTER (WHERE ${postsMedia.id} IS NOT NULL),
          '[]'::json
        )
      `.as('media'),
        })
        .from(postsInteractions)
        .leftJoin(posts, eq(postsInteractions.postId, posts.id))
        .leftJoin(postsMedia, eq(posts.id, postsMedia.postId))
        .leftJoin(users, eq(postsInteractions.userId, users.id))
        .where(inArray(postsInteractions.userId, followsIds))
        .orderBy(sql`${postsInteractions.createdAt} DESC`),
      await db
        .select({
          interactionType: branchesInteractions.type,
          updatedAt: branchesInteractions.createdAt,
          userId: branchesInteractions.userId,
          branchId: branchesInteractions.branchId,
          name: branches.name,
          description: branches.description,
          id: branchesInteractions.id,
          author: sql<{ name: string | null; email: string }>`
          json_build_object(
            'name', ${users.name},
            'email', ${users.email}
          )
        `.as('author'),
        })
        .from(branchesInteractions)
        .leftJoin(branches, eq(branchesInteractions.branchId, branches.id))
        .leftJoin(users, eq(branchesInteractions.userId, users.id))
        .where(inArray(branchesInteractions.userId, followsIds))
        .orderBy(sql`${branchesInteractions.createdAt} DESC`),
      await db
        .select({
          interactionType: projectsInteractions.type,
          updatedAt: projectsInteractions.createdAt,
          userId: projectsInteractions.userId,
          projectId: projectsInteractions.projectId,
          name: projects.name,
          description: projects.description,
          id: projectsInteractions.id,
          author: sql<{ name: string | null; email: string }>`
          json_build_object(
            'name', ${users.name},
            'email', ${users.email}
          )
        `.as('author'),
        })
        .from(projectsInteractions)
        .leftJoin(projects, eq(projectsInteractions.projectId, projects.id))
        .leftJoin(users, eq(projectsInteractions.userId, users.id))
        .where(inArray(projectsInteractions.userId, followsIds))
        .orderBy(sql`${projectsInteractions.createdAt} DESC`),
      await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          authorId: posts.authorId,
          branchId: posts.branchId,
          branchName: branches.name,
          projectId: branches.projectId,
          projectName: projects.name,
          projectPicture: projects.picture,
          media: sql<Array<{ id: string; name: string; url: string }>>`
            COALESCE(
              json_agg(
                json_build_object(
                  'id', ${postsMedia.id},
                  'name', ${postsMedia.name},
                  'url', ${postsMedia.url}
                )
              ) FILTER (WHERE ${postsMedia.id} IS NOT NULL),
              '[]'::json
            )
          `.as('media'),
          branch: branches,
          project: projects,
        })
        .from(posts)
        .leftJoin(postsMedia, eq(posts.id, postsMedia.postId))
        .leftJoin(branches, eq(posts.branchId, branches.id))
        .leftJoin(projects, eq(branches.projectId, projects.id))
        .where(inArray(posts.authorId, followsIds))
        .groupBy(posts.id, projects.id, branches.id)
        .orderBy(sql`${posts.updatedAt} DESC`),
      await db
        .select({
          id: branches.id,
          name: branches.name,
          description: branches.description,
          createdAt: branches.createdAt,
          updatedAt: branches.updatedAt,
          authorId: branches.authorId,
          projectId: branches.projectId,
          projectName: projects.name,
          projectPicture: projects.picture,
        })
        .from(branches)
        .where(inArray(branches.authorId, followsIds))
        .leftJoin(projects, eq(branches.projectId, projects.id))
        .orderBy(sql`${branches.updatedAt} DESC`),
      await db
        .select()
        .from(projects)
        .where(inArray(projects.authorId, followsIds))
        .orderBy(sql`${projects.updatedAt} DESC`),
    ]);

  const postInteractions = userPostInteractions.map((post) => ({ ...post, type: 'post-interaction' }));
  const branchInteractions = userBranchInteractions.map((branch) => ({ ...branch, type: 'branch-interaction' }));
  const projectInteractions = userProjectInteractions.map((project) => ({ ...project, type: 'project-interaction' }));

  return [
    ...postInteractions.map((interaction) => ({
      content: interaction,
      type: 'postInteraction',
      timestamp: interaction.updatedAt,
    })),
    ...branchInteractions.map((interaction) => ({
      content: interaction,
      type: 'branchInteraction' as const,
      timestamp: interaction.updatedAt,
    })),
    ...projectInteractions.map((interaction) => ({
      content: interaction,
      type: 'projectInteraction' as const,
      timestamp: interaction.updatedAt,
    })),
    ...userPosts.map((post) => ({ content: post, type: 'post' as const, timestamp: post.createdAt })),
    ...userBranches.map((branch) => ({ content: branch, type: 'branch' as const, timestamp: branch.createdAt })),
    ...userProjects.map((project) => ({ content: project, type: 'project' as const, timestamp: project.createdAt })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
