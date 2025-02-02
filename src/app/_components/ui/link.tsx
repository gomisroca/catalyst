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
        '*:transition *:duration-200 *:ease-in-out hover:text-rose-500 active:text-rose-400 *:active:scale-90 dark:hover:text-rose-700 dark:active:text-rose-800',
        className
      )}>
      {children}
    </NextLink>
  );
}

export default Link;
