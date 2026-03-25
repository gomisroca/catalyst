'use server';

import { revalidatePath } from 'next/cache';
import { type InteractionType } from 'types';
import { z } from 'zod';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { getBranch } from '@/server/queries/branches';
import { toErrorMessage } from '@/utils/errors';
import { MediaUrlSchema } from '@/utils/schemas';

const PostSchema = z.object({
  title: z.string().min(3, 'Post title must be at least 3 characters long'),
  content: z.string().optional(),
  media: z.array(MediaUrlSchema).max(5).optional(),
});

type CreatePostData = {
  branchId: string;
  title: string;
  content: string;
  media: string[];
};

export async function createPost(createData: CreatePostData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a post');

  const branch = await getBranch(createData.branchId);
  if (!branch.permissions?.allowCollaborate && session.user.id !== branch.authorId)
    throw new Error('You do not have permission to collaborate in this branch');

  const validatedFields = PostSchema.safeParse(createData);
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  try {
    const newPostId = await db.$transaction(async (trx) => {
      const newPost = await trx.post.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: session.user.id,
          projectId: branch.projectId,
          branchId: branch.id,
        },
      });

      if (data.media?.length) {
        await trx.postMedia.createMany({
          data: data.media.map((url) => ({
            name: url.split('/').pop() ?? url,
            url,
            postId: newPost.id,
          })),
        });
      }

      return newPost.id;
    });

    console.log(`Post ${newPostId} created by user ${session.user.id}`);
    revalidatePath(`/projects/${branch.projectId}/${createData.branchId}`);
    return { message: 'Post created successfully.', redirect: `/projects/${branch.projectId}/${createData.branchId}` };
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error(toErrorMessage(error, 'Failed to create post'));
  }
}

type UpdatePostData = {
  projectId: string;
  branchId: string;
  postId: string;
  title: string;
  content: string;
  media: string[];
};

export async function updatePost(updateData: UpdatePostData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a post');

  const existingPost = await db.post.findFirst({
    where: { id: updateData.postId, authorId: session.user.id, branchId: updateData.branchId },
  });
  if (!existingPost) throw new Error('Post not found or you do not have permission to update it.');

  const validatedFields = PostSchema.safeParse({
    title: updateData.title ?? existingPost.title,
    content: updateData.content ?? existingPost.content,
    media: updateData.media,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  try {
    await db.$transaction(async (trx) => {
      await trx.post.update({
        where: { id: updateData.postId },
        data: {
          title: data.title,
          content: data.content,
          updatedAt: new Date(),
        },
      });

      // Always replace media — deleteMany + createMany handles both empty and non-empty cases
      await trx.postMedia.deleteMany({ where: { postId: updateData.postId } });

      if (data.media?.length) {
        await trx.postMedia.createMany({
          data: data.media.map((url) => ({
            name: url.split('/').pop() ?? url,
            url,
            postId: updateData.postId,
          })),
        });
      }
    });

    console.log(`Post ${updateData.postId} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${updateData.projectId}/${updateData.branchId}`);
    return {
      message: 'Post updated successfully.',
      redirect: `/projects/${updateData.projectId}/${updateData.branchId}`,
    };
  } catch (error) {
    console.error('Failed to update post:', error);
    throw new Error(toErrorMessage(error, 'Failed to update post'));
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
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to delete a post');

    const existingPost = await db.post.findFirst({
      where: { id: postId, authorId: session.user.id, branchId },
    });
    if (!existingPost) throw new Error('You do not have permission to delete this post');

    await db.post.delete({ where: { id: postId } });

    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { message: 'Post deleted successfully', redirect: `/projects/${projectId}/${branchId}` };
  } catch (error) {
    console.log('Failed to delete post:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete post'));
  }
}

export async function togglePostInteraction(
  type: InteractionType,
  projectId: string,
  branchId: string,
  postId: string
) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact with a post');

    const where = { postId, userId: session.user.id, type };
    const existing = await db.postInteraction.findUnique({
      where: { postId_userId_type: where },
    });

    if (existing) {
      await db.postInteraction.delete({ where: { postId_userId_type: where } });
      revalidatePath(`/projects/${projectId}/${branchId}`);
      return { message: 'Interaction removed successfully' };
    }

    await db.postInteraction.create({ data: where });
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { message: 'Interaction added successfully' };
  } catch (error) {
    console.error('Failed to interact:', error);
    throw new Error(toErrorMessage(error, 'Failed to interact'));
  }
}
