import dynamic from 'next/dynamic';

import ThemeButton from '@/app/_components/ui/theme-button';

// Dynamically import the Message component for SSG and SSR
const Message = dynamic(() => import('@/app/_components/ui/message'));

function Footer() {
  return (
    <>
      <Message />
      <footer className="fixed bottom-0 flex h-12 w-full items-center justify-between space-x-2 px-4">
        <p className="text-sm leading-none tracking-tight text-zinc-400 dark:text-zinc-800">
          © {new Date().getFullYear()} Catalyst
        </p>
        <ThemeButton />
      </footer>
    </>
  );
}

export default Footer;
