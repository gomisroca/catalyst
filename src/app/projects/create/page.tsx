import { LoadingSpinner } from '@/app/_components/ui/loading-spinner';
import { auth } from '@/server/auth';
import { Suspense } from 'react';
import CreateProjectForm from './create-project-form';
import NotAllowed from '@/app/_components/not-allowed';

export default async function CreatePost() {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Project</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <CreateProjectForm />
      </Suspense>
    </div>
  );
}
