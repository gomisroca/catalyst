import { auth } from '@/server/auth';
import { fetchForYouTimeline } from './actions';
import ForYouTimeline from './foryou-timeline';

export default async function ForYouWrapper() {
  const initialData = await fetchForYouTimeline({ page: 1, pageSize: 1 });
  const session = await auth();
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to see your personal timeline.</p>
        <a href="/sign-in">Login</a>
      </div>
    );
  return <ForYouTimeline session={session} initialData={initialData} />;
}
