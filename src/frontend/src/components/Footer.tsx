import { SiYoutube, SiInstagram } from 'react-icons/si';
import { MessageCircle, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'evergreen-hub'
  );

  return (
    <footer className="bg-black text-white py-12 border-t border-emerald-500/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-emerald-400">Evergreen Hub</h3>
            <p className="text-gray-400">Learn. Earn. Grow.</p>
            <p className="text-sm text-gray-500">
              Your trusted partner in affiliate marketing education
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-400">Connect With Us</h4>
            <div className="space-y-3">
              <a
                href="https://youtube.com/@evergreengamerz?si=cQtRVvA1XpyUHMyQ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <SiYoutube className="h-5 w-5" />
                <span>YouTube Channel</span>
              </a>
              <a
                href="https://www.instagram.com/rajput.rudra_s?igsh=MXVtZDVxYjNub2NnbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors"
              >
                <SiInstagram className="h-5 w-5" />
                <span>Instagram: @rajput.rudra_s</span>
              </a>
              <a
                href="https://wa.me/919263989760"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp: +91 9263989760</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-400">Get Started</h4>
            <p className="text-sm text-gray-400">
              Ready to start your affiliate marketing journey? Contact us on WhatsApp for instant support!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Evergreen Hub. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-emerald-500 fill-emerald-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
