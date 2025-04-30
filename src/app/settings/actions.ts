'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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

export async function updateUserSettings(formData: FormData) {
  // Get the user's session, if they're not signed in, return an error
  const session = await auth();
  if (!session?.user) return { msg: 'You must be signed in to update user settings' };

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
  if (!validatedFields.success) {
    return {
      msg: validatedFields.error.toString(),
    };
  }

  const { data } = validatedFields;
  try {
    const existingUser = await db.user.findUnique({
      where: { id: session.user.id },
    });
    if (!existingUser) {
      return { msg: 'User not found in the database' };
    }

    // Check for name or email conflicts
    const conflict = await checkForConflicts(data, session.user.id);
    if (conflict) {
      return { msg: `Name or Email is already in use` };
    }

    // Prepare the fields to update
    const updateFields: Record<string, string> = {};
    if (data.name && data.name !== existingUser.name) updateFields.name = data.name;
    if (data.email && data.email !== existingUser.email) updateFields.email = data.email;
    if (data.picture && data.picture !== existingUser.image) updateFields.image = data.picture;

    // If no changes after comparing with existing data, return early
    if (Object.keys(updateFields).length === 0) {
      return { msg: 'No changes detected' };
    }

    // Update user with only the changed fields using Prisma
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: updateFields,
    });

    console.log(`User settings updated by user ${session.user.id}`);
    revalidatePath(`/profile/${updatedUser.id}`);
  } catch (error) {
    console.error('Failed to update user settings:', error);
    return { msg: 'An unexpected error occurred while updating user settings' };
  }

  redirect(`/profile/${session.user.id}`);
}
