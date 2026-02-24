import { useState, useEffect } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isInitializing } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      navigate({ to: '/dashboard' });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
      toast.success('Login successful!');
      navigate({ to: '/dashboard' });
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info('Password reset is managed through Internet Identity. Please use the Internet Identity recovery options.');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Login to access your Evergreen Hub dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This application uses Internet Identity for secure authentication. Click the button below to login.
            </AlertDescription>
          </Alert>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <Button onClick={handleLogin} className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login with Internet Identity'}
          </Button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full text-sm text-primary hover:underline"
          >
            Forgot Password?
          </button>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
