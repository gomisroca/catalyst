'use client';

import Button from '@/app/_components/ui/button';
import { useParams } from 'next/navigation';
import { addInteractionAction } from './actions';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { FaBookmark, FaEye, FaShare, FaStar } from 'react-icons/fa6';
import { MdWarning } from 'react-icons/md';

const types = {
  LIKE: <FaStar size={12} />,
  SHARE: <FaShare size={12} />,
  BOOKMARK: <FaBookmark size={12} />,
  REPORT: <MdWarning size={12} />,
  HIDE: <FaEye size={12} />,
};

export default function BranchInteraction({
  type,
  amount,
}: {
  type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE';
  amount?: number;
}) {
  const params = useParams<{ projectId: string; branchId: string }>();
  const setMessage = useSetAtom(messageAtom);

  const handleInteraction = async (type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE') => {
    const { msg } = await addInteractionAction(type, params.projectId, params.branchId);
    if (msg) setMessage(msg);
    return;
  };

  return (
    <Button
      onClick={() => handleInteraction(type)}
      className="flex items-center justify-center gap-2 px-2 text-sm font-semibold">
      {types[type]} {amount}
    </Button>
  );
}
