import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Zap, Globe, Search, MessageCircle, Star, Clock, Headphones } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import WebDesignPaymentModal from './WebDesignPaymentModal';

const highlights = [
  { icon: Zap, text: 'Fast Delivery — 3 to 30 days' },
  { icon: Globe, text: 'Lead Generation Websites' },
  { icon: Search, text: 'SEO Optimized for Google' },
  { icon: MessageCircle, text: '24/7 WhatsApp Support' },
];

const basicPackageFeatures = [
  'Responsive Design (Mobile-Friendly)',
  'Fast Loading Speed',
  'Basic SEO Setup',
  'Contact Form Integration',
  '3-Day Delivery',
  '7-Day Support',
];

const otherPackages = [
  { name: 'Starter', price: '₹4,999' },
  { name: 'Growth', price: '₹8,999' },
  { name: 'Authority', price: '₹14,999' },
  { name: 'Ultra Premium', price: '₹24,999' },
];

const basicPackage = {
  name: 'Basic Package',
  price: 2999,
  delivery: '3 Days',
  support: '7 Days',
};

export default function WebDesignServicesPromo() {
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-6xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img
              src="/assets/CC_20260226_043346-1.png"
              alt="Evergreen Hub Logo"
              className="w-20 h-20 object-cover rounded-full border-2 border-orange-400/40 shadow-lg"
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 text-orange-300 text-sm font-medium mb-4">
            <Globe className="w-4 h-4" />
            Web Design Services
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            Professional Website{' '}
            <span className="text-orange-400">Banwao</span>
          </h2>
          <p className="text-blue-200 max-w-xl mx-auto">
            Apne business ko online lao. Beautiful, fast, aur SEO-friendly websites jo real leads laayein.
          </p>
        </div>

        {/* Basic Package Highlight Card */}
        <div className="mb-10">
          <div className="relative bg-gradient-to-br from-orange-500/25 via-orange-400/15 to-blue-800/30 border-2 border-orange-400/50 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden">
            {/* Best Value Badge */}
            <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Best Value
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left: Package Info */}
              <div>
                <p className="text-orange-300 text-sm font-semibold uppercase tracking-wider mb-1">
                  🚀 Most Popular — Start Here
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                  {basicPackage.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold text-orange-400">
                    ₹{basicPackage.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-blue-300 text-sm">one-time</span>
                </div>

                {/* Delivery & Support Pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 bg-blue-800/60 border border-blue-600/40 text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Clock className="w-3 h-3 text-orange-400" />
                    {basicPackage.delivery} Delivery
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-blue-800/60 border border-blue-600/40 text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full">
                    <Headphones className="w-3 h-3 text-green-400" />
                    {basicPackage.support} Support
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-medium px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Demo Available
                  </span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowPaymentModal(true)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30"
                  >
                    Order Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate({ to: '/web-design-services' })}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-semibold transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Right: Features List */}
              <div className="bg-blue-900/40 border border-blue-700/30 rounded-2xl p-5">
                <p className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                  ✅ Kya Milega Aapko:
                </p>
                <ul className="space-y-2.5">
                  {basicPackageFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-blue-100 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-blue-700/40" />
          <span className="text-blue-400 text-sm font-medium whitespace-nowrap">Aur Bhi Packages</span>
          <div className="flex-1 h-px bg-blue-700/40" />
        </div>

        {/* Two-column layout: Highlights + Other Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Highlights */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Kyun Choose Karein?</h3>
            <ul className="space-y-4 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-800/60 border border-blue-700/40 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-orange-400" />
                  </div>
                  <span className="text-blue-100 font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate({ to: '/web-design-services' })}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
              >
                View All Packages <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/919263989760?text=Hi%2C%20I%20want%20to%20know%20about%20web%20design%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right: Other Package Preview Cards */}
          <div className="grid grid-cols-2 gap-4">
            {otherPackages.map((pkg, i) => (
              <div
                key={i}
                className={`rounded-2xl p-5 border transition-all hover:scale-105 cursor-pointer ${
                  i === 1
                    ? 'bg-orange-500/20 border-orange-400/40'
                    : 'bg-blue-800/40 border-blue-700/30'
                }`}
                onClick={() => navigate({ to: '/web-design-services' })}
              >
                <p className="font-bold text-white text-sm mb-1">{pkg.name}</p>
                <p className={`text-2xl font-extrabold ${i === 1 ? 'text-orange-400' : 'text-blue-200'}`}>
                  {pkg.price}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-blue-300">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>Full Support</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal for Basic Package */}
      {showPaymentModal && (
        <WebDesignPaymentModal
          isOpen={showPaymentModal}
          packageName={basicPackage.name}
          packagePrice={basicPackage.price}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </section>
  );
}
