'use client';

import { type Branch } from 'generated/prisma';
import { goToBranch } from '@/actions/branches';
import { useParams } from 'next/navigation';
import { type ActionReturn } from 'types';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';

type BranchSelectionProps = {
  projectId: string;
  branches: Branch[];
};

export default function BranchSelection({ projectId, branches }: BranchSelectionProps) {
  const setMessage = useSetAtom(messageAtom);
  const redirect = useRedirect();
  const params = useParams<{ projectId: string; branchId: string }>();

  return (
    <form
      action={async (formData) => {
        try {
          const action: ActionReturn = await goToBranch(formData);
          if (action.redirect) redirect(false, action.redirect);
        } catch (error) {
          setMessage({
            content: toErrorMessage(error, 'Failed to go to branch'),
            error: true,
          });
        }
      }}
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
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id} className="rounded-lg bg-zinc-200 dark:bg-zinc-800">
            {branch.name}
          </option>
        ))}
      </select>
    </form>
  );
}
