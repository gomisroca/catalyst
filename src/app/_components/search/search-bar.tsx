'use client';

/**
 * Search bar component with a search button.
 */

// Libraries
import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useFormStatus } from 'react-dom';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';
// Components
import Button from '@/app/_components/ui/button';
import { BsArrowRightCircle } from 'react-icons/bs';

export default function SearchBar({ navbar = false }: { navbar?: boolean }) {
  const setMessage = useSetAtom(messageAtom);
  const { pending } = useFormStatus();
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    // If the query is empty, return
    if (!query.trim()) return;

    // Navigate to the search page with the query as a query parameter
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
        <Button
          type="submit"
          name="Go to Search"
          className="h-[30px] w-[30px] font-semibold whitespace-nowrap"
          disabled={pending}>
          <BsArrowRightCircle size={20} />
        </Button>
      </div>
    </form>
  );
}
