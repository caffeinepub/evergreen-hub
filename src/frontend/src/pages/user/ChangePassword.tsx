import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function ChangePassword() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Change Password</h1>
        <p className="text-muted-foreground mt-1">Manage your account security</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Password Management</CardTitle>
          <CardDescription>Your password is managed through Internet Identity</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <p>
                This application uses <strong>Internet Identity</strong> for authentication, which provides
                secure, passwordless login using cryptographic keys.
              </p>
              <p className="mt-2">
                To manage your authentication credentials, recovery options, or add additional devices,
                please visit the Internet Identity settings directly through your Internet Identity anchor.
              </p>
              <p className="mt-2">
                Your authentication is more secure than traditional passwords as it uses public-key
                cryptography and is protected by your device's security features.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
