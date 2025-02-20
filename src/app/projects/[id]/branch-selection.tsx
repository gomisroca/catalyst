'use client';

import { type branches as branchesSchema } from '@/server/db/schema';
import { goToBranch } from './actions';

type TrimmedBranch = {
  id: string;
  name: string;
};

type BranchSelectionProps = {
  projectId: string;
  branches: (TrimmedBranch | null)[] | null;
};

export default function BranchSelection({ projectId, branches }: BranchSelectionProps) {
  if (!branches) {
    return <div>No branches available</div>;
  }

  // Filter out null values
  const validBranches = branches.filter((branch): branch is typeof branchesSchema.$inferSelect => branch !== null);

  return (
    <form action={goToBranch}>
      <input type="hidden" name="projectId" value={projectId} />
      <select
        name="branchId"
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) {
            e.target.form?.requestSubmit();
          }
        }}>
        <option value="" disabled>
          Select a branch
        </option>
        {validBranches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
    </form>
  );
}
