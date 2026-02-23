import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isInitializing, userProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isInitializing) return;

    if (!isAuthenticated) {
      toast.error('Please login to access this page');
      navigate({ to: requireAdmin ? '/admin-login' : '/login' });
      return;
    }

    if (requireAdmin && !isAdmin) {
      toast.error('Access denied. Admin privileges required.');
      navigate({ to: '/dashboard' });
      return;
    }

    // Check if user needs to complete profile setup
    if (isAuthenticated && !requireAdmin && userProfile === null) {
      // Profile setup will be handled by the dashboard
      return;
    }
  }, [isAuthenticated, isAdmin, isInitializing, requireAdmin, navigate, userProfile]);

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

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
