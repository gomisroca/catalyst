import { Suspense } from 'react';
import UserSettingsForm from './settings-form';
import LoadingSpinner from '@/app/_components/ui/loading-spinner';
import { auth } from '@/server/auth';
import NotAllowed from '../_components/not-allowed';

export default async function UserSettings() {
  const session = await auth();
  // If user is not logged in, show restricted access component
  if (!session) return <NotAllowed />;

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">User Settings</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <UserSettingsForm user={session.user} />
      </Suspense>
    </div>
  );
}
