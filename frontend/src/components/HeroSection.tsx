import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    // Try the pricing section id first, then fallback to courses-section
    const pricingEl = document.getElementById('pricing-section');
    const coursesEl = document.getElementById('courses-section');
    const target = pricingEl || coursesEl;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary-dark, #0a2e1a) 0%, var(--color-primary, #0d3b22) 40%, var(--color-secondary-dark, #0a1628) 100%)',
      }}
    >
      {/* Background image overlay */}
      <div className="absolute inset-0 opacity-15">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #34d399, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f97316, transparent)' }} />

      <div
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-6">
          <BookOpen className="w-4 h-4" />
          Digital Skills & Affiliate Marketing
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Apni{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #34d399 0%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Digital Journey
          </span>{' '}
          Shuru Karo
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-emerald-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Learn affiliate marketing, digital skills, aur online income strategies. Expert guidance ke saath apna future secure karo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleExplore}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
            style={{ boxShadow: '0 0 30px rgba(249,115,22,0.3)' }}
          >
            Explore Courses <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="https://wa.me/919263989760?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Evergreen%20Hub%20courses"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
