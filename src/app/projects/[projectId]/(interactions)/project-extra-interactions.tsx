'use client';

import Button from '@/app/_components/ui/button';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { type ProjectInteractionWithUser } from 'types';
import { type User } from 'next-auth';
import ProjectInteraction from './project-interaction';

type ProjectExtraInteractions = {
  user?: User;
  data: {
    reports: ProjectInteractionWithUser[];
    hides: ProjectInteractionWithUser[];
  };
};
type InteractionType = 'HIDE' | 'REPORT';
export default function ProjectExtraInteractions({ user, data }: ProjectExtraInteractions) {
  const typeMap: Record<keyof typeof data, InteractionType> = {
    hides: 'HIDE',
    reports: 'REPORT',
  };

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
          {(Object.keys(data) as Array<keyof typeof data>).map((key) => (
            <ProjectInteraction key={key} type={typeMap[key]} data={data[key]} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}
