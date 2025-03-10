import Image from 'next/image';
import Link from '@/app/_components/ui/link';
import { getUserFollowers } from '@/server/queries/users';

export default async function FollowerList({ params }: { params: Promise<{ userId: string }> }) {
  const followers = await getUserFollowers((await params).userId);
  if (!followers) return null;
  return (
    <ul className="flex flex-col gap-1">
      {followers.map((follower) => (
        <li key={follower.email} className="flex items-start gap-2">
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
  );
}
