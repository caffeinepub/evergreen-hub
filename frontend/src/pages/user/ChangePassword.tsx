import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function ChangePassword() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Change Password</h1>
        <p className="text-muted-foreground mt-1">Account security settings</p>
      </div>

      <Card className="max-w-2xl bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Password Management
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            About your account security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 space-y-3">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              This platform uses Internet Identity for authentication.
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Internet Identity is a secure, passwordless authentication system. Your account is
              protected by your device's biometrics or security key — there is no traditional
              password to change.
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              To manage your Internet Identity security settings, visit{' '}
              <a
                href="https://identity.ic0.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium hover:text-blue-900 dark:hover:text-blue-100"
              >
                identity.ic0.app
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
