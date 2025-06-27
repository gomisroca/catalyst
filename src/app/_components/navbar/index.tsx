/**
 * Navbar component with links to the home page. Passes the session to the NavMenu component server-side.
 */

import { type Session } from 'next-auth';

import NavMenu from '@/app/_components/navbar/nav-menu';
import ScrollBg from '@/app/_components/navbar/scroll-bg';
import Link from '@/app/_components/ui/link';

function Navbar({ session }: { session: Session | null }) {
  return (
    <header className="fixed top-0 z-10 flex h-12 w-full items-center justify-between px-4 transition ease-in">
      {/* Add a background to the navbar as the user scrolls */}
      <ScrollBg />
      <nav className="flex w-full flex-row items-center justify-between space-x-4">
        {/* Link to the home page */}
        <Link href="/">
          <h1 className="text-lg leading-none font-extrabold tracking-tight uppercase lg:text-xl">Catalyst</h1>
        </Link>
        <section className="flex items-center justify-end gap-2">
          {/* User menu and search bar */}
          <NavMenu session={session} />
        </section>
      </nav>
    </header>
  );
}

export default Navbar;
