'use client';

/**
 * Renders a timeline of trending projects and branches.
 */

// Libraries
import { useState, useEffect, useRef, Fragment } from 'react';
import { messageAtom } from '@/atoms/message';
import { useSetAtom } from 'jotai';
import { toErrorMessage } from '@/utils/errors';
// Actions
import { fetchTrendingTimeline } from '@/actions/timelines';
// Components
import { BranchCard, ProjectCard } from '@/app/_components/cards';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
// Types
import { type TrendingTimelineItem } from 'types';

// Define the structure of the data expected from the server action
type TrendingTimelineProps = {
  initialData: TrendingTimelineItem[];
};

export default function TrendingTimeline({ initialData }: TrendingTimelineProps) {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [page, setPage] = useState(2); // Track pagination state
  const setMessage = useSetAtom(messageAtom); // Hook to set the message atom
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref to the div element

  // Initialize timeline data state (merged and sorted)
  const [timelineData, setTimelineData] = useState<TrendingTimelineItem[]>(initialData);

  // Load more data when page changes (except for initial page 1)
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTrendingTimeline({
          page,
          pageSize: 3,
        });
        if (data && isMounted) {
          // Append new data to existing timeline
          setTimelineData((prevData) => [...prevData, ...data]);
        }
      } catch (err) {
        setMessage({
          content: toErrorMessage(err, 'Failed to load timeline data'),
          error: true,
        });
      } finally {
        setIsLoading(false);
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
      if (entry?.isIntersecting) {
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

  // Render timeline data
  return (
    <div className="flex flex-col gap-4">
      {/* Render different types of cards based on the type attribute */}
      {timelineData.map((data) => (
        <Fragment key={data.content.id}>
          {/* Render different types of cards based on the type attribute */}
          {data.type === 'branch' && <BranchCard branch={data.content} />}
          {data.type === 'project' && <ProjectCard project={data.content} />}
        </Fragment>
      ))}
      {isLoading && <LoadingSpinner />}
      {/* Load more timeline data as the user scrolls down */}
      <div ref={observerRef} />
    </div>
  );
}
