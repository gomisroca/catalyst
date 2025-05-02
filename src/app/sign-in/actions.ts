'use server';

import { env } from '@/env';
import { signIn } from '@/server/auth';
import { toErrorMessage } from '@/utils/errors';
import { z } from 'zod';

const EmailSignInSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

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
