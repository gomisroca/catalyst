import { LoadingSpinner } from '@/app/_components/loading-spinner';
import Link from '@/app/_components/ui/link';
import { auth } from '@/server/auth';
import { Suspense } from 'react';
import CreateProjectForm from './create-project-form';

export default async function CreatePost() {
  const session = await auth();
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to create a branch.</p>

        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Project</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <CreateProjectForm />
      </Suspense>
    </div>
  );
}
