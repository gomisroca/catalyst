'use client';

import Button from '@/app/_components/ui/button';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import BranchInteraction from './branch-interaction';
import { twMerge } from 'tailwind-merge';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export default function BranchExtraInteractions() {
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();
  return (
    <div ref={parent} className="flex gap-2">
      <Button
        onClick={() => setOpen(!open)}
        className="my-auto flex h-[25px] w-[25px] items-center justify-center rounded-full">
        <span className="text-sm font-semibold">
          <BsThreeDotsVertical
            size={12}
            className={twMerge('transition duration-200 ease-in-out', open && 'rotate-90')}
          />
        </span>
      </Button>
      {open && (
        <div className="flex gap-2">
          <BranchInteraction type="HIDE" />
          <BranchInteraction type="REPORT" />
        </div>
      )}
    </div>
  );
}
