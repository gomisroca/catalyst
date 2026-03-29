'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <h2 className="text-xl font-bold uppercase">Something went wrong</h2>
        {error.digest && <p className="text-sm text-zinc-400">Error ID: {error.digest}</p>}
        <button
          onClick={reset}
          className="cursor-pointer rounded-lg bg-zinc-300 px-4 py-2 text-sm font-bold uppercase drop-shadow-sm transition-all duration-200 ease-in-out hover:bg-white hover:drop-shadow-md active:scale-90 active:duration-100 dark:bg-zinc-800 dark:hover:bg-black">
          Try again
        </button>
      </body>
    </html>
  );
}
