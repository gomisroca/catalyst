import HomeTabs from './_components/home/tabs';
import ForYouWrapper from './_components/home/foryou-wrapper';
import TrendingWrapper from './_components/home/trending-wrapper';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const timeline = (await searchParams).tl;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start lg:w-2/3 xl:w-1/3">
      <HomeTabs tab={(timeline as string) ?? 'trending'} />
      {timeline === 'for-you' ? <ForYouWrapper /> : <TrendingWrapper />}
    </main>
  );
}
