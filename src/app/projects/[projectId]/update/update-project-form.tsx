'use client';

import { type Prisma } from 'generated/prisma';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';

import { updateProject } from '@/actions/projects';
import { fileInputClass, inputClass } from '@/app/_components/ui/form-styles';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';
import { useUploadThing } from '@/utils/uploadthing';

type ProjectWithPermissions = Prisma.ProjectGetPayload<{
  include: { permissions: { include: { allowedUsers: true } } };
}>;

export default function UpdateProjectForm({
  project,
  follows,
  modal = false,
}: {
  project: ProjectWithPermissions;
  follows: Prisma.FollowGetPayload<{ include: { followed: true } }>[];
  modal?: boolean;
}) {
  const redirect = useRedirect();
  const params = useParams<{ projectId: string }>();
  const setMessage = useSetAtom(messageAtom);
  const [file, setFile] = useState<File | null>(null);
  const [privateProject, setPrivateProject] = useState(project.permissions?.private ?? false);
  const formRef = useRef<HTMLFormElement>(null);
  const { startUpload } = useUploadThing('projectPicture');

  const formAction = async (formData: FormData) => {
    try {
      if (file) {
        const data = await startUpload([file]);
        if (!data?.[0]) return;
        formData.set('picture', data[0].ufsUrl);
      }

      const action = await updateProject({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        picture: formData.get('picture') as string,
        private: formData.get('private') === 'on',
        allowedUsers: formData.getAll('allowedUsers') as string[],
        allowCollaborate: formData.get('allowCollaborate') === 'on',
        allowShare: formData.get('allowShare') === 'on',
        id: params.projectId,
      });

      formRef.current?.reset();
      setFile(null);
      setMessage({ content: action.message, type: 'success' });
      if (action.redirect) redirect(modal, action.redirect);
    } catch (error) {
      setMessage({ content: toErrorMessage(error, 'Failed to update project'), type: 'error' });
    }
  };

  return (
    <Form className="flex flex-col items-center justify-center gap-4" ref={formRef} action={formAction}>
      <section className="flex w-full flex-col">
        <label htmlFor="name">Name</label>
        <input
          className={inputClass}
          type="text"
          id="name"
          name="name"
          defaultValue={project.name}
          placeholder="My updated project"
          required
        />
      </section>

      <section className="flex w-full flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          className={inputClass}
          id="description"
          name="description"
          defaultValue={project.description ?? ''}
          placeholder="This is my updated project!"
          rows={3}
        />
      </section>

      <section className="flex w-full flex-col gap-2">
        <label htmlFor="imageFile">Avatar Image</label>
        {project.picture && (
          <div className="mx-auto flex flex-col text-center">
            <h4>Current Avatar</h4>
            <Image className="rounded-lg" src={project.picture} height={200} width={200} alt={project.name} />
          </div>
        )}
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
          <input
            onChange={(e) => setPrivateProject(e.target.checked)}
            type="checkbox"
            id="private"
            name="private"
            defaultChecked={project.permissions?.private ?? false}
            className="h-5 w-5"
          />
        </section>
        {privateProject && (
          <section className="flex flex-row justify-between gap-2">
            <label htmlFor="allowedUsers">Allowed Users</label>
            <select
              className={inputClass}
              id="allowedUsers"
              name="allowedUsers"
              multiple
              defaultValue={project.permissions?.allowedUsers.map((u) => u.id)}>
              {follows.map((follow) => (
                <option key={follow.followerId} value={follow.followerId}>
                  {follow.followed.name}
                </option>
              ))}
            </select>
          </section>
        )}
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowCollaborate">Collaborations</label>
          <input
            type="checkbox"
            id="allowCollaborate"
            name="allowCollaborate"
            defaultChecked={project.permissions?.allowCollaborate ?? true}
            className="h-5 w-5"
          />
        </section>
        <hr className="border-zinc-300 dark:border-zinc-700" />
        <section className="flex flex-row justify-between gap-2">
          <label htmlFor="allowShare">Sharing</label>
          <input
            type="checkbox"
            id="allowShare"
            name="allowShare"
            defaultChecked={project.permissions?.allowShare ?? true}
            className="h-5 w-5"
          />
        </section>
      </div>

      <SubmitButton baseText="Update" pendingText="Updating..." className="w-full" />
    </Form>
  );
}
