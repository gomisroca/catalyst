'use client';

import Form from 'next/form';
import SubmitButton from '@/app/_components/submit-button';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { createBranch } from './actions';

export default function CreateBranchForm() {
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams<{ projectId: string }>();
  if (!params.projectId) return null;

  return (
    <Form
      className="flex flex-col items-center justify-center gap-4"
      ref={formRef}
      action={async (formData) => {
        try {
          const { error } = await createBranch(formData, params.projectId);

          if (error) {
            setMessage(error);
            return;
          }

          formRef.current?.reset();
          setMessage('Branch created successfully.');
        } catch (error) {
          setMessage(error instanceof Error ? error.message : 'An error occurred');
        }
      }}>
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
          <label htmlFor="allowCollaborate">Allow Collaborations</label>
          <input type="checkbox" name="allowCollaborate" defaultChecked className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowBranch">Allow Branching</label>
          <input type="checkbox" name="allowBranch" defaultChecked className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowShare">Allow Sharing</label>
          <input type="checkbox" name="allowShare" defaultChecked className="h-5 w-5" />
        </section>
      </div>
      <SubmitButton baseText="Create" pendingText="Creating..." className="w-full" />
    </Form>
  );
}
