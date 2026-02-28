import React, { useState } from 'react';
import { Link, useLocation, Outlet } from '@tanstack/react-router';
import ProtectedRoute from '../components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Users,
  Wallet,
  Menu,
  Shield,
  LogOut,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin/stats', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'Packages', path: '/admin/packages', icon: <Package className="h-4 w-4" /> },
  { label: 'Payments', path: '/admin/payments', icon: <CreditCard className="h-4 w-4" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="h-4 w-4" /> },
  { label: 'Withdrawals', path: '/admin/withdrawals', icon: <Wallet className="h-4 w-4" /> },
  { label: 'Inquiries', path: '/admin/inquiries', icon: <MessageSquare className="h-4 w-4" /> },
  { label: 'Site Content', path: '/admin/site-content', icon: <Settings className="h-4 w-4" /> },
];

function SidebarContent({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
  const { logout, userProfile } = useAuth();

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm">Admin Panel</p>
            <p className="text-xs text-gray-400">Evergreen Hub</p>
          </div>
        </div>
        {userProfile && (
          <div className="mt-3 px-2 py-1.5 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">Logged in as</p>
            <p className="text-sm font-medium truncate">{userProfile.name}</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path || currentPath.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-700">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors mb-1"
        >
          View Website
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}

// No children prop — uses <Outlet /> so TanStack Router can render nested routes
export default function AdminDashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col w-56 shrink-0 border-r border-gray-200 dark:border-gray-800">
          <SidebarContent currentPath={currentPath} />
        </aside>

        {/* Mobile Header + Sheet */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-56">
                <SidebarContent
                  currentPath={currentPath}
                  onNavigate={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-500" />
              <span className="font-bold text-sm">Admin Panel</span>
            </div>
          </header>

          {/* Main Content — Outlet renders the matched child route */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
