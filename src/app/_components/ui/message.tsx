'use client';

import { messageAtom } from '@/atoms/message';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const Message = () => {
  const [message, setMessage] = useAtom(messageAtom);

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
      className='border-2 border-sky-400 dark:border-sky-600 fixed right-0 bottom-10 left-0 z-[9999] m-auto flex w-[90vw] flex-col items-center justify-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-900 px-5 py-2 font-semibold xl:w-[30vw]'>
      {/* Conditional Text Based on Error */}
      <h3 className="text-lg">{message}</h3>
    </div>
  );
};

export default Message;
