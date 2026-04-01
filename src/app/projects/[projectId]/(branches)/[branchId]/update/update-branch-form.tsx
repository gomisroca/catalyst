'use client';

import { type Prisma } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import { updateBranch } from '@/actions/branches';
import { inputClass } from '@/app/_components/ui/form-styles';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';

type BranchWithPermissions = Prisma.BranchGetPayload<{
  include: { permissions: { include: { allowedUsers: true } } };
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
  const redirect = useRedirect();
  const params = useParams<{ projectId: string; branchId: string }>();
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const [privateBranch, setPrivateBranch] = useState(branch.permissions?.private ?? false);

  const formAction = async (formData: FormData) => {
    try {
      const action = await updateBranch({
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

      formRef.current?.reset();
      setMessage({ content: action.message, type: 'success' });
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      setMessage({ content: toErrorMessage(error, 'Failed to update branch'), type: 'error' });
    }
  };

  return (
    <Form className="flex flex-col items-center justify-center gap-4" ref={formRef} action={formAction}>
      <section className="flex w-full flex-col">
        <label htmlFor="name">Name</label>
        <input
          className={inputClass}
          type="text"
          id="name"
          name="name"
          defaultValue={branch.name}
          placeholder="My updated branch"
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          className={inputClass}
          id="description"
          name="description"
          defaultValue={branch.description ?? ''}
          placeholder="This is my updated branch!"
          rows={3}
        />
      </section>

      <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="private">Private Branch</label>
          <input
            onChange={(e) => setPrivateBranch(e.target.checked)}
            type="checkbox"
            id="private"
            name="private"
            defaultChecked={branch.permissions?.private ?? false}
            className="h-5 w-5"
          />
        </section>
        {privateBranch && (
          <section className="flex flex-row justify-between gap-2">
            <label htmlFor="allowedUsers">Allowed Users</label>
            <select
              className={inputClass}
              id="allowedUsers"
              name="allowedUsers"
              multiple
              defaultValue={branch.permissions?.allowedUsers.map((u) => u.id)}>
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
            id="allowCollaborate"
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
            id="allowBranch"
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
            id="allowShare"
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
