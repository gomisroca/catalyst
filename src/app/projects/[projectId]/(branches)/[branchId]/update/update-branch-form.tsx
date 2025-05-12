'use client';

// Libraries
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
// Actions
import { updateBranch } from '@/actions/branches';
// Components
import Form from 'next/form';
import SubmitButton from '@/app/_components/ui/submit-button';
// Types
import { type Prisma } from 'generated/prisma';
import { type ActionReturn } from 'types';

type BranchWithPermissions = Prisma.BranchGetPayload<{
  include: {
    permissions: {
      include: { allowedUsers: true };
    };
  };
}>;

export default function UpdateBranchForm({
  branch,
  follows,
  modal = false,
}: {
  branch: BranchWithPermissions;
  follows: Prisma.FollowGetPayload<{ include: { followed: true } }>[];
  modal?: boolean;
}) {
  const redirect = useRedirect(); // Redirect hook
  const params = useParams<{ projectId: string; branchId: string }>();
  const setMessage = useSetAtom(messageAtom); // Message atom setter/getter

  // Form-related state and hooks
  const formRef = useRef<HTMLFormElement>(null);
  const [privateBranch, setPrivateBranch] = useState(branch.permissions?.private ?? false);

  const formAction = async (formData: FormData) => {
    try {
      // Call the branch update action
      const action: ActionReturn = await updateBranch({
        projectId: params.projectId,
        branchId: params.branchId,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        private: formData.get('private') === 'on',
        allowedUsers: formData.getAll('allowedUsers') as string[],
        allowCollaborate: formData.get('allowCollaborate') === 'on',
        allowShare: formData.get('allowShare') === 'on',
        allowBranch: formData.get('allowBranch') === 'on',
      });

      // Reset the form and set the message
      formRef.current?.reset();
      setMessage({
        content: action.message,
        error: action.error,
      });

      // If the action returns a redirect, redirect to the specified page
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      // Set the message to the error message
      setMessage({
        content: toErrorMessage(error, 'Failed to update branch'),
        error: true,
      });
    }
  };

  return (
    <Form
      className="flex flex-col items-center justify-center gap-4"
      ref={formRef}
      action={async (formData) => formAction(formData)}>
      <section className="flex w-full flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="text"
          name="name"
          defaultValue={branch.name ?? ''}
          placeholder={branch.name ?? 'My updated branch'}
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="textarea"
          name="description"
          defaultValue={branch.description ?? ''}
          placeholder={branch.description ?? 'This is my updated branch!'}
        />
      </section>
      <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="private">Private Branch</label>
          <input
            onChange={(e) => setPrivateBranch(e.target.checked)}
            type="checkbox"
            name="private"
            defaultChecked={branch.permissions?.private ?? false}
            className="h-5 w-5"
          />
        </section>
        {privateBranch && (
          <section className="flex flex-row justify-between gap-2">
            <label htmlFor="private">Allowed Users</label>
            <select
              className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
              name="allowedUsers"
              multiple
              defaultValue={branch.permissions?.allowedUsers.map((user) => user.id)}>
              {follows.map((follow) => (
                <option key={follow.followerId} value={follow.followerId}>
                  {follow.followed.name}
                </option>
              ))}
            </select>
          </section>
        )}
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowCollaborate">Collaborations</label>
          <input
            type="checkbox"
            name="allowCollaborate"
            defaultChecked={branch.permissions?.allowCollaborate ?? true}
            className="h-5 w-5"
          />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowBranch">Branching</label>
          <input
            type="checkbox"
            name="allowBranch"
            defaultChecked={branch.permissions?.allowBranch ?? true}
            className="h-5 w-5"
          />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowShare">Sharing</label>
          <input
            type="checkbox"
            name="allowShare"
            defaultChecked={branch.permissions?.allowShare ?? true}
            className="h-5 w-5"
          />
        </section>
      </div>
      <SubmitButton baseText="Update" pendingText="Updating..." className="w-full" />
    </Form>
  );
}
