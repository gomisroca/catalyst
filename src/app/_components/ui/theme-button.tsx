'use client';

/**
 * Button to toggle the theme between light and dark mode.
 *
 * @example
 * <ThemeButton />
 */

// Libraries
import { useTheme } from 'next-themes';
// Components
import { FaSun, FaMoon } from 'react-icons/fa6';
import Button from '@/app/_components/ui/button';

function ThemeButton() {
  const { theme, setTheme } = useTheme(); // Hook to get and set the theme using next-themes

  return (
    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-8 w-8" name="Theme Button">
      <FaMoon
        name="light"
        size={20}
        className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <FaSun name="dark" size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Theme Button</span>
    </Button>
  );
}
export default ThemeButton;
