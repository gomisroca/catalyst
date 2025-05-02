import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { getProject } from '@/server/queries/projects';
import Image from 'next/image';
import { Suspense } from 'react';
import BranchSelection from './branch-selection';
import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';
import * as NextLink from 'next/link';
import AuthorActions from '@/app/_components/projects/author-actions';

export default async function ProjectLayout({
  params,
  children,
}: {
  params: Promise<{ projectId: string }>;
  children: React.ReactNode;
}) {
  const session = await auth();
  const project = await getProject((await params).projectId);
  if (!project) return null;

  const allowCollaborate =
    (session && session.user.id === project.author.id) ?? (session && project.permissions?.allowCollaborate);

  return (
    <div className="flex w-sm flex-col items-center justify-start gap-4 rounded-lg bg-zinc-100 p-4 drop-shadow-md md:w-xl lg:w-2xl dark:bg-zinc-900">
      <header className="flex w-full items-center justify-between border-b border-zinc-300 pb-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          {project.picture && (
            <span className="items-center justify-center rounded-full bg-radial-[at_15%_15%] via-zinc-300 to-75% p-1 dark:via-zinc-700">
              <Image
                src={project.picture}
                alt="Project Picture"
                width={50}
                height={50}
                className="h-12 w-12 rounded-full"
              />
            </span>
          )}
          <section className="flex flex-col items-start justify-start">
            <h1 className="text-2xl leading-tight font-bold tracking-tight">{project.name}</h1>
            <div className="flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <NextLink.default href={`/profile/${project.author.id}`}>{project.author.name}</NextLink.default>
              <span>•</span>
              <span>
                {project.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </section>
        </div>
        <section className="flex items-center justify-center gap-1">
          <BranchSelection projectId={project.id} branches={project.branches} />
          {allowCollaborate && (
            <Link
              href={`/projects/${project.id}/create`}
              className="flex h-[25px] w-[25px] items-center justify-center rounded-full">
              <span className="text-xl font-bold">+</span>
            </Link>
          )}
          {session?.user.id === project.author.id && <AuthorActions type="project" projectId={project.id} />}
        </section>
      </header>
      <Suspense fallback={<LoadingSpinner size="small" />}>{children}</Suspense>
    </div>
  );
}
