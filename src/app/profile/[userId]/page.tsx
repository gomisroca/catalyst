import { getUserContributions, getUserInteractions } from '@/server/queries/users';
import {
  BranchCard,
  BranchInteractionCard,
  PostCard,
  PostInteractionCard,
  ProjectCard,
  ProjectInteractionCard,
} from '@/app/_components/cards';
import {
  type ExtendedProject,
  type ExtendedBranchInteraction,
  type ExtendedBranch,
  type ExtendedPostInteraction,
  type ExtendedPost,
  type ExtendedProjectInteraction,
} from 'types';

export default async function ProfileTimeline({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserContributions((await params).userId);
  const interactions = await getUserInteractions((await params).userId);
  if (!data || !interactions) return null;

  // Combine projects, branches, and posts into a single array
  const timelineItems = [
    ...data.projects.map((project) => ({ ...project, type: 'project' })),
    ...data.branches.map((branch) => ({ ...branch, type: 'branch' })),
    ...data.posts.map((post) => ({ ...post, type: 'post' })),
    ...interactions.postInteractions.map((int) => ({ ...int, type: 'post-interaction' })),
    ...interactions.branchInteractions.map((int) => ({ ...int, type: 'branch-interaction' })),
    ...interactions.projectInteractions.map((int) => ({ ...int, type: 'project-interaction' })),
  ];

  // Sort the combined array by updatedAt
  timelineItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <ul className="flex flex-col gap-2">
      {timelineItems.map((item) => {
        if (item.type === 'project') {
          return <ProjectCard key={item.id} project={item as ExtendedProject} />;
        } else if (item.type === 'branch') {
          return <BranchCard key={item.id} branch={item as ExtendedBranch} />;
        } else if (item.type === 'post') {
          return <PostCard key={item.id} post={item as ExtendedPost} />;
        } else if (item.type === 'project-interaction') {
          return <ProjectInteractionCard key={item.id} interaction={item as ExtendedProjectInteraction} />;
        } else if (item.type === 'branch-interaction') {
          return <BranchInteractionCard key={item.id} interaction={item as ExtendedBranchInteraction} />;
        } else if (item.type === 'post-interaction') {
          return <PostInteractionCard key={item.id} interaction={item as ExtendedPostInteraction} />;
        }
      })}
    </ul>
  );
}
