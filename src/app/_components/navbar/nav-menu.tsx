'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/app/_components/ui/button';
import { MdOutlineMenu, MdClear } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

function MenuToggle({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return <Button onClick={() => setOpen(!open)}>{open ? <MdClear size={20} /> : <MdOutlineMenu size={20} />}</Button>;
}

function Menu({ open }: { open: boolean }) {
  return (
    <div
      className={twMerge(
        'absolute bottom-0 right-10 top-0 hidden items-center justify-center rounded-full px-4 transition duration-200 ease-in-out',
        open && 'flex'
      )}>
      hello
    </div>
  );
}

function NavMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    // Add event listener when menu is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div
      ref={menuRef}
      className={twMerge(
        'relative',
        open &&
          'flex w-64 justify-end rounded-full border border-zinc-300 bg-zinc-200 transition duration-200 ease-in-out dark:border-zinc-700 dark:bg-zinc-800'
      )}>
      {open && <Menu open={open} />}

      <MenuToggle open={open} setOpen={setOpen} />
    </div>
  );
}

export default NavMenu;
