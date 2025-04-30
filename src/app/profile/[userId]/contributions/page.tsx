import { getUserContributions } from '@/server/queries/users';
import { BranchCard, PostCard, ProjectCard } from '@/app/_components/cards';
import { type ExtendedBranch, type ExtendedPost, type ExtendedProject } from 'types';

export default async function ContributionsTimeline({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserContributions((await params).userId);
  if (!data) return null;

  // Combine projects, branches, and posts into a single array
  const timelineItems = [
    ...data.projects.map((project) => ({ ...project, type: 'project' })),
    ...data.branches.map((branch) => ({ ...branch, type: 'branch' })),
    ...data.posts.map((post) => ({ ...post, type: 'post' })),
  ];

  // Sort the combined array by updatedAt
  timelineItems.sort(
    (a, b) => new Date(b.updatedAt ?? b.createdAt).getTime() - new Date(a.updatedAt ?? a.createdAt).getTime()
  );

  return (
    <ul className="flex flex-col gap-2">
      {timelineItems.map((item) => {
        if (item.type === 'project') {
          return <ProjectCard key={item.id} project={item as ExtendedProject} />;
        } else if (item.type === 'branch') {
          return <BranchCard key={item.id} branch={item as ExtendedBranch} />;
        } else if (item.type === 'post') {
          return <PostCard key={item.id} post={item as ExtendedPost} />;
        }
      })}
    </ul>
  );
}
