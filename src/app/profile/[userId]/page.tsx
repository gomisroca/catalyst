// Queries
import { getUserProfileTimeline } from '@/server/queries/users';
// Components
import {
  BranchCard,
  BranchInteractionCard,
  PostCard,
  PostInteractionCard,
  ProjectCard,
  ProjectInteractionCard,
} from '@/app/_components/cards';

export default async function ProfileTimeline({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserProfileTimeline((await params).userId);
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
        } else if (item.type === 'project-interaction') {
          return <ProjectInteractionCard key={item.content.id} interaction={item.content} />;
        } else if (item.type === 'branch-interaction') {
          return <BranchInteractionCard key={item.content.id} interaction={item.content} />;
        } else if (item.type === 'post-interaction') {
          return <PostInteractionCard key={item.content.id} interaction={item.content} />;
        }
      })}
    </ul>
  );
}
