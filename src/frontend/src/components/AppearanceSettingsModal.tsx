import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon, Monitor } from 'lucide-react';

interface AppearanceSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AppearanceSettingsModal({
  open,
  onOpenChange,
}: AppearanceSettingsModalProps) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const handleCancel = () => {
    setSelectedTheme(theme);
    onOpenChange(false);
  };

  const handleOk = () => {
    setTheme(selectedTheme);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle>Appearance Settings</DialogTitle>
          <DialogDescription>Choose Theme</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <RadioGroup value={selectedTheme} onValueChange={(value) => setSelectedTheme(value as typeof theme)}>
            <div className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors cursor-pointer">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="flex-1 cursor-pointer flex items-center gap-3">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">System Default</div>
                  <div className="text-sm text-muted-foreground">Follow device theme automatically</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors cursor-pointer mt-3">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex-1 cursor-pointer flex items-center gap-3">
                <Sun className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Light</div>
                  <div className="text-sm text-muted-foreground">White background with dark text</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors cursor-pointer mt-3">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex-1 cursor-pointer flex items-center gap-3">
                <Moon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Dark</div>
                  <div className="text-sm text-muted-foreground">Dark background with white text</div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleOk} className="bg-emerald-600 hover:bg-emerald-700">OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
