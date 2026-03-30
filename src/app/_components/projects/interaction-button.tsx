'use client';

import { useSetAtom } from 'jotai';
import { type User } from 'next-auth';
import { startTransition, useOptimistic } from 'react';
import { FaBookmark, FaEye, FaShare, FaStar } from 'react-icons/fa6';
import { MdWarning } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { type InteractionType } from 'types';

import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';

const interactionIcons: Record<InteractionType, React.ReactNode> = {
  LIKE: <FaStar size={12} />,
  SHARE: <FaShare size={12} />,
  BOOKMARK: <FaBookmark size={12} />,
  REPORT: <MdWarning size={12} />,
  HIDE: <FaEye size={12} />,
};

const hiddenCount: InteractionType[] = ['HIDE', 'REPORT'];

type InteractionWithUser = {
  id: string;
  type: string;
  createdAt: Date;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
  };
};

type InteractionButtonProps = {
  type: InteractionType;
  data?: InteractionWithUser[];
  user?: User;
  onInteract: () => Promise<{ message: string }>;
  entityId: string;
  entityKey: string; // e.g. 'projectId', 'branchId', 'postId'
};

export default function InteractionButton({
  type,
  data = [],
  user,
  onInteract,
  entityId,
  entityKey,
}: InteractionButtonProps) {
  const setMessage = useSetAtom(messageAtom);

  const [optimisticInteractions, setOptimisticInteraction] = useOptimistic(
    data,
    (state, { action, interaction }: { action: 'add' | 'remove'; interaction: InteractionWithUser }) =>
      action === 'add' ? [...state, interaction] : state.filter((i) => i.user.email !== interaction.user.email)
  );

  const hasInteracted = optimisticInteractions.some((i) => i.user.email === user?.email && i.type === type);

  const handleInteraction = () => {
    if (!user?.id || !user?.email) return;

    const optimisticInteraction: InteractionWithUser = {
      type,
      id: Math.random().toString(36),
      [entityKey]: entityId,
      createdAt: new Date(),
      userId: user.id,
      user: {
        id: user.id,
        name: user.name ?? null,
        email: user.email,
        emailVerified: null,
        image: null,
      },
    };

    startTransition(async () => {
      try {
        setOptimisticInteraction({ action: hasInteracted ? 'remove' : 'add', interaction: optimisticInteraction });
        const result = await onInteract();
        setMessage({ content: result.message, type: 'success' });
      } catch (error) {
        setMessage({ content: toErrorMessage(error, 'Failed to interact'), type: 'error' });
      }
    });
  };

  return (
    <Button
      arialabel={type}
      disabled={!user}
      onClick={handleInteraction}
      className={twMerge(
        'flex h-6 items-center justify-center gap-2 px-2 text-sm font-semibold',
        hasInteracted && 'bg-white dark:bg-black'
      )}>
      {interactionIcons[type]}
      {!hiddenCount.includes(type) && optimisticInteractions.length}
    </Button>
  );
}
