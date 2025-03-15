'use client';

import Link from '../ui/link';
import { type Session } from 'next-auth';

export default function ForYouTimeline({ session }: { session: Session | null }) {
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to see your personal timeline.</p>
        <Link href="/sign-in">Login</Link>
      </div>
    );

  return <p>Personal Timeline</p>;
}
