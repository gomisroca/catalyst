'use client';

import { type Branch } from 'generated/prisma';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

type BranchSelectionProps = {
  projectId: string;
  branches: Branch[];
};

export default function BranchSelection({ projectId, branches }: BranchSelectionProps) {
  const router = useRouter();
  const params = useParams<{ projectId: string; branchId: string }>();

  const renderedOptions = useMemo(() => {
    return branches.map((branch) => (
      <option key={branch.id} value={branch.id} className="bg-zinc-200 dark:bg-zinc-800">
        {branch.name}
      </option>
    ));
  }, [branches]);

  return (
    <select
      defaultValue={params.branchId ?? ''}
      onChange={(e) => {
        if (e.target.value) router.push(`/projects/${projectId}/${e.target.value}`);
      }}
      className={twMerge(
        'cursor-pointer rounded-lg bg-zinc-300 px-4 py-2 text-sm font-bold uppercase drop-shadow-sm',
        'transition-all duration-200 ease-in-out',
        'hover:bg-white hover:drop-shadow-md dark:bg-zinc-800 dark:hover:bg-black'
      )}>
      <option value="" disabled className="hidden">
        Branch
      </option>
      {renderedOptions}
    </select>
  );
}
