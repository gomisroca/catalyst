import Link from '@/app/_components/ui/link';
import NavMenu from '@/app/_components/navbar/nav-menu';
import { type Session } from 'next-auth';
import ScrollBg from './scrollBg';

function Navbar({ session }: { session: Session | null }) {
  return (
    <header className="fixed top-0 z-10 flex h-12 w-full items-center justify-between px-4 transition ease-in">
      <ScrollBg />
      <nav className="flex w-full flex-row items-center justify-between space-x-4">
        <Link href="/">
          <h1 className="text-lg leading-none font-extrabold tracking-tight uppercase lg:text-xl">Catalyst</h1>
        </Link>
        <section className="flex items-center justify-end gap-2">
          {session && (
            <p className="text-sm leading-none tracking-tight uppercase">
              {session.user?.name ? session.user?.name : session.user?.email.split('@')[0]}
            </p>
          )}
          <NavMenu session={session} />
        </section>
      </nav>
    </header>
  );
}

export default Navbar;
