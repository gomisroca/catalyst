import EmailForm from '@/app/sign-in/email-form';
import OAuthSignIn from '@/app/sign-in/oauth-signin';

export default async function SignIn() {
  return (
    <div className="flex w-1/3 flex-col items-center justify-center gap-16 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
      <div className="flex flex-col items-center justify-center gap-4">
        <EmailForm />
        <div className="flex w-full items-center justify-evenly">
          <span className="h-[2px] w-1/3 bg-zinc-200 dark:bg-zinc-800" />
          <span>OR</span>
          <span className="h-[2px] w-1/3 bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <OAuthSignIn />
      </div>
    </div>
  );
}
