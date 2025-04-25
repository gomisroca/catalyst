'use client';

import { messageAtom } from '@/atoms/message';
import { useUploadThing } from '@/utils/uploadthing';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useRef, useState } from 'react';
import { updateUserSettings } from './actions';
import { type User } from 'next-auth';
import Image from 'next/image';
import SubmitButton from '../_components/submit-button';

export default function UserSettingsForm({ user }: { user: User }) {
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
          defaultValue={user.name ?? ''}
          placeholder={user.name ?? 'Your Username'}
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="name">Email</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="email"
          name="email"
          defaultValue={user.email ?? ''}
          placeholder={user.email ?? 'Your Email'}
        />
      </section>

      <section className="flex w-full flex-col gap-2">
        <label htmlFor="imageFile">Avatar</label>
        {user.image && (
          <div className="mx-auto flex flex-col text-center">
            <h4>Current Avatar</h4>
            <Image
              className="rounded-lg border-2 border-zinc-300 bg-zinc-200 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
              src={user.image}
              height={200}
              width={200}
              alt="Avatar"
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

      <SubmitButton baseText="Update" pendingText="Updating..." className="w-full" />
    </Form>
  );
}
