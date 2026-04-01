'use server';

import { type TimelineItem } from 'types';

import { getForYouTimeline, getTrendingTimeline } from '@/server/queries/timelines';

const timelineQueries = {
  trending: getTrendingTimeline,
  'for-you': getForYouTimeline,
};

export async function fetchTimeline({
  type,
  page,
  pageSize,
}: {
  type: keyof typeof timelineQueries;
  page: number;
  pageSize: number;
}): Promise<{ data: TimelineItem[]; hasMore: boolean }> {
  const query = timelineQueries[type];
  const data = (await query({ page, pageSize })) as TimelineItem[];

  return { data, hasMore: data.length === pageSize };
}
