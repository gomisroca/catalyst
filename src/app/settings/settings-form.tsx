'use client';

import { messageAtom } from '@/atoms/message';
import { useUploadThing } from '@/utils/uploadthing';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useRef, useState } from 'react';
import { updateUserSettings } from './actions';
import { type User } from 'next-auth';

export default function UserSettingsForm({ user }: { user: User }) {
  console.log(user);

  const [file, setFile] = useState<File | null>(null);
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const { startUpload } = useUploadThing('profilePicture');

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

          const { msg } = await updateUserSettings(formData);

          if (msg) {
            setMessage(msg);
            return;
          }

          formRef.current?.reset();
          setFile(null);
          setMessage('Settings updated successfully.');
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
    </Form>
  );
}
