import { auth } from '@/server/auth';
import HomeTabs from './_components/home/tabs';
import ForYouTimeline from './_components/home/foryou-timeline';
import TrendingTimeline from './_components/home/trending-timeline';
import { fetchForYouTimeline, fetchTrendingTimeline } from './_components/home/actions';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const timeline = (await searchParams).tl;
  const session = await auth();
  let initialData;
  if (timeline === 'for-you') {
    initialData = await fetchForYouTimeline({ page: 1, pageSize: 5 });
  } else {
    initialData = await fetchTrendingTimeline({ page: 1, pageSize: 5 });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HomeTabs tab={(timeline as string) ?? 'trending'} />
      {timeline === 'for-you' ? (
        <ForYouTimeline session={session} initialData={initialData} />
      ) : (
        <TrendingTimeline initialData={initialData} />
      )}
    </main>
  );
}
