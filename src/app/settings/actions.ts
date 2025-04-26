'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq, or } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const UserSettingsSchema = z.object({
  name: z.string().min(3, 'User name must be at least 3 characters long').optional(),
  email: z.string().email('Invalid email').optional(),
  picture: z.string().optional(),
});

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
    // Check for existing user and name/email conflicts in a single query
    const conflicts = await db.query.users.findMany({
      where: or(
        eq(users.id, session.user.id),
        ...(data.name ? [eq(users.name, data.name)] : []),
        ...(data.email ? [eq(users.email, data.email)] : [])
      ),
    });

    // Check if user exists
    const existingUser = conflicts.find((user) => user.id === session.user.id);
    if (!existingUser) {
      return { msg: 'User not found in the database' };
    }

    // Check for name conflicts (excluding the current user)
    if (data.name && data.name !== existingUser.name) {
      const nameConflict = conflicts.find((user) => user.id !== session.user.id && user.name === data.name);
      if (nameConflict) {
        return { msg: 'Name is already in use' };
      }
    }

    // Check for email conflicts (excluding the current user)
    if (data.email && data.email !== existingUser.email) {
      const emailConflict = conflicts.find((user) => user.id !== session.user.id && user.email === data.email);
      if (emailConflict) {
        return { msg: 'Email is already in use' };
      }
    }

    // Update only the fields that changed
    const updateFields: Record<string, string> = {};
    if (data.name && data.name !== existingUser.name) updateFields.name = data.name;
    if (data.email && data.email !== existingUser.email) updateFields.email = data.email;
    if (data.picture && data.picture !== existingUser.image) updateFields.image = data.picture;

    // If no changes after comparing with existing data, return early
    if (Object.keys(updateFields).length === 0) {
      return { msg: 'No changes detected' };
    }

    // Update user with only the changed fields
    const [user] = await db
      .update(users)
      .set(updateFields)
      .where(eq(users.id, session.user.id))
      .returning({ id: users.id });

    console.log(`User settings updated by user ${session.user.id}`);
    revalidatePath(`/profile/${user!.id}`);
  } catch (error) {
    console.error('Failed to update user settings:', error);
    return { msg: 'An unexpected error occurred' };
  }
  redirect(`/profile/${session.user.id}`);
}
