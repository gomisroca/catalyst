import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import { auth } from '@/server/auth';
import { Suspense } from 'react';
import UpdateBranchForm from './update-branch-form';
import { getBranch } from '@/server/queries/branches';
import NotAllowed from '@/app/_components/not-allowed';

export default async function BranchUpdate({
  searchParams,
}: {
  searchParams: Promise<{ projectId: string; branchId: string }>;
}) {
  const session = await auth();
  const branch = await getBranch((await searchParams).branchId);
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Branch</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UpdateBranchForm branch={branch} />
      </Suspense>
    </div>
  );
}
