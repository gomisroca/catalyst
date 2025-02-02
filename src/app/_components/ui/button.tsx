'use client';

import { twMerge } from 'tailwind-merge';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

function Button({ onClick, children, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex items-center justify-center rounded-full p-2 transition duration-200 ease-in-out hover:bg-rose-400 active:scale-90 active:bg-rose-300 dark:hover:bg-rose-600 dark:active:bg-rose-700 [&>*]:text-zinc-900 dark:[&>*]:text-zinc-100',
        className
      )}>
      {children}
    </button>
  );
}

export default Button;
