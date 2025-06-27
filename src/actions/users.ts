'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { env } from '@/env';
import { auth, signIn } from '@/server/auth';
import { db } from '@/server/db';
import { toErrorMessage } from '@/utils/errors';

// Define the schema for the email sign in data
const EmailSignInSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

// Define the schema for the user settings data
const UserSettingsSchema = z.object({
  name: z.string().min(3, 'User name must be at least 3 characters long').max(100, 'User name is too long').optional(),
  email: z.string().email('Invalid email').optional(),
  picture: z.string().optional(),
});

// Helper function to check for conflicts with existing users
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

export async function signInWithEmail({ email }: { email: string }) {
  try {
    // Extract and validate the data
    const validatedFields = EmailSignInSchema.safeParse({
      email: email,
    });

    // If validation fails, return the errors
    if (!validatedFields.success) throw new Error(validatedFields.error.toString());

    // Sign in the user with the provided email
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
  name: string;
  email: string;
  picture: string;
};

export async function updateUserSettings(updateData: UpdateUserSettingsData) {
  // Get the user's session, if they're not signed in, return an error
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update user settings');

  // Extract and validate the data
  const validatedFields = UserSettingsSchema.safeParse({
    name: updateData.name ?? session.user.name,
    email: updateData.email ?? session.user.email,
    picture: updateData.picture ?? session.user.image,
  });
  if (!validatedFields.success) throw new Error(validatedFields.error.toString());

  const { data } = validatedFields;
  try {
    // Get the existing user
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

    // Revalidate the profile page and pass the redirect path to the client
    revalidatePath(`/profile/${updatedUser.id}`);
    return { message: 'Settings updated successfully.', redirect: `/profile/${session.user.id}` };
  } catch (error) {
    console.error('Failed to update user settings:', error);
    throw new Error(toErrorMessage(error, 'Failed to update user settings'));
  }
}

export async function followUser({ followedId }: { followedId: string }) {
  try {
    // Get the user's session, if they're not signed in, return an error
    const session = await auth();
    if (!session?.user) throw new Error('You must be signed in to follow or unfollow a user');

    // Check if the user is already following the target user
    const where = {
      followerId: session.user.id,
      followedId,
    };
    const follow = await db.follow.findUnique({
      where: {
        followerId_followedId: where,
      },
    });
    // If the user is already following the target user, delete the follow relationship and revalidate the profile page
    if (follow) {
      await db.follow.delete({
        where: { followerId_followedId: where },
      });
      revalidatePath(`/profile/${followedId}`);
      return { message: 'User unfollowed successfully' };
    }

    // Otherwise, create a new follow relationship and revalidate the profile page
    await db.follow.create({ data: where });
    revalidatePath(`/profile/${followedId}`);
    return { message: 'User followed successfully' };
  } catch (error) {
    console.error('Failed to follow or unfollow user:', error);
    throw new Error(toErrorMessage(error, 'Failed to follow or unfollow user'));
  }
}
