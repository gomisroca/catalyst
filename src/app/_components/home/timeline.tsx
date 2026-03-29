'use client';

import { useSetAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { type TimelineItem } from 'types';

import { fetchTimeline } from '@/actions/timelines';
import { renderCard } from '@/app/_components/cards';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';

type TimelineProps = {
  type: 'trending' | 'for-you';
  initialData: TimelineItem[];
  initialHasMore: boolean;
  pageSize?: number;
};

export default function Timeline({ type, initialData, initialHasMore, pageSize = 10 }: TimelineProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(2);
  const [timelineData, setTimelineData] = useState<TimelineItem[]>(initialData);
  const setMessage = useSetAtom(messageAtom);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!hasMore) return;
      setIsLoading(true);
      loadingRef.current = true;
      try {
        const { data, hasMore: newHasMore } = await fetchTimeline({ type, page, pageSize });
        if (isMounted) {
          setTimelineData((prev) => [...prev, ...data]);
          setHasMore(newHasMore);
        }
      } catch (err) {
        setMessage({ content: toErrorMessage(err, 'Failed to load timeline data'), type: 'error' });
      } finally {
        setIsLoading(false);
        loadingRef.current = false;
      }
    };

    if (page > 1) void loadData();

    return () => {
      isMounted = false;
    };
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !loadingRef.current && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (observerRef.current) observer.observe(observerRef.current);
    const current = observerRef.current;
    return () => {
      if (current) observer.disconnect();
    };
  }, []);

  const renderedCards = useMemo(() => timelineData.map(renderCard), [timelineData]);

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 gap-4">{renderedCards}</ul>
      {isLoading && <LoadingSpinner />}
      {!hasMore && <p className="text-center text-zinc-500">You&apos;ve reached the end of the timeline.</p>}
      <div ref={observerRef} />
    </div>
  );
}
