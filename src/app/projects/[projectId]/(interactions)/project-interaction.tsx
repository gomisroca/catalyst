'use client';

import Button from '@/app/_components/ui/button';
import { useParams } from 'next/navigation';
import { addInteractionAction, removeInteractionAction } from './actions';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { FaBookmark, FaEye, FaShare, FaStar } from 'react-icons/fa6';
import { MdWarning } from 'react-icons/md';
import { type ProjectInteractionWithUser } from 'types';
import { type User } from 'next-auth';

const types = {
  LIKE: <FaStar size={12} />,
  SHARE: <FaShare size={12} />,
  BOOKMARK: <FaBookmark size={12} />,
  REPORT: <MdWarning size={12} />,
  HIDE: <FaEye size={12} />,
};

export default function ProjectInteraction({
  type,
  data,
  user,
}: {
  type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE';
  data?: ProjectInteractionWithUser[];
  user?: User;
}) {
  const params = useParams<{ projectId: string }>();
  const setMessage = useSetAtom(messageAtom);

  const handleInteraction = async (type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE') => {
    if (data && data.filter((i) => i.user.email === user?.email).length > 0) {
      const { msg } = await removeInteractionAction(type, params.projectId);
      if (msg) setMessage(msg);
      return;
    } else {
      const { msg } = await addInteractionAction(type, params.projectId);
      if (msg) setMessage(msg);
      return;
    }
  };

  return (
    <Button
      disabled={!user}
      onClick={() => handleInteraction(type)}
      className="flex items-center justify-center gap-2 px-2 text-sm font-semibold">
      {types[type]} {data?.length}
    </Button>
  );
}
