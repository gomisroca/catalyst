'use client';

/**
 * Button component with established styling and functionality.
 *
 * @example
 * <Button type="submit" name="Submit" onClick={() => console.log('Button clicked!')}>Submit</Button>
 */

import { twMerge } from 'tailwind-merge';

interface Props {
  onClick?: () => void;
  type?: 'submit' | 'button';
  name: string;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

function Button({ onClick, type = 'button', name, disabled = false, children, className }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={twMerge(
        'flex cursor-pointer items-center justify-center rounded-full p-2 transition duration-200 ease-in-out active:shadow-lg *:text-zinc-900 bg-radial-[at_15%_15%] to-75% hover:from-rose-500 active:rotate-[-1deg] active:to-rose-400 dark:active:to-rose-700 via-zinc-300 dark:via-zinc-700 active:scale-90 active:from-rose-600 dark:*:text-zinc-100 dark:hover:from-rose-700 dark:active:from-rose-800',
        className,
        disabled &&
          'cursor-not-allowed bg-transparent opacity-50 hover:bg-transparent active:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent'
      )}
      >
      <span className="sr-only">{name}</span>
      {children}
    </button>
  );
}

export default Button;
