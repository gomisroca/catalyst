'use client';

import { messageAtom } from '@/atoms/message';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Message = () => {
  const [{ message, error }, setMessage] = useAtom(messageAtom);

  const pathname = usePathname(); // Get the current path

  // Clear message and error on route change
  useEffect(() => {
    if (message || error) {
      setMessage({ message: null });
    }
  }, [pathname]);

  // Automatically hide popup after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage({ message: null });
    }, 5000);

    // Cleanup timeout when popup state changes
    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed right-0 bottom-10 left-0 z-99 m-auto flex w-[90vw] flex-col items-center justify-center gap-2 rounded-lg border px-5 py-2 font-semibold xl:w-[30vw] ${
        error
          ? 'border-red-500 bg-red-200/90 dark:bg-red-800/90'
          : 'border-green-500 bg-green-200/90 dark:bg-green-800/90'
      }`}>
      {/* Conditional Text Based on Error */}
      <p>{error ? 'An error occurred' : 'Success'}</p>
      <h1 className="text-xl">{message}</h1>
      {error && <p>Please try again</p>}
    </div>
  );
};

export default Message;
