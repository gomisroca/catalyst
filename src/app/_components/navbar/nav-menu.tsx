'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/app/_components/ui/button';
import { MdOutlineMenu, MdClear } from 'react-icons/md';
import { useAutoAnimate } from '@formkit/auto-animate/react';

function MenuToggle({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return <Button onClick={() => setOpen(!open)}>{open ? <MdClear size={20} /> : <MdOutlineMenu size={20} />}</Button>;
}

function Menu() {
  return (
    <div className="absolute top-[0.75rem] right-0 bottom-0 flex min-h-16 items-center justify-center rounded-md bg-zinc-100 p-4 dark:bg-zinc-900">
      hello
    </div>
  );
}

function NavMenu() {
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
      <MenuToggle open={open} setOpen={setOpen} />
      <div ref={parent} className="relative">
        {open && <Menu />}
      </div>
    </div>
  );
}

export default NavMenu;
