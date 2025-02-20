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
        "transition duration-200 ease-in-out bg-radial-[at_15%_15%] to-75% p-2 rounded-full active:scale-90 hover:from-rose-500 active:rotate-[-1deg] active:to-rose-400 dark:active:to-rose-700 via-sky-300 dark:via-sky-700 active:from-rose-600 dark:*:text-zinc-100 dark:hover:from-rose-700 dark:active:from-rose-800",
        className,
      )}>
      {children}
    </NextLink>
  );
}

export default Link;
