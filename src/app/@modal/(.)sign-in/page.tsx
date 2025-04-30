import Modal from '@/app/_components/ui/modal';
import EmailForm from '@/app/sign-in/email-form';
import OAuthSignIn from '@/app/sign-in/oauth-signin';

export default function SignInModal() {
  return (
    <Modal>
      <div className="flex flex-col items-center justify-center gap-4">
        <EmailForm />
        <div className="flex w-full items-center justify-evenly">
          <span className="h-[2px] w-1/3 bg-zinc-200 dark:bg-zinc-800" />
          <span>OR</span>
          <span className="h-[2px] w-1/3 bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <OAuthSignIn />
      </div>
    </Modal>
  );
}
