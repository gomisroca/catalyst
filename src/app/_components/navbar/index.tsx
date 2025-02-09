'use client';

import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from '@/app/_components/ui/link';
import NavMenu from '@/app/_components/navbar/nav-menu';
import { type Session } from 'next-auth';

function Navbar({ session }: { session: Session | null }) {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this value (20) to change when the background changes
      const scrolled = window.scrollY > 20;
      setHasScrolled(scrolled);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={twMerge(
        'fixed top-0 z-10 flex h-12 w-full items-center justify-between px-4 transition duration-200 ease-in-out',
        hasScrolled ? 'bg-zinc-100 dark:bg-zinc-950' : 'bg-transparent'
      )}>
      <nav className="flex w-full flex-row items-center justify-between space-x-4">
        <Link href="/">
          <h1 className="text-lg leading-none font-extrabold tracking-tight uppercase lg:text-xl">Catalyst</h1>
        </Link>
        <section className="flex items-center justify-end gap-2">
          {session && <p className="text-sm leading-none tracking-tight uppercase">{session.user?.name}</p>}
          <NavMenu />
        </section>
      </nav>
    </header>
  );
}

export default Navbar;
