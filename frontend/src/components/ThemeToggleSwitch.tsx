import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggleSwitch() {
  const { theme, setTheme, actualTheme } = useTheme();

  const toggleTheme = () => {
    if (actualTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-full transition-all duration-300 hover:bg-secondary"
      aria-label="Toggle theme"
    >
      <Sun 
        className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-180 dark:scale-0" 
        style={{ position: 'absolute' }}
      />
      <Moon 
        className="h-5 w-5 rotate-180 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" 
        style={{ position: 'absolute' }}
      />
    </Button>
  );
}
