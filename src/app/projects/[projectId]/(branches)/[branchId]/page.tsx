import { getBranch } from '@/server/queries/branches';
import PostList from './post-list';
import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';
import { FaCodeBranch, FaPen } from 'react-icons/fa6';
import ExpandedDescription from '@/app/_components/projects/ExpandedDescription';
import BranchInteractionsMenu from './(interactions)/branch-interactions-menu';

export default async function BranchPage({ params }: { params: Promise<{ projectId: string; branchId: string }> }) {
  const session = await auth();
  const data = await getBranch((await params).branchId);
  if (!data) return null;

  const allowCollaborate =
    (session && data.permissions?.allowCollaborate) ??
    (session && data.permissions?.allowedUsers?.includes(session?.user?.id));

  return (
    <main className="flex w-full flex-col gap-4">
      <header className="border-b border-zinc-300 pb-2 dark:border-zinc-700">
        <section className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaCodeBranch size={12} />
            <h1 className="text-lg font-bold">{data.name}</h1>
          </div>
          <div className="flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <span>{data.author}</span>
            <span>•</span>
            <span>
              {data.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </section>
        {data.description && <ExpandedDescription description={data.description} />}
        <BranchInteractionsMenu branchId={data.id} />
      </header>
      <PostList branchId={data.id} />
      {allowCollaborate && (
        <Link
          href={`/projects/${data.projectId}/${data.id}/create`}
          className="mx-auto flex w-1/3 items-center justify-center gap-2 font-semibold tracking-tight uppercase">
          <FaPen size={12} />
          <span>Post</span>
        </Link>
      )}
    </main>
  );
}
