'use client';

import { FaPencil, FaTrash } from 'react-icons/fa6';
import Button from '../ui/button';
import Link from '../ui/link';
import { deleteBranch, deletePost, deleteProject } from './actions';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';

interface AuthorActionsProps {
  type: 'project' | 'branch' | 'post';
  projectId: string;
  branchId?: string;
  postId?: string;
}

export default function AuthorActions({ type, projectId, branchId, postId }: AuthorActionsProps) {
  const setMessage = useSetAtom(messageAtom);

  const deleteHandlers: Record<string, () => Promise<void>> = {
    project: async () => {
      const { msg } = await deleteProject({ projectId });
      if (msg) setMessage(msg);
    },
    branch: async () => {
      if (!branchId) return;
      const { msg } = await deleteBranch({ projectId, branchId });
      if (msg) setMessage(msg);
    },
    post: async () => {
      if (!branchId || !postId) return;
      const { msg } = await deletePost({ projectId, branchId, postId });
      if (msg) setMessage(msg);
    },
  };

  const getUpdateHref = () => {
    switch (type) {
      case 'project':
        return `/projects/${projectId}/update`;
      case 'branch':
        if (!branchId) return null;
        return `/projects/${projectId}/${branchId}/update`;
      case 'post':
        if (!branchId || !postId) return null;
        return `/projects/${projectId}/${branchId}/${postId}/update`;
      default:
        return null;
    }
  };

  const updateHref = getUpdateHref();

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmed) return;
    try {
      await deleteHandlers[type]?.();
    } catch (error) {
      console.error(error);
    }
  };

  if (!updateHref) return null;

  return (
    <div className="flex items-center justify-center gap-1">
      <Link href={updateHref}>
        <FaPencil size={10} />
      </Link>
      <Button onClick={handleDelete}>
        <FaTrash size={10} />
      </Button>
    </div>
  );
}
