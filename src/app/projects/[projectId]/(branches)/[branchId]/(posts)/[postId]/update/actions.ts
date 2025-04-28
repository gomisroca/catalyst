'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { posts, postsMedia } from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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
  content: z.string(),
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

export async function updatePost(params: UpdatePostParams) {
  const { projectId, branchId, postId } = params.ids;

  const session = await auth();
  if (!session?.user) return { msg: 'You must be signed in to update a post' };

  // Check if post exists
  const existingPost = await db.query.posts.findFirst({
    where: and(eq(posts.id, postId), eq(posts.authorId, session.user.id), eq(posts.branchId, branchId)),
  });
  if (!existingPost) {
    console.log(`Post ${postId} not found in the database`);
    return { msg: 'Post not found in the database' };
  }

  // Extract and validate the data
  const validatedFields = PostSchema.safeParse({
    title: params.formData.get('title') ?? existingPost.title,
    content: params.formData.get('content') ?? existingPost.content,
    media: params.formData.getAll('media'),
  });
  if (!validatedFields.success) {
    return {
      msg: validatedFields.error.toString(),
    };
  }

  const { data } = validatedFields;
  try {
    await db.transaction(async (trx) => {
      await trx
        .update(posts)
        .set({
          title: data.title,
          content: data.content,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, postId));
      if (!data.media) return;
      for (const media of data.media) {
        await trx.delete(postsMedia).where(eq(postsMedia.postId, postId));
        await trx.insert(postsMedia).values({
          name: media.split('/').pop(),
          url: media,
          postId: postId,
        });
      }
    });
    console.log(`Post ${postId} updated by user ${session.user.id}`);
    revalidatePath(`/projects/${projectId}/${branchId}`);
  } catch (error) {
    console.error('Failed to update post:', error);
    return { msg: 'An unexpected error occurred' };
  }
  redirect(`/projects/${projectId}/${branchId}`);
}
