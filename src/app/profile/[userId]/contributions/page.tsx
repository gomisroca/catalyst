import { BranchCard, PostCard, ProjectCard } from '@/app/_components/cards';
import { getUserContributions } from '@/server/queries/users';

export default async function ContributionsTimeline({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserContributions((await params).userId);
  if (!data) return null;

  return (
    <ul className="flex flex-col gap-2">
      {data.map((item) => {
        if (item.type === 'project') {
          return <ProjectCard key={item.content.id} project={item.content} />;
        } else if (item.type === 'branch') {
          return <BranchCard key={item.content.id} branch={item.content} />;
        } else if (item.type === 'post') {
          return <PostCard key={item.content.id} post={item.content} />;
        }
      })}
    </ul>
  );
}
