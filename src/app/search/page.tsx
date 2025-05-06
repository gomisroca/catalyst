import { Suspense } from 'react';
import { searchDatabase } from '@/actions/search';
import SearchBar from '@/app/_components/search/search-bar';
import { type SearchItem } from 'types';
import { BranchCard, PostCard, ProjectCard } from '@/app/_components/cards';
import { type User } from 'generated/prisma';
import Image from 'next/image';
import Link from '@/app/_components/ui/link';

// Loading component for search results
function SearchResultsSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-muted h-24 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}

// Card component for users, uniquely used here
function UserCard({ user }: { user: User }) {
  return (
    <li
      key={user.id}
      className="group flex max-w-full rounded-lg bg-zinc-300 drop-shadow-sm transition duration-200 ease-in-out hover:scale-105 hover:drop-shadow-md active:drop-shadow-none active:duration-100 dark:bg-zinc-950">
      {user.image && (
        <Image
          src={user.image}
          alt={user.name ?? 'User Profile Picture'}
          width={150}
          height={150}
          className="rounded-l-lg transition duration-200 ease-in-out group-hover:contrast-125"
        />
      )}
      <section className="flex h-full w-full flex-col">
        <Link
          href={`/profile/${user.id}`}
          className="w-full leading-3 font-bold transition duration-200 ease-in-out hover:scale-105 hover:text-rose-500 md:w-auto md:text-lg dark:hover:text-rose-700">
          {user.name}
        </Link>
      </section>
    </li>
  );
}

// Component to display search results
async function SearchResults({ query }: { query: string }) {
  const results: SearchItem[] = await searchDatabase(query); // Execute the server action with the given query

  return (
    <div className="mt-6 max-w-3xl min-w-72 space-y-4 md:min-w-md">
      {results.map((data) =>
        data.type === 'project' ? (
          <ProjectCard key={data.content.id} project={data.content} />
        ) : data.type === 'branch' ? (
          <BranchCard key={data.content.id} branch={data.content} />
        ) : data.type === 'post' ? (
          <PostCard key={data.content.id} post={data.content} />
        ) : data.type === 'user' ? (
          <UserCard key={data.content.id} user={data.content} />
        ) : null
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const query = (await searchParams).q ?? '';

  return (
    <div className="container flex max-w-3xl flex-col items-center justify-center py-8">
      <SearchBar />

      {query ? (
        <>
          <div className="mt-4">
            <p className="text-muted-foreground text-sm">Showing results for &quot;{query}&quot;</p>
          </div>
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults query={query} />
          </Suspense>
        </>
      ) : (
        <div className="w-full py-12 text-center">
          <p className="text-muted-foreground">Enter a search term to find projects, branches, posts, and users</p>
        </div>
      )}
    </div>
  );
}
