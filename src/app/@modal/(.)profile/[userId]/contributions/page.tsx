import Modal from '@/app/_components/ui/modal';
import { BranchCard, PostCard, ProjectCard } from '@/app/profile/[userId]/contributions/page';
import { type Branch, type Post, type Project } from '@/app/profile/[userId]/types';
import { getUserContributions } from '@/server/queries/users';

export default async function ProfileContributionsModal({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserContributions((await params).userId);
  if (!data) return null;

  // Combine projects, branches, and posts into a single array
  const timelineItems = [
    ...data.projects.map((project) => ({ ...project, type: 'project' })),
    ...data.branches.map((branch) => ({ ...branch, type: 'branch' })),
    ...data.posts.map((post) => ({ ...post, type: 'post' })),
  ];

  // Sort the combined array by updatedAt
  timelineItems.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return (
    <Modal>
      <ul className="flex max-h-[400px] flex-col gap-2 overflow-y-scroll">
        {timelineItems.map((item) => {
          if (item.type === 'project') {
            return <ProjectCard key={item.id} project={item as Project} />;
          } else if (item.type === 'branch') {
            return <BranchCard key={item.id} branch={item as Branch} />;
          } else if (item.type === 'post') {
            return <PostCard key={item.id} post={item as Post} />;
          }
        })}
      </ul>
    </Modal>
  );
}
