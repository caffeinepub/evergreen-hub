import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Camera,
  Globe,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Phone,
  ShoppingCart,
  User,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { ExternalBlob } from "../backend";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import CartDrawer from "./CartDrawer";
import ContactInterestForm from "./ContactInterestForm";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { isAuthenticated, isAdmin, userProfile, logout } = useAuth();
  const { cartCount } = useCart();
  const [showContactForm, setShowContactForm] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    onClose();
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  const handleWebDesignClick = () => {
    onClose();
    navigate({ to: "/web-design-services" });
  };

  const handleDashboardClick = () => {
    onClose();
    if (isAdmin) {
      navigate({ to: "/admin/stats" });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    window.location.href = "/";
  };

  const profilePhotoUrl = userProfile?.profilePhotoUrl
    ? ExternalBlob.fromURL(userProfile.profilePhotoUrl).getDirectURL()
    : null;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-80 p-0 bg-white dark:bg-slate-900 border-l border-gray-300 dark:border-slate-700"
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-slate-700">
              <h2 className="text-xl font-bold text-primary">Menu</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  data-ocid="cart.open_modal_button"
                  onClick={() => {
                    onClose();
                    setIsCartOpen(true);
                  }}
                  className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label="Open cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-900 dark:text-gray-100 hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* User Profile Section */}
            {isAuthenticated && userProfile && (
              <div className="px-6 py-4 border-b border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
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
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
                <AccordionItem
                  value="services"
                  className="border-gray-300 dark:border-slate-700"
                >
                  <AccordionTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 hover:no-underline">
                    <BookOpen className="h-5 w-5" />
                    <span className="font-medium">Our Services</span>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8 pr-4 space-y-3 mt-2">
                    <div
                      onClick={() => scrollToSection("video-editing")}
                      onKeyDown={(e) =>
                        e.key === "Enter" && scrollToSection("video-editing")
                      }
                      className="py-2 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors cursor-pointer text-sm flex items-center gap-2"
                    >
                      <Video className="h-4 w-4 text-purple-500" />
                      1. Video Editing
                    </div>

                    <div
                      onClick={() => scrollToSection("photo-editing")}
                      onKeyDown={(e) =>
                        e.key === "Enter" && scrollToSection("photo-editing")
                      }
                      className="py-2 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors cursor-pointer text-sm flex items-center gap-2"
                    >
                      <Camera className="h-4 w-4 text-pink-500" />
                      2. Photo Editing
                    </div>

                    <div
                      onClick={handleWebDesignClick}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleWebDesignClick()
                      }
                      className="py-2 font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors cursor-pointer text-sm flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4 text-blue-500" />
                      3. Web Design Services
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Link
                to="/about"
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

              {/* Contact Interest Form */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowContactForm(!showContactForm)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Contact Us</span>
                  </div>
                  <span className="text-xs">{showContactForm ? "▲" : "▼"}</span>
                </button>
                {showContactForm && (
                  <div className="mt-3 px-2">
                    <ContactInterestForm />
                  </div>
                )}
              </div>

              {/* Dashboard Button */}
              {isAuthenticated && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleDashboardClick}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-black transition-all duration-200 hover:opacity-90 active:scale-95 shadow-md"
                    style={{ backgroundColor: "#FACC15" }}
                  >
                    <LayoutDashboard className="h-5 w-5 text-black" />
                    <span>{isAdmin ? "Admin Dashboard" : "My Dashboard"}</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-300 dark:border-slate-700 space-y-3">
              {!isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="w-full text-center px-4 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className="w-full text-center px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
