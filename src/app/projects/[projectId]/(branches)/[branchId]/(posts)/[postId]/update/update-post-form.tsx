'use client';

import { type Prisma } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { type ActionReturn } from 'types';

import { updatePost } from '@/actions/posts';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useUploadThing } from '@/utils/uploadthing';

type PostWithMedia = Prisma.PostGetPayload<{
  include: { media: true };
}>;

export default function UpdatePostForm({ post, modal = false }: { post: PostWithMedia; modal?: boolean }) {
  const redirect = useRedirect(); // Redirect hook
  const setMessage = useSetAtom(messageAtom); // Message atom setter/getter

  // Form-related state and hooks
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const params = useParams<{ projectId: string; branchId: string; postId: string }>();
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

      // Call the post update action
      const action: ActionReturn = await updatePost({
        projectId: params.projectId,
        branchId: params.branchId,
        postId: params.postId,
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
        content: toErrorMessage(error, 'Failed to update post'),
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
          defaultValue={post.title ?? ''}
          placeholder={post.title ?? 'My updated Post'}
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="content">Content</label>
        <input
          className="rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
          type="textarea"
          name="content"
          defaultValue={post.content ?? ''}
          placeholder={post.content ?? 'This is my updated post!'}
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="imageFile">Media</label>
        {post.media && (
          <div className="mx-auto flex flex-col text-center">
            <h4>Current Media</h4>
            {post.media.map((media) => (
              <Image
                key={media.id}
                className="rounded-lg border-2 border-zinc-300 bg-zinc-200 focus:ring-2 focus:ring-sky-300 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:focus:ring-sky-700"
                src={media.url}
                height={200}
                width={200}
                alt={media.name ?? media.id}
              />
            ))}
          </div>
        )}
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

      <SubmitButton baseText="Update" pendingText="Updating..." className="w-full" />
    </Form>
  );
}
