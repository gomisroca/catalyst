'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { env } from '@/env';
import { auth, signIn } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';
import { MediaUrlSchema } from '@/utils/schemas';

const EmailSignInSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

const UserSettingsSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long').max(100, 'Name is too long').optional(),
  email: z.string().email('Invalid email').optional(),
  picture: MediaUrlSchema.optional(),
});

async function checkForConflicts(data: { name?: string; email?: string }, userId: string) {
  return db.user.findFirst({
    where: {
      AND: [
        { id: { not: userId } },
        { OR: [...(data.name ? [{ name: data.name }] : []), ...(data.email ? [{ email: data.email }] : [])] },
      ],
    },
  });
}

export async function signInWithEmail({ email }: { email: string }) {
  try {
    const validatedFields = EmailSignInSchema.safeParse({ email });
    if (!validatedFields.success) throw new Error(validatedFields.error.toString());

    await signIn('nodemailer', {
      redirectTo: env.NEXT_PUBLIC_BASE_URL,
      email: validatedFields.data.email,
    });

    return { message: 'Check your email for a sign in link.' };
  } catch (error) {
    console.error('Failed to sign in:', error);
    throw new Error(toErrorMessage(error, 'Failed to sign in'));
  }
}

type UpdateUserSettingsData = {
  name?: string;
  email?: string;
  picture?: string;
};

export async function updateUserSettings(updateData: UpdateUserSettingsData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update user settings');

  const validatedFields = UserSettingsSchema.safeParse({
    name: updateData.name ?? session.user.name,
    email: updateData.email ?? session.user.email,
    picture: updateData.picture ?? session.user.image,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;

  try {
    const [existingUser, conflict] = await Promise.all([
      db.user.findUnique({ where: { id: session.user.id } }),
      checkForConflicts(data, session.user.id),
    ]);

    if (!existingUser) throw new Error('User not found');
    if (conflict) throw new Error('Name or email is already in use');

    const updateFields = {
      ...(data.name && data.name !== existingUser.name && { name: data.name }),
      ...(data.email && data.email !== existingUser.email && { email: data.email }),
      ...(data.picture && data.picture !== existingUser.image && { image: data.picture }),
    };

    if (Object.keys(updateFields).length === 0) throw new Error('No changes detected');

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: updateFields,
    });

    console.log(`User settings updated by user ${session.user.id}`);
    revalidatePath(`/profile/${updatedUser.id}`);
    return { message: 'Settings updated successfully.', redirect: `/profile/${session.user.id}` };
  } catch (error) {
    console.error('Failed to update user settings:', error);
    throw new Error(toErrorMessage(error, 'Failed to update user settings'));
  }
}

export async function toggleFollowUser({ followedId }: { followedId: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to follow or unfollow a user');

    const where = { followerId: session.user.id, followedId };
    const follow = await db.follow.findUnique({ where: { followerId_followedId: where } });

    if (follow) {
      await db.follow.delete({ where: { followerId_followedId: where } });
      revalidatePath(`/profile/${followedId}`);
      return { message: 'User unfollowed successfully' };
    }

    await db.follow.create({ data: where });
    revalidatePath(`/profile/${followedId}`);
    return { message: 'User followed successfully' };
  } catch (error) {
    console.error('Failed to follow or unfollow user:', error);
    throw new Error(toErrorMessage(error, 'Failed to follow or unfollow user'));
  }
}
