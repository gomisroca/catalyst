'use client';

import { type Session } from 'next-auth';
import { twMerge } from 'tailwind-merge';

function TabButton({
  tab,
  setTab,
  text,
  currentTab,
  index,
}: {
  tab: string;
  setTab: (tab: string) => void;
  text: string;
  currentTab: string;
  index: number;
}) {
  return (
    <button
      onClick={() => currentTab !== tab && setTab(tab)}
      className={twMerge(
        'cursor-pointer bg-zinc-300 p-2 text-sm font-bold uppercase drop-shadow-sm transition-all duration-200 ease-in-out dark:bg-zinc-800',
        currentTab === tab && 'cursor-not-allowed bg-zinc-400 dark:bg-zinc-900',
        currentTab !== tab &&
          'hover:scale- hover:bg-white hover:drop-shadow-md active:scale-90 active:duration-100 dark:hover:bg-black',
        index === 0 && 'rounded-l-lg',
        index === 1 && 'rounded-r-lg'
      )}>
      {text}
    </button>
  );
}

export default function HomeTabs({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  return (
    <div className="flex items-center rounded-lg bg-zinc-300 dark:bg-zinc-800">
      <TabButton tab="trending" currentTab={tab} setTab={setTab} index={0} text="Trending" />
      <TabButton tab="for-you" currentTab={tab} setTab={setTab} index={1} text="For You" />
    </div>
  );
}
