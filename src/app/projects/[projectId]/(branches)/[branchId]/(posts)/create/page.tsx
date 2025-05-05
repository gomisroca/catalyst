import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { auth } from '@/server/auth';
import { Suspense } from 'react';
import CreatePostForm from './create-post-form';
import NotAllowed from '@/app/_components/not-allowed';

export default async function CreatePost() {
  const session = await auth();
  if (!session) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Post</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <CreatePostForm />
      </Suspense>
    </div>
  );
}
