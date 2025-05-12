'use client';

// Libraries
import { type Session } from 'next-auth';
import { followUser } from '@/actions/users';
import { useParams, useRouter } from 'next/navigation';
import { messageAtom } from '@/atoms/message';
import { useSetAtom } from 'jotai';
import { startTransition, useOptimistic } from 'react';
import { toErrorMessage } from '@/utils/errors';
// Components
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import Button from '@/app/_components/ui/button';
// Types
import { type ActionReturn, type ExtendedFollow } from 'types';

export default function FollowMenu({ session, followers }: { session: Session | null; followers: ExtendedFollow[] }) {
  const navigate = useRouter();
  const params = useParams<{ userId: string }>();
  const setMessage = useSetAtom(messageAtom);

  // Optimistic followers state
  const [optimisticFollowers, setOptimisticFollowers] = useOptimistic(
    followers,
    (
      state,
      {
        action,
        follow,
      }: {
        action: 'add' | 'remove';
        follow: {
          follower: {
            name: string | null;
            id: string;
            email: string;
            emailVerified: Date | null;
            image: string | null;
          };
          id: string;
          followerId: string;
          followedId: string;
          createdAt: Date;
        };
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
        // Update the optimistic followers state depending on the action
        if (isFollowing) {
          setOptimisticFollowers({
            action: 'remove',
            follow: {
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
            },
          });
        } else {
          setOptimisticFollowers({
            action: 'add',
            follow: {
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
            },
          });
        }
        const action: ActionReturn = await followUser({ followedId: params.userId });

        setMessage({
          content: action.message,
          error: action.error,
        });
        return;
      } catch (error) {
        setMessage({
          content: toErrorMessage(error, 'Failed to follow or unfollow user'),
          error: true,
        });
      }
    });
  };

  return (
    <Button
      className="gap-1 text-lg"
      disabled={!session?.user.id}
      onClick={() =>
        session?.user.id === params.userId ? navigate.push(`/profile/${params.userId}/followers`) : handleFollow()
      }
      name="Follow">
      {isFollowing ? <BsHeartFill size={16} /> : <BsHeart size={16} />}
    </Button>
  );
}
