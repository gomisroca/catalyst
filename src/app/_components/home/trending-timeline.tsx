import { BranchCard, ProjectCard } from '@/app/profile/[userId]/cards';
import { type Branch, type Project } from '@/app/profile/[userId]/types';
import { getTrendingTimeline } from '@/server/queries/timelines';

export default async function TrendingTimeline() {
  const timelineData = await getTrendingTimeline();
  console.log(timelineData);
  return (
    <div className="flex flex-col gap-4">
      {timelineData.map((data) =>
        data.type === 'project' ? (
          <ProjectCard key={data.content.id} project={data.content as Project} />
        ) : (
          <BranchCard key={data.content.id} branch={data.content as Branch} />
        )
      )}
    </div>
  );
}
