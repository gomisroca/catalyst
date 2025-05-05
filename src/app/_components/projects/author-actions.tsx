'use client';

import { FaPencil, FaTrash } from 'react-icons/fa6';
import Button from '@/app/_components/ui/button';
import Link from '@/app/_components/ui/link';

import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { type ActionReturn } from 'types';
import { toErrorMessage } from '@/utils/errors';
import { useRedirect } from '@/hooks/useRedirect';
import { deleteProject } from '@/actions/projects';
import { deleteBranch } from '@/actions/branches';
import { deletePost } from '@/actions/posts';

interface AuthorActionsProps {
  type: 'project' | 'branch' | 'post';
  projectId: string;
  branchId?: string;
  postId?: string;
}

export default function AuthorActions({ type, projectId, branchId, postId }: AuthorActionsProps) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const deleteHandlers: Record<string, () => Promise<void>> = {
    project: async () => {
      try {
        const action: ActionReturn = await deleteProject({ projectId });
        setMessage({ content: action.message, error: action.error });
        if (action.redirect) redirect(false, action.redirect);
      } catch (error) {
        setMessage({
          content: toErrorMessage(error, 'Failed to delete project'),
          error: true,
        });
      }
    },
    branch: async () => {
      if (!branchId) return;
      try {
        const action: ActionReturn = await deleteBranch({ projectId, branchId });
        setMessage({ content: action.message, error: action.error });
        if (action.redirect) redirect(false, action.redirect);
      } catch (error) {
        setMessage({
          content: toErrorMessage(error, 'Failed to delete branch'),
          error: true,
        });
      }
    },
    post: async () => {
      if (!branchId || !postId) return;
      try {
        const action: ActionReturn = await deletePost({ projectId, branchId, postId });
        setMessage({ content: action.message, error: action.error });
        if (action.redirect) redirect(false, action.redirect);
      } catch (error) {
        setMessage({
          content: toErrorMessage(error, 'Failed to delete post'),
          error: true,
        });
      }
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
      <Button onClick={handleDelete} name="Delete" className="w-fit">
        <FaTrash size={10} />
      </Button>
    </div>
  );
}
