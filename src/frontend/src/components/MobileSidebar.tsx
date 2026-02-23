import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { X, ChevronDown, Home, Info, BookOpen, Mail, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const { theme, setTheme, actualTheme } = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    onClose();
  };

  const handleLoginClick = () => {
    navigate({ to: '/login' });
    onClose();
  };

  const handleDashboardClick = () => {
    if (isAdmin) {
      navigate({ to: '/admin-dashboard' });
    } else {
      navigate({ to: '/dashboard' });
    }
    onClose();
  };

  const toggleTheme = () => {
    setTheme(actualTheme === 'light' ? 'dark' : 'light');
  };

  if (!isOpen) return null;

  // Theme-aware gradient backgrounds
  const gradientBg = actualTheme === 'dark'
    ? 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)'
    : 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] md:hidden backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-[280px] z-[101] md:hidden transform transition-transform duration-300 ease-out"
        style={{
          background: gradientBg,
        }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border-l border-white/10" />

        {/* Floating decorative dots */}
        <div className="absolute top-20 right-8 w-16 h-16 rounded-full bg-red-500 opacity-20 animate-pulse" />
        <div className="absolute top-40 right-16 w-12 h-12 rounded-full bg-blue-500 opacity-15" />
        <div className="absolute bottom-32 right-12 w-20 h-20 rounded-full bg-red-500 opacity-10 animate-pulse" />
        <div className="absolute bottom-60 right-6 w-8 h-8 rounded-full bg-blue-500 opacity-20" />
        <div className="absolute top-1/2 right-20 w-10 h-10 rounded-full bg-blue-400 opacity-15 animate-pulse" />

        {/* Content */}
        <div className="relative h-full flex flex-col p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Logo/Brand */}
          <div className="mb-8 mt-2">
            <h2 className="text-2xl font-bold text-white">Menu</h2>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {/* Home */}
            <button
              onClick={() => handleNavigation('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </button>

            {/* About Us */}
            <button
              onClick={() => handleNavigation('/about-us')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">About Us</span>
            </button>

            {/* Courses with Dropdown */}
            <div>
              <button
                onClick={() => setCoursesOpen(!coursesOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Courses</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-200 ${
                    coursesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  coursesOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-white/20 pl-4">
                  <button
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                        onClose();
                      } else {
                        handleNavigation('/#pricing');
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                  >
                    All Courses
                  </button>
                  <button
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                        onClose();
                      } else {
                        handleNavigation('/#pricing');
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                  >
                    Affiliate Marketing
                  </button>
                  <button
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      if (pricingSection) {
                        pricingSection.scrollIntoView({ behavior: 'smooth' });
                        onClose();
                      } else {
                        handleNavigation('/#pricing');
                      }
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                  >
                    Digital Marketing
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Us */}
            <button
              onClick={() => handleNavigation('/contact')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
            >
              <Mail className="h-5 w-5" />
              <span className="font-medium">Contact Us</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors text-left"
            >
              {actualTheme === 'light' ? (
                <>
                  <Moon className="h-5 w-5" />
                  <span className="font-medium">Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5" />
                  <span className="font-medium">Light Mode</span>
                </>
              )}
            </button>
          </nav>

          {/* Bottom Action Button */}
          <div className="pt-4 border-t border-white/20">
            {isAuthenticated ? (
              <Button
                onClick={handleDashboardClick}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  onClick={handleLoginClick}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleNavigation('/register')}
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10 font-semibold py-3 rounded-lg transition-colors"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
