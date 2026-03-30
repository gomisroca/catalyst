'use client';

import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useRef, useState } from 'react';

import { createProject } from '@/actions/projects';
import { fileInputClass, inputClass } from '@/app/_components/ui/form-styles';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useUploadThing } from '@/utils/uploadthing';

export default function CreateProjectForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing('projectPicture');

  const formAction = async (formData: FormData) => {
    try {
      if (file) {
        const data = await startUpload([file]);
        if (!data?.[0]) return;
        formData.set('picture', data[0].ufsUrl);
      }

      const action = await createProject({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        picture: formData.get('picture') as string,
        private: formData.get('private') === 'on',
        allowCollaborate: formData.get('allowCollaborate') === 'on',
        allowShare: formData.get('allowShare') === 'on',
      });

      formRef.current?.reset();
      setFile(null);
      setMessage({ content: action.message, type: 'success' });
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      setMessage({ content: toErrorMessage(error, 'Failed to create project'), type: 'error' });
    }
  };

  return (
    <Form className="flex flex-col items-center justify-center gap-4" ref={formRef} action={formAction}>
      <section className="flex w-full flex-col">
        <label htmlFor="name">Name</label>
        <input className={inputClass} type="text" id="name" name="name" placeholder="My New Project" required />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          className={inputClass}
          id="description"
          name="description"
          placeholder="This is my new project!"
          rows={3}
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="imageFile">Avatar Image</label>
        <input
          className={fileInputClass}
          type="file"
          id="imageFile"
          name="imageFile"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFile(f);
          }}
        />
      </section>

      <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-200 p-2 dark:border-zinc-700 dark:bg-zinc-800">
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="private">Private Project</label>
          <input type="checkbox" id="private" name="private" defaultChecked={false} className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowCollaborate">Collaborations</label>
          <input type="checkbox" id="allowCollaborate" name="allowCollaborate" defaultChecked className="h-5 w-5" />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowShare">Sharing</label>
          <input type="checkbox" id="allowShare" name="allowShare" defaultChecked className="h-5 w-5" />
        </section>
      </div>

      <SubmitButton baseText="Create" pendingText="Creating..." className="w-full" />
    </Form>
  );
}
