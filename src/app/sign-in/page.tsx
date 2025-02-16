import EmailForm from './email-form';
import OAuthSignIn from './oauth-signin';

export function SignInForm() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <EmailForm />
      <div className="flex w-full items-center justify-evenly">
        <span className="h-[2px] w-1/3 bg-zinc-200 dark:bg-zinc-800" />
        <span>OR</span>
        <span className="h-[2px] w-1/3 bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <OAuthSignIn />
    </div>
  );
}

export default async function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-16 rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900">
      <SignInForm />
    </div>
  );
}
