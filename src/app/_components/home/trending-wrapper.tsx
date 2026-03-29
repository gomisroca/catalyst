/**
 * Server-side wrapper for the TrendingTimeline component. Fetches initial data for the timeline from the server and passes it to the client component.
 */

import { fetchTimeline } from '@/actions/timelines';

import Timeline from './timeline';

export default async function TrendingWrapper() {
  const { data, hasMore } = await fetchTimeline({ type: 'trending', page: 1, pageSize: 10 });
  return <Timeline type="trending" initialData={data} initialHasMore={hasMore} />;
}
