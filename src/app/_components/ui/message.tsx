'use client';

/**
 * Display a message to the user, with an optional error state. Uses jotai's atoms to store the message.
 *
 * @example
 * setMessage({ content: 'Hello, world!', error: false })
 */

import { messageAtom } from '@/atoms/message';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const Message = () => {
  const [message, setMessage] = useAtom(messageAtom); // Hook to get and set the message atom

  const pathname = usePathname(); // Get the current path

  // Clear message and error on route change
  useEffect(() => {
    if (message) {
      setMessage(null);
    }
  }, [pathname]);

  // Automatically hide popup after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage(null);
    }, 5000);

    // Cleanup timeout when popup state changes
    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  return (
    <div
      className=
      {twMerge('p-1 bg-radial-[at_15%_15%] via-zinc-300 to-75% ease-in-out from-rose-500 dark:via-zinc-700 dark:from-rose-700 fixed right-0 bottom-10 left-0 z-[9999] m-auto flex w-[90vw] flex-col items-center justify-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-900 font-semibold xl:w-[30vw]', message.error ? 'to-rose-500' : 'to-sky-500')}>
      <h3 className="text-lg px-5 py-2 w-full text-center bg-zinc-100 dark:bg-zinc-900 rounded-full">{message.content}</h3>
    </div>
  );
};

export default Message;
