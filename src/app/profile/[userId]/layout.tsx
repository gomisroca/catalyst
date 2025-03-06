import { LoadingSpinner } from '@/app/_components/loading-spinner';
import Image from 'next/image';
import { Suspense } from 'react';
import { auth } from '@/server/auth';
import { getUserProfile } from '@/server/queries/users';
import FollowMenu from './follow-menu';

export default async function ProfileLayout({
  params,
  children,
}: {
  params: Promise<{ userId: string }>;
  children: React.ReactNode;
}) {
  const session = await auth();

  const data = await getUserProfile((await params).userId);
  if (!data) return null;

  return (
    <div className="mx-2 flex max-w-full flex-col items-center justify-start gap-4 rounded-lg bg-zinc-100 p-4 drop-shadow-md md:mx-0 md:w-xl lg:w-2/3 dark:bg-zinc-900">
      <header className="flex w-full items-center justify-between border-b border-zinc-300 pb-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <span className="items-center justify-center rounded-full bg-radial-[at_15%_15%] via-zinc-300 to-75% p-1 dark:via-zinc-700">
            <Image
              src={data.image ?? '/user.jpg'}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full"
            />
          </span>
          <h1 className="text-2xl leading-tight font-bold tracking-tight">{data.name ?? data.email.split('@')[0]}</h1>
        </div>
        <FollowMenu session={session} followers={data.followers} />
      </header>
      {/* 
      We will have various children views
      To see what the user has posted,
      Their owned projects/branches
      What they have interacted with,
      Who they follow 
      */}
      <Suspense fallback={<LoadingSpinner size="small" />}>{children}</Suspense>
    </div>
  );
}
