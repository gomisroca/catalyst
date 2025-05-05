'use client';

import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Button from '../ui/button';
import { useFormStatus } from 'react-dom';
import { BsArrowRightCircle } from 'react-icons/bs';

export default function SearchBar({ navbar = false }: { navbar?: boolean }) {
  const { pending } = useFormStatus();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Error navigating to search page:', error);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={twMerge(
        'w-full max-w-md',
        navbar
          ? 'absolute top-4 right-[-45] bottom-0 h-fit w-fit rounded-lg bg-zinc-100 p-2 dark:bg-zinc-950'
          : 'relative'
      )}>
      <div className="relative flex items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={twMerge('rounded-lg ring-1', navbar ? 'w-32 p-1 pr-0' : 'p-2 pr-10')}
        />
        <Button type="submit" className="h-[30px] w-[30px] font-semibold whitespace-nowrap" disabled={pending}>
          <BsArrowRightCircle size={20} />
        </Button>
      </div>
    </form>
  );
}
