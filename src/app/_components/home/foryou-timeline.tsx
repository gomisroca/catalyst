import { getForYouTimeline } from '@/server/queries/timelines';
import Link from '../ui/link';
import { type Session } from 'next-auth';
import {
  BranchCard,
  BranchInteractionCard,
  PostCard,
  PostInteractionCard,
  ProjectCard,
  ProjectInteractionCard,
} from '@/app/profile/[userId]/cards';
import {
  type BranchInteraction,
  type PostInteraction,
  type ProjectInteraction,
  type Branch,
  type Post,
  type Project,
} from '@/app/profile/[userId]/types';

export default async function ForYouTimeline({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to see your personal timeline.</p>
        <Link href="/sign-in">Login</Link>
      </div>
    );
  }

  const timelineData = await getForYouTimeline();

  return (
    <div className="flex flex-col gap-4">
      {timelineData.map((data) =>
        data.type === 'project' ? (
          <ProjectCard key={data.content.id} project={data.content as Project} />
        ) : data.type === 'branch' ? (
          <BranchCard key={data.content.id} branch={data.content as Branch} />
        ) : data.type === 'post' ? (
          <PostCard key={data.content.id} post={data.content as Post} />
        ) : data.type === 'projectInteraction' ? (
          <ProjectInteractionCard key={data.content.id} interaction={data.content as ProjectInteraction} />
        ) : data.type === 'branchInteraction' ? (
          <BranchInteractionCard key={data.content.id} interaction={data.content as BranchInteraction} />
        ) : data.type === 'postInteraction' ? (
          <PostInteractionCard key={data.content.id} interaction={data.content as PostInteraction} />
        ) : null
      )}
    </div>
  );
}
