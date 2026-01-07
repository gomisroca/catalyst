import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import NotAllowed from '@/app/_components/not-allowed';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import CreatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/create/create-post-form';
import { auth } from '@/server/auth';
import { getBranch } from '@/server/queries/branches';

export default async function CreatePost({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string }>;
}) {
  // Get the branch from the database
  const branch = await getBranch((await searchParams).branchId);
  if (!branch) notFound(); // If the branch is not found, redirect to the 404 page

  const session = await auth();
  const allowCollaborate = session?.user?.id === branch.author.id || branch.permissions?.allowCollaborate;
  // If user is not logged in or not allowed to collaborate, show restricted access component
  if (!session || !allowCollaborate) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Post</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <CreatePostForm />
      </Suspense>
    </div>
  );
}
