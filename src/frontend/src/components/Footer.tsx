import { Link } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'evergreen-hub';

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400/30 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-emerald-500/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-emerald-300/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-emerald-400/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Evergreen Hub
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your trusted partner in affiliate marketing education. Learn, grow, and succeed with our comprehensive courses.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700/50 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/rajput.rudra_s"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700/50 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-700/50 backdrop-blur-sm flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 hover:scale-110"
              >
                <SiYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/9263989760"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm cursor-pointer"
                >
                  WhatsApp: ********60
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-400">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Evergreen Hub. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
