/**
 * Server-side wrapper for the ForYouTimeline component. Fetches initial data for the timeline from the server and passes it to the client component.
 */

// Libraries
import { auth } from '@/server/auth';
// Actions
import { fetchForYouTimeline } from '@/actions/timelines';
// Components
import ForYouTimeline from '@/app/_components/home/foryou-timeline';
import NotAllowed from '@/app/_components/not-allowed';

export default async function ForYouWrapper() {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  // Fetch initial data for the timeline server-side and pass it to the client component
  const initialData = await fetchForYouTimeline({ page: 1, pageSize: 1 });
  return <ForYouTimeline session={session} initialData={initialData} />;
}
