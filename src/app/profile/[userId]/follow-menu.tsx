'use client';

import { useSetAtom } from 'jotai';
import { useParams, useRouter } from 'next/navigation';
import { type Session } from 'next-auth';
import { startTransition, useOptimistic } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { type ExtendedFollow } from 'types';

import { toggleFollowUser } from '@/actions/users';
import Button from '@/app/_components/ui/button';
import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';

export default function FollowMenu({ session, followers }: { session: Session | null; followers: ExtendedFollow[] }) {
  const router = useRouter();
  const params = useParams<{ userId: string }>();
  const setMessage = useSetAtom(messageAtom);

  const [optimisticFollowers, setOptimisticFollowers] = useOptimistic(
    followers,
    (state, { action, follow }: { action: 'add' | 'remove'; follow: ExtendedFollow }) => {
      if (action === 'add') return [...state, follow];
      return state.filter((f) => f.followerId !== follow.followerId);
    }
  );

  const isFollowing = optimisticFollowers.some((f) => f.followerId === session?.user.id);

  const handleFollow = async () => {
    if (!session?.user.id) return;

    const optimisticFollow: ExtendedFollow = {
      id: Math.random().toString(36),
      createdAt: new Date(),
      followerId: session.user.id,
      followedId: params.userId,
      follower: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: null,
        image: null,
      },
    };

    startTransition(async () => {
      try {
        setOptimisticFollowers({ action: isFollowing ? 'remove' : 'add', follow: optimisticFollow });
        const action = await toggleFollowUser({ followedId: params.userId });
        setMessage({ content: action.message, type: 'success' });
      } catch (error) {
        setMessage({ content: toErrorMessage(error, 'Failed to follow or unfollow user'), type: 'error' });
      }
    });
  };

  return (
    <Button
      className="gap-1 text-lg"
      disabled={!session?.user.id}
      onClick={() =>
        session?.user.id === params.userId ? router.push(`/profile/${params.userId}/followers`) : handleFollow()
      }
      arialabel="Follow">
      {isFollowing ? <BsHeartFill size={16} /> : <BsHeart size={16} />}
    </Button>
  );
}
