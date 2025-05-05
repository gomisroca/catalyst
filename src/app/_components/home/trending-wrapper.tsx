import { fetchTrendingTimeline } from '@/actions/timelines';
import TrendingTimeline from './trending-timeline';

export default async function TrendingWrapper() {
  const initialData = await fetchTrendingTimeline({ page: 1, pageSize: 3 });

  return <TrendingTimeline initialData={initialData} />;
}
