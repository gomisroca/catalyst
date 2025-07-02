'use client';

import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useRef } from 'react';
import { type ActionReturn } from 'types';

import { signInWithEmail } from '@/actions/users';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';

export default function EmailForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect(); // Redirect hook
  const setMessage = useSetAtom(messageAtom); // Message atom setter/getter

  // Form-related state and hooks
  const formRef = useRef<HTMLFormElement>(null);

  // Action wrapper
  const formAction = async (formData: FormData) => {
    try {
      const action: ActionReturn = await signInWithEmail({ email: formData.get('email') as string });

      // Reset the form and set the message
      formRef.current?.reset();
      setMessage({
        content: action.message,
        error: action.error,
      });

      // Redirect to the home page after 2 seconds
      setTimeout(() => redirect(modal, '/'), 2000);
    } catch (error) {
      setMessage({
        content: toErrorMessage(error, 'Failed to sign in'),
        error: true,
      });
    }
  };

  return (
    <Form className="flex flex-row gap-2" ref={formRef} action={async (formData) => formAction(formData)}>
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
