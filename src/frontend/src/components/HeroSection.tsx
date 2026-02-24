import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CoursePackagesModal from './CoursePackagesModal';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const phoneNumber = '9263989760';
  const maskedNumber = '********60';
  const message = encodeURIComponent('Hello! I want to know more about your courses.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900">
        {/* Animated background */}
        <div className="absolute inset-0 bg-[url('/assets/generated/hero-bg.dim_1920x1080.png')] bg-cover bg-center opacity-20 animate-zoomIn"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Master <span className="text-emerald-400">Affiliate Marketing</span>
              <br />
              Build Your <span className="text-emerald-400">Passive Income</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Join thousands of successful students learning proven strategies to earn online. 
              Get lifetime access to premium courses with expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Button
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="relative px-8 py-6 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-breathingGlow overflow-hidden group"
              >
                <span className="relative z-10">Buy Course Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ripple"></span>
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg font-semibold border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-full transition-all duration-300 hover:scale-105 hover:rotate-2"
                >
                  <span>WhatsApp: {maskedNumber}</span>
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">1000+</p>
                <p className="text-sm text-slate-400">Happy Students</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">50+</p>
                <p className="text-sm text-slate-400">Expert Courses</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-400">24/7</p>
                <p className="text-sm text-slate-400">Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      <CoursePackagesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
