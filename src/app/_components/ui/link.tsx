/**
 * Wrapper of Next's Link component with established styling and functionality.
 *
 * @example
 * <Link href="/about" className="w-full">About</Link>
 */

import NextLink from 'next/link';
import { twMerge } from 'tailwind-merge';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function Link({ href, children, className }: Props) {
  return (
    <NextLink
      href={href}
      className={twMerge(
        'cursor-pointer rounded-lg bg-zinc-300 px-4 py-2 text-sm font-bold uppercase drop-shadow-sm transition-all duration-200 ease-in-out dark:bg-zinc-800',
        'hover:bg-white hover:scale-105 hover:drop-shadow-md dark:hover:bg-black',
        'active:scale-90 active:duration-100',
        className
      )}>
      {children}
    </NextLink>
  );
}

export default Link;