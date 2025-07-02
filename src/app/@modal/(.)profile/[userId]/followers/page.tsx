import Image from 'next/image';

import Link from '@/app/_components/ui/link';
import Modal from '@/app/_components/ui/modal';
import { getUserFollowers } from '@/server/queries/users';

export default async function FollowerListModal({ params }: { params: Promise<{ userId: string }> }) {
  const data = await getUserFollowers((await params).userId);

  return (
    <Modal>
      <ul className="flex flex-col gap-1">
        {data.map((data) => (
          <li key={data.follower.email} className="flex items-start gap-2">
            <Link href={`/profile/${data.follower.id}`} className="flex items-center justify-center gap-2">
              <Image
                src={data.follower.image ?? '/user.jpg'}
                alt={data.follower.name ?? 'Profile Picture'}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full"
              />
              <span>{data.follower.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
