'use client';

import { useState, useEffect } from 'react';
import { fetchTrendingTimeline } from './actions';
import { BranchCard, ProjectCard } from '@/app/_components/cards';
import { type Branch, type Project } from '@/app/profile/[userId]/types';
import Button from '@/app/_components/ui/button';
import { type TimelineItemBranch, type TimelineItemProject, type TrendingTimelineData } from 'types';

type TrendingTimelineProps = {
  initialData: TrendingTimelineData | null;
};

function sortTimelineData(data: TrendingTimelineData) {
  const combinedData = [...data.branches, ...data.projects];
  return combinedData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export default function TrendingTimeline({ initialData }: TrendingTimelineProps) {
  const [page, setPage] = useState(2);

  const [timelineData, setTimelineData] = useState<(TimelineItemBranch | TimelineItemProject)[]>([]);

  useEffect(() => {
    if (!initialData) return;

    const sortedData = sortTimelineData(initialData);

    setTimelineData(sortedData);
  }, [initialData]);

  useEffect(() => {
    const loadData = async () => {
      const data: TrendingTimelineData | null = await fetchTrendingTimeline({ page, pageSize: 3 });
      if (data) {
        const sortedData = sortTimelineData(data);
        setTimelineData((prevData) => [...prevData, ...sortedData]);
      }
    };

    if (page > 1) {
      void loadData();
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      {timelineData.map((data) =>
        data.type === 'project' ? (
          <ProjectCard key={data.content.id} project={data.content as Project} />
        ) : (
          <BranchCard key={data.content.id} branch={data.content as Branch} />
        )
      )}
      <Button onClick={handleLoadMore} className="mx-auto w-fit">
        Load More
      </Button>
    </div>
  );
}
