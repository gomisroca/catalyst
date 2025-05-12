// Libraries
import { auth } from '@/server/auth';
// Queries
import { getBranch } from '@/server/queries/branches';
// Components
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import NotAllowed from '@/app/_components/not-allowed';
import CreatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/create/create-post-form';

export default async function CreatePost({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string }>;
}) {
  // Get the branch from the database
  const branch = await getBranch((await searchParams).branchId);
  if (!branch) notFound(); // If the branch is not found, redirect to the 404 page

  const session = await auth();
  const allowCollaborate =
    (session && session.user.id === branch.author.id) ?? (session && branch.permissions?.allowCollaborate);
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
