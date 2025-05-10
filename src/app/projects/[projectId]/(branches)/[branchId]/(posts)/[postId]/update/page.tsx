import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import { auth } from '@/server/auth';
import { Suspense } from 'react';
import UpdatePostForm from './update-post-form';
import { getPost } from '@/server/queries/posts';
import NotAllowed from '@/app/_components/not-allowed';

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
