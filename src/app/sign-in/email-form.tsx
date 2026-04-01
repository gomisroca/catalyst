'use client';

import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { useEffect, useRef } from 'react';

import { signInWithEmail } from '@/actions/users';
import SubmitButton from '@/app/_components/ui/submit-button';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';

export default function EmailForm({ modal = false }: { modal?: boolean }) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);
  const formRef = useRef<HTMLFormElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const formAction = async (formData: FormData) => {
    try {
      const action = await signInWithEmail({ email: formData.get('email') as string });
      formRef.current?.reset();
      setMessage({ content: action.message, type: 'success' });
      timeoutRef.current = setTimeout(() => redirect(modal, '/'), 2000);
    } catch (error) {
      setMessage({ content: toErrorMessage(error, 'Failed to sign in'), type: 'error' });
    }
  };

  return (
    <Form className="flex flex-row gap-2" ref={formRef} action={formAction}>
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="h-9 rounded-lg bg-zinc-300 px-3 text-sm font-bold placeholder-zinc-500 transition-all duration-200 ease-in-out outline-none focus:bg-white dark:bg-zinc-800 dark:placeholder-zinc-400 dark:focus:bg-black"
      />
      <SubmitButton baseText="Sign In" pendingText="Signing In..." className="px-4" />
    </Form>
  );
}
