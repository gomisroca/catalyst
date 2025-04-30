import { getBranch } from '@/server/queries/branches';
import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';
import { FaCodeBranch, FaPen } from 'react-icons/fa6';
import ExpandedDescription from '@/app/_components/projects/expanded-description';
import BranchInteractionsMenu from './(interactions)/branch-interactions-menu';
import PostList from './post-list';

export default async function BranchPage({ params }: { params: Promise<{ projectId: string; branchId: string }> }) {
  const session = await auth();
  const branch = await getBranch((await params).branchId);
  if (!branch) return null;

  const allowCollaborate =
    (session && branch.permissions?.allowCollaborate) ??
    (session && branch.permissions?.allowedUsers?.some((user) => user.id === session.user.id));

  return (
    <main className="flex w-full flex-col gap-4">
      <header className="border-b border-zinc-300 pb-2 dark:border-zinc-700">
        <section className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FaCodeBranch size={12} />
            <h1 className="text-lg font-bold">{branch.name}</h1>
          </div>
          <div className="flex gap-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <span>{branch.author?.name ? branch.author?.name : branch.author?.email.split('@')[0]}</span>
            <span>•</span>
            <span>
              {branch.createdAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </section>
        {branch.description && <ExpandedDescription description={branch.description} />}
        <section className="flex items-center justify-between rounded-b-lg bg-zinc-100 p-2 text-sm font-medium transition duration-200 ease-in-out group-hover:bg-zinc-300 dark:bg-zinc-900 group-hover:dark:bg-zinc-950">
          <BranchInteractionsMenu branchId={branch.id} />
        </section>
      </header>
      <PostList projectId={(await params).projectId} branchId={branch.id} session={session} posts={branch.posts} />

      {allowCollaborate && (
        <Link
          href={`/projects/${branch.projectId}/${branch.id}/create`}
          className="mx-auto flex w-1/3 items-center justify-center gap-2 font-semibold tracking-tight uppercase">
          <FaPen size={12} />
          <span>Post</span>
        </Link>
      )}
    </main>
  );
}
