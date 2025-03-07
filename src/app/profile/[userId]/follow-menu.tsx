'use client';

import Button from '@/app/_components/ui/button';
import { type Session } from 'next-auth';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { followUser, unfollowUser } from './actions';
import { useParams } from 'next/navigation';
import { messageAtom } from '@/atoms/message';
import { useSetAtom } from 'jotai';
import { type ElementRef, startTransition, useOptimistic, useRef, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { MdClear } from 'react-icons/md';
import Image from 'next/image';
import Link from '@/app/_components/ui/link';

function FollowerList({
  followers,
}: {
  followers: Array<{
    email: string | null;
    name: string | undefined;
    followerId: string;
    followedId: string;
    avatar: string | null;
  }>;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<ElementRef<'dialog'>>(null);
  const [parent] = useAutoAnimate();

  return (
    <>
      <Button onClick={() => setOpen(!open)} className="flex items-center justify-center gap-2 text-lg">
        <BsHeartFill size={16} /> {followers?.length}
      </Button>
      {open && (
        <div
          className="absolute top-0 right-0 bottom-0 left-0 z-[1000] flex items-center justify-center bg-black/70"
          ref={parent}>
          <dialog
            ref={dialogRef}
            className="max-height-[500px] relative m-auto flex w-[80%] max-w-[500px] items-center justify-center rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900"
            onClose={() => setOpen(false)}>
            <ul className="flex flex-col gap-1">
              {followers.map((follower) => (
                <li key={follower.email} className="flex items-center gap-2">
                  <Link href={`/profile/${follower.followerId}`} className="flex items-center justify-center gap-2">
                    <Image
                      src={follower.avatar ?? '/user.jpg'}
                      alt="Profile Picture"
                      width={30}
                      height={30}
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{follower.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button onClick={() => setOpen(false)} className="absolute top-[10px] right-[10px]">
              <MdClear size={10} />
            </Button>
          </dialog>
        </div>
      )}
    </>
  );
}

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
        console.log(error);
        setMessage('An unexpected error occurred');
      }
    });
  };

  if (session?.user.id === params.userId) return <FollowerList followers={optimisticFollowers} />;
  else {
    return (
      <Button className="gap-1 text-lg" disabled={!session?.user.id} onClick={() => handleFollow()}>
        {isFollowing ? <BsHeartFill size={20} /> : <BsHeart size={20} />} {optimisticFollowers?.length}
      </Button>
    );
  }
}
