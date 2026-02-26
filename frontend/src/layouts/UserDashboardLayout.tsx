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
  DollarSign,
  FileText,
  LayoutGrid,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ExternalBlob } from '../backend';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Packages', href: '/dashboard/packages', icon: Package },
  { name: 'Withdrawal Request', href: '/dashboard/withdrawal-requests', icon: DollarSign },
  { name: 'Landing Page Builder', href: '/dashboard/landing-page-builder', icon: FileText },
  { name: 'My Landing Pages', href: '/dashboard/my-landing-pages', icon: LayoutGrid },
  { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
  { name: 'Change Password', href: '/dashboard/change-password', icon: Lock },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  const profilePhotoUrl = userProfile?.profilePhotoUrl
    ? ExternalBlob.fromURL(userProfile.profilePhotoUrl).getDirectURL()
    : null;

  return (
    <div className="flex h-full flex-col bg-black border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-green-500">Evergreen Hub</h2>
        <p className="text-sm text-green-400 mt-1">User Dashboard</p>
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
                  ? 'bg-green-600 text-yellow-400'
                  : 'text-green-500 hover:bg-gray-900 hover:text-yellow-400'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="mb-3 px-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center overflow-hidden flex-shrink-0">
            {profilePhotoUrl ? (
              <img
                src={profilePhotoUrl}
                alt={userProfile?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-white" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-400 truncate">{userProfile?.name}</p>
            <p className="text-xs text-green-600 truncate">{userProfile?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
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
          <SheetContent side="left" className="p-0 w-64 bg-black border-gray-800">
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
