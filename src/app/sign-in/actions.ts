'use server';

import { signIn } from '@/server/auth';
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
    if (!validatedFields.success) {
      return {
        error: 'Invalid email.',
      };
    }

    await signIn('nodemailer', { redirect: false, email: validatedFields.data.email });

    return { errors: {} };
  } catch (error) {
    console.error('Failed to sign in:', error);
    return {
      error: 'An unexpected error occurred.',
    };
  }
}
