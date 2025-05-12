import NotAllowed from '@/app/_components/not-allowed';
import Modal from '@/app/_components/ui/modal';
import UserSettingsForm from '@/app/settings/settings-form';
import { auth } from '@/server/auth';

export default async function UserSettingsModal() {
  const session = await auth();
  if (!session)
    return (
      <Modal>
        {/* If user is not logged in, show restricted access component */}
        <NotAllowed />;
      </Modal>
    );
  return (
    <Modal>
      <UserSettingsForm user={session.user} modal />
    </Modal>
  );
}
