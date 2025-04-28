import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { auth } from '@/server/auth';
import Link from 'next/link';
import { Suspense } from 'react';
import UpdatePostForm from './update-post-form';
import { getPost } from '@/server/queries/posts';

export default async function PostUpdate({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string; postId: string }>;
}) {
  const session = await auth();
  const post = await getPost((await searchParams).postId);
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to update your post.</p>

        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Post</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UpdatePostForm post={post} />
      </Suspense>
    </div>
  );
}
