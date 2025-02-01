import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({ primary = false, size = 'medium', label, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(
        'rounded-lg px-4 py-2 dark:text-white',
        primary ? 'bg-sky-500 dark:bg-sky-800' : 'bg-neutral-500 dark:bg-neutral-800',
        size === 'small' ? 'px-3 text-sm' : size === 'large' ? 'px-6 text-lg' : 'text-base'
      )}
      {...props}>
      {label}
    </button>
  );
};
