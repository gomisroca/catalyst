"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from 'react-icons/fa6';
import { twMerge } from "tailwind-merge";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;


  return (
   <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={twMerge(
        'cursor-pointer rounded-lg bg-zinc-300 p-2 drop-shadow-sm transition-all duration-200 ease-in-out dark:bg-zinc-800',
        'hover:bg-white hover:scale-105 hover:drop-shadow-md dark:hover:bg-black',
        'active:scale-90 active:duration-100',
      )}
    >
      <FaMoon size={16} className="block dark:hidden" />
      <FaSun size={16} className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
