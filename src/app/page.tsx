import { auth } from '@/server/auth';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <p className="text-center text-2xl">{session && <span>Logged in as {session.user?.name}</span>}</p>
    </main>
  );
}
