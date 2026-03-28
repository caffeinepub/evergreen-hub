import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Menu, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import CartDrawer from "./CartDrawer";
import MobileSidebar from "./MobileSidebar";

export default function Header() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDashboardClick = () => {
    if (isAdmin) {
      navigate({ to: "/admin/stats" });
    } else {
      navigate({ to: "/dashboard" });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const currentPath = router.state.location.pathname;
    if (currentPath === "/") {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate({ to: "/" });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm shadow-soft dark:bg-background/90 dark:shadow-[0_4px_12px_rgba(59,130,246,0.15)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/CC_20260226_043346-1.png"
                alt="Evergreen Hub Logo"
                className="h-10 w-10 object-contain rounded-full"
              />
              <span className="text-xl font-bold text-primary">
                Evergreen Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-ocid="nav.link"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-ocid="nav.link"
              >
                About
              </Link>
              <Link
                to="/web-design-services"
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-ocid="nav.link"
              >
                Web Design
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("video-editing")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-ocid="nav.link"
              >
                Video Editing
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("photo-editing")}
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-ocid="nav.link"
              >
                Photo Editing
              </button>
              <Link
                to="/contact"
                className="text-foreground hover:text-primary transition-colors font-medium"
                data-ocid="nav.link"
              >
                Contact
              </Link>
            </nav>

            {/* Desktop Auth + Cart */}
            <div className="hidden md:flex items-center gap-3">
              {/* Cart Button */}
              <button
                type="button"
                data-ocid="cart.open_modal_button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-white rounded-full">
                    {cartCount}
                  </Badge>
                )}
              </button>

              {!isAuthenticated ? (
                <>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-foreground hover:text-primary"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <button
                    type="button"
                    className="btn-cta px-6 py-2 font-semibold"
                  >
                    <Link to="/register">Register</Link>
                  </button>
                </>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-primary text-primary"
                    >
                      {isAdmin ? "Admin" : "My Account"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={handleDashboardClick}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Mobile: Cart + Menu */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                data-ocid="cart.open_modal_button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
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
                className="text-foreground"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
