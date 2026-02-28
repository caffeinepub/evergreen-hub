import { useState, useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin, isInitializing } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      if (isAdmin) {
        navigate({ to: '/admin/stats' });
      } else {
        toast.error('Access denied. Admin privileges required.');
        navigate({ to: '/dashboard' });
      }
    }
  }, [isAuthenticated, isAdmin, isInitializing, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
      // Navigation will happen via useEffect after role check
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-primary/10 p-4">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Badge variant="outline" className="gap-1 px-3 py-1">
              <Shield className="h-4 w-4" />
              Admin Access
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Admin Panel</CardTitle>
          <CardDescription className="text-center">
            Secure login for administrators only
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Admin authentication uses Internet Identity with role verification. Only authorized
              administrators can access the admin panel.
            </AlertDescription>
          </Alert>

          <Button onClick={handleLogin} className="w-full" disabled={loading}>
            {loading ? 'Authenticating...' : 'Login as Admin'}
          </Button>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <Link to="/" className="text-primary hover:underline">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
