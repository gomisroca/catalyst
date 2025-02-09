'use client';

/**
 * Sign in button component.
 *
 * @param provider - The provider to sign in with.
 *
 * @example
 * <SignInButton provider={Provider.Google} />
 */

import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import Button from '@/app/_components/ui/button';
import { MdMailOutline } from 'react-icons/md';
import { FaGoogle } from 'react-icons/fa';
import { useSetAtom } from 'jotai';
import { messageAtom } from '@/atoms/message';
import { type Session } from 'next-auth';

const providers: Provider[] = [
  {
    name: 'google',
    icon: <FaGoogle className="mr-2 h-5 w-5" />,
  },
];

interface SignInProps {
  provider: Provider;
}

function EmailSignIn() {
  const setMessage = useSetAtom(messageAtom);
  const [email, setEmail] = useState('');

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessage({ message: null });
    e.preventDefault();
    const res = await signIn('nodemailer', { redirect: false, email: email });
    if (res?.error) {
      setMessage({ message: res.error, error: true });
    }
    setMessage({ message: 'Check your email for a sign in link.' });
  };

  return (
    <div>
      <MdMailOutline size={20} />
      <form onSubmit={(e) => handleSignIn(e)} className="flex flex-col gap-2">
        <input name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} type="email" required />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}

function OAuthSignIn({ provider }: SignInProps) {
  return (
    <div>
      <Button onClick={() => signIn(provider.name)}>
        <span>{provider.icon}</span>
        <span>{provider.name[0]!.toUpperCase() + provider.name.slice(1)}</span>
      </Button>
    </div>
  );
}

function SignInMenu({ session }: { session: Session | null }) {
  if (!session) {
    return (
      <div className="flex flex-col items-center gap-2">
        {providers.map((provider) => (
          <OAuthSignIn provider={provider} key={provider.name} />
        ))}
        <EmailSignIn />
      </div>
    );
  } else {
    return (
      <div>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }
}

export default SignInMenu;
