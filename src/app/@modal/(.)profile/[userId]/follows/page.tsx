import Image from 'next/image';
import Link from '@/app/_components/ui/link';
import { getUserFollows } from '@/server/queries/users';
import Modal from '@/app/_components/ui/modal';

export default async function FollowsListModal({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserFollows((await params).userId);
  if (!data) return null;
  return (
    <Modal>
      <ul className="flex flex-col gap-1">
        {data.map((follow) => (
          <li key={follow.email} className="flex items-center gap-2">
            <Link href={`/profile/${follow.followedId}`} className="flex items-center justify-center gap-2">
              <Image
                src={follow.avatar ?? '/user.jpg'}
                alt="Profile Picture"
                width={30}
                height={30}
                className="h-8 w-8 rounded-full"
              />
              <span>{follow.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
