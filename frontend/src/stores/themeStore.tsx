import { create } from 'zustand';
import { useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Define the storage key for localStorage
const STORAGE_KEY = 'catalyst-theme';

// Zustand store for theme management
const useThemeStore = create<ThemeStore>((set) => ({
  theme: typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as Theme) || 'system' : 'system',
  setTheme: (theme: Theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
}));

// Custom hook to sync the theme with the DOM
export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return { theme, setTheme };
};
