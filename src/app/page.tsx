import { auth } from '@/server/auth';
import HomeTimelineWrapper from './_components/home/timeline-wrapper';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <HomeTimelineWrapper session={session} />
    </main>
  );
}
