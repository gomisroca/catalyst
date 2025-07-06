'use client';

/**
 * Expandable user menu and search bar.
 */

import { useAutoAnimate } from '@formkit/auto-animate/react';
import Image from 'next/image';
import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClear, MdOutlineMenu } from 'react-icons/md';

import SearchBar from '@/app/_components/search/search-bar';
import Button from '@/app/_components/ui/button';
import Link from '@/app/_components/ui/link';

// Define a function to toggle the search bar
function SearchToggle({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Button onClick={() => setOpen(!open)} arialabel="Search" className="p-1">
      {open ? <MdClear size={20} /> : <BsSearch size={20} />}
    </Button>
  );
}

// Define a function to toggle the user menu
function MenuToggle({
  open,
  setOpen,
  session,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}) {
  return (
    <Button onClick={() => setOpen(!open)} arialabel="User Menu" className="p-1">
      {open ? (
        <MdClear size={20} />
      ) : session ? (
        <Image
          src={session.user?.image ?? '/user.jpg'}
          alt="Profile Picture"
          width={30}
          height={30}
          className="aspect-square rounded-full"
        />
      ) : (
        <MdOutlineMenu size={20} />
      )}
    </Button>
  );
}

// Define a function to render the user menu
function Menu({ session }: { session: Session | null }) {
  return (
    <div className="absolute top-[0.75rem] right-0 bottom-0 flex h-fit w-42 items-center justify-center gap-2 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-950">
      {/* If the user is signed in, render the sign out and settings links */}
      {session ? (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Button onClick={() => signOut()} arialabel="Sign Out" className="w-full text-center">
            Sign Out
          </Button>
          <Link href="/settings" className="w-full text-center">
            Settings
          </Link>
        </div>
      ) : (
        // If the user is not signed in, render the sign in link
        <Link href="/sign-in" className="w-full text-center">
          Sign In
        </Link>
      )}
    </div>
  );
}

function NavMenu({ session }: { session: Session | null }) {
  const [openMenu, setOpenMenu] = useState(false); // Track if the user menu is open
  const [openSearch, setOpenSearch] = useState(false); // Track if the search bar is open
  const [parent] = useAutoAnimate();
  const menuRef = useRef<HTMLDivElement>(null); // Reference to the menu element

  // Define a function to handle clicks outside the menu so they close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
        setOpenSearch(false);
      }
    }
    if (openMenu || openSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu, openSearch]);

  return (
    <div ref={menuRef} className="flex items-center gap-2">
      <div ref={parent} className="relative">
        {openSearch && <SearchBar navbar />}
      </div>
      <SearchToggle open={openSearch} setOpen={setOpenSearch} />
      <MenuToggle open={openMenu} setOpen={setOpenMenu} session={session} />
      <div ref={parent} className="relative">
        {openMenu && <Menu session={session} />}
      </div>
    </div>
  );
}

export default NavMenu;
