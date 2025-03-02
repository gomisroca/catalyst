'use client';

import Button from '@/app/_components/ui/button';
import { type Session } from 'next-auth';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { followUser, unfollowUser } from './actions';
import { useParams } from 'next/navigation';
import { messageAtom } from '@/atoms/message';
import { useSetAtom } from 'jotai';
import { startTransition, useOptimistic } from 'react';

export default function FollowMenu({
  session,
  followers,
}: {
  session: Session | null;
  followers: Array<{ id: string; followerId: string; followedId: string }>;
}) {
  const params = useParams<{ userId: string }>();
  const setMessage = useSetAtom(messageAtom);

  const [optimisticFollowers, setOptimisticFollowers] = useOptimistic(
    followers,
    (
      state,
      { action, follow }: { action: 'add' | 'remove'; follow: { id: string; followerId: string; followedId: string } }
    ) => {
      if (action === 'add') {
        return [...state, follow];
      } else {
        return state.filter((f) => f.followerId !== follow.followerId);
      }
    }
  );

  const isFollowing = optimisticFollowers.some((follower) => follower.followerId === session?.user.id);

  const handleFollow = async () => {
    startTransition(async () => {
      try {
        if (!session?.user.id) return;
        if (isFollowing) {
          setOptimisticFollowers({
            action: 'remove',
            follow: {
              id: Math.random().toString(36),
              followerId: session.user.id,
              followedId: params.userId,
            },
          });
          const { msg } = await unfollowUser({ followedId: params.userId });
          setMessage(msg);
        } else {
          setOptimisticFollowers({
            action: 'add',
            follow: {
              id: Math.random().toString(36),
              followerId: session.user.id,
              followedId: params.userId,
            },
          });
          const { msg } = await followUser({ followedId: params.userId });
          setMessage(msg);
        }
      } catch (error) {
        console.log(error);
        setMessage('An unexpected error occurred');
      }
    });
  };
  if (session?.user.id === params.userId) {
    return (
      <span className="flex items-center justify-center gap-2 text-lg">
        <BsHeartFill size={16} /> {optimisticFollowers?.length}
      </span>
    );
  } else {
    return (
      <Button className="gap-1 text-lg" disabled={!session?.user.id} onClick={() => handleFollow()}>
        {isFollowing ? <BsHeartFill size={20} /> : <BsHeart size={20} />} {optimisticFollowers?.length}
      </Button>
    );
  }
}
