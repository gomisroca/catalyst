'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const UserSettingsSchema = z.object({
  name: z.string().min(3, 'User name must be at least 3 characters long'),
});

export async function updateUserSettings(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('You must be signed in to update user settings');

  // Extract and validate the data
  const validatedFields = UserSettingsSchema.safeParse({
    name: formData.get('name'),
  });

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      msg: validatedFields.error.toString(),
    };
  }

  let userId: string | undefined;
  try {
    // TODO: Implement db validation and update of the user's settings
  } catch (error) {
    console.error('Failed to update user settings:', error);
    return { msg: 'An unexpected error occurred' };
  }

  if (userId) {
    console.log(`User settings updated: ${userId} by user: ${session.user.id}`);
    revalidatePath(`/profile/${userId}`);
    redirect(`/profile/${userId}`);
  }

  return { msg: 'Failed to update user settings' };
}
