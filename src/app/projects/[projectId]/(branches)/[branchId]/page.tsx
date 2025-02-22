import { getBranch } from '@/server/queries/branches';
import PostList from './post-list';
import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';

export default async function BranchPage({ params }: { params: Promise<{ projectId: string; branchId: string }> }) {
  const session = await auth();
  const data = await getBranch((await params).branchId);
  if (!data) return null;

  const allowCollaborate =
    (session && data.permissions?.allowCollaborate) ??
    (session && data.permissions?.allowedUsers?.includes(session?.user?.id));

  return (
    <main>
      <header>
        <h1>{data.name}</h1>
        Here will be a description of the branch, maybe a header section with some details like date of creation, number
        of contributions, interactions, etc
      </header>
      <PostList branchId={data.id} />
      {allowCollaborate && <Link href={`/projects/${data.projectId}/${data.id}/create`}>Post</Link>}
    </main>
  );
}
