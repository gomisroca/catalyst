'use client';

/**
 * Renders two tabs for the timelines: Trending and For You.
 */

// Libraries
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
// Components
import Link from 'next/link';

function TabButton({ tab, text, currentTab, index }: { tab: string; text: string; currentTab: string; index: number }) {
  // Get the current pathname
  const pathname = usePathname();

  // Create a button with unique styling based on index and currentTab
  return (
    <Link
      href={tab === 'trending' ? pathname : pathname + '?tl=' + tab}
      className={twMerge(
        'cursor-pointer bg-zinc-300 p-2 text-sm font-bold uppercase drop-shadow-sm transition-all duration-200 ease-in-out dark:bg-zinc-800',
        currentTab === tab && 'pointer-events-none bg-zinc-400 dark:bg-zinc-900',
        currentTab !== tab &&
          'hover:scale- hover:bg-white hover:drop-shadow-md active:scale-90 active:duration-100 dark:hover:bg-black',
        index === 0 && 'rounded-l-lg',
        index === 1 && 'rounded-r-lg'
      )}>
      {text}
    </Link>
  );
}

export default function HomeTabs({ tab }: { tab: string }) {
  return (
    <div className="mb-4 flex items-center rounded-lg bg-zinc-300 dark:bg-zinc-800">
      {/* Render the "Trending" and "For You" tabs */}
      <TabButton tab="trending" currentTab={tab} index={0} text="Trending" />
      <TabButton tab="for-you" currentTab={tab} index={1} text="For You" />
    </div>
  );
}
