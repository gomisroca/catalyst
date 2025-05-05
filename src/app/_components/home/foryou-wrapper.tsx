import { auth } from '@/server/auth';
import { fetchForYouTimeline } from '@/actions/timelines';
import ForYouTimeline from './foryou-timeline';
import Link from '@/app/_components/ui/link';

export default async function ForYouWrapper() {
  const session = await auth();
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to see your personal timeline.</p>
        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </div>
    );
  const initialData = await fetchForYouTimeline({ page: 1, pageSize: 1 });
  return <ForYouTimeline session={session} initialData={initialData} />;
}
