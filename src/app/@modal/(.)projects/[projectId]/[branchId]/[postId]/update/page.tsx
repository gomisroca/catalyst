import NotAllowed from '@/app/_components/not-allowed';
import Modal from '@/app/_components/ui/modal';
import UpdatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/[postId]/update/update-post-form';
import { auth } from '@/server/auth';
import { getPost } from '@/server/queries/posts';

export default async function UpdatePostModal({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string; postId: string }>;
}) {
  const session = await auth();
  const post = await getPost((await searchParams).postId);
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <Modal>
      <UpdatePostForm post={post} modal />
    </Modal>
  );
}
