import { auth } from '@/server/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* 
      If you are logged in, you get a timeline of the stuff the people you follow have done.
      This should also include things happening in projects/branches you have contributed to. (Probably need an option to hide this per project/branch)

      Whether you are logged in or not, you get a list of popular projects, branches and posts.
      */}
    </main>
  );
}
