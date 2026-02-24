import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import MobileSidebar from './MobileSidebar';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-sm shadow-soft dark:bg-background/90 dark:shadow-[0_4px_12px_rgba(59,130,246,0.15)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/FB_IMG_1766033480161.jpg"
                alt="Evergreen Hub"
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-primary">Evergreen Hub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggleSwitch />
              {!isAuthenticated ? (
                <>
                  <Button asChild variant="ghost" className="text-foreground hover:text-primary">
                    <Link to="/login">Login</Link>
                  </Button>
                  <button className="btn-cta px-6 py-2 font-semibold">
                    <Link to="/register">Register</Link>
                  </button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-primary text-primary">
                      {isAdmin ? 'Admin' : 'My Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={isAdmin ? '/admin-dashboard' : '/dashboard'}>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </>
  );
}
