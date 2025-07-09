'use client';

/**
 * Renders a timeline of projects, branches, posts, and interactions for the user.
 */

import { useSetAtom } from 'jotai';
import { type Session } from 'next-auth';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { type ForYouTimelineItem } from 'types';

import { fetchForYouTimeline } from '@/actions/timelines';
import {
  BranchCard,
  BranchInteractionCard,
  PostCard,
  PostInteractionCard,
  ProjectCard,
  ProjectInteractionCard,
} from '@/app/_components/cards';
import NotAllowed from '@/app/_components/not-allowed';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';

// Define the structure of the data expected from the server action
type ForYouTimelineProps = {
  session: Session | null;
  initialData: ForYouTimelineItem[];
  initialHasMore: boolean;
};

export default function ForYouTimeline({ session, initialData, initialHasMore }: ForYouTimelineProps) {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(2); // Track pagination state
  const setMessage = useSetAtom(messageAtom); // Hook to set the message atom
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref to the div element
  const loadingRef = useRef(false);

  // Initialize timeline data state (merged and sorted in the backend)
  const [timelineData, setTimelineData] = useState<ForYouTimelineItem[]>(initialData);

  // Load more data when page changes (except for initial page 1)
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      loadingRef.current = true;
      try {
        const { data, hasMore: newHasMore } = await fetchForYouTimeline({ page, pageSize: 1 });
        if (data && isMounted) {
          setTimelineData((prevData) => [...prevData, ...data]);
          setHasMore(newHasMore);
        }
      } catch (err) {
        setMessage({
          content: toErrorMessage(err, 'Failed to load timeline data'),
          error: true,
        });
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    };

    if (page > 1) {
      void loadData();
    }

    return () => {
      isMounted = false;
    };
  }, [page]);

  // Handle loading more data via intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !loadingRef.current && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    const current = observerRef.current;
    return () => {
      if (current) {
        observer.disconnect();
      }
    };
  }, []);

  const renderedTimelineData = useMemo(() => {
    return timelineData.map((data) => (
      <Fragment key={data.content.id}>
        {/* Render different types of cards based on the type attribute */}
        {data.type === 'post-interaction' && <PostInteractionCard interaction={data.content} />}
        {data.type === 'branch-interaction' && <BranchInteractionCard interaction={data.content} />}
        {data.type === 'project-interaction' && <ProjectInteractionCard interaction={data.content} />}
        {data.type === 'post' && <PostCard post={data.content} />}
        {data.type === 'branch' && <BranchCard branch={data.content} />}
        {data.type === 'project' && <ProjectCard project={data.content} />}
      </Fragment>
    ));
  }, [timelineData]);

  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  // Render timeline data
  return (
    <div className="flex flex-col gap-4">
      {renderedTimelineData}
      {isLoading && <LoadingSpinner />}
      {!hasMore && <p className="text-center text-gray-500">You’ve reached the end of the timeline.</p>}
      {/* Load more timeline data as the user scrolls down */}
      <div ref={observerRef} />
    </div>
  );
}
