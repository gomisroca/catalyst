'use client';

/**
 * Renders a timeline of projects, branches, posts, and interactions for the user.
 */

// Libraries
import { Fragment, useEffect, useRef, useState } from 'react';
import { type Session } from 'next-auth';
import { messageAtom } from '@/atoms/message';
import { useSetAtom } from 'jotai';
import { toErrorMessage } from '@/utils/errors';
// Actions
import { fetchForYouTimeline } from '@/actions/timelines';
// Components
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import {
  BranchCard,
  BranchInteractionCard,
  PostCard,
  PostInteractionCard,
  ProjectCard,
  ProjectInteractionCard,
} from '@/app/_components/cards';
import NotAllowed from '@/app/_components/not-allowed';
// Types
import { type ForYouTimelineItem } from 'types';

// Define the structure of the data expected from the server action
type ForYouTimelineProps = {
  session: Session | null;
  initialData: ForYouTimelineItem[];
};

export default function ForYouTimeline({ session, initialData }: ForYouTimelineProps) {
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [page, setPage] = useState(2); // Track pagination state
  const setMessage = useSetAtom(messageAtom); // Hook to set the message atom
  const observerRef = useRef<HTMLDivElement | null>(null); // Ref to the div element

  // Initialize timeline data state (merged and sorted in the backend)
  const [timelineData, setTimelineData] = useState<ForYouTimelineItem[]>(initialData);

  // Load more data when page changes (except for initial page 1)
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchForYouTimeline({ page, pageSize: 1 });
        if (data && isMounted) {
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

  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  // Render timeline data
  return (
    <div className="flex flex-col gap-4">
      {timelineData.map((data) => (
        <Fragment key={data.content.id}>
          {/* Render different types of cards based on the type attribute */}
          {data.type === 'post-interaction' && <PostInteractionCard interaction={data.content} />}
          {data.type === 'branch-interaction' && <BranchInteractionCard interaction={data.content} />}
          {data.type === 'project-interaction' && <ProjectInteractionCard interaction={data.content} />}
          {data.type === 'post' && <PostCard post={data.content} />}
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
