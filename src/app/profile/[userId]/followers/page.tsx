import Image from 'next/image';

import Link from '@/app/_components/ui/link';
import { getUserFollowers } from '@/server/queries/users';

export default async function FollowerList({ params }: { params: Promise<{ userId: string }> }) {
  const followers = await getUserFollowers((await params).userId);

  if (followers.length === 0) return <p className="text-center text-zinc-500">No followers yet.</p>;

  return (
    <ul className="flex flex-col gap-1">
      {followers.map(({ follower }) => (
        <li key={follower.id} className="flex items-start gap-2">
          <Link href={`/profile/${follower.id}`} className="flex items-center justify-center gap-2">
            <Image
              src={follower.image ?? '/user.jpg'}
              alt={follower.name ?? 'Profile Picture'}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{follower.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
