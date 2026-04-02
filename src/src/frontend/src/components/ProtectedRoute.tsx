import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing, userProfile } = useAuth();
  const navigate = useNavigate();

  const isAdminAuthed =
    typeof localStorage !== "undefined" &&
    localStorage.getItem("evergreen_admin_auth") === "true";

  useEffect(() => {
    if (requireAdmin) {
      if (!isAdminAuthed) {
        toast.error("Admin access required. Please login.");
        navigate({ to: "/admin-login" });
      }
      return;
    }

    if (isInitializing) return;

    if (!isAuthenticated) {
      toast.error("Please login to access this page");
      navigate({ to: "/login" });
      return;
    }

    if (isAuthenticated && !requireAdmin && userProfile === null) {
      return;
    }
  }, [
    isAuthenticated,
    isInitializing,
    requireAdmin,
    navigate,
    userProfile,
    isAdminAuthed,
  ]);

  if (requireAdmin) {
    if (!isAdminAuthed) return null;
    return <>{children}</>;
  }

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
