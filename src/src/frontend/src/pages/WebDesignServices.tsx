import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Shield,
  ShoppingCart,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FounderSection from "../components/FounderSection";
import Header from "../components/Header";
import ServiceReviews from "../components/ServiceReviews";
import WebDesignPaymentModal from "../components/WebDesignPaymentModal";
import { useCart } from "../contexts/CartContext";

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
    name: "Basic Package",
    price: "₹2,999",
    priceNum: 2999,
    originalPrice: "₹5,999",
    features: [
      "1 Simple Landing Page (clean & minimal design)",
      "1–2 page website",
      "Mobile-Friendly only",
      "Contact Form",
      "WhatsApp / Call button",
      "Google Map pin",
    ],
    highlight: false,
    badge: "Budget-Friendly",
    delivery: "2–3 Days",
    support: "15 Days",
    tagline:
      "⚡ Perfect for beginners / small businesses starting online, low-cost & fast setup",
  },
  {
    name: "Starter",
    price: "₹4,999",
    priceNum: 4999,
    originalPrice: "₹9,999",
    features: [
      "3-5 Page Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "WhatsApp Button",
      "1 Month Free Support",
    ],
    highlight: false,
    delivery: "3–5 Days",
    support: "1 Month",
  },
  {
    name: "Growth",
    price: "₹8,999",
    priceNum: 8999,
    originalPrice: "₹17,999",
    features: [
      "5-8 Page Website",
      "Premium UI/UX Design",
      "Advanced SEO Optimization",
      "Google Analytics Setup",
      "Social Media Integration",
      "Blog/News Section",
      "3 Months Free Support",
    ],
    highlight: true,
    badge: "Most Popular",
    delivery: "7–10 Days",
    support: "3 Months",
  },
  {
    name: "Authority",
    price: "₹14,999",
    priceNum: 14999,
    originalPrice: "₹29,999",
    features: [
      "10-15 Page Website",
      "Custom Animations",
      "E-commerce Ready",
      "Payment Gateway Integration",
      "Admin Dashboard",
      "Speed Optimization",
      "6 Months Free Support",
    ],
    highlight: false,
    badge: "Best Value",
    delivery: "15–20 Days",
    support: "6 Months",
  },
  {
    name: "Ultra Premium",
    price: "₹24,999",
    priceNum: 24999,
    originalPrice: "₹49,999",
    features: [
      "Unlimited Pages",
      "Full Custom Development",
      "Advanced E-commerce",
      "CRM Integration",
      "Multi-language Support",
      "Priority 24/7 Support",
      "1 Year Free Maintenance",
    ],
    highlight: false,
    badge: "Enterprise",
    delivery: "25–30 Days",
    support: "1 Year",
  },
];

const websiteTypes = [
  {
    id: "affiliate",
    icon: TrendingUp,
    title: "Affiliate Marketing Website",
    description: "Promote products & earn commissions online",
    color: "from-green-500 to-emerald-600",
    bg: "bg-green-50",
    border: "border-green-200",
    selectedBorder: "border-green-500",
    selectedBg: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    id: "coaching",
    icon: GraduationCap,
    title: "Coaching Centre Website",
    description: "Online/offline coaching with course listings & enrollment",
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    selectedBorder: "border-blue-500",
    selectedBg: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: "local-business",
    icon: MapPin,
    title: "Local Business Website",
    description: "Showcase your shop, services & get customer calls",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    selectedBorder: "border-orange-500",
    selectedBg: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    id: "blogger",
    icon: FileText,
    title: "Blogger / Portfolio Website",
    description: "Share your content, build your brand online",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
    border: "border-purple-200",
    selectedBorder: "border-purple-500",
    selectedBg: "bg-purple-50",
    textColor: "text-purple-700",
  },
];

const webDesignSpecs = [
  { icon: Zap, text: "Mobile-first responsive design" },
  { icon: TrendingUp, text: "SEO-optimized structure & meta tags" },
  { icon: MessageCircle, text: "WhatsApp & contact form integration" },
  { icon: Shield, text: "Fast loading & performance optimized" },
  { icon: Star, text: "Modern UI/UX with smooth animations" },
  { icon: CheckCircle, text: "Free support included with every package" },
];

