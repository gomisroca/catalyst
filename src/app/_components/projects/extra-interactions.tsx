'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { type User } from 'next-auth';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';
import { type InteractionType, type InteractionWithUser } from 'types';

import InteractionButton from '@/app/_components/projects/interaction-button';
import Button from '@/app/_components/ui/button';

type ExtraInteractionsProps = {
  user?: User;
  data: {
    reports: InteractionWithUser[];
    hides: InteractionWithUser[];
  };
  entityId: string;
  entityKey: string;
  onInteract: (type: InteractionType) => Promise<{ message: string }>;
};

const typeMap: Record<'reports' | 'hides', InteractionType> = {
  hides: 'HIDE',
  reports: 'REPORT',
};

export default function ExtraInteractions({ user, data, entityId, entityKey, onInteract }: ExtraInteractionsProps) {
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className="flex gap-2">
      <Button
        onClick={() => setOpen(!open)}
        className="my-auto size-6 items-center justify-center px-0 py-0"
        arialabel="More">
        <BsThreeDotsVertical
          size={12}
          className={twMerge('transition duration-200 ease-in-out', open && 'rotate-90')}
        />
      </Button>
      {open && (
        <div className="flex gap-2">
          {(Object.keys(data) as Array<keyof typeof data>).map((key) => (
            <InteractionButton
              key={key}
              type={typeMap[key]}
              data={data[key]}
              user={user}
              entityId={entityId}
              entityKey={entityKey}
              onInteract={() => onInteract(typeMap[key])}
            />
          ))}
        </div>
      )}
    </div>
  );
}
