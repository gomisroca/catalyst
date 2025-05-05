'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { env } from '@/env';
import { signIn } from '@/server/auth';

const EmailSignInSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

const UserSettingsSchema = z.object({
  name: z.string().min(3, 'User name must be at least 3 characters long').max(100, 'User name is too long').optional(),
  email: z.string().email('Invalid email').optional(),
  picture: z.string().optional(),
});

async function checkForConflicts(data: { name?: string; email?: string }, userId: string) {
  const conflicts = await db.user.findMany({
    where: {
      OR: [...(data.name ? [{ name: data.name }] : []), ...(data.email ? [{ email: data.email }] : [])],
    },
  });

  // Check for conflicts (excluding the current user)
  const conflictFound = conflicts.find(
    (user) => user.id !== userId && (user.name === data.name || user.email === data.email)
  );

  return conflictFound;
}

export async function signInWithEmail(formData: FormData) {
  try {
    // Extract and validate the data
    const validatedFields = EmailSignInSchema.safeParse({
      email: formData.get('email'),
    });

    // If validation fails, return the errors
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

export async function updateUserSettings(formData: FormData) {
  // Get the user's session, if they're not signed in, return an error
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update user settings');

  // Extract form data with proper type handling
  const nameValue = formData.get('name');
  const emailValue = formData.get('email');
  const pictureValue = formData.get('picture');

  // Extract and validate the data
  const validatedFields = UserSettingsSchema.safeParse({
    name: typeof nameValue === 'string' ? nameValue : session.user.name,
    email: typeof emailValue === 'string' ? emailValue : session.user.email,
    picture: typeof pictureValue === 'string' ? pictureValue : session.user.image,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    const existingUser = await db.user.findUnique({
      where: { id: session.user.id },
    });
    if (!existingUser) throw new Error('User not found in the database');

    // Check for name or email conflicts
    const conflict = await checkForConflicts(data, session.user.id);
    if (conflict) throw new Error(`Name or Email is already in use`);

    // Prepare the fields to update
    const updateFields: Record<string, string> = {};
    if (data.name && data.name !== existingUser.name) updateFields.name = data.name;
    if (data.email && data.email !== existingUser.email) updateFields.email = data.email;
    if (data.picture && data.picture !== existingUser.image) updateFields.image = data.picture;

    // If no changes after comparing with existing data, return early
    if (Object.keys(updateFields).length === 0) throw new Error('No changes detected');

    // Update user with only the changed fields using Prisma
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

export async function followUser({ followedId }: { followedId: string }) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to follow or unfollow a user');

    const where = {
      followerId: session.user.id,
      followedId,
    };

    const follow = await db.follow.findUnique({
      where: {
        followerId_followedId: where,
      },
    });
    if (follow) {
      await db.follow.delete({
        where: { followerId_followedId: where },
      });
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
