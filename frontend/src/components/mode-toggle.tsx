import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/stores/themeStore';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return (
    <Button className="w-[40px] cursor-pointer" size="icon" variant={'outline'} onClick={toggleTheme}>
      <span className="sr-only">Theme Toggle</span>
      {theme == 'light' ? (
        <Sun className="w-[40px] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="w-[40px] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
}
