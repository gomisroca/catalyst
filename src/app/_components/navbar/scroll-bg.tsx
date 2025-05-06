'use client';

// Libraries
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

function ScrollBg() {
  const [hasScrolled, setHasScrolled] = useState(false); // Track if the user has scrolled

  useEffect(() => {
    // Define the scroll event listener
    const handleScroll = () => {
      const scrolled = window.scrollY > 20; // Check if the user has scrolled
      setHasScrolled(scrolled); // Update the state
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    // Create a span with the background color and transition
    // Has the background color when the user has scrolled
    <span
      className={twMerge(
        'absolute top-0 left-0 z-[-1] flex h-full w-full transition duration-500 ease-in-out',
        hasScrolled && 'bg-zinc-100 dark:bg-zinc-950'
      )}
    />
  );
}

export default ScrollBg;
