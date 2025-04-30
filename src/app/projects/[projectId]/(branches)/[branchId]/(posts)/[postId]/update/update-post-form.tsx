'use client';

import Form from 'next/form';
import SubmitButton from '@/app/_components/submit-button';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { updatePost } from './actions';
import { useUploadThing } from '@/utils/uploadthing';
import Image from 'next/image';
import { type Prisma } from 'generated/prisma';

type PostWithMedia = Prisma.PostGetPayload<{
  include: { media: true };
}>;

export default function UpdatePostForm({ post }: { post: PostWithMedia }) {
  const [files, setFiles] = useState<FileList | null>(null);
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const params = useParams<{ projectId: string; branchId: string; postId: string }>();
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

          const { msg } = await updatePost({
            formData,
            ids: {
              projectId: params.projectId,
              branchId: params.branchId,
              postId: params.postId,
            },
          });

          if (msg) {
            setMessage(msg);
            return;
          }

          formRef.current?.reset();
          setFiles(null);
        } catch (error) {
          setMessage(
            error instanceof Error
              ? error.message === 'NEXT_REDIRECT'
                ? 'Post updated successfully.'
                : error.message
              : 'An unexpected error occurred.'
          );
        }
      }}>
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
