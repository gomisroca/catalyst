import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { auth } from '@/server/auth';
import Link from 'next/link';
import { Suspense } from 'react';
import UpdateProjectForm from './update-project-form';
import { getProject } from '@/server/queries/projects';

export default async function ProjectUpdate({ searchParams }: { searchParams: Promise<{ projectId: string }> }) {
  const session = await auth();
  const project = await getProject((await searchParams).projectId);
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to update your project.</p>
        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Project</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UpdateProjectForm project={project} />
      </Suspense>
    </div>
  );
}
