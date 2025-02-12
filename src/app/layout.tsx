import '@/styles/globals.css';

import { type Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import { ThemeProvider } from 'next-themes';
import { Provider as JotaiProvider } from 'jotai';
import { auth } from '@/server/auth';
import Navbar from '@/app/_components/navbar';
import Footer from '@/app/_components/footer';
import { type Session } from 'next-auth';

export const metadata: Metadata = {
  title: 'Catalyst',
  description: 'Ideas, together.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const worksans = Work_Sans({ subsets: ['latin'], weight: ['400', '600'] });

export function RootLayoutContent({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  return (
    <div className="min-h-screen">
      <Navbar session={session} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={worksans.className} suppressHydrationWarning>
      <body className="bg-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
        <ThemeProvider attribute="class">
          <JotaiProvider>
            <RootLayoutContent session={session}>{children}</RootLayoutContent>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
