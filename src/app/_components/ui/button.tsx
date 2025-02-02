'use client';

import { twMerge } from 'tailwind-merge';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function Button({ onClick, disabled = false, children, className }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        'flex cursor-pointer items-center justify-center rounded-full p-2 transition duration-200 ease-in-out *:text-zinc-900 hover:bg-rose-500 active:scale-90 active:bg-rose-400 dark:*:text-zinc-100 dark:hover:bg-rose-700 dark:active:bg-rose-800',
        className
      )}>
      {children}
    </button>
  );
}

export default Button;
