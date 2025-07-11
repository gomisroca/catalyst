import { Suspense } from 'react';

import NotAllowed from '@/app/_components/not-allowed';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';
import { getUserFollows } from '@/server/queries/users';

import UpdateProjectForm from './update-project-form';

export default async function ProjectUpdate({ searchParams }: { searchParams: Promise<{ projectId: string }> }) {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  const follows = await getUserFollows(session.user.id);
  const project = await getProject((await searchParams).projectId);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Project</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UpdateProjectForm project={project} follows={follows} />
      </Suspense>
    </div>
  );
}
