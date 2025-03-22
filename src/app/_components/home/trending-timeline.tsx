'use client';

import { useState, useEffect } from 'react';
import { fetchTrendingTimeline } from './actions';
import { BranchCard, ProjectCard } from '@/app/profile/[userId]/cards';
import { type Branch, type Project } from '@/app/profile/[userId]/types';
import Button from '@/app/_components/ui/button';

export default function TrendingTimelineClient() {
  const [page, setPage] = useState(1);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTrendingTimeline({ page, pageSize: 5 });
      if (data) setTimelineData((prevData) => [...prevData, ...data]);
    };

    void loadData();
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
