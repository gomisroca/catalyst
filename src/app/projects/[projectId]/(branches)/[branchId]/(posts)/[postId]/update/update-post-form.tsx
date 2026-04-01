'use client';

import { type Prisma } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import { updatePost } from '@/actions/posts';
import { fileInputClass, inputClass } from '@/app/_components/ui/form-styles';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useUploadThing } from '@/utils/uploadthing';

type PostWithMedia = Prisma.PostGetPayload<{ include: { media: true } }>;

export default function UpdatePostForm({ post, modal = false }: { post: PostWithMedia; modal?: boolean }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const params = useParams<{ projectId: string; branchId: string; postId: string }>();
  const { startUpload } = useUploadThing('postMedia');

  const formAction = async (formData: FormData) => {
    try {
      if (files) {
        const data = await startUpload([...files]);
        if (!data) return;
        for (const file of data) formData.append('media', file.ufsUrl);
      }

      const action = await updatePost({
        projectId: params.projectId,
        branchId: params.branchId,
        postId: params.postId,
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        media: formData.getAll('media') as string[],
      });

      formRef.current?.reset();
      setFiles(null);
      setMessage({ content: action.message, type: 'success' });
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      setMessage({ content: toErrorMessage(error, 'Failed to update post'), type: 'error' });
    }
  };

  return (
    <Form className="flex flex-col items-center justify-center gap-4" ref={formRef} action={formAction}>
      <section className="flex w-full flex-col">
        <label htmlFor="title">Title</label>
        <input
          className={inputClass}
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          placeholder="My updated post"
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="content">Content</label>
        <textarea
          className={inputClass}
          id="content"
          name="content"
          defaultValue={post.content ?? ''}
          placeholder="This is my updated post!"
          rows={3}
        />
      </section>

      <section className="flex w-full flex-col gap-2">
        <label htmlFor="imageFile">Media</label>
        {post.media.length > 0 && (
          <div className="mx-auto flex flex-col gap-2 text-center">
            <h4>Current Media</h4>
            {post.media.map((media) => (
              <Image
                key={media.id}
                className="rounded-lg"
                src={media.url}
                height={200}
                width={200}
                alt={media.name ?? media.id}
              />
            ))}
          </div>
        )}
        <input
          className={fileInputClass}
          type="file"
          id="imageFile"
          name="imageFile"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) setFiles(e.target.files);
          }}
        />
      </section>

      <SubmitButton baseText="Update" pendingText="Updating..." className="w-full" />
    </Form>
  );
}
