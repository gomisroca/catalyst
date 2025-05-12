import NotAllowed from '@/app/_components/not-allowed';
import Modal from '@/app/_components/ui/modal';
import UpdateBranchForm from '@/app/projects/[projectId]/(branches)/[branchId]/update/update-branch-form';
import { auth } from '@/server/auth';
import { getBranch } from '@/server/queries/branches';
import { getUserFollows } from '@/server/queries/users';

export default async function UpdateBranchModal({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string }>;
}) {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  const follows = await getUserFollows(session.user.id);
  const branch = await getBranch((await searchParams).branchId);

  return (
    <Modal>
      <UpdateBranchForm branch={branch} follows={follows} modal />
    </Modal>
  );
}
