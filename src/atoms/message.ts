import { atom } from 'jotai';

export const messageAtom = atom<{
  content: string;
  error?: boolean;
} | null>(null);
