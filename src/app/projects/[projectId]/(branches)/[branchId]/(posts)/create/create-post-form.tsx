'use client';

import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import { createPost } from '@/actions/posts';
import { fileInputClass, inputClass } from '@/app/_components/ui/form-styles';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useUploadThing } from '@/utils/uploadthing';

export default function CreatePostForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const params = useParams<{ projectId: string; branchId: string }>();
  const { startUpload } = useUploadThing('postMedia');

  const formAction = async (formData: FormData) => {
    try {
      if (files) {
        const data = await startUpload([...files]);
        if (!data) return;
        for (const file of data) {
          formData.append('media', file.ufsUrl);
        }
      }

      const action = await createPost({
        branchId: params.branchId,
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        media: formData.getAll('media') as string[],
      });

      formRef.current?.reset();
      setFiles(null);
      setMessage({ content: action.message, type: 'success' });
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      setMessage({ content: toErrorMessage(error, 'Failed to create post'), type: 'error' });
    }
  };

  return (
    <Form className="flex flex-col items-center justify-center gap-4" ref={formRef} action={formAction}>
      <section className="flex w-full flex-col">
        <label htmlFor="title">Title</label>
        <input className={inputClass} type="text" id="title" name="title" placeholder="My New Post" required />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="content">Content</label>
        <textarea className={inputClass} id="content" name="content" placeholder="This is my new post!" rows={3} />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="imageFile">Media</label>
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

      <SubmitButton baseText="Create" pendingText="Creating..." className="w-full" />
    </Form>
  );
}
