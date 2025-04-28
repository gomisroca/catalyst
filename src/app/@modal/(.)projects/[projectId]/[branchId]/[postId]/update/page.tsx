import Modal from '@/app/_components/ui/modal';
import UpdatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/[postId]/update/update-post-form';
import { auth } from '@/server/auth';
import { getPost } from '@/server/queries/posts';
import Link from 'next/link';

export default async function UpdatePostModal({
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
    <Modal>
      <UpdatePostForm post={post} />
    </Modal>
  );
}
