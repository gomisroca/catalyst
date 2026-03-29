import ForYouWrapper from '@/app/_components/home/foryou-wrapper';
import HomeTabs from '@/app/_components/home/tabs';
import TrendingWrapper from '@/app/_components/home/trending-wrapper';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { tl } = await searchParams;
  const tab = (Array.isArray(tl) ? tl[0] : tl) ?? 'trending';

  return (
    <main className="flex min-h-screen flex-col items-center justify-start lg:w-2/3 xl:w-1/3">
      <HomeTabs tab={tab} />
      {tab === 'for-you' ? <ForYouWrapper /> : <TrendingWrapper />}
    </main>
  );
}
