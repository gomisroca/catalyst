'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { posts, postsMedia } from '@/server/db/schema';
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

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.toString(),
    };
  }

  let postId: string | undefined;
  try {
    const { id } = await db.transaction(async (trx) => {
      const [result] = await trx
        .insert(posts)
        .values({
          title: validatedFields.data.title,
          content: validatedFields.data.content,
          authorId: session.user.id,
          branchId: branchId,
        })
        .returning({ id: posts.id });

      if (!result) throw new Error('Failed to create post');

      if (!validatedFields.data.media) return result;
      for (const media of validatedFields.data.media) {
        await trx.insert(postsMedia).values({
          name: media.split('/').pop(),
          url: media,
          postId: result.id,
        });
      }

      return result;
    });

    postId = id;
  } catch (error) {
    console.error('Failed to create post:', error);
    return { msg: 'An unexpected error occurred' };
  }

  if (postId) {
    console.log(`Post created: ${postId} by user: ${session.user.id}`);
    revalidatePath(`/projects/${branch.projectId}/${branchId}`);
    redirect(`/projects/${branch.projectId}/${branchId}`);
  }

  return { msg: 'Failed to create post' };
}
