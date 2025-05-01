'use server';

import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteProject({ projectId }: { projectId: string }) {
  try {
    await db.project.delete({
      where: {
        id: projectId,
      },
    });
  } catch (error) {
    console.log(error);
    return { msg: 'An unexpected error occurred while deleting the project' };
  }
  return redirect(`/`);
}

export async function deleteBranch({ projectId, branchId }: { projectId: string; branchId: string }) {
  try {
    await db.branch.delete({
      where: {
        id: branchId,
      },
    });
  } catch (error) {
    console.log(error);
    return { msg: 'An unexpected error occurred while deleting the branch' };
  }
  revalidatePath(`/projects/${projectId}}`);
  return redirect(`/projects/${projectId}`);
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
  } catch (error) {
    console.log(error);
    return { msg: 'An unexpected error occurred while deleting the post' };
  }
  revalidatePath(`/projects/${projectId}/${branchId}`);
  return redirect(`/projects/${projectId}/${branchId}`);
}
