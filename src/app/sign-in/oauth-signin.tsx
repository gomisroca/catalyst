'use client';

import { signIn } from 'next-auth/react';
import Button from '../_components/ui/button';
import { FaGoogle } from 'react-icons/fa6';
import { env } from '@/env';

export default function OAuthSignIn() {
  return (
    <Button
      name="Google"
      onClick={() => signIn('google', { redirectTo: env.NEXT_PUBLIC_BASE_URL })}
      className="flex w-full items-center gap-2">
      <FaGoogle size={20} />
      <span className="font-semibold">Google</span>
    </Button>
  );
}
