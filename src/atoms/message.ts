import { atom } from 'jotai';

export const messageAtom = atom<{ message: string | null; error?: boolean }>({
  message: null,
  error: false,
});
