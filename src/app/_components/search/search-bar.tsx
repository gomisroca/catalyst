'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

export default function SearchBar({ navbar = false }: { navbar?: boolean }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={twMerge('w-full max-w-md', navbar && 'absolute top-10 right-0 h-fit w-fit')}>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={twMerge(
            'h-9 rounded-l-lg bg-zinc-300 px-3 text-sm font-bold text-zinc-900 placeholder-zinc-500 drop-shadow-sm transition-all duration-200 ease-in-out outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400',
            'hover:bg-white dark:hover:bg-black',
            'focus:bg-white dark:focus:bg-black',
            navbar ? 'w-32' : 'w-full'
          )}
        />
        <button
          type="submit"
          aria-label="Go to Search"
          className={twMerge(
            'h-9 cursor-pointer rounded-r-lg bg-zinc-300 px-3 drop-shadow-sm transition-all duration-200 ease-in-out dark:bg-zinc-800',
            'hover:scale-105 hover:bg-white hover:drop-shadow-md dark:hover:bg-black',
            'active:scale-90 active:duration-100'
          )}>
          <BsArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
