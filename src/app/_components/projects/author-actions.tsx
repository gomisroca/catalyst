'use client';

/**
 * Component for the author actions of a project, branch, or post, such as deleting or updating.
 */

// Libraries
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { toErrorMessage } from '@/utils/errors';
import { useRedirect } from '@/hooks/useRedirect';
// Actions
import { deleteProject } from '@/actions/projects';
import { deleteBranch } from '@/actions/branches';
import { deletePost } from '@/actions/posts';
// Components
import { FaPencil, FaTrash } from 'react-icons/fa6';
import Button from '@/app/_components/ui/button';
import Link from '@/app/_components/ui/link';
// Types
import { type ActionReturn } from 'types';

// Define the interface for the AuthorActions component
interface AuthorActionsProps {
  type: 'project' | 'branch' | 'post';
  projectId: string;
  branchId?: string;
  postId?: string;
}

export default function AuthorActions({ type, projectId, branchId, postId }: AuthorActionsProps) {
  const redirect = useRedirect(); // Hook to redirect the user
  const setMessage = useSetAtom(messageAtom); // Hook to set the message atom

  // Define a record of delete handlers for each type
  // Each handler returns a Promise that resolves when the delete action is complete
  // The Promise returns an object with a message and an optional redirect
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

  // Define a function to get the update href for the current type
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

  // Define a function to handle the delete action
  // If the user confirms the delete, call the delete handler
  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmed) return;
    try {
      await deleteHandlers[type]?.();
    } catch (error) {
      setMessage({
        content: toErrorMessage(error, `Failed to delete ${type}`),
        error: true,
      });
    }
  };

  // If a wrong type is passed, return null
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
