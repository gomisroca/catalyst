import { ProjectCard } from '@/app/profile/[userId]/cards';
import { getTrendingTimeline } from '@/server/queries/timelines';

export default async function TrendingTimeline() {
  const timelineData = await getTrendingTimeline();
  console.log(timelineData);
  return (
    <div className="flex flex-col gap-4">
      {timelineData.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
