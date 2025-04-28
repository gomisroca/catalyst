import Link from '@/app/_components/ui/link';
import Modal from '@/app/_components/ui/modal';
import UserSettingsForm from '@/app/settings/settings-form';
import { auth } from '@/server/auth';

export default async function UserSettingsModal() {
  const session = await auth();
  if (!session)
    return (
      <Modal>
        <p>You need to be logged in to see change your settings.</p>

        <Link href="/sign-in" className="mx-auto w-1/2 text-center">
          Login
        </Link>
      </Modal>
    );
  return (
    <Modal>
      <UserSettingsForm user={session.user} />
    </Modal>
  );
}
