'use server';

import { db } from '@/server/db';
import { auth } from '@/server/auth';
import { type InteractionType } from 'types';
import { toErrorMessage } from '@/utils/errors';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getBranch } from '@/server/queries/branches';

const MediaUrlSchema = z
  .string()
  .url('Media URL must be a valid URL')
  .refine(
    (url) => {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm'];
      return validExtensions.some((ext) => url.toLowerCase().endsWith(ext));
    },
    { message: 'Media URL must point to a supported file type' }
  );

const PostSchema = z.object({
  title: z.string().min(3, 'Post title must be at least 3 characters long'),
  content: z.string().optional(),
  media: z.array(MediaUrlSchema).max(5).optional(),
});

type UpdatePostParams = {
  formData: FormData;
  ids: {
    projectId: string;
    branchId: string;
    postId: string;
  };
};

export async function createPost(formData: FormData, branchId: string) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a post');

  const branch = await getBranch(branchId);
  if (!branch.permissions?.allowCollaborate && session.user.id !== branch.authorId)
    throw new Error('You do not have permission to collaborate in this branch');

  // Extract and validate the data
  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    media: formData.getAll('media'),
  });
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
      if (!data.media) return newPost.id;
      for (const media of data.media) {
        await trx.postMedia.create({
          data: {
            name: media.split('/').pop() ?? media,
            url: media,
            postId: newPost.id,
          },
        });
      }

      return newPost.id;
    });

    console.log(`Post ${newPostId} created by user ${session.user.id}`);
    revalidatePath(`/projects/${branch.projectId}/${branchId}`);
    return { message: 'Post created successfully.', redirect: `/projects/${branch.projectId}/${branchId}` };
  } catch (error) {
    console.error('Failed to create post:', error);
    throw new Error(toErrorMessage(error, 'Failed to create post'));
  }
}

export async function updatePost(params: UpdatePostParams) {
  const { projectId, branchId, postId } = params.ids;

  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a post');

  // Check if post exists
  const existingPost = await db.post.findFirst({
    where: {
      id: postId,
      authorId: session.user.id,
      branchId,
    },
  });
  if (!existingPost) throw new Error('Post not found or you do not have permission to update it.');

  // Extract and validate the data
  const validatedFields = PostSchema.safeParse({
    title: params.formData.get('title') ?? existingPost.title,
    content: params.formData.get('content') ?? existingPost.content,
    media: params.formData.getAll('media'),
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    await db.$transaction(async (trx) => {
      await trx.post.update({
        where: { id: postId },
        data: {
          title: data.title,
          content: data.content,
          updatedAt: new Date(),
        },
      });

      if (data.media && data.media.length > 0) {
        await trx.postMedia.deleteMany({
          where: { postId },
        });

        await trx.postMedia.createMany({
          data: data.media.map((url) => ({
            name: url.split('/').pop() ?? '',
            url,
            postId,
          })),
        });
      }
    });

    console.log(`Post ${postId} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { message: 'Post updated successfully.', redirect: `/projects/${projectId}/${branchId}` };
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

export async function interactionAction(type: InteractionType, projectId: string, branchId: string, postId: string) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact with a post');

    const where = {
      postId,
      userId: session.user.id,
      type,
    };

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
