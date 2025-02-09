'use client';

import { twMerge } from 'tailwind-merge';

interface Props {
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function Button({ onClick, type = 'button', disabled = false, children, className }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={twMerge(
        'flex cursor-pointer items-center justify-center rounded-full p-2 transition duration-200 ease-in-out *:text-zinc-900 hover:bg-rose-500 active:scale-90 active:bg-rose-400 dark:*:text-zinc-100 dark:hover:bg-rose-700 dark:active:bg-rose-800',
        className,
        disabled &&
          'cursor-not-allowed bg-transparent opacity-50 hover:bg-transparent active:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent'
      )}>
      {children}
    </button>
  );
}

export default Button;