const defaultWebReviews = [
  {
    name: "Rahul Sharma",
    rating: 5,
    comment:
      "Evergreen Hub ne meri business website banai aur ab mujhe daily leads aa rahe hain. Bahut professional kaam kiya!",
    date: "12 Mar 2026",
  },
  {
    name: "Priya Singh",
    rating: 5,
    comment:
      "Meri boutique ki website se online orders 3x ho gaye. Design bahut sundar hai aur mobile pe bhi perfect dikhta hai.",
    date: "8 Mar 2026",
  },
  {
    name: "Amit Kumar",
    rating: 5,
    comment:
      "Bihar mein itni achhi web design service milegi nahi socha tha. Price bhi reasonable hai aur quality top-notch!",
    date: "2 Mar 2026",
  },
];

const faqs = [
  {
    q: "Website banane mein kitna time lagta hai?",
    a: "Basic package mein 2-3 din, Starter mein 3-5 din, Growth mein 7-10 din, Authority mein 15-20 din, aur Ultra Premium mein 25-30 din lagte hain.",
  },
  {
    q: "Kya website mobile friendly hogi?",
    a: "Haan, sabhi websites 100% mobile responsive hoti hain. Mobile, tablet, aur desktop sab pe perfectly dikhti hai.",
  },
  {
    q: "Payment kaise karein?",
    a: "PhonePe, Google Pay, UPI, ya bank transfer se payment kar sakte hain. 50% advance aur 50% delivery pe.",
  },
  {
    q: "Kya domain aur hosting included hai?",
    a: "Domain aur hosting alag se lena hoga, lekin hum setup mein poori help karenge. Recommended providers bhi batayenge.",
  },
  {
    q: "Website ke baad support milega?",
    a: "Haan, har package ke saath free support period included hai. Uske baad bhi affordable AMC plans available hain.",
  },
  {
    q: "Kya demo dekh sakte hain?",
    a: "Haan! Sabhi packages ke liye demo available hai. WhatsApp karein aur hum aapko sample websites dikhayenge.",
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
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedSection({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function WebDesignServices() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<string | null>(
    null,
  );
  const [packagesVisible, setPackagesVisible] = useState(false);
  const packagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Web Design Services | Evergreen Hub";
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPackagesVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (packagesRef.current) obs.observe(packagesRef.current);
    return () => obs.disconnect();
  }, []);

  const { addToCart } = useCart();
  const [cartAdded, setCartAdded] = useState<string | null>(null);

  const handleAddToCart = (pkg: Package) => {
    addToCart({
      id: `web-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: `Web Design - ${pkg.name}`,
      price: pkg.priceNum,
      category: "web-design",
    });
    setCartAdded(pkg.name);
    setTimeout(() => setCartAdded(null), 2000);
  };

  const handleOrder = (pkg: Package) => {
    setSelectedPackage(pkg);
    setPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4 pt-28">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/assets/generated/web-design-hero.dim_1440x600.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <AnimatedSection className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Professional Web Design Services
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Apna Business{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Online Lao
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Professional websites jo aapke business ko digital world mein shine
            karaye.
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
            {[
              "Mobile Responsive",
              "SEO Optimized",
              "Fast Delivery",
              "Free Support",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" /> {t}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ===== PRICING SECTION — TOP ===== */}
      <section id="packages" className="py-16 px-4 bg-gray-50">
        <div ref={packagesRef} className="max-w-6xl mx-auto">
          {/* Header */}
          <div
            style={{
              opacity: packagesVisible ? 1 : 0,
              transform: packagesVisible ? "none" : "translateY(30px)",
              transition: "all 0.6s ease-out",
            }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              💰 50% OFF — Limited Time Offer
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Packages
              </span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Har budget ke liye perfect package. Sabhi packages mein demo
              available hai!
            </p>
          </div>

          {/* Service Specifications */}
          <div
            style={{
              opacity: packagesVisible ? 1 : 0,
              transform: packagesVisible ? "none" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.1s",
            }}
            className="mb-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-extrabold text-gray-900 mb-5 text-lg text-center">
              What's Included in Every Package
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {webDesignSpecs.map((s) => (
                <div key={s.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug mt-1">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Package Cards with Stagger */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                style={{
                  opacity: packagesVisible ? 1 : 0,
                  transform: packagesVisible ? "none" : "translateY(40px)",
                  transition: `all 0.5s ease-out ${index * 150}ms`,
                }}
                className={`relative rounded-2xl border-2 p-6 flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
                  pkg.highlight
                    ? "border-blue-500 bg-gradient-to-b from-blue-50 to-white shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                      pkg.highlight
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                    {pkg.name}
                  </h3>
                  {pkg.tagline && (
                    <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                      {pkg.tagline}
                    </p>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-blue-600">
                      {pkg.price}
                    </span>
                    <span className="text-gray-400 line-through text-sm">
                      {pkg.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      50% OFF
                    </span>
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
                <div className="mb-2">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
                    ✅ Demo Available
                  </span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    data-ocid={`web_design.package.${pkg.name.toLowerCase().replace(/\s+/g, "_")}.primary_button`}
                    onClick={() => handleOrder(pkg)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      pkg.highlight
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md"
                        : "bg-gray-900 hover:bg-gray-700 text-white"
                    }`}
                  >
                    Order Now — {pkg.price}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(pkg)}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                      cartAdded === pkg.name
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {cartAdded === pkg.name ? "Added to Cart ✓" : "Add to Cart"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = `/service/web-design-${pkg.name.toLowerCase().replace(/\s+/g, "-")}`;
                    }}
                    className="border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white rounded-lg py-1.5 text-xs font-medium transition-all w-full mt-2"
                  >
                    View Full Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <AnimatedSection className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Kyun Choose Karein{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Evergreen Hub?
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎨",
                title: "Modern Design",
                desc: "Latest design trends follow karte hain jo aapki website ko professional aur attractive banate hain.",
              },
              {
                icon: "📱",
                title: "Mobile First",
                desc: "Sabse pehle mobile experience design karte hain kyunki 80% users mobile se browse karte hain.",
              },
              {
                icon: "⚡",
                title: "Fast Loading",
                desc: "Optimized code aur images se website super fast load hoti hai, bounce rate kam hota hai.",
              },
              {
                icon: "🔍",
                title: "SEO Ready",
                desc: "Google pe rank karne ke liye proper SEO setup karte hain — meta tags, schema, sitemap sab.",
              },
              {
                icon: "💬",
                title: "WhatsApp Integration",
                desc: "Direct WhatsApp button se customers seedha aapse contact kar sakte hain.",
              },
              {
                icon: "🛡️",
                title: "Free Support",
                desc: "Website deliver karne ke baad bhi hum available hain. AMC plans bhi available hain.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Website Type Selector */}
      <section id="website-type" className="py-16 px-4 bg-gray-50">
        <AnimatedSection className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🌐 Find Your Perfect Website
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              What Type of Website{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Do You Need?
              </span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Select your business type to find the package that fits you best
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {websiteTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedWebsiteType === type.id;
              return (
                <button
                  type="button"
                  key={type.id}
                  data-ocid={`web_design.website_type.${type.id}.toggle`}
                  onClick={() =>
                    setSelectedWebsiteType(isSelected ? null : type.id)
                  }
                  className={`relative text-left rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                    isSelected
                      ? `${type.selectedBorder} ${type.selectedBg} shadow-md ring-2 ring-offset-1 ring-current`
                      : `${type.border} bg-white hover:${type.selectedBorder}`
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-3 shadow`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3
                    className={`font-bold text-sm mb-1 ${isSelected ? type.textColor : "text-gray-900"}`}
                  >
                    {type.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {type.description}
                  </p>
                </button>
              );
            })}
          </div>
          {selectedWebsiteType && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Great choice! Scroll up to pick a package that matches your
                needs.
              </p>
              <a
                href="#packages"
                className="inline-block mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:opacity-90 transition-opacity"
              >
                See Packages ↑
              </a>
            </div>
          )}
        </AnimatedSection>
      </section>

      {/* Our Founder */}
      <FounderSection compact />

      {/* Live Customer Reviews */}
      <section className="py-16 px-4 bg-white">
        <AnimatedSection className="max-w-5xl mx-auto">
          <ServiceReviews
            storageKey="reviews_web_design"
            defaultReviews={defaultWebReviews}
          />
        </AnimatedSection>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <AnimatedSection className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  data-ocid={`web_design.faq.item.${i + 1}`}
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
            Ready to Go{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              Online?
            </span>
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Aaj hi apni website banwao aur apne business ko digital world mein
            launch karo!
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
        <p className="mb-1">
          © {new Date().getFullYear()} Evergreen Hub. All rights reserved.
        </p>
        <p>Built by Rudra in Bihar with ❤️</p>
      </footer>

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
