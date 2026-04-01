import Image from 'next/image';

import Link from '@/app/_components/ui/link';
import { getUserFollows } from '@/server/queries/users';

export default async function FollowsList({ params }: { params: Promise<{ userId: string }> }) {
  const follows = await getUserFollows((await params).userId);

  if (follows.length === 0) return <p className="text-center text-zinc-500">No follows yet.</p>;

  return (
    <ul className="flex flex-col gap-1">
      {follows.map(({ followed }) => (
        <li key={followed.id} className="flex items-center gap-2">
          <Link href={`/profile/${followed.id}`} className="flex items-center justify-center gap-2">
            <Image
              src={followed.image ?? '/user.jpg'}
              alt={followed.name ?? 'Profile Picture'}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{followed.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
