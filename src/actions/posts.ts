'use server';

// Libraries
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/server/db';
import { auth } from '@/server/auth';
import { toErrorMessage } from '@/utils/errors';
// Queries
import { getBranch } from '@/server/queries/branches';
// Types
import { type InteractionType } from 'types';

// Define the schema for the media data
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

// Define the schema for the post data
const PostSchema = z.object({
  title: z.string().min(3, 'Post title must be at least 3 characters long'),
  content: z.string().optional(),
  media: z.array(MediaUrlSchema).max(5).optional(),
});

type CreatePostData = {
  projectId: string;
  branchId: string;
  title: string;
  content: string;
  media: string[];
};

export async function createPost(createData: CreatePostData) {
  // Check if user is signed in, and if they are authorized to create a post
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to create a post');

  const branch = await getBranch(createData.branchId);
  if (!branch.permissions?.allowCollaborate && session.user.id !== branch.authorId)
    throw new Error('You do not have permission to collaborate in this branch');

  // Extract and validate the data
  const validatedFields = PostSchema.safeParse({
    title: createData.title,
    content: createData.content,
    media: createData.media,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    // DB transaction to create the post and its media
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

    // Revalidate the branch page and pass the redirect path to the client
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
  // Check if user is signed in, and if they are authorized to update the post
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update a post');

  // Check if post exists
  const existingPost = await db.post.findFirst({
    where: {
      id: updateData.postId,
      authorId: session.user.id,
      branchId: updateData.branchId,
    },
  });
  if (!existingPost) throw new Error('Post not found or you do not have permission to update it.');

  // Extract and validate the data
  const validatedFields = PostSchema.safeParse({
    title: updateData.title ?? existingPost.title,
    content: updateData.content ?? existingPost.content,
    media: updateData.media,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    // DB transaction to update the post and its media
    await db.$transaction(async (trx) => {
      await trx.post.update({
        where: { id: updateData.postId },
        data: {
          title: data.title,
          content: data.content,
          updatedAt: new Date(),
        },
      });

      if (data.media && data.media.length > 0) {
        await trx.postMedia.deleteMany({
          where: { postId: updateData.postId },
        });

        await trx.postMedia.createMany({
          data: data.media.map((url) => ({
            name: url.split('/').pop() ?? '',
            url,
            postId: updateData.postId,
          })),
        });
      }
    });

    console.log(`Post ${updateData.postId} updated by user ${session.user.id}`);

    // Revalidate the branch page and pass the redirect path to the client
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

    // Check if user is authorized to delete the post
    const existingPost = await db.post.findFirst({
      where: {
        id: postId,
        authorId: session.user.id,
        branchId,
      },
    });
    if (!existingPost) throw new Error('You do not have permission to delete this post');

    // Delete the post
    await db.post.delete({
      where: {
        id: postId,
      },
    });

    // Revalidate the branch page and pass the redirect path to the client
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { message: 'Post deleted successfully', redirect: `/projects/${projectId}/${branchId}` };
  } catch (error) {
    console.log('Failed to delete post:', error);
    throw new Error(toErrorMessage(error, 'Failed to delete post'));
  }
}

export async function interactionAction(type: InteractionType, projectId: string, branchId: string, postId: string) {
  try {
    // Check if user is signed in
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to interact with a post');

    // Check if user has already interacted with the post
    const where = {
      postId,
      userId: session.user.id,
      type,
    };
    const existing = await db.postInteraction.findUnique({
      where: { postId_userId_type: where },
    });

    // If the user has already interacted, delete the interaction and revalidate the branch page
    if (existing) {
      await db.postInteraction.delete({ where: { postId_userId_type: where } });
      revalidatePath(`/projects/${projectId}/${branchId}`);
      return { message: 'Interaction removed successfully' };
    }

    // Otherwise, create a new interaction and revalidate the branch page
    await db.postInteraction.create({ data: where });
    revalidatePath(`/projects/${projectId}/${branchId}`);
    return { message: 'Interaction added successfully' };
  } catch (error) {
    console.error('Failed to interact:', error);
    throw new Error(toErrorMessage(error, 'Failed to interact'));
  }
}
