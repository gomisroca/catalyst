import Image from 'next/image';
import Link from '@/app/_components/ui/link';
import { getUserFollows } from '@/server/queries/users';

export default async function FollowsList({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserFollows((await params).userId);

  return (
    <ul className="flex flex-col gap-1">
      {data.map((data) => (
        <li key={data.followed.email} className="flex items-center gap-2">
          <Link href={`/profile/${data.followed.id}`} className="flex items-center justify-center gap-2">
            <Image
              src={data.followed.image ?? '/user.jpg'}
              alt={data.followed.name ?? 'Profile Picture'}
              width={30}
              height={30}
              className="h-8 w-8 rounded-full"
            />
            <span>{data.followed.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
