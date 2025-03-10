'use client';

import Button from '@/app/_components/ui/button';
import { type Session } from 'next-auth';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { followUser, unfollowUser } from './actions';
import { useParams, useRouter } from 'next/navigation';
import { messageAtom } from '@/atoms/message';
import { useSetAtom } from 'jotai';
import { startTransition, useOptimistic } from 'react';

export default function FollowMenu({
  session,
  followers,
}: {
  session: Session | null;
  followers: Array<{
    email: string | null;
    name: string | undefined;
    followerId: string;
    followedId: string;
    avatar: string | null;
  }>;
}) {
  const navigate = useRouter();
  const params = useParams<{ userId: string }>();
  const setMessage = useSetAtom(messageAtom);

  const [optimisticFollowers, setOptimisticFollowers] = useOptimistic(
    followers,
    (
      state,
      {
        action,
        follow,
      }: {
        action: 'add' | 'remove';
        follow: { email: string; name: string; followerId: string; followedId: string; avatar: string | null };
      }
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
              email: session.user.email,
              name: session.user.name,
              followerId: session.user.id,
              followedId: params.userId,
              avatar: session.user.image ?? '',
            },
          });
          const { msg } = await unfollowUser({ followedId: params.userId });
          setMessage(msg);
        } else {
          setOptimisticFollowers({
            action: 'add',
            follow: {
              email: session.user.email,
              name: session.user.name,
              followerId: session.user.id,
              followedId: params.userId,
              avatar: session.user.image ?? '',
            },
          });
          const { msg } = await followUser({ followedId: params.userId });
          setMessage(msg);
        }
      } catch (error) {
        console.error(error);
        setMessage('An unexpected error occurred');
      }
    });
  };

  return (
    <Button
      className="gap-1 text-lg"
      disabled={!session?.user.id}
      onClick={() =>
        session?.user.id === params.userId ? navigate.push(`/profile/${params.userId}/followers`) : handleFollow()
      }>
      {isFollowing ? <BsHeartFill size={20} /> : <BsHeart size={20} />} {optimisticFollowers?.length}
    </Button>
  );
}
