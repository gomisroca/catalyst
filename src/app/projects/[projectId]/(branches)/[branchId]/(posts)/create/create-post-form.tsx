'use client';

import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { type ActionReturn } from 'types';

import { createPost } from '@/actions/posts';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useUploadThing } from '@/utils/uploadthing';

export default function CreatePostForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect(); // Redirect hook
  const setMessage = useSetAtom(messageAtom); // Message atom setter/getter

  // Form-related state and hooks
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const params = useParams<{ projectId: string; branchId: string }>();
  const { startUpload } = useUploadThing('postMedia');

  // Action wrapper
  const formAction = async (formData: FormData) => {
    try {
      // Upload media if files are provided
      if (files) {
        const data = await startUpload([...files]);
        if (!data) return;
        for (const file of data) {
          formData.append('media', file.ufsUrl);
        }
      }

      // Call the post creation action
      const action: ActionReturn = await createPost({
        projectId: params.projectId,
        branchId: params.branchId,
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        media: formData.getAll('media') as string[],
      });

      // Reset the form and set the message
      formRef.current?.reset();
      setFiles(null);
      setMessage({
        content: action.message,
        error: action.error,
      });

      // If the action returns a redirect, redirect to the specified page
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      // Set the message to the error message
      setMessage({
        content: toErrorMessage(error, 'Failed to create post'),
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
