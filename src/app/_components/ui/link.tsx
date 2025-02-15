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
        "transition duration-200 ease-in-out",
        "hover:text-transparent hover:bg-clip-text hover:bg-radial-[at_0%_50%] hover:from-rose-500 hover:to-transparent",
        "active:text-transparent active:bg-clip-text active:hover:bg-radial-[at_0%_50%] active:from-rose-600 active:to-transparent",
        "active:scale-90",
        "dark:hover:from-rose-700 dark:hover:to-transparent",
        "dark:active:from-rose-800 dark:active:to-transparent",
        className,
      )}>
      {children}
    </NextLink>
  );
}

export default Link;
