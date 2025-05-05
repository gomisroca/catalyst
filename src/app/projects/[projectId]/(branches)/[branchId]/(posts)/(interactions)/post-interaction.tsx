'use client';

import Button from '@/app/_components/ui/button';
import { useParams } from 'next/navigation';
import { interactionAction } from '@/actions/posts';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { FaBookmark, FaEye, FaShare, FaStar } from 'react-icons/fa6';
import { MdWarning } from 'react-icons/md';
import { type User } from 'next-auth';
import { twMerge } from 'tailwind-merge';
import { startTransition, useOptimistic } from 'react';
import { type Prisma } from 'generated/prisma';
import { type ActionReturn, type InteractionType } from 'types';
import { toErrorMessage } from '@/utils/errors';

const types = {
  LIKE: <FaStar size={12} />,
  SHARE: <FaShare size={12} />,
  BOOKMARK: <FaBookmark size={12} />,
  REPORT: <MdWarning size={12} />,
  HIDE: <FaEye size={12} />,
};

type PostInteractionWithUser = Prisma.PostInteractionGetPayload<{
  include: { user: true };
}>;
export default function PostInteraction({
  postId,
  type,
  data,
  user,
}: {
  postId: string;
  type: InteractionType;
  data?: PostInteractionWithUser[];
  user?: User;
}) {
  const params = useParams<{ projectId: string; branchId: string }>();
  const setMessage = useSetAtom(messageAtom);

  const [optimisticInteractions, setOptimisticInteraction] = useOptimistic(
    data!,
    (state, { action, newInteraction }: { action: 'add' | 'remove'; newInteraction: PostInteractionWithUser }) => {
      if (action === 'add') {
        return [...state, newInteraction];
      } else {
        return state.filter((i) => i.user.email !== newInteraction.user?.email);
      }
    }
  );

  const hasInteracted = optimisticInteractions.some((i) => i.user.email === user?.email && i.type === type);

  const handleInteraction = async (type: InteractionType) => {
    startTransition(async () => {
      try {
        if (hasInteracted) {
          setOptimisticInteraction({
            action: 'remove',
            newInteraction: {
              type,
              id: Math.random().toString(36),
              postId,
              createdAt: new Date(),
              userId: user!.id!,
              user: {
                id: Math.random().toString(36),
                name: user!.name!,
                email: user!.email!,
                emailVerified: null,
                image: null,
              },
            },
          });
        } else {
          setOptimisticInteraction({
            action: 'add',
            newInteraction: {
              type,
              id: Math.random().toString(36),
              postId,
              createdAt: new Date(),
              userId: user!.id!,
              user: {
                id: Math.random().toString(36),
                name: user!.name!,
                email: user!.email!,
                emailVerified: null,
                image: null,
              },
            },
          });
        }

        const action: ActionReturn = await interactionAction(type, params.projectId, params.branchId, postId);
        setMessage({
          content: action.message,
          error: action.error,
        });
        return;
      } catch (error) {
        console.log(error);
        setMessage({
          content: toErrorMessage(error, 'Failed to interact'),
          error: true,
        });
      }
    });
  };

  return (
    <Button
      disabled={!user}
      onClick={() => handleInteraction(type)}
      className={twMerge(
        'flex h-6 items-center justify-center gap-2 px-2 text-sm font-semibold',
        hasInteracted && 'from-sky-300 dark:from-sky-700'
      )}>
      {types[type]} {optimisticInteractions?.length}
    </Button>
  );
}
