'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
/**
 * Button component with established styling and functionality.
 *
 * @example
 * <Button type="submit" arialabel="Submit" onClick={() => console.log('Button clicked!')}>Submit</Button>
 */

import { twMerge } from 'tailwind-merge';

interface ButtonProps {
  arialabel?: string;
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button({arialabel, type = 'button', disabled = false, onClick, className, children }: ButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleOnClick = useCallback(async () => {
    if (isPending || !onClick || disabled) return;
    try{
      setIsPending(true);
      await Promise.resolve(onClick());
    } catch(error) {
      console.error('Button onClick error:', error);
    } finally {
      if (isMounted.current) {
        setIsPending(false);
      }
    }
  }, [onClick, isPending, disabled]);

  
  return (
    <button
      aria-label={arialabel || 'button'}
      type={type}
      onClick={handleOnClick} 
      disabled={disabled || isPending}
      className={twMerge(
        'flex cursor-pointer items-center justify-center rounded-full p-2 transition duration-200 ease-in-out active:shadow-lg *:text-zinc-900 bg-radial-[at_15%_15%] to-75% hover:from-rose-500 active:rotate-[-1deg] active:to-rose-400 dark:active:to-rose-700 via-zinc-300 dark:via-zinc-700 active:scale-90 active:from-rose-600 dark:*:text-zinc-100 dark:hover:from-rose-700 dark:active:from-rose-800',
        className,
        (disabled || isPending) &&
          'cursor-not-allowed bg-transparent opacity-50 hover:bg-transparent active:bg-transparent dark:bg-transparent dark:hover:bg-transparent dark:active:bg-transparent'
      )}
      >
      {children}
    </button>
  );
}

export default Button;
