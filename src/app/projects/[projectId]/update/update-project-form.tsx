'use client';

import Form from 'next/form';
import SubmitButton from '@/app/_components/submit-button';
import { useUploadThing } from '@/utils/uploadthing';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef, useState } from 'react';
import { updateProject } from './actions';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { type Prisma } from 'generated/prisma';
import { type ActionReturn } from 'types';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';

type ProjectWithPermissions = Prisma.ProjectGetPayload<{
  include: { permissions: true };
}>;

export default function UpdateProjectForm({
  project,
  modal = false,
}: {
  project: ProjectWithPermissions;
  modal?: boolean;
}) {
  const redirect = useRedirect();
  const params = useParams<{ projectId: string }>();
  const [file, setFile] = useState<File | null>(null);
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const { startUpload } = useUploadThing('projectPicture');

  return (
    <Form
      className="flex flex-col items-center justify-center gap-4"
      ref={formRef}
      action={async (formData) => {
        try {
          formData.delete('imageFile');
          if (file) {
            const data = await startUpload([file]);
            if (!data?.[0]) return;
            formData.set('picture', data[0]?.ufsUrl);
          }

          const action: ActionReturn = await updateProject({
            formData,
            projectId: params.projectId,
          });

          formRef.current?.reset();
          setFile(null);
          setMessage({
            content: action.message,
            error: action.error,
          });

          if (action.redirect) redirect(modal, action.redirect);
        } catch (error) {
          setMessage({
            content: toErrorMessage(error, 'Failed to update project'),
            error: true,
          });
        }
      }}>
      <section className="flex w-full flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="text"
          name="name"
          defaultValue={project.name ?? ''}
          placeholder={project.name ?? 'My updated project'}
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="textarea"
          name="description"
          defaultValue={project.description ?? ''}
          placeholder={project.description ?? 'This is my updated project!'}
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="imageFile">Avatar Image</label>
        {project.picture && (
          <div className="mx-auto flex flex-col text-center">
            <h4>Current Avatar</h4>
            <Image
              className="rounded-lg border-2 border-zinc-300 bg-zinc-200 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
              src={project.picture}
              height={200}
              width={200}
              alt={project.name}
            />
          </div>
        )}
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 file:mr-4 file:bg-zinc-300 file:p-2 file:transition file:duration-200 file:hover:bg-zinc-400 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:file:bg-zinc-700 dark:file:hover:bg-zinc-600 dark:focus:ring-sky-700"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setFile(file);
          }}
          name="imageFile"
          accept="image/*"
          multiple={false}
        />
      </section>
      <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="private">Private Project</label>
          <input
            type="checkbox"
            name="private"
            defaultChecked={project.permissions?.private ?? false}
            className="h-5 w-5"
          />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowCollaborate">Collaborations</label>
          <input
            type="checkbox"
            name="allowCollaborate"
            defaultChecked={project.permissions?.allowCollaborate ?? true}
            className="h-5 w-5"
          />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowShare">Sharing</label>
          <input
            type="checkbox"
            name="allowShare"
            defaultChecked={project.permissions?.allowShare ?? true}
            className="h-5 w-5"
          />
        </section>
      </div>
      <SubmitButton baseText="Update" pendingText="Updating..." className="w-full" />
    </Form>
  );
}
