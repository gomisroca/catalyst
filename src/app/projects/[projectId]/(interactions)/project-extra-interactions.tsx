'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { type Prisma } from 'generated/prisma';
import { type User } from 'next-auth';
import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';

import Button from '@/app/_components/ui/button';
import ProjectInteraction from '@/app/projects/[projectId]/(interactions)/project-interaction';

// Expected props
type ProjectInteractionWithUser = Prisma.ProjectInteractionGetPayload<{
  include: { user: true };
}>;
type ProjectExtraInteractionsProps = {
  user?: User;
  data: {
    reports: ProjectInteractionWithUser[];
    hides: ProjectInteractionWithUser[];
  };
};
// Interaction types the component can handle
type InteractionType = 'HIDE' | 'REPORT';
export default function ProjectExtraInteractions({ user, data }: ProjectExtraInteractionsProps) {
  // Map the interaction types to their corresponding InteractionType
  const typeMap: Record<keyof typeof data, InteractionType> = {
    hides: 'HIDE',
    reports: 'REPORT',
  };

  // By default, hide the interaction buttons
  const [open, setOpen] = useState(false);
  const [parent] = useAutoAnimate();
  return (
    <div ref={parent} className="flex gap-2">
      <Button
        onClick={() => setOpen(!open)}
        className="my-auto flex h-5 w-5 items-center justify-center rounded-full"
        arialabel="More">
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
