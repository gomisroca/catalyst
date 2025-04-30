'use server';
import { getForYouTimeline, getTrendingTimeline } from '@/server/queries/timelines';

export async function fetchTrendingTimeline({ page, pageSize }: { page: number; pageSize: number }) {
  return getTrendingTimeline({ page, pageSize });
}

export async function fetchForYouTimeline({ page, pageSize }: { page: number; pageSize: number }) {
  return getForYouTimeline({ page, pageSize });
}
