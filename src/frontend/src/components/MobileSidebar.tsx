import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { X, Home, BookOpen, Phone, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggleSwitch from './ThemeToggleSwitch';
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
  const { isAuthenticated, isAdmin } = useAuth();

  const courses = [
    'Affiliate Marketing Mastery',
    'Digital Marketing Fundamentals',
    'Social Media Growth',
    'Content Creation',
    'SEO Optimization',
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 p-0 bg-background border-l border-border">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">
              Menu
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-foreground hover:text-primary"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary transition-all duration-200"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="courses" className="border-border">
                <AccordionTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary transition-all duration-200 hover:no-underline">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Our Courses</span>
                </AccordionTrigger>
                <AccordionContent className="pl-12 pr-4 space-y-2 mt-2">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="py-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {course}
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              to="/about-us"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary transition-all duration-200"
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">About Us</span>
            </Link>

            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:text-primary hover:bg-secondary transition-all duration-200"
            >
              <Phone className="h-5 w-5" />
              <span className="font-medium">Contact</span>
            </Link>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm font-medium text-foreground">Theme</span>
                <ThemeToggleSwitch />
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            {!isAuthenticated ? (
              <div className="space-y-2">
                <Button asChild className="w-full btn-cta">
                  <Link to="/login" onClick={onClose}>
                    Login
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                  <Link to="/register" onClick={onClose}>
                    Register
                  </Link>
                </Button>
              </div>
            ) : (
              <Button asChild className="w-full btn-cta">
                <Link to={isAdmin ? '/admin-dashboard' : '/dashboard'} onClick={onClose}>
                  {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
