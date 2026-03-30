import NotAllowed from '@/app/_components/not-allowed';
import UpdatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/[postId]/update/update-post-form';
import { auth } from '@/server/auth';
import { getPost } from '@/server/queries/posts';

export default async function PostUpdate({
  params,
}: {
  params: Promise<{ projectId: string; branchId: string; postId: string }>;
}) {
  const { postId } = await params;
  const session = await auth();
  if (!session) return <NotAllowed />;

  const post = await getPost(postId);

  // Only the post author can update it
  if (post.authorId !== session.user.id) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Post</h1>
      <UpdatePostForm post={post} />
    </div>
  );
}
