/**
 * Server-side wrapper for the TrendingTimeline component. Fetches initial data for the timeline from the server and passes it to the client component.
 */

import { fetchTrendingTimeline } from '@/actions/timelines';
import TrendingTimeline from '@/app/_components/home/trending-timeline';

export default async function TrendingWrapper() {
  // Fetch initial data for the timeline server-side and pass it to the client component
  const initialData = await fetchTrendingTimeline({ page: 1, pageSize: 3 });
  return <TrendingTimeline initialData={initialData} />;
}
