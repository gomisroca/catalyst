import Link from '@/app/_components/ui/link';

export default async function NotAllowed() {
  return (
    <div className="flex flex-col gap-4">
      <p>You need to be logged in to access this page.</p>
      <Link href="/sign-in" className="mx-auto w-1/2 text-center">
        Login
      </Link>
    </div>
  );
}
