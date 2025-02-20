import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { getProject } from '@/server/queries/projects';
import Image from 'next/image';
import { Suspense } from 'react';
import BranchSelection from './branch-selection';

export default async function ProjectLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const data = await getProject((await params).id);
  if (!data) return null;

  return (
    <div>
      <header className="flex items-center justify-start gap-4">
        {data.picture && (
          <span className="via-sky items-center justify-center rounded-full bg-radial-[at_15%_15%] via-zinc-300 to-75% p-1 dark:via-zinc-700">
            <Image src={data.picture} alt="Project Picture" width={50} height={50} className="h-16 w-16 rounded-full" />
          </span>
        )}
        <h1 className="text-2xl font-bold">{data.name}</h1>
        <BranchSelection projectId={data.id} branches={data.branches} />
      </header>
      <Suspense fallback={<LoadingSpinner size="small" />}>{children}</Suspense>
    </div>
  );
}
