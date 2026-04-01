import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import AuthorActions from '@/app/_components/projects/author-actions';
import Link from '@/app/_components/ui/link';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import BranchSelection from '@/app/projects/[projectId]/branch-selection';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';

export default async function ProjectLayout({
  params,
  children,
}: {
  params: Promise<{ projectId: string }>;
  children: React.ReactNode;
}) {
  const { projectId } = await params;

  const [project, session] = await Promise.all([getProject(projectId).catch(() => null), auth()]);

  if (!project) notFound();

  const allowCollaborate = session?.user?.id === project.author.id || project.permissions?.allowCollaborate;

  return (
    <div className="flex w-sm flex-col items-center justify-start gap-4 rounded-lg bg-zinc-200 p-4 drop-shadow-md md:w-xl lg:w-2xl dark:bg-zinc-900">
      <header className="flex w-full items-center justify-between border-b border-zinc-300 pb-2 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          {project.picture && (
            <Image src={project.picture} alt="Project Picture" width={48} height={48} className="rounded-lg" />
          )}
          <section className="flex flex-col items-start justify-start">
            <h1 className="text-2xl leading-tight font-bold tracking-tight">{project.name}</h1>
            <div className="flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Link href={`/profile/${project.author.id}`}>{project.author.name}</Link>
              <span>•</span>
              <span>
                {project.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
          </section>
        </div>
        <section className="flex items-center justify-center gap-1">
          <BranchSelection projectId={project.id} branches={project.branches} />
          {allowCollaborate && (
            <Link href={`/projects/${project.id}/create`} className="flex size-6 items-center justify-center">
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
