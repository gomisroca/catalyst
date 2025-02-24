'use client';

import Form from 'next/form';
import { createProject } from '@/app/projects/create/actions';
import SubmitButton from '@/app/_components/submit-button';
import { useUploadThing } from '@/utils/uploadthing';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef, useState } from 'react';

export default function CreateProjectForm() {
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

          const { msg } = await createProject(formData);

          if (msg) {
            setMessage(msg);
            return;
          }

          formRef.current?.reset();
          setFile(null);
          setMessage('Project created successfully.');
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
          placeholder="My New Project"
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="textarea"
          name="description"
          placeholder="This is my new project!"
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="imageFile">Avatar Image</label>
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
          <input type="checkbox" name="private" defaultChecked={false} className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowCollaborate">Allow Collaborations</label>
          <input type="checkbox" name="allowCollaborate" defaultChecked className="h-5 w-5" />
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
