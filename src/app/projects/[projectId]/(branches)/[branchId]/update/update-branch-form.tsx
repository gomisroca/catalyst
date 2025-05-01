'use client';

import Form from 'next/form';
import SubmitButton from '@/app/_components/submit-button';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef } from 'react';
import { useParams } from 'next/navigation';
import { updateBranch } from './actions';
import { type Prisma } from 'generated/prisma';

type BranchWithPermissions = Prisma.BranchGetPayload<{
  include: { permissions: true };
}>;

export default function UpdateBranchForm({ branch }: { branch: BranchWithPermissions }) {
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams<{ projectId: string; branchId: string }>();

  return (
    <Form
      className="flex flex-col items-center justify-center gap-4"
      ref={formRef}
      action={async (formData) => {
        try {
          const { msg } = await updateBranch({
            formData,
            ids: {
              projectId: params.projectId,
              branchId: params.branchId,
            },
          });

          if (msg) {
            setMessage(msg);
            return;
          }

          formRef.current?.reset();
        } catch (error) {
          setMessage(
            error instanceof Error
              ? error.message === 'NEXT_REDIRECT'
                ? 'Branch updated successfully.'
                : error.message
              : 'An unexpected error occurred.'
          );
        }
      }}>
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
            type="checkbox"
            name="private"
            defaultChecked={branch.permissions?.private ?? false}
            className="h-5 w-5"
          />
        </section>
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
