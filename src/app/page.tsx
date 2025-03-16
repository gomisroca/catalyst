import { auth } from '@/server/auth';
import HomeTabs from './_components/home/tabs';
import ForYouTimeline from './_components/home/foryou-timeline';
import TrendingTimeline from './_components/home/trending-timeline';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const timeline = (await searchParams).tl;
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HomeTabs tab={(timeline as string) ?? 'trending'} />
      {timeline === 'for-you' ? <ForYouTimeline session={session} /> : <TrendingTimeline />}
    </main>
  );
}
