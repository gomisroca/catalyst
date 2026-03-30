'use client';

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

function SearchToggle({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <Button onClick={() => setOpen(!open)} arialabel="Search" className="p-1">
      {open ? <MdClear size={20} /> : <BsSearch size={20} />}
    </Button>
  );
}

function MenuToggle({
  open,
  setOpen,
  session,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
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
          width={20}
          height={20}
          className="aspect-square rounded-lg"
        />
      ) : (
        <MdOutlineMenu size={20} />
      )}
    </Button>
  );
}

function Menu({ session }: { session: Session | null }) {
  return (
    <div className="absolute top-10 right-0 z-20 flex h-fit w-40 flex-col items-center gap-2 rounded-lg bg-zinc-100 p-2 drop-shadow-md dark:bg-zinc-900">
      {session ? (
        <>
          <Link href="/settings" className="w-full text-center">
            Settings
          </Link>
          <Button onClick={() => signOut()} arialabel="Sign Out" className="w-full text-center">
            Sign Out
          </Button>
        </>
      ) : (
        <Link href="/sign-in" className="w-full text-center">
          Sign In
        </Link>
      )}
    </div>
  );
}

function NavMenu({ session }: { session: Session | null }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchParent] = useAutoAnimate();
  const [menuParent] = useAutoAnimate();
  const menuRef = useRef<HTMLDivElement>(null);

  // Opening one panel closes the other
  const handleSearchToggle = (open: boolean) => {
    setOpenSearch(open);
    if (open) setOpenMenu(false);
  };

  const handleMenuToggle = (open: boolean) => {
    setOpenMenu(open);
    if (open) setOpenSearch(false);
  };

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
      <div ref={searchParent} className="relative">
        {openSearch && <SearchBar navbar />}
      </div>
      <SearchToggle open={openSearch} setOpen={handleSearchToggle} />
      <MenuToggle open={openMenu} setOpen={handleMenuToggle} session={session} />
      <div ref={menuParent} className="relative">
        {openMenu && <Menu session={session} />}
      </div>
    </div>
  );
}

export default NavMenu;
