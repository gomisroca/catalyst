'use client';

import Link from '@/app/_components/ui/link';
import Button from '@/app/_components/ui/button';
import { type Session } from 'next-auth';
import {
  BranchCard,
  BranchInteractionCard,
  PostCard,
  PostInteractionCard,
  ProjectCard,
  ProjectInteractionCard,
} from '@/app/_components/cards';
import { useEffect, useState } from 'react';
import { fetchForYouTimeline } from './actions';
import {
  type TimelineItemBranch,
  type TimelineItemBranchInteraction,
  type TimelineItemPost,
  type TimelineItemPostInteraction,
  type TimelineItemProject,
  type TimelineItemProjectInteraction,
  type TimelineProject,
  type TimelineBranch,
  type TimelinePost,
  type TimelineProjectInteraction,
  type TimelineBranchInteraction,
  type TimelinePostInteraction,
  type ForYouTimelineData,
} from 'types';

type ForYouTimelineProps = {
  session: Session | null; // Replace `any` with the actual type of the session
  initialData: ForYouTimelineData | null;
};

function sortTimelineData(data: ForYouTimelineData) {
  const combinedData = [
    ...data.postInteractions,
    ...data.branchInteractions,
    ...data.projectInteractions,
    ...data.posts,
    ...data.branches,
    ...data.projects,
  ];
  return combinedData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export default function ForYouTimeline({ session, initialData }: ForYouTimelineProps) {
  const [page, setPage] = useState(2);

  const [timelineData, setTimelineData] = useState<
    (
      | TimelineItemPostInteraction
      | TimelineItemBranchInteraction
      | TimelineItemProjectInteraction
      | TimelineItemPost
      | TimelineItemBranch
      | TimelineItemProject
    )[]
  >([]);

  useEffect(() => {
    if (!initialData) return;

    const sortedData = sortTimelineData(initialData);

    setTimelineData(sortedData);
  }, [initialData]);

  useEffect(() => {
    const loadData = async () => {
      const data: ForYouTimelineData | null = await fetchForYouTimeline({ page, pageSize: 1 });
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

  if (!session) {
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to see your personal timeline.</p>
        <Link href="/sign-in">Login</Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {timelineData.map((item, index) => (
        <div key={index}>
          {item.type === 'postInteraction' && (
            <PostInteractionCard interaction={item.content as TimelinePostInteraction} />
          )}
          {item.type === 'branchInteraction' && (
            <BranchInteractionCard interaction={item.content as TimelineBranchInteraction} />
          )}
          {item.type === 'projectInteraction' && (
            <ProjectInteractionCard interaction={item.content as TimelineProjectInteraction} />
          )}
          {item.type === 'post' && <PostCard post={item.content as TimelinePost} />}
          {item.type === 'branch' && <BranchCard branch={item.content as TimelineBranch} />}
          {item.type === 'project' && <ProjectCard project={item.content as TimelineProject} />}
        </div>
      ))}
      <Button onClick={handleLoadMore} className="mx-auto w-fit">
        Load More
      </Button>
    </div>
  );
}
