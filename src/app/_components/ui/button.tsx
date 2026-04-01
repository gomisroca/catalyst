'use client';

/**
 * Button component with established styling and functionality.
 *
 * @example
 * <Button type="submit" arialabel="Submit" onClick={() => console.log('Button clicked!')}>Submit</Button>
 */

import { twMerge } from 'tailwind-merge';
import { useCallback, useEffect, useRef, useState } from 'react';

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
        'cursor-pointer rounded-lg bg-zinc-300 px-4 py-2 text-sm font-bold uppercase drop-shadow-sm transition-all duration-200 ease-in-out dark:bg-zinc-800',
        'hover:bg-white hover:scale-105 hover:drop-shadow-md dark:hover:bg-black',
        'active:scale-90 active:duration-100',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2',
        (disabled || isPending) && 'pointer-events-none opacity-50',
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
