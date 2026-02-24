import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { X, Home, BookOpen, Phone, Info, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggleSwitch from './ThemeToggleSwitch';
import { ExternalBlob } from '../backend';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { isAuthenticated, isAdmin, userProfile, logout } = useAuth();

  const packages = [
    'E-LITE Package',
    'SILVER Package',
    'GOLD Package',
    'DIAMOND Package',
    'PLATINUM Package',
    'ULTRA PRO Package',
  ];

  const scrollToSection = (sectionId: string) => {
    onClose();
    
    // Check if we're on the homepage
    if (window.location.pathname !== '/') {
      // Navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // If already on homepage, scroll smoothly
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleAllPackagesClick = () => {
    scrollToSection('courses-section');
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    window.location.href = '/';
  };

  const profilePhotoUrl = userProfile?.profilePhotoUrl
    ? ExternalBlob.fromURL(userProfile.profilePhotoUrl).getDirectURL()
    : null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 p-0 bg-white dark:bg-slate-900 border-l border-gray-300 dark:border-slate-700">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-slate-700">
            <h2 className="text-xl font-bold text-primary">
              Menu
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-900 dark:text-gray-100 hover:text-primary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Profile Section - Only show when authenticated */}
          {isAuthenticated && userProfile && (
            <div className="px-6 py-4 border-b border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                  {profilePhotoUrl ? (
                    <img
                      src={profilePhotoUrl}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {userProfile.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="courses" className="border-gray-300 dark:border-slate-700">
                <AccordionTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 hover:no-underline">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Our Courses</span>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pr-4 space-y-3 mt-2">
                  {/* 1. All Packages - Now Clickable */}
                  <div className="space-y-2">
                    <div 
                      onClick={handleAllPackagesClick}
                      className="font-semibold text-gray-900 dark:text-gray-100 text-sm hover:text-primary transition-colors cursor-pointer"
                    >
                      1. All Packages
                    </div>
                    <div className="pl-4 space-y-2">
                      {packages.map((pkg, index) => (
                        <div
                          key={index}
                          onClick={() => scrollToSection('courses-section')}
                          className="py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer"
                        >
                          {pkg}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Video Editing Charge */}
                  <div
                    onClick={() => scrollToSection('video-editing-section')}
                    className="py-2 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors cursor-pointer text-sm"
                  >
                    2. Video Editing Charge
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              to="/about-us"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">About Us</span>
            </Link>

            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">Contact</span>
            </Link>

            <div className="pt-4 border-t border-gray-300 dark:border-slate-700">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Theme</span>
                <ThemeToggleSwitch />
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-300 dark:border-slate-700">
            {!isAuthenticated ? (
              <div className="space-y-2">
                <Button asChild className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white">
                  <Link to="/login" onClick={onClose}>
                    Login
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white">
                  <Link to="/register" onClick={onClose}>
                    Register
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Link to={isAdmin ? '/admin-dashboard' : '/dashboard'} onClick={onClose}>
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
