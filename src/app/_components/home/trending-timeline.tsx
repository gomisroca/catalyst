'use client';

/**
 * Renders a timeline of trending projects and branches.
 */

import { useSetAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type TimelineItem } from 'types';

import { fetchTimeline } from '@/actions/timelines';
import { BranchCard, ProjectCard } from '@/app/_components/cards';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';

// Define the structure of the data expected from the server action
type TrendingTimelineProps = {
  initialData: TimelineItem[];
  initialHasMore: boolean;
};

export default function TrendingTimeline({ initialData, initialHasMore }: TrendingTimelineProps) {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(2); // Track pagination state
  const setMessage = useSetAtom(messageAtom); // Hook to set the message atom
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref to the div element
  const loadingRef = useRef(false);

  // Initialize timeline data state (merged and sorted)
  const [timelineData, setTimelineData] = useState<TimelineItem[]>(initialData);

  // Load more data when page changes (except for initial page 1)
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!hasMore) return;

      setIsLoading(true);
      loadingRef.current = true;
      try {
        const { data, hasMore: newHasMore } = await fetchTimeline({
          type: 'trending',
          page,
          pageSize: 3,
        });
        if (data && isMounted) {
          // Append new data to existing timeline
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
    return timelineData.map((data) =>
      data.type === 'branch' ? (
        <BranchCard key={data.content.id} branch={data.content} />
      ) : data.type === 'project' ? (
        <ProjectCard key={data.content.id} project={data.content} />
      ) : null
    );
  }, [timelineData]);

  // Render timeline data
  return (
    <div className="flex flex-col gap-4">
      {/* Render different types of cards based on the type attribute */}
      <ul className="grid grid-cols-1 items-stretch gap-4">{renderedTimelineData}</ul>
      {isLoading && <LoadingSpinner />}
      {!hasMore && <p className="text-center text-zinc-500">You’ve reached the end of the timeline.</p>}
      {/* Load more timeline data as the user scrolls down */}
      <div ref={observerRef} />
    </div>
  );
}
