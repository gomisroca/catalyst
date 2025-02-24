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

export default function Interaction({ type }: { type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE' }) {
  const params = useParams<{ projectId: string; branchId: string }>();
  const setMessage = useSetAtom(messageAtom);

  const handleInteraction = async (type: 'LIKE' | 'SHARE' | 'BOOKMARK' | 'REPORT' | 'HIDE') => {
    const { msg } = await addInteractionAction(type, params.branchId);
    if (msg) setMessage(msg);
    return;
  };

  return <Button onClick={() => handleInteraction(type)}>{types[type]}</Button>;
}
