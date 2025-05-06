// Actions
import { fetchTrendingTimeline } from '@/actions/timelines';
// Components
import TrendingTimeline from '@/app/_components/home/trending-timeline';

export default async function TrendingWrapper() {
  // Fetch initial data for the timeline server-side and pass it to the client component
  const initialData = await fetchTrendingTimeline({ page: 1, pageSize: 3 });
  return <TrendingTimeline initialData={initialData} />;
}
