import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Monitor, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

interface AppearanceSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AppearanceSettingsModal({ open, onOpenChange }: AppearanceSettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleSave = () => {
    setTheme(selectedTheme);
    onOpenChange(false);
  };

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value as 'light' | 'dark' | 'system');
  };

  const themeOptions = [
    {
      value: 'system',
      label: 'System Default',
      description: 'Automatically match your system theme',
      icon: Monitor,
    },
    {
      value: 'light',
      label: 'Light',
      description: 'Clean and bright interface',
      icon: Sun,
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: Moon,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gray-900 dark:text-gray-100">Appearance Settings</DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-300">
            Choose how Evergreen Hub looks to you
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <RadioGroup value={selectedTheme} onValueChange={handleThemeChange} className="space-y-4">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.value}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedTheme === option.value
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20'
                      : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700'
                  }`}
                  onClick={() => handleThemeChange(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label
                      htmlFor={option.value}
                      className="flex items-center gap-2 font-semibold cursor-pointer text-gray-900 dark:text-gray-100"
                    >
                      <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />
                      {option.label}
                    </Label>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{option.description}</p>
                  </div>
                </div>
              );
            })}
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-300 dark:border-slate-700 text-gray-900 dark:text-gray-100">
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
