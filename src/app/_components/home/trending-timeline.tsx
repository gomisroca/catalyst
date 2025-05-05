'use client';

import { useState, useEffect } from 'react';
import { fetchTrendingTimeline } from '@/actions/timelines';
import { BranchCard, ProjectCard } from '@/app/_components/cards';
import Button from '@/app/_components/ui/button';
import { type ExtendedBranch, type ExtendedProject } from 'types';

type TrendingTimelineData = {
  projects: ExtendedProject[];
  branches: ExtendedBranch[];
};
type TrendingTimelineProps = {
  initialData: TrendingTimelineData;
};

function sortTimelineData(data: TrendingTimelineData) {
  const combinedData = [
    ...data.projects.map((project) => ({ type: 'project', content: project })),
    ...data.branches.map((branch) => ({ type: 'branch', content: branch })),
  ];
  return combinedData.sort(
    (a, b) =>
      new Date(b.content.updatedAt ?? b.content.createdAt).getTime() -
      new Date(a.content.updatedAt ?? a.content.createdAt).getTime()
  );
}

export default function TrendingTimeline({ initialData }: TrendingTimelineProps) {
  const [page, setPage] = useState(2);

  const [timelineData, setTimelineData] = useState<
    {
      type: string;
      content: ExtendedProject | ExtendedBranch;
    }[]
  >([]);

  useEffect(() => {
    const sortedData = sortTimelineData(initialData);
    setTimelineData(sortedData);
  }, [initialData]);

  useEffect(() => {
    const loadData = async () => {
      const data: TrendingTimelineData | null = await fetchTrendingTimeline({
        page,
        pageSize: 3,
      });
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
          <ProjectCard key={data.content.id} project={data.content as ExtendedProject} />
        ) : (
          <BranchCard key={data.content.id} branch={data.content as ExtendedBranch} />
        )
      )}
      <Button onClick={handleLoadMore} name="Load More" className="mx-auto w-fit">
        Load More
      </Button>
    </div>
  );
}
