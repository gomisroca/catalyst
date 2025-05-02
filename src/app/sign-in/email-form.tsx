'use client';

import { useRef } from 'react';
import Form from 'next/form';
import SubmitButton from '@/app/_components/submit-button';
import { signInWithEmail } from './actions';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { type ActionReturn } from 'types';
import { toErrorMessage } from '@/utils/errors';
import { useRedirect } from '@/hooks/useRedirect';

export default function EmailForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form
      className="flex flex-row gap-2"
      ref={formRef}
      action={async (formData) => {
        try {
          formRef.current?.reset();
          const action: ActionReturn = await signInWithEmail(formData);

          setMessage({
            content: action.message,
            error: action.error,
          });

          setTimeout(() => redirect(modal, '/'), 2000);
        } catch (error) {
          setMessage({
            content: toErrorMessage(error, 'Failed to sign in'),
            error: true,
          });
        }
      }}>
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="w-2/3 rounded-full border border-zinc-200 px-4 py-2 focus:outline-sky-400 dark:border-zinc-800 dark:focus:outline-sky-600"
      />
      <SubmitButton baseText="Sign In" pendingText="Signing In..." className="px-4" />
    </Form>
  );
}
