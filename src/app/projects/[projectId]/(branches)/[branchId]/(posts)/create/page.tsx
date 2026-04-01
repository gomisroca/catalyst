import { notFound } from 'next/navigation';

import NotAllowed from '@/app/_components/not-allowed';
import CreatePostForm from '@/app/projects/[projectId]/(branches)/[branchId]/(posts)/create/create-post-form';
import { auth } from '@/server/auth';
import { getBranch } from '@/server/queries/branches';

export default async function CreatePost({ params }: { params: Promise<{ projectId: string; branchId: string }> }) {
  const { branchId } = await params;

  const [branch, session] = await Promise.all([getBranch(branchId).catch(() => null), auth()]);

  if (!branch) notFound();

  const allowCollaborate = session?.user?.id === branch.author.id || branch.permissions?.allowCollaborate;
  if (!session || !allowCollaborate) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Create Post</h1>
      <CreatePostForm />
    </div>
  );
}
