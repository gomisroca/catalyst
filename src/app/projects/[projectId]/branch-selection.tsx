'use client';

import { type branches as branchesSchema } from '@/server/db/schema';
import { goToBranch } from './actions';
import { useParams } from 'next/navigation';

type TrimmedBranch = {
  id: string;
  name: string;
};

type BranchSelectionProps = {
  projectId: string;
  branches: (TrimmedBranch | null)[] | null;
};

export default function BranchSelection({ projectId, branches }: BranchSelectionProps) {
  const params = useParams<{ projectId: string; branchId: string }>();

  // Filter out null values
  const validBranches = branches?.filter((branch): branch is typeof branchesSchema.$inferSelect => branch !== null);
  if (!validBranches || validBranches.length === 0 || params.branchId === 'create') {
    return null;
  }

  return (
    <form
      action={goToBranch}
      className="cursor-pointer rounded-full bg-radial-[at_15%_15%] via-zinc-300 to-75% p-2 transition duration-200 ease-in-out hover:from-rose-500 dark:via-zinc-700 dark:hover:from-rose-700">
      <input type="hidden" name="projectId" value={projectId} />
      <select
        name="branchId"
        defaultValue={params.branchId ?? ''}
        className="w-full cursor-pointer rounded-full text-center"
        onChange={(e) => {
          if (e.target.value) {
            e.target.form?.requestSubmit();
          }
        }}>
        <option value="" disabled className="hidden">
          Branch
        </option>
        {validBranches.map((branch) => (
          <option key={branch.id} value={branch.id} className="rounded-lg bg-zinc-200 dark:bg-zinc-800">
            {branch.name}
          </option>
        ))}
      </select>
    </form>
  );
}
