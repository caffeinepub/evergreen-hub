import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useState, useRef, MouseEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import CoursePackagesModal from './CoursePackagesModal';

export default function HeroSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPackagesModal, setShowPackagesModal] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleIdRef = useRef(0);

  const handleBuyCourse = (e: MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rippleId = rippleIdRef.current++;
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 600);

    if (!isAuthenticated) {
      navigate({ to: '/login' });
      return;
    }
    setShowPackagesModal(true);
  };

  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/919263989760?text=Hi%2C%20I%27m%20interested%20in%20the%20Evergreen%20Hub%20affiliate%20marketing%20courses',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Zoom Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="hero-bg-zoom w-full h-full">
            <img
              src="/assets/generated/hero-bg.dim_1920x1080.png"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-emerald-950/90" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 py-20 mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Brand */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight hero-headline">
                Evergreen Hub
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-emerald-400">
                Learn. Earn. Grow.
              </p>
            </div>

            {/* Main Headline with Animation */}
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight hero-headline">
              Start Your Online Earning Journey Today
            </h2>

            {/* Subheadline with Animation */}
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto hero-subheadline">
              Learn Affiliate Marketing and Build Passive Income from Home
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Button
                onClick={handleBuyCourse}
                size="lg"
                className="relative overflow-hidden bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-2xl transition-all duration-300 cta-button-primary w-full sm:w-auto"
              >
                {ripples.map(ripple => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                    }}
                  />
                ))}
                Buy Course Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleWhatsApp}
                size="lg"
                variant="outline"
                className="bg-black/50 hover:bg-black border-2 border-emerald-500 text-emerald-400 hover:text-emerald-300 font-bold text-lg px-8 py-6 rounded-lg shadow-xl transition-all duration-300 whatsapp-button w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      <CoursePackagesModal
        isOpen={showPackagesModal}
        onClose={() => setShowPackagesModal(false)}
      />
    </>
  );
}
