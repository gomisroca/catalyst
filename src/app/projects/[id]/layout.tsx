import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { getProject } from '@/server/queries/projects';
import Image from 'next/image';
import { Suspense } from 'react';
import BranchSelection from './branch-selection';
import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';

export default async function ProjectLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const session = await auth();

  const data = await getProject((await params).id);
  if (!data) return null;

  return (
    <div className="flex w-2xl flex-col items-center justify-start gap-4 rounded-lg bg-zinc-100 p-4 drop-shadow-md dark:bg-zinc-900">
      <header className="flex w-full items-center justify-between border-b border-zinc-300 pb-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          {data.picture && (
            <span className="items-center justify-center rounded-full bg-radial-[at_15%_15%] via-zinc-300 to-75% p-1 dark:via-zinc-700">
              <Image
                src={data.picture}
                alt="Project Picture"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full"
              />
            </span>
          )}
          <section className="flex flex-col items-start justify-start">
            <h1 className="text-2xl leading-tight font-bold tracking-tight">{data.name}</h1>
            <div className="flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <span>{data.author}</span>
              <span>•</span>
              <span>
                {data.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </section>
        </div>
        <section className="flex items-center justify-center gap-1">
          <BranchSelection projectId={data.id} branches={data.branches} />
          {session?.user.id && data.permissions?.allowCollaborate && (
            <Link
              href={`/projects/${data.id}/create`}
              className="flex h-[25px] w-[25px] items-center justify-center rounded-full">
              <span className="text-xl font-bold">+</span>
            </Link>
          )}
        </section>
      </header>
      <Suspense fallback={<LoadingSpinner size="small" />}>{children}</Suspense>
    </div>
  );
}
