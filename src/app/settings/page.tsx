import { Suspense } from 'react';
import UserSettingsForm from './settings-form';
import { LoadingSpinner } from '@/app/_components/loading-spinner';
import { auth } from '@/server/auth';
import Link from '@/app/_components/ui/link';

export default async function UserSettings() {
  const session = await auth();
  if (!session)
    return (
      <div className="flex flex-col gap-4">
        <p>You need to be logged in to see change your settings.</p>

        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </div>
    );

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">Settings</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UserSettingsForm user={session.user} />
      </Suspense>
    </div>
  );
}
