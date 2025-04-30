'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { getBranch } from '@/server/queries/branches';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PostSchema = z.object({
  title: z.string().min(3, 'Post title must be at least 3 characters long'),
  content: z.string(),
  media: z.string().url().array().max(5).optional(),
});

export async function createPost(formData: FormData, branchId: string) {
  const session = await auth();
  if (!session?.user) return { msg: 'You must be signed in to create a post' };

  const branch = await getBranch(branchId);
  if (!branch.permissions?.allowCollaborate && session.user.id !== branch.authorId)
    return { msg: 'You do not have permission to collaborate in this branch' };

  // Extract and validate the data
  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    media: formData.getAll('media'),
  });
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.toString(),
    };
  }

  const { data } = validatedFields;

  let newPostId: string | undefined;
  try {
    newPostId = await db.$transaction(async (trx) => {
      const newPost = await trx.post.create({
        data: {
          title: data.title,
          content: data.content,
          authorId: session.user.id,
          branchId: branchId,
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
  } catch (error) {
    console.error('Failed to create post:', error);
    return { msg: 'An unexpected error occurred while creating the post' };
  }
  redirect(`/projects/${branch.projectId}/${branchId}`);
}
