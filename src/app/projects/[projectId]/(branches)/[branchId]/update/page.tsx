import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { auth } from '@/server/auth';
import Link from 'next/link';
import { Suspense } from 'react';
import UpdateBranchForm from './update-branch-form';
import { getBranch } from '@/server/queries/branches';

export default async function BranchUpdate({
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
    <div>
      <h1 className="mb-4 text-xl font-bold">Update Branch</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UpdateBranchForm branch={branch} />
      </Suspense>
    </div>
  );
}
