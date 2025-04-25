'use server';

import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
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

  // Check if the user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });
  if (!existingUser) return { msg: 'User not found in the database' };

  // Extract and validate the data
  const validatedFields = UserSettingsSchema.safeParse({
    name: formData.get('name') ?? session.user.name,
    email: formData.get('email') ?? session.user.email,
    picture: formData.get('picture') ?? session.user.image,
  });

  // If validation fails, return the errors
  if (!validatedFields.success) {
    return {
      msg: validatedFields.error.toString(),
    };
  }
  // If name is being changed, check if it's already in use
  if (validatedFields.data.name && validatedFields.data.name !== existingUser.name) {
    const nameExists = await db.query.users.findFirst({
      where: eq(users.name, validatedFields.data.name),
    });

    if (nameExists) {
      return { msg: 'Name is already in use' };
    }
  }
  // If email is being changed, check if it's already in use
  if (validatedFields.data.email && validatedFields.data.email !== existingUser.email) {
    const emailExists = await db.query.users.findFirst({
      where: eq(users.email, validatedFields.data.email),
    });

    if (emailExists) {
      return { msg: 'Email is already in use' };
    }
  }

  // Try to update user
  let userId: string | undefined;
  try {
    const [user] = await db
      .update(users)
      .set({
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        image: validatedFields.data.picture,
      })
      .where(eq(users.id, session.user.id))
      .returning({ id: users.id });
    userId = user?.id;
  } catch (error) {
    console.error('Failed to update user settings:', error);
    return { msg: 'An unexpected error occurred' };
  }
  // If successful, log the update and redirect to the user's profile
  if (userId) {
    console.log(`User settings updated by user ${session.user.id}`);
    revalidatePath(`/profile/${userId}`);
    redirect(`/profile/${userId}`);
  }

  // Return generic error
  return { msg: 'Failed to update user settings' };
}
