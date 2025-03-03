'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/app/_components/ui/button';
import { MdOutlineMenu, MdClear } from 'react-icons/md';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Link from '@/app/_components/ui/link';
import { type Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

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
    <Button onClick={() => setOpen(!open)}>
      {open ? (
        <MdClear size={20} />
      ) : session ? (
        <Image
          src={session.user?.avatar ?? '/user.jpg'}
          alt="Profile Picture"
          width={20}
          height={20}
          className="rounded-full"
        />
      ) : (
        <MdOutlineMenu size={20} />
      )}
    </Button>
  );
}

function Menu({ session }: { session: Session | null }) {
  return (
    <div className="absolute top-[0.75rem] right-0 bottom-0 flex min-h-16 w-42 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 dark:bg-zinc-950">
      {session ? (
        <Button onClick={() => signOut()} className="w-full text-center">
          Sign Out
        </Button>
      ) : (
        <Link href="/sign-in" className="w-full text-center">
          Sign In
        </Link>
      )}
    </div>
  );
}

function NavMenu({ session }: { session: Session | null }) {
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
    <div ref={menuRef}>
      <MenuToggle open={open} setOpen={setOpen} session={session} />
      <div ref={parent} className="relative">
        {open && <Menu session={session} />}
      </div>
    </div>
  );
}

export default NavMenu;
