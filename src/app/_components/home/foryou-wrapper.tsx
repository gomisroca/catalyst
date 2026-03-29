import { fetchTimeline } from '@/actions/timelines';
import Timeline from '@/app/_components/home/timeline';
import NotAllowed from '@/app/_components/not-allowed';
import { auth } from '@/server/auth';

export default async function ForYouWrapper() {
  const session = await auth();
  if (!session) return <NotAllowed />;

  const { data, hasMore } = await fetchTimeline({ type: 'for-you', page: 1, pageSize: 10 });
  return <Timeline type="for-you" initialData={data} initialHasMore={hasMore} />;
}
