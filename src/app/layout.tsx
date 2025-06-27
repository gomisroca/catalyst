import '@/styles/globals.css';

import { NextSSRPlugin as UploadThingSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { Provider as JotaiProvider } from 'jotai';
import { type Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { type Session } from 'next-auth';
import { ThemeProvider } from 'next-themes';
import { extractRouterConfig } from 'uploadthing/server';

import Footer from '@/app/_components/footer';
import Navbar from '@/app/_components/navbar';
import SidebarWrapper from '@/app/_components/sidebar/wrapper';
import { UploadThingRouter } from '@/app/api/uploadthing/core';
import { auth } from '@/server/auth';

// Establish the metadata for the page
export const metadata: Metadata = {
  title: 'Catalyst',
  description: 'Ideas, together.',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

const worksans = Work_Sans({ subsets: ['latin'], weight: ['400', '600'] });

export function RootLayoutContent({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar session={session} />
      <SidebarWrapper session={session} />
      <main className="mt-12 flex flex-1 flex-col items-center justify-center">{children}</main>
      <Footer />
    </div>
  );
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={worksans.className} suppressHydrationWarning>
      <body className="bg-radial-[at_25%_25%] from-sky-500 to-zinc-100 to-75% text-zinc-900 dark:from-sky-950 dark:to-zinc-950 dark:text-zinc-100">
        <ThemeProvider attribute="class">
          <JotaiProvider>
            <UploadThingSSRPlugin routerConfig={extractRouterConfig(UploadThingRouter)} />
            <div id="modal-root" />
            {modal}
            <RootLayoutContent session={session}>{children}</RootLayoutContent>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
