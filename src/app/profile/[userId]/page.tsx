import { getUserContributions, getUserInteractions } from '@/server/queries/users';
import {
  type Branch,
  type Post,
  type Project,
  type PostInteraction,
  type BranchInteraction,
  type ProjectInteraction,
} from './types';
import {
  BranchCard,
  BranchInteractionCard,
  PostCard,
  PostInteractionCard,
  ProjectCard,
  ProjectInteractionCard,
} from './cards';

export default async function ProfileTimeline({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserContributions((await params).userId);
  const interactions = await getUserInteractions((await params).userId);
  if (!data || !interactions) return null;

  // Combine projects, branches, and posts into a single array
  const timelineItems = [
    ...data.projects.map((project) => ({ ...project, type: 'project' })),
    ...data.branches.map((branch) => ({ ...branch, type: 'branch' })),
    ...data.posts.map((post) => ({ ...post, type: 'post' })),
    ...interactions.postInteractions,
    ...interactions.branchInteractions,
    ...interactions.projectInteractions,
  ];

  // Sort the combined array by updatedAt
  timelineItems.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <ul className="flex flex-col gap-2">
      {timelineItems.map((item) => {
        if (item.type === 'project') {
          return <ProjectCard key={item.id} project={item as Project} />;
        } else if (item.type === 'branch') {
          return <BranchCard key={item.id} branch={item as Branch} />;
        } else if (item.type === 'post') {
          return <PostCard key={item.id} post={item as Post} />;
        } else if (item.type === 'project-interaction') {
          return <ProjectInteractionCard key={item.id} interaction={item as ProjectInteraction} />;
        } else if (item.type === 'branch-interaction') {
          return <BranchInteractionCard key={item.id} interaction={item as BranchInteraction} />;
        } else if (item.type === 'post-interaction') {
          return <PostInteractionCard key={item.id} interaction={item as PostInteraction} />;
        }
      })}
    </ul>
  );
}
