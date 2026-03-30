'use client';

import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useParams } from 'next/navigation';
import { useRef } from 'react';

import { createBranch } from '@/actions/branches';
import { inputClass } from '@/app/_components/ui/form-styles';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';

export default function CreateBranchForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams<{ projectId: string }>();

  const formAction = async (formData: FormData) => {
    try {
      const action = await createBranch({
        projectId: params.projectId,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        private: formData.get('private') === 'on',
        allowCollaborate: formData.get('allowCollaborate') === 'on',
        allowShare: formData.get('allowShare') === 'on',
        allowBranch: formData.get('allowBranch') === 'on',
      });

      formRef.current?.reset();
      setMessage({ content: action.message, type: 'success' });
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      setMessage({ content: toErrorMessage(error, 'Failed to create branch'), type: 'error' });
    }
  };

  return (
    <Form className="flex flex-col items-center justify-center gap-4" ref={formRef} action={formAction}>
      <section className="flex w-full flex-col">
        <label htmlFor="name">Name</label>
        <input className={inputClass} type="text" id="name" name="name" placeholder="My New Branch" required />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          className={inputClass}
          id="description"
          name="description"
          placeholder="This is my new branch!"
          rows={3}
        />
      </section>

      <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="private">Private Branch</label>
          <input type="checkbox" id="private" name="private" defaultChecked={false} className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowCollaborate">Collaborations</label>
          <input type="checkbox" id="allowCollaborate" name="allowCollaborate" defaultChecked className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowBranch">Branching</label>
          <input type="checkbox" id="allowBranch" name="allowBranch" defaultChecked className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowShare">Sharing</label>
          <input type="checkbox" id="allowShare" name="allowShare" defaultChecked className="h-5 w-5" />
        </section>
      </div>

      <SubmitButton baseText="Create" pendingText="Creating..." className="w-full" />
    </Form>
  );
}
