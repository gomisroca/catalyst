import { auth } from '@/server/auth';
import { fetchForYouTimeline } from '@/actions/timelines';
import ForYouTimeline from './foryou-timeline';
import NotAllowed from '../not-allowed';

export default async function ForYouWrapper() {
  const session = await auth();
  if (!session) return <NotAllowed />;
  const initialData = await fetchForYouTimeline({ page: 1, pageSize: 1 });
  return <ForYouTimeline session={session} initialData={initialData} />;
}
