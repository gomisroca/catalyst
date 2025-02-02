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
        'hover:text-rose-400 active:text-rose-300 dark:hover:text-rose-600 dark:active:text-rose-700 [&>*]:transition [&>*]:duration-200 [&>*]:ease-in-out active:[&>*]:scale-90',
        className
      )}>
      {children}
    </NextLink>
  );
}

export default Link;
