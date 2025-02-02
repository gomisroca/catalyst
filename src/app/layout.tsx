import '@/styles/globals.css';

import { type Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import { ThemeProvider } from 'next-themes';
import { TRPCReactProvider } from '@/trpc/react';
import { Provider as JotaiProvider } from 'jotai';
import Navbar from '@/app/_components/navbar';
import Footer from '@/app/_components/footer';

export const metadata: Metadata = {
  title: 'Catalyst',
  description: 'Ideas, together.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const worksans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={worksans.className} suppressHydrationWarning>
      <body className="bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
        <ThemeProvider attribute="class">
          <JotaiProvider>
            <TRPCReactProvider>
              <div className="min-h-screen">
                <Navbar />
                <main>{children}</main>
                <Footer />
              </div>
            </TRPCReactProvider>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
