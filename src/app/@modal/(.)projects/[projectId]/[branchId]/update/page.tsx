import Modal from '@/app/_components/ui/modal';
import UpdateBranchForm from '@/app/projects/[projectId]/(branches)/[branchId]/update/update-branch-form';
import { auth } from '@/server/auth';
import { getBranch } from '@/server/queries/branches';
import Link from 'next/link';

export default async function UpdateBranchModal({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string }>;
}) {
  const session = await auth();
  const branch = await getBranch((await searchParams).branchId);
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to update your branch.</p>
        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </div>
    );

  return (
    <Modal>
      <UpdateBranchForm branch={branch} modal />
    </Modal>
  );
}
