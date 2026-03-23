'use client';

/**
 * Renders two tabs for the timelines: Trending and For You.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

function TabButton({ tab, text, currentTab, index }: { tab: string; text: string; currentTab: string; index: number }) {
  const pathname = usePathname();

  return (
    <Link
      href={tab === 'trending' ? pathname : pathname + '?tl=' + tab}
      className={twMerge(
        'cursor-pointer px-4 py-2 text-sm font-bold uppercase drop-shadow-sm transition-all duration-200 ease-in-out',
        index === 0 && 'rounded-l-lg',
        index === 1 && 'rounded-r-lg',
        currentTab === tab
          ? 'pointer-events-none bg-white shadow-inner dark:bg-black'
          : 'bg-zinc-300 hover:bg-white hover:drop-shadow-md active:scale-90 active:duration-100 dark:bg-zinc-800 dark:hover:bg-black'
      )}>
      {text}
    </Link>
  );
}

export default function HomeTabs({ tab }: { tab: string }) {
  return (
    <div className="mb-4 flex items-center rounded-lg bg-zinc-300 dark:bg-zinc-800">
      <TabButton tab="trending" currentTab={tab} index={0} text="Trending" />
      <TabButton tab="for-you" currentTab={tab} index={1} text="For You" />
    </div>
  );
}
