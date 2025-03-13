'use client';

import { useEffect, useRef, useState } from 'react';
import Link from './ui/link';
import { type Session } from 'next-auth';
import { FaCircleChevronDown, FaCircleChevronUp } from 'react-icons/fa6';
import Button from './ui/button';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function SidebarContent({ session }: { session: Session | null }) {
  return (
    <nav className="flex min-h-16 w-42 flex-col items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-950">
      <div className="flex w-full flex-col items-center gap-2">
        {/* This should be its own section titled Projects, with an expandable list of the user projects */}
        <h4 className="text-lg font-semibold">Projects</h4>
        <Link href="/someProject" className="w-full">
          Some Project
        </Link>
      </div>
      <hr className="w-full border border-zinc-300 dark:border-zinc-700" />
      <div className="flex w-full flex-col items-center gap-2">
        {/* This should be its own section titled Branches, with an expandable list of the user branches */}
        <h4 className="text-lg font-semibold">Branches</h4>
        <Link href="/someProject/someBranch" className="w-full">
          Some Branch
        </Link>
      </div>
      <hr className="w-full border border-zinc-300 dark:border-zinc-700" />
      <div className="flex w-full flex-col items-center gap-2">
        {/* This should be its own section titled Bookmarks, with an expandable list of the user bookmarks */}
        <h4 className="text-lg font-semibold">Bookmarks</h4>
        <Link href="/someProject/someBranch" className="w-full">
          Some Branch
        </Link>
      </div>
    </nav>
  );
}

export default function Sidebar({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <aside ref={menuRef} className="absolute top-0 bottom-0 left-0 mt-10 flex h-fit w-50 flex-col gap-4 p-4">
      <Button className="w-fit" onClick={() => setOpen(!open)}>
        {!open ? <FaCircleChevronDown size={20} /> : <FaCircleChevronUp size={20} />}
      </Button>
      <div ref={parent} className="relative">
        {open && <SidebarContent session={session} />}
      </div>
    </aside>
  );
}
