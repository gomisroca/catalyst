import '@/styles/globals.css';

import { type Metadata } from 'next';
import { Work_Sans } from 'next/font/google';

import { ThemeProvider } from 'next-themes';
import { TRPCReactProvider } from '@/trpc/react';
import { Provider as JotaiProvider } from 'jotai';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Boilerplate for Next.js projects',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const worksans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={worksans.className} suppressHydrationWarning>
      <body className="bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
        <ThemeProvider attribute="class">
          <JotaiProvider>
            <TRPCReactProvider>
              <div className="min-h-screen">
                <header>{/* <Navbar /> */}</header>
                <main>{children}</main>
                <footer>
                  {/* <ThemeButton />
                  <Message /> */}
                </footer>
              </div>
            </TRPCReactProvider>
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
