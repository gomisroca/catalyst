'use client';

import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa6';

import Button from '@/app/_components/ui/button';
import { env } from '@/env';

export default function OAuthSignIn() {
  return (
    <Button
      arialabel="Google"
      onClick={() => signIn('google', { redirectTo: env.NEXT_PUBLIC_BASE_URL })}
      className="flex w-full items-center gap-2">
      <FaGoogle size={20} />
      <span className="font-semibold">Google</span>
    </Button>
  );
}
