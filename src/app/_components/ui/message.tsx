'use client';

import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { messageAtom } from '@/atoms/message';

const Message = () => {
  const [message, setMessage] = useAtom(messageAtom);
  const pathname = usePathname();

  useEffect(() => {
    if (message) setMessage(null);
  }, [pathname]);

  useEffect(() => {
    if (!message) return;
    const timeout = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timeout);
  }, [message]);

  if (!message) return null;

  return (
    <div
      data-testid="message"
      className={twMerge(
        'fixed bottom-10 left-0 right-0 z-9999 mx-auto flex w-[90vw] items-center justify-center rounded-lg drop-shadow-md xl:w-[30vw]',
        'bg-zinc-300 dark:bg-zinc-800',
        message.type === 'error' && 'border-l-4 border-red-500',
        message.type === 'success' && 'border-l-4 border-green-500',
        message.type === 'warning' && 'border-l-4 border-yellow-500',
      )}>
      <h3 className="w-full px-5 py-3 text-center text-sm font-semibold">{message.content}</h3>
    </div>
  );
};

export default Message;