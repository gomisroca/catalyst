'use client';

import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { BsArrowRight } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';

export default function SearchBar({ navbar = false }: { navbar?: boolean }) {
  const setMessage = useSetAtom(messageAtom);
  const { pending } = useFormStatus();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      setMessage({
        content: toErrorMessage(error, 'Failed to navigate to search page'),
        error: true,
      });
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={twMerge('w-full max-w-md', navbar && 'absolute top-4 right-[-45] bottom-0 h-fit w-fit')}>
      <div className="flex items-center gap-0">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={twMerge(
            'h-9 rounded-l-lg bg-zinc-300 px-3 text-sm font-bold text-zinc-900 placeholder-zinc-500 drop-shadow-sm transition-all duration-200 ease-in-out outline-none dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400',
            'hover:bg-white dark:hover:bg-black',
            'focus:bg-white dark:focus:bg-black',
            navbar ? 'w-32 py-1' : 'w-full py-2'
          )}
        />
        <button
          type="submit"
          aria-label="Go to Search"
          disabled={pending}
          className={twMerge(
            'h-9 cursor-pointer rounded-r-lg bg-zinc-300 px-3 drop-shadow-sm transition-all duration-200 ease-in-out dark:bg-zinc-800',
            'hover:scale-105 hover:bg-white hover:drop-shadow-md dark:hover:bg-black',
            'active:scale-90 active:duration-100',
            navbar ? 'py-1' : 'py-2',
            pending && 'pointer-events-none opacity-50'
          )}>
          <BsArrowRight size={16} />
        </button>
      </div>
    </form>
  );
}
