'use client';

import Form from 'next/form';
import SubmitButton from '@/app/_components/ui/submit-button';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { createPost } from '@/actions/posts';
import { useUploadThing } from '@/utils/uploadthing';
import { type ActionReturn } from 'types';
import { toErrorMessage } from '@/utils/errors';
import { useRedirect } from '@/hooks/useRedirect';

export default function CreatePostForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect();
  const [files, setFiles] = useState<FileList | null>(null);
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams<{ projectId: string; branchId: string }>();
  const { startUpload } = useUploadThing('postMedia');

  return (
    <Form
      className="flex flex-col items-center justify-center gap-4"
      ref={formRef}
      action={async (formData) => {
        try {
          formData.delete('imageFile');
          if (files) {
            const data = await startUpload([...files]);
            if (!data) return;
            for (const file of data) {
              formData.append('media', file.ufsUrl);
            }
          }

          const action: ActionReturn = await createPost(formData, params.branchId);

          formRef.current?.reset();
          setFiles(null);
          setMessage({
            content: action.message,
            error: action.error,
          });

          if (action.redirect) redirect(modal, action.redirect);
        } catch (error) {
          setMessage({
            content: toErrorMessage(error, 'Failed to create post'),
            error: true,
          });
        }
      }}>
      <section className="flex w-full flex-col">
        <label htmlFor="title">Title</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="text"
          name="title"
          placeholder="My New Post"
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="content">Content</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="textarea"
          name="content"
          placeholder="This is my new post!"
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="imageFile">Media</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 file:mr-4 file:bg-zinc-300 file:p-2 file:transition file:duration-200 file:hover:bg-zinc-400 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:file:bg-zinc-700 dark:file:hover:bg-zinc-600 dark:focus:ring-sky-700"
          type="file"
          onChange={(e) => {
            const files = e.target.files;
            if (files) setFiles(files);
          }}
          name="imageFile"
          accept="image/*"
          multiple={true}
        />
      </section>

      <SubmitButton baseText="Create" pendingText="Creating..." className="w-full" />
    </Form>
  );
}
