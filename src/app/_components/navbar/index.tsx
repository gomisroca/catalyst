'use client';

import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from '@/app/_components/ui/link';
import NavMenu from '@/app/_components/navbar/nav-menu';

function Navbar() {
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
        hasScrolled ? 'bg-zinc-100 dark:bg-zinc-900' : 'bg-transparent'
      )}>
      <nav className="flex w-full flex-row items-center justify-between space-x-4">
        <Link href="/">
          <h1 className="text-lg font-extrabold uppercase leading-none tracking-tight lg:text-xl">Catalyst</h1>
        </Link>
        <NavMenu />
      </nav>
    </header>
  );
}

export default Navbar;
