'use client';

// Libraries
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
// Actions
import { createBranch } from '@/actions/branches';
// Components
import Form from 'next/form';
import SubmitButton from '@/app/_components/ui/submit-button';
// Types
import { type ActionReturn } from 'types';

export default function CreateBranchForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect(); // Redirect hook
  const setMessage = useSetAtom(messageAtom); // Message atom setter/getter

  // Form-related state and hooks
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams<{ projectId: string }>();
  if (!params.projectId) return null;

  // Action wrapper
  const formAction = async (formData: FormData) => {
    try {
      // Call the branch creation action
      const action: ActionReturn = await createBranch({
        projectId: params.projectId,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        private: formData.get('private') === 'on',
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
        content: toErrorMessage(error, 'Failed to create branch'),
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
          placeholder="My New Branch"
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="textarea"
          name="description"
          placeholder="This is my new branch!"
        />
      </section>
      <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="private">Private Branch</label>
          <input type="checkbox" name="private" defaultChecked={false} className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowCollaborate">Collaborations</label>
          <input type="checkbox" name="allowCollaborate" defaultChecked className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowBranch">Branching</label>
          <input type="checkbox" name="allowBranch" defaultChecked className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowShare">Sharing</label>
          <input type="checkbox" name="allowShare" defaultChecked className="h-5 w-5" />
        </section>
      </div>
      <SubmitButton baseText="Create" pendingText="Creating..." className="w-full" />
    </Form>
  );
}
