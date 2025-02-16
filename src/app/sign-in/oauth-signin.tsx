'use client';

import { signIn } from 'next-auth/react';
import Button from '../_components/ui/button';
import { FaGoogle } from 'react-icons/fa6';

export default function OAuthSignIn() {
  return (
    <Button onClick={() => signIn('google', { redirect: false })} className="flex w-full items-center gap-2">
      <FaGoogle size={20} />
      <span className="font-semibold">Google</span>
    </Button>
  );
}
