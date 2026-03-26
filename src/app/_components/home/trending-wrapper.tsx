/**
 * Server-side wrapper for the TrendingTimeline component. Fetches initial data for the timeline from the server and passes it to the client component.
 */

import { fetchTimeline } from '@/actions/timelines';
import TrendingTimeline from '@/app/_components/home/trending-timeline';

export default async function TrendingWrapper() {
  // Fetch initial data for the timeline server-side and pass it to the client component
  const { data: initialData, hasMore: initialHasMore } = await fetchTimeline({
    type: 'trending',
    page: 1,
    pageSize: 3,
  });
  return <TrendingTimeline initialData={initialData} initialHasMore={initialHasMore} />;
}
