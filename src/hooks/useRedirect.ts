'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export function useRedirect() {
  const router = useRouter();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return useCallback(
    (modal = false, to: string, delay = 200) => {
      if (modal) {
        router.back();
        timeoutRef.current = setTimeout(() => {
          router.replace(to);
        }, delay);
      } else {
        router.push(to);
      }
    },
    [router]
  );
}
