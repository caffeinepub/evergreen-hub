import { Outlet, Link, useNavigate, useLocation } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  LogOut,
  Menu,
  Shield,
  DollarSign,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard Stats', href: '/admin-dashboard', icon: LayoutDashboard },
  { name: 'User Management', href: '/admin-dashboard/users', icon: Users },
  { name: 'Package Management', href: '/admin-dashboard/packages', icon: Package },
  { name: 'Payment Management', href: '/admin-dashboard/payments', icon: CreditCard },
  { name: 'Withdrawal Management', href: '/admin-dashboard/withdrawals', icon: DollarSign },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/admin-login' });
  };

  return (
    <div className="flex h-full flex-col bg-card border-r">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-bold text-primary">Evergreen Hub</h2>
          <Badge variant="outline" className="gap-1">
            <Shield className="h-3 w-3" />
            Admin
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Admin Dashboard</p>
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
      </nav>

      <div className="p-4 border-t">
        <div className="mb-3 px-3">
          <p className="text-sm font-medium">{userProfile?.name}</p>
          <p className="text-xs text-muted-foreground">Administrator</p>
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
  );
}

export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute requireAdmin>
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
