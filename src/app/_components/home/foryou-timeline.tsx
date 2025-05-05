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
import { fetchForYouTimeline } from '@/actions/timelines';
import {
  type ExtendedBranch,
  type ExtendedPost,
  type ExtendedProject,
  type ExtendedPostInteraction,
  type ExtendedBranchInteraction,
  type ExtendedProjectInteraction,
} from 'types';
import NotAllowed from '../not-allowed';

type ForYouTimelineData = {
  posts: ExtendedPost[];
  branches: ExtendedBranch[];
  projects: ExtendedProject[];
  postInteractions: ExtendedPostInteraction[];
  branchInteractions: ExtendedBranchInteraction[];
  projectInteractions: ExtendedProjectInteraction[];
};
type ForYouTimelineProps = {
  session: Session | null;
  initialData: ForYouTimelineData;
};

function sortTimelineData(data: ForYouTimelineData) {
  const combinedData = [
    ...data.postInteractions.map((interaction) => ({
      type: 'post-interaction',
      content: { ...interaction, updatedAt: interaction.createdAt },
    })),
    ...data.branchInteractions.map((interaction) => ({
      type: 'branch-interaction',
      content: { ...interaction, updatedAt: interaction.createdAt },
    })),
    ...data.projectInteractions.map((interaction) => ({
      type: 'project-interaction',
      content: { ...interaction, updatedAt: interaction.createdAt },
    })),
    ...data.posts.map((post) => ({ type: 'post', content: post })),
    ...data.branches.map((branch) => ({ type: 'branch', content: branch })),
    ...data.projects.map((project) => ({ type: 'project', content: project })),
  ];
  return combinedData.sort(
    (a, b) =>
      new Date(b.content.updatedAt ?? b.content.createdAt).getTime() -
      new Date(a.content.updatedAt ?? a.content.createdAt).getTime()
  );
}

export default function ForYouTimeline({ session, initialData }: ForYouTimelineProps) {
  const [page, setPage] = useState(2);

  const [timelineData, setTimelineData] = useState<
    {
      type: string;
      content:
        | ExtendedPostInteraction
        | ExtendedBranchInteraction
        | ExtendedProjectInteraction
        | ExtendedPost
        | ExtendedBranch
        | ExtendedProject;
    }[]
  >([]);

  useEffect(() => {
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

  if (!session) return <NotAllowed />;
  return (
    <div className="flex flex-col gap-4">
      {timelineData.map((data) => (
        <div key={data.content.id}>
          {data.type === 'postInteraction' && (
            <PostInteractionCard interaction={data.content as ExtendedPostInteraction} />
          )}
          {data.type === 'branchInteraction' && (
            <BranchInteractionCard interaction={data.content as ExtendedBranchInteraction} />
          )}
          {data.type === 'projectInteraction' && (
            <ProjectInteractionCard interaction={data.content as ExtendedProjectInteraction} />
          )}
          {data.type === 'post' && <PostCard post={data.content as ExtendedPost} />}
          {data.type === 'branch' && <BranchCard branch={data.content as ExtendedBranch} />}
          {data.type === 'project' && <ProjectCard project={data.content as ExtendedProject} />}
        </div>
      ))}
      <Button onClick={handleLoadMore} name="Load More" className="mx-auto w-fit">
        Load More
      </Button>
    </div>
  );
}
