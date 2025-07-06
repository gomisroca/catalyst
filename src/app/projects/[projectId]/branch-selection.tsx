'use client';

import { type Branch } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import { useParams } from 'next/navigation';
import { type ActionReturn } from 'types';

import { goToBranch } from '@/actions/branches';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';

// Expected props
type BranchSelectionProps = {
  projectId: string;
  branches: Branch[];
};

export default function BranchSelection({ projectId, branches }: BranchSelectionProps) {
  const setMessage = useSetAtom(messageAtom); // Message atom setter/getter
  const redirect = useRedirect(); // Redirect hook
  const params = useParams<{ projectId: string; branchId: string }>();

  const formAction = async (formData: FormData) => {
    try {
      // Execute the goToBranch action with the form data
      const action: ActionReturn = await goToBranch(formData);
      // Redirect to the branch
      if (action.redirect) redirect(false, action.redirect);
    } catch (error) {
      // Set the message to the error message
      setMessage({
        content: toErrorMessage(error, 'Failed to go to branch'),
        error: true,
      });
    }
  };

  return (
    <form
      action={async (formData) => formAction(formData)}
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
