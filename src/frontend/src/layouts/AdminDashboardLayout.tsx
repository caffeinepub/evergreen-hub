import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  CreditCard,
  ImageIcon,
  Layers,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Tag,
  Users,
  Wallet,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/admin/stats",
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    label: "Packages",
    path: "/admin/packages",
    icon: <Package className="h-4 w-4" />,
  },
  {
    label: "Payments",
    path: "/admin/payments",
    icon: <CreditCard className="h-4 w-4" />,
  },
  { label: "Users", path: "/admin/users", icon: <Users className="h-4 w-4" /> },
  {
    label: "Withdrawals",
    path: "/admin/withdrawals",
    icon: <Wallet className="h-4 w-4" />,
  },
  {
    label: "Inquiries",
    path: "/admin/inquiries",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: <Layers className="h-4 w-4" />,
  },
  {
    label: "Coupon Management",
    path: "/admin/coupons",
    icon: <Tag className="h-4 w-4" />,
  },
  {
    label: "Service Images",
    path: "/admin/service-images",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    label: "Site Content",
    path: "/admin/site-content",
    icon: <Settings className="h-4 w-4" />,
  },
];

function SidebarContent({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("evergreen_admin_auth");
    logout();
    navigate({ to: "/admin-login" });
  };

  return (
    <div
      className="flex flex-col h-full text-white"
      style={{
        background:
          "linear-gradient(180deg, #000000 0%, #001a0a 40%, #000000 70%, #0a1628 100%)",
      }}
    >
      {/* Logo / Branding */}
      <div
        className="p-4"
        style={{ borderBottom: "1px solid rgba(16,185,129,0.15)" }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #10b981, #3b82f6)",
              boxShadow: "0 0 16px rgba(16,185,129,0.4)",
            }}
          >
            <Shield className="h-4 w-4 text-black" />
          </div>
          <div>
            <p
              className="font-bold text-sm"
              style={{ color: "#fff", letterSpacing: "-0.01em" }}
            >
              Evergreen Hub
            </p>
            <p className="text-xs" style={{ color: "rgba(16,185,129,0.6)" }}>
              Admin Panel
            </p>
          </div>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: "#22c55e",
              boxShadow: "0 0 6px rgba(34,197,94,0.8)",
            }}
          />
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
            Logged in as Admin
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            currentPath.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(59,130,246,0.2))"
                  : "transparent",
                color: isActive ? "#6ee7b7" : "rgba(255,255,255,0.55)",
                border: isActive
                  ? "1px solid rgba(16,185,129,0.3)"
                  : "1px solid transparent",
                boxShadow: isActive ? "0 0 10px rgba(16,185,129,0.15)" : "none",
              }}
            >
              <span
                style={{
                  color: isActive ? "#10b981" : "rgba(255,255,255,0.35)",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="p-3"
        style={{ borderTop: "1px solid rgba(16,185,129,0.1)" }}
      >
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 mb-1"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          ← View Website
        </Link>
        <button
          type="button"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200"
          style={{ color: "#fca5a5" }}
          onClick={handleLogout}
          data-ocid="admin.logout.button"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:flex-col w-56 shrink-0">
          <SidebarContent currentPath={currentPath} />
        </aside>

        {/* Mobile Header + Sheet */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <header
            className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-800"
            style={{
              background: "linear-gradient(90deg, #000000, #001a0a)",
            }}
          >
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
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
              <Shield className="h-5 w-5" style={{ color: "#10b981" }} />
              <span className="font-bold text-sm text-white">Admin Panel</span>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
