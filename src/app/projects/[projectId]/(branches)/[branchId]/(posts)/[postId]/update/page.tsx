// Libraries
import { auth } from '@/server/auth';
// Components
import { Suspense } from 'react';
import NotAllowed from '@/app/_components/not-allowed';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import UpdatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/[postId]/update/update-post-form';
// Queries
import { getPost } from '@/server/queries/posts';

export default async function PostUpdate({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string; postId: string }>;
}) {
  const session = await auth();
  const post = await getPost((await searchParams).postId);
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Post</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UpdatePostForm post={post} />
      </Suspense>
    </div>
  );
}
