import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useChangePassword } from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const changePasswordMutation = useChangePassword();

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setValidationError('All fields are required');
      return false;
    }

    if (newPassword.length < 6) {
      setValidationError('New password must be at least 6 characters long');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setValidationError('New password and confirm password do not match');
      return false;
    }

    if (currentPassword === newPassword) {
      setValidationError('New password must be different from current password');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      });

      toast.success('Password changed successfully');
      
      // Reset form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setValidationError('');
    } catch (error: any) {
      console.error('Password change error:', error);
      toast.error(error.message || 'Failed to change password');
    }
  };

  const isFormValid = currentPassword && newPassword && confirmPassword && !validationError;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Change Password</h1>
        <p className="text-muted-foreground mt-1">Update your account password</p>
      </div>

      <Card className="max-w-2xl bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Password Management</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Enter your current password and choose a new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-gray-900 dark:text-gray-100">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="pr-10 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-900 dark:text-gray-100">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setValidationError('');
                  }}
                  placeholder="Enter your new password"
                  className="pr-10 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-900 dark:text-gray-100">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setValidationError('');
                  }}
                  placeholder="Confirm your new password"
                  className="pr-10 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Validation Error */}
            {validationError && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                {validationError}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || changePasswordMutation.isPending}
              className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {changePasswordMutation.isPending ? 'Changing Password...' : 'Change Password'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
