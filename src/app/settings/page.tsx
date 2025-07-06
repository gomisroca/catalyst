import { Suspense } from 'react';

import NotAllowed from '@/app/_components/not-allowed';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import UserSettingsForm from '@/app/settings/settings-form';
import { auth } from '@/server/auth';

export default async function UserSettings() {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">User Settings</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UserSettingsForm user={session.user} />
      </Suspense>
    </>
  );
}
