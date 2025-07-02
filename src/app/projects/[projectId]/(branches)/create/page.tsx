import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import NotAllowed from '@/app/_components/not-allowed';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import CreateBranchForm from '@/app/projects/[projectId]/(branches)/create/create-branch-form';
import { auth } from '@/server/auth';
import { getProject } from '@/server/queries/projects';

export default async function CreateBranch({ searchParams }: { searchParams: Promise<{ projectId: string }> }) {
  // Get the project from the database
  const project = await getProject((await searchParams).projectId);
  if (!project) notFound(); // If the project is not found, redirect to the 404 page

  const session = await auth();
  const allowCollaborate =
    (session && session.user.id === project.author.id) ?? (session && project.permissions?.allowCollaborate);
  // If user is not logged in or not allowed to collaborate, show restricted access component
  if (!session || !allowCollaborate) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Branch</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <CreateBranchForm />
      </Suspense>
    </div>
  );
}
