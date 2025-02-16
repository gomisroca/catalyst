'use client';

import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

function ScrollBg() {
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
    <span
      className={twMerge(
        'absolute top-0 left-0 z-[-1] flex h-full w-full transition duration-500 ease-in-out',
        hasScrolled && 'bg-zinc-100 dark:bg-zinc-950'
      )}
    />
  );
}

export default ScrollBg;
