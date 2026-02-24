import { Outlet, Link, useNavigate, useLocation } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Home,
  LayoutDashboard,
  Package,
  User,
  Lock,
  LogOut,
  Menu,
  Palette,
  DollarSign,
  FileText,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AppearanceSettingsModal from '../components/AppearanceSettingsModal';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Packages', href: '/dashboard/packages', icon: Package },
  { name: 'Withdrawal Request', href: '/dashboard/withdrawal-requests', icon: DollarSign },
  { name: 'Landing Page Builder', href: '/dashboard/landing-page-builder', icon: FileText },
  { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
  { name: 'Change Password', href: '/dashboard/change-password', icon: Lock },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();
  const [appearanceModalOpen, setAppearanceModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <>
      <div className="flex h-full flex-col bg-card border-r">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-primary">Evergreen Hub</h2>
          <p className="text-sm text-muted-foreground mt-1">User Dashboard</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
          
          <button
            onClick={() => setAppearanceModalOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Palette className="h-5 w-5" />
            Appearance
          </button>
        </nav>

        <div className="p-4 border-t">
          <div className="mb-3 px-3">
            <p className="text-sm font-medium">{userProfile?.name}</p>
            <p className="text-xs text-muted-foreground">{userProfile?.email}</p>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <AppearanceSettingsModal open={appearanceModalOpen} onOpenChange={setAppearanceModalOpen} />
    </>
  );
}

export default function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 md:flex-col">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container py-6 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
