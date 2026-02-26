import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Star, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import WebDesignPaymentModal from '../components/WebDesignPaymentModal';
import FounderSection from '../components/FounderSection';

interface Package {
  name: string;
  price: string;
  priceNum: number;
  originalPrice: string;
  features: string[];
  highlight: boolean;
  badge?: string;
  delivery?: string;
  support?: string;
  tagline?: string;
}

const packages: Package[] = [
  {
    name: 'Basic Package',
    price: '₹2,999',
    priceNum: 2999,
    originalPrice: '₹5,999',
    features: [
      '1 Simple Landing Page (clean & minimal design)',
      '1–2 page website',
      'Mobile-Friendly only',
      'Contact Form',
      'WhatsApp / Call button',
      'Google Map pin',
    ],
    highlight: false,
    badge: 'Budget-Friendly',
    delivery: '2–3 Days',
    support: '15 Days',
    tagline: '⚡ Perfect for beginners / small businesses starting online, low-cost & fast setup',
  },
  {
    name: 'Starter',
    price: '₹4,999',
    priceNum: 4999,
    originalPrice: '₹9,999',
    features: [
      '3-5 Page Website',
      'Mobile Responsive Design',
      'Basic SEO Setup',
      'Contact Form Integration',
      'WhatsApp Button',
      '1 Month Free Support',
    ],
    highlight: false,
    delivery: '3–5 Days',
    support: '1 Month',
  },
  {
    name: 'Growth',
    price: '₹8,999',
    priceNum: 8999,
    originalPrice: '₹17,999',
    features: [
      '5-8 Page Website',
      'Premium UI/UX Design',
      'Advanced SEO Optimization',
      'Google Analytics Setup',
      'Social Media Integration',
      'Blog/News Section',
      '3 Months Free Support',
    ],
    highlight: true,
    badge: 'Most Popular',
    delivery: '7–10 Days',
    support: '3 Months',
  },
  {
    name: 'Authority',
    price: '₹14,999',
    priceNum: 14999,
    originalPrice: '₹29,999',
    features: [
      '10-15 Page Website',
      'Custom Animations',
      'E-commerce Ready',
      'Payment Gateway Integration',
      'Admin Dashboard',
      'Speed Optimization',
      '6 Months Free Support',
    ],
    highlight: false,
    badge: 'Best Value',
    delivery: '15–20 Days',
    support: '6 Months',
  },
  {
    name: 'Ultra Premium',
    price: '₹24,999',
    priceNum: 24999,
    originalPrice: '₹49,999',
    features: [
      'Unlimited Pages',
      'Full Custom Development',
      'Advanced E-commerce',
      'CRM Integration',
      'Multi-language Support',
      'Priority 24/7 Support',
      '1 Year Free Maintenance',
    ],
    highlight: false,
    badge: 'Enterprise',
    delivery: '25–30 Days',
    support: '1 Year',
  },
];

const testimonials = [
  {
    name: 'Rahul Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'Evergreen Hub ne meri business website banai aur ab mujhe daily leads aa rahe hain. Bahut professional kaam kiya!',
  },
  {
    name: 'Priya Singh',
    location: 'Mumbai',
    rating: 5,
    text: 'Meri boutique ki website se online orders 3x ho gaye. Design bahut sundar hai aur mobile pe bhi perfect dikhta hai.',
  },
  {
    name: 'Amit Kumar',
    location: 'Patna',
    rating: 5,
    text: 'Bihar mein itni achhi web design service milegi nahi socha tha. Price bhi reasonable hai aur quality top-notch!',
  },
];

const faqs = [
  {
    q: 'Website banane mein kitna time lagta hai?',
    a: 'Basic package mein 2-3 din, Starter mein 3-5 din, Growth mein 7-10 din, Authority mein 15-20 din, aur Ultra Premium mein 25-30 din lagte hain.',
  },
  {
    q: 'Kya website mobile friendly hogi?',
    a: 'Haan, sabhi websites 100% mobile responsive hoti hain. Mobile, tablet, aur desktop sab pe perfectly dikhti hai.',
  },
  {
    q: 'Payment kaise karein?',
    a: 'PhonePe, Google Pay, UPI, ya bank transfer se payment kar sakte hain. 50% advance aur 50% delivery pe.',
  },
  {
    q: 'Kya domain aur hosting included hai?',
    a: 'Domain aur hosting alag se lena hoga, lekin hum setup mein poori help karenge. Recommended providers bhi batayenge.',
  },
  {
    q: 'Website ke baad support milega?',
    a: 'Haan, har package ke saath free support period included hai. Uske baad bhi affordable AMC plans available hain.',
  },
  {
    q: 'Kya demo dekh sakte hain?',
    a: 'Haan! Sabhi packages ke liye demo available hai. WhatsApp karein aur hum aapko sample websites dikhayenge.',
  },
];

function useScrollFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function WebDesignServices() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    document.title = 'Web Design Services | Evergreen Hub';
  }, []);

  const handleOrder = (pkg: Package) => {
    setSelectedPackage(pkg);
    setPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/CC_20260226_043346-1.png"
              alt="Evergreen Hub"
              className="w-9 h-9 object-cover rounded-full"
            />
            <span className="font-bold text-gray-900 text-lg">Evergreen Hub</span>
          </div>
          <a
            href="https://wa.me/919263989760?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Web%20Design%20Services"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <img src="/assets/generated/web-design-hero.dim_1440x600.png" alt="" className="w-full h-full object-cover" />
        </div>
        <AnimatedSection className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Professional Web Design Services
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Apna Business{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Online Lao
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Professional websites jo aapke business ko digital world mein shine karaye. Coaching institutes, local
            businesses, bloggers — sabke liye perfect solutions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#packages"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg text-lg"
            >
              Packages Dekho
            </a>
            <a
              href="https://wa.me/919263989760?text=Hi%2C%20I%20want%20a%20website%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-full transition-all text-lg"
            >
              Free Consultation
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-blue-200">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" /> Mobile Responsive
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" /> SEO Optimized
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" /> Fast Delivery
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" /> Free Support
            </span>
          </div>
        </AnimatedSection>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gray-50">
        <AnimatedSection className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Kyun Choose Karein{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Evergreen Hub?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Modern Design',
                desc: 'Latest design trends follow karte hain jo aapki website ko professional aur attractive banate hain.',
              },
              {
                icon: '📱',
                title: 'Mobile First',
                desc: 'Sabse pehle mobile experience design karte hain kyunki 80% users mobile se browse karte hain.',
              },
              {
                icon: '⚡',
                title: 'Fast Loading',
                desc: 'Optimized code aur images se website super fast load hoti hai, bounce rate kam hota hai.',
              },
              {
                icon: '🔍',
                title: 'SEO Ready',
                desc: 'Google pe rank karne ke liye proper SEO setup karte hain — meta tags, schema, sitemap sab.',
              },
              {
                icon: '💬',
                title: 'WhatsApp Integration',
                desc: 'Direct WhatsApp button se customers seedha aapse contact kar sakte hain.',
              },
              {
                icon: '🛡️',
                title: 'Lifetime Support',
                desc: 'Website deliver karne ke baad bhi hum available hain. AMC plans bhi available hain.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Packages — shown FIRST before Founder */}
      <section id="packages" className="py-16 px-4 bg-white">
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Our{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Packages
              </span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Har budget ke liye perfect package. Sabhi packages mein demo available hai!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl border-2 p-6 flex flex-col transition-all hover:shadow-xl ${
                  pkg.highlight
                    ? 'border-blue-500 bg-gradient-to-b from-blue-50 to-white shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                      pkg.highlight ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1">{pkg.name}</h3>
                  {pkg.tagline && (
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">{pkg.tagline}</p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-blue-600">{pkg.price}</span>
                    <span className="text-gray-400 line-through text-sm">{pkg.originalPrice}</span>
                  </div>
                  {(pkg.delivery || pkg.support) && (
                    <div className="flex gap-3 mt-2">
                      {pkg.delivery && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          ⏱ {pkg.delivery}
                        </span>
                      )}
                      {pkg.support && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          🛡 {pkg.support} Support
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleOrder(pkg)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                    pkg.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md'
                      : 'bg-gray-900 hover:bg-gray-700 text-white'
                  }`}
                >
                  Order Now — {pkg.price}
                </button>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Our Founder — shown AFTER packages, BEFORE testimonials */}
      <FounderSection compact />

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <AnimatedSection className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Hamare{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Happy Clients
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Go{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Online?
            </span>
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Aaj hi apni website banwao aur apne business ko digital world mein launch karo!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#packages"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 font-bold px-8 py-4 rounded-full transition-all shadow-lg text-lg"
            >
              Package Choose Karo
            </a>
            <a
              href="https://wa.me/919263989760?text=Hi%2C%20I%20want%20to%20start%20my%20website%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-full transition-all text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Karo
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center text-sm">
        <p className="mb-1">© {new Date().getFullYear()} Evergreen Hub. All rights reserved.</p>
        <p>Built by Rudra in Bihar with ❤️</p>
      </footer>

      {/* Payment Modal */}
      {selectedPackage && (
        <WebDesignPaymentModal
          isOpen={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.priceNum}
        />
      )}
    </div>
  );
}
