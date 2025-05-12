'use client';

import { useRouter } from 'next/navigation';

export function useRedirect() {
  const router = useRouter();

  return (modal = false, to: string, delay = 200) => {
    // Handle modal redirects differently
    if (modal) {
      router.back();
      setTimeout(() => {
        router.replace(to);
      }, delay);
    } else {
      router.push(to);
    }
  };
}
