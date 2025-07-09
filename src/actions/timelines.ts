'use server';

import { getForYouTimeline, getTrendingTimeline } from '@/server/queries/timelines';

export async function fetchTrendingTimeline({ page, pageSize }: { page: number; pageSize: number }) {
  const timeline = await getTrendingTimeline({ page, pageSize });
  const hasMore = timeline.length === pageSize;

  return {
    data: timeline,
    hasMore,
  };
}

export async function fetchForYouTimeline({ page, pageSize }: { page: number; pageSize: number }) {
  const timeline = await getForYouTimeline({ page, pageSize });

  const hasMore = timeline.length === pageSize;

  return {
    data: timeline,
    hasMore,
  };
}
