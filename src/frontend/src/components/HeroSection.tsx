import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';

export default function HeroSection() {
  const handleBuyCourse = () => {
    const pricingSection = document.getElementById('pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello, I am interested in your course packages.');
    window.open(`https://wa.me/919263989760?text=${message}`, '_blank');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-emerald-950/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Brand */}
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
              Evergreen Hub
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-emerald-400">
              Learn. Earn. Grow.
            </p>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Start Your Online Earning Journey Today
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Learn Affiliate Marketing and Build Passive Income from Home
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              onClick={handleBuyCourse}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg px-8 py-6 rounded-lg shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Buy Course Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={handleWhatsApp}
              size="lg"
              variant="outline"
              className="bg-black/50 hover:bg-black border-2 border-emerald-500 text-emerald-400 hover:text-emerald-300 font-bold text-lg px-8 py-6 rounded-lg shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
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
  );
}
