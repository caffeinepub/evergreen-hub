import { Link } from '@tanstack/react-router';
import { SiYoutube, SiInstagram } from 'react-icons/si';
import { Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'evergreen-hub'
  );
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <footer className="relative overflow-hidden">
      {/* Background gradient with glassmorphism */}
      <div className={`absolute inset-0 ${
        isDark 
          ? 'bg-gradient-to-b from-[#0a1929] to-[#1a237e]' 
          : 'bg-gradient-to-b from-slate-100 to-slate-200'
      } transition-colors duration-300`}>
        {/* Glassmorphism overlay */}
        <div className={`absolute inset-0 backdrop-blur-md ${
          isDark ? 'bg-white/5' : 'bg-black/5'
        }`} />
      </div>

      {/* Floating decorative dots */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Red glowing dots */}
        <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse" />
        <div className="absolute top-[60%] right-[10%] w-40 h-40 bg-red-500 rounded-full blur-xl opacity-15" />
        <div className="absolute bottom-[20%] left-[15%] w-36 h-36 bg-red-500 rounded-full blur-xl opacity-25 animate-pulse" />
        
        {/* Blue glowing dots */}
        <div className="absolute top-[30%] right-[5%] w-48 h-48 bg-blue-500 rounded-full blur-xl opacity-20" />
        <div className="absolute bottom-[40%] left-[8%] w-44 h-44 bg-blue-500 rounded-full blur-xl opacity-15 animate-pulse" />
        <div className="absolute top-[70%] right-[20%] w-32 h-32 bg-blue-500 rounded-full blur-xl opacity-30" />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Brand section */}
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Evergreen Hub
          </h2>
          <p className="text-sm md:text-base text-white/80">
            Learn Today, Grow Forever
          </p>
        </div>

        {/* Main footer content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/about-us" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <a 
                href="/#courses" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Courses
              </a>
              <Link 
                to="/contact" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <Link 
                to="/login" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Register
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Legal Links</h3>
            <nav className="flex flex-col space-y-2">
              <a 
                href="#" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Disclaimer
              </a>
              <a 
                href="#" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Refund Policy
              </a>
              <a 
                href="#" 
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/rajput.rudra_s?igsh=MXVtZDVxYjNub2NnbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="Instagram"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 hover:scale-110 transition-transform shadow-lg">
                  <SiInstagram className="h-6 w-6 text-white" />
                </div>
              </a>
              <a
                href="https://youtube.com/@evergreengamerz?si=cQtRVvA1XpyUHMyQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label="YouTube"
              >
                <div className="p-3 rounded-lg bg-red-600 hover:scale-110 transition-transform shadow-lg">
                  <SiYoutube className="h-6 w-6 text-white" />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-white/70">
            © {currentYear} Evergreen Hub. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-white/70">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/90 transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
