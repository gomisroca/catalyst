'use server';

import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';
import { revalidatePath } from 'next/cache';

export async function deleteProject({ projectId }: { projectId: string }) {
  try {
    await db.project.delete({
      where: {
        id: projectId,
      },
    });
    return { message: 'Project deleted successfully', redirect: '/' };
  } catch (error) {
    console.log('Failed to delete project:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete project'));
  }
}

export async function deleteBranch({ projectId, branchId }: { projectId: string; branchId: string }) {
  try {
    await db.branch.delete({
      where: {
        id: branchId,
      },
    });
    revalidatePath(`/projects/${projectId}}`);
    return { message: 'Branch deleted successfully', redirect: `/projects/${projectId}` };
  } catch (error) {
    console.log('Failed to delete branch:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete branch'));
  }
}

export async function deletePost({
  projectId,
  branchId,
  postId,
}: {
  projectId: string;
  branchId: string;
  postId: string;
}) {
  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { message: 'Post deleted successfully', redirect: `/projects/${projectId}/${branchId}` };
  } catch (error) {
    console.log('Failed to delete post:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete post'));
  }
}
