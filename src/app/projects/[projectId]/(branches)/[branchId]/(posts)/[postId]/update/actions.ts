'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
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

export async function updatePost(params: UpdatePostParams) {
  const { projectId, branchId, postId } = params.ids;

  const session = await auth();
  if (!session?.user) return { msg: 'You must be signed in to update a post' };

  // Check if post exists
  const existingPost = await db.post.findFirst({
    where: {
      id: postId,
      authorId: session.user.id,
      branchId,
    },
  });
  if (!existingPost) {
    console.log(`Post ${postId} not found for user ${session.user.id}`);
    return { msg: 'Post not found or you do not have permission to update it.' };
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
  } catch (error) {
    console.error('Failed to update post:', error);
    return { msg: 'An unexpected error occurred' };
  }
  redirect(`/projects/${projectId}/${branchId}`);
}
