import { Suspense } from 'react';

import NotAllowed from '@/app/_components/not-allowed';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import UpdateBranchForm from '@/app/projects/[projectId]/(branches)/[branchId]/update/update-branch-form';
import { auth } from '@/server/auth';
import { getBranch } from '@/server/queries/branches';
import { getUserFollows } from '@/server/queries/users';

export default async function BranchUpdate({
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
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Branch</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UpdateBranchForm branch={branch} follows={follows} />
      </Suspense>
    </div>
  );
}
