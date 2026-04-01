import NotAllowed from '@/app/_components/not-allowed';
import UserSettingsForm from '@/app/settings/settings-form';
import { auth } from '@/server/auth';

export default async function UserSettings() {
  const session = await auth();
  if (!session) return <NotAllowed />;

  return (
    <>
      <h1 className="mb-4 text-xl font-bold">User Settings</h1>
      <UserSettingsForm user={session.user} />
    </>
  );
}
