import { type User } from 'generated/prisma';
import Image from 'next/image';
import { Suspense } from 'react';
import { type SearchItem } from 'types';

import { searchDatabase } from '@/actions/search';
import { renderCard } from '@/app/_components/cards';
import SearchBar from '@/app/_components/search/search-bar';
import Link from '@/app/_components/ui/link';

function SearchResultsSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-36 animate-pulse rounded-lg bg-zinc-300 dark:bg-zinc-800" />
      ))}
    </div>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <li className="group flex h-36 max-w-full rounded-lg bg-zinc-300 drop-shadow-sm transition-all duration-200 ease-in-out hover:bg-white hover:drop-shadow-md active:scale-95 active:duration-100 dark:bg-zinc-800 dark:hover:bg-black">
      {user.image && (
        <Image
          src={user.image}
          alt={user.name ?? 'User Profile Picture'}
          width={144}
          height={144}
          className="h-full w-auto rounded-l-lg object-cover transition duration-200 ease-in-out group-hover:contrast-125"
        />
      )}
      <section className="flex h-full w-full flex-col justify-center px-4">
        <Link href={`/profile/${user.id}`} className="font-bold hover:underline md:text-lg">
          {user.name ?? user.email.split('@')[0]}
        </Link>
      </section>
    </li>
  );
}

async function SearchResults({ query }: { query: string }) {
  const results: SearchItem[] = await searchDatabase(query);

  if (results.length === 0)
    return <p className="mt-6 text-center text-zinc-500">No results found for &quot;{query}&quot;</p>;

  return (
    <ul className="mt-6 grid w-full max-w-3xl grid-cols-1 gap-4">
      {results.map((data) =>
        data.type === 'user' ? <UserCard key={data.content.id} user={data.content} /> : renderCard(data)
      )}
    </ul>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const query = (await searchParams).q ?? '';

  return (
    <div className="flex w-full max-w-3xl flex-col items-center justify-center py-8">
      <SearchBar />
      {query ? (
        <>
          <p className="mt-4 text-sm text-zinc-500">Showing results for &quot;{query}&quot;</p>
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults query={query} />
          </Suspense>
        </>
      ) : (
        <p className="w-full py-12 text-center text-zinc-500">
          Enter a search term to find projects, branches, posts, and users
        </p>
      )}
    </div>
  );
}
