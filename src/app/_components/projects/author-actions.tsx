'use client';

import { useSetAtom } from 'jotai';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { type ActionReturn } from 'types';

import { deleteBranch } from '@/actions/branches';
import { deletePost } from '@/actions/posts';
import { deleteProject } from '@/actions/projects';
import Button from '@/app/_components/ui/button';
import Link from '@/app/_components/ui/link';
import { messageAtom } from '@/atoms/message';
import { useRedirect } from '@/hooks/useRedirect';
import { toErrorMessage } from '@/utils/errors';

interface AuthorActionsProps {
  type: 'project' | 'branch' | 'post';
  projectId: string;
  branchId?: string;
  postId?: string;
}

export default function AuthorActions({ type, projectId, branchId, postId }: AuthorActionsProps) {
  const redirect = useRedirect();
  const setMessage = useSetAtom(messageAtom);

  const deleteHandlers: Record<'project' | 'branch' | 'post', () => Promise<void>> = {
    project: async () => {
      try {
        const action: ActionReturn = await deleteProject({ projectId });
        setMessage({ content: action.message, type: action.error ? 'error' : 'success' });
        if (action.redirect) redirect(false, action.redirect);
      } catch (error) {
        setMessage({ content: toErrorMessage(error, 'Failed to delete project'), type: 'error' });
      }
    },
    branch: async () => {
      if (!branchId) return;
      try {
        const action: ActionReturn = await deleteBranch({ projectId, branchId });
        setMessage({ content: action.message, type: action.error ? 'error' : 'success' });
        if (action.redirect) redirect(false, action.redirect);
      } catch (error) {
        setMessage({ content: toErrorMessage(error, 'Failed to delete branch'), type: 'error' });
      }
    },
    post: async () => {
      if (!branchId || !postId) return;
      try {
        const action: ActionReturn = await deletePost({ projectId, branchId, postId });
        setMessage({ content: action.message, type: action.error ? 'error' : 'success' });
        if (action.redirect) redirect(false, action.redirect);
      } catch (error) {
        setMessage({ content: toErrorMessage(error, 'Failed to delete post'), type: 'error' });
      }
    },
  };

  const updateHref = {
    project: `/projects/${projectId}/update`,
    branch: branchId ? `/projects/${projectId}/${branchId}/update` : null,
    post: branchId && postId ? `/projects/${projectId}/${branchId}/${postId}/update` : null,
  }[type];

  if (!updateHref) return null;

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    await deleteHandlers[type]();
  };

  return (
    <div className="flex items-center justify-center gap-1">
      <Link href={updateHref}>
        <FaPencil size={10} />
      </Link>
      <Button onClick={handleDelete} arialabel="Delete" className="w-fit">
        <FaTrash size={10} />
      </Button>
    </div>
  );
}
