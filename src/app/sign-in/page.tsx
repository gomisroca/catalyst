import { signIn } from '@/server/auth';
import Form from 'next/form';
import SubmitButton from '../_components/submit-button';

function EmailForm() {
  return (
    <Form
      action={async (formData: FormData) => {
        'use server';
        const email = formData.get('email');
        if (!email || typeof email !== 'string' || email.trim() === '' || !email.includes('@')) {
          return;
        }
        await signIn('nodemailer', { redirect: false, email });
      }}>
      <input type="email" name="email" placeholder="Email" required />
      <SubmitButton baseText="Sign In" pendingText="Signing In..." />
    </Form>
  );
}

export function SignInForm() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <EmailForm />
    </div>
  );
}

export default async function SignIn() {
  return <SignInForm />;
}
