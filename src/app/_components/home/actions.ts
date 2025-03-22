'use server';
import { getTrendingTimeline } from '@/server/queries/timelines';

export async function fetchTrendingTimeline({ page, pageSize }: { page: number; pageSize: number }) {
  try {
    const response = await getTrendingTimeline({ page, pageSize });
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch trending timeline:', error);
    return {
      error: 'An unexpected error occurred.',
    };
  }
}

export async function fetchForYouTimeline({ page, pageSize }: { page: number; pageSize: number }) {
  try {
    // const response = await getForYouTimeline({ page, pageSize });
    // return response;
    return [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch for you timeline:', error);
    return {
      error: 'An unexpected error occurred.',
    };
  }
}
