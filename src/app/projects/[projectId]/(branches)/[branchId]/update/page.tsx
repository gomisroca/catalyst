import NotAllowed from '@/app/_components/not-allowed';
import UpdateBranchForm from '@/app/projects/[projectId]/(branches)/[branchId]/update/update-branch-form';
import { auth } from '@/server/auth';
import { getBranch } from '@/server/queries/branches';
import { getUserFollows } from '@/server/queries/users';

export default async function BranchUpdate({ params }: { params: Promise<{ projectId: string; branchId: string }> }) {
  const { branchId } = await params;
  const session = await auth();
  if (!session) return <NotAllowed />;

  const [branch, follows] = await Promise.all([getBranch(branchId), getUserFollows(session.user.id)]);

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Branch</h1>
      <UpdateBranchForm branch={branch} follows={follows} />
    </div>
  );
}
