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
} from '@/app/profile/[userId]/cards';
import {
  type BranchInteraction,
  type PostInteraction,
  type ProjectInteraction,
  type Branch,
  type Post,
  type Project,
} from '@/app/profile/[userId]/types';
import { useEffect, useState } from 'react';
import { fetchForYouTimeline } from './actions';

export default function ForYouTimeline({ session, initialData }: { session: Session | null; initialData: any }) {
  const [page, setPage] = useState(2);

  // Have to make this and the one in trending not complain
  const [timelineData, setTimelineData] = useState(initialData);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchForYouTimeline({ page, pageSize: 5 });
      if (data) setTimelineData((prevData) => [...prevData, ...data]);
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
      <Button onClick={handleLoadMore} className="mx-auto w-fit">
        Load More
      </Button>
    </div>
  );
}
