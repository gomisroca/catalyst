'use client';

import Form from 'next/form';
import { createProject } from '@/app/projects/create/actions';
import SubmitButton from '@/app/_components/submit-button';
import { useUploadThing } from '@/utils/uploadthing';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { useRef, useState } from 'react';

export default function CreateProject() {
  const [file, setFile] = useState<File | null>(null);
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const { startUpload } = useUploadThing('imageUploader');

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Form
        ref={formRef}
        action={async (formData) => {
          try {
            if (file) {
              const data = await startUpload([file]);
              if (!data?.[0]) return;
              formData.set('picture', data[0]?.ufsUrl);
            }

            const { error } = await createProject(formData);

            if (error) {
              setMessage(error);
              return;
            }

            formRef.current?.reset();
            setFile(null);
            setMessage('Project created successfully.');
          } catch (error) {
            setMessage(error instanceof Error ? error.message : 'An error occurred');
          }
        }}>
        <input type="text" name="name" placeholder="Project Name" />
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setFile(file);
          }}
          name="imageFile"
          accept="image/*"
          multiple={false}
        />
        <SubmitButton baseText="Create" pendingText="Creating..." />
      </Form>
    </div>
  );
}
