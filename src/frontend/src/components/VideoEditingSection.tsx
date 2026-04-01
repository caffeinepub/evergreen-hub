import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  Layers,
  Music,
  Palette,
  RefreshCw,
  ShoppingCart,
  Sparkles,
  Star,
  Trophy,
  Video,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import PaymentModal from "./PaymentModal";
import ServiceReviews from "./ServiceReviews";

const plans = [
  {
    id: "shorts",
    title: "Shorts / Reels",
    duration: "Up to 60 seconds",
    icon: Zap,
    description: "Perfect for Instagram Reels, YouTube Shorts & TikTok",
    originalPrice: 1599,
    finalPrice: 799,
    badge: null,
    color: "from-pink-500 to-rose-500",
    borderColor: "border-pink-200",
    accentColor: "text-pink-600",
    bgAccent: "bg-pink-50",
  },
  {
    id: "youtube-basic",
    title: "YouTube Basic",
    duration: "Up to 5 minutes",
    icon: Video,
    description: "Great for vlogs, tutorials & short YouTube videos",
    originalPrice: 3999,
    finalPrice: 1999,
    badge: null,
    color: "from-blue-500 to-indigo-500",
    borderColor: "border-blue-200",
    accentColor: "text-blue-600",
    bgAccent: "bg-blue-50",
  },
  {
    id: "youtube-pro",
    title: "YouTube Pro",
    duration: "Up to 10 minutes",
    icon: Star,
    description: "Perfect for YouTube creators growing their channel",
    originalPrice: 7999,
    finalPrice: 3999,
    badge: "Most Popular",
    badgeColor: "bg-orange-500",
    color: "from-orange-500 to-amber-500",
    borderColor: "border-orange-300",
    accentColor: "text-orange-600",
    bgAccent: "bg-orange-50",
  },
  {
    id: "long-video",
    title: "Long Video",
    duration: "Up to 30 minutes",
    icon: Trophy,
    description: "Ideal for documentaries, deep-dives & full-length content",
    originalPrice: 15999,
    finalPrice: 7999,
    badge: "Best Value",
    badgeColor: "bg-green-600",
    color: "from-green-500 to-teal-500",
    borderColor: "border-green-300",
    accentColor: "text-green-600",
    bgAccent: "bg-green-50",
  },
];

const specs = [
  { icon: Palette, text: "Professional color grading & correction" },
  { icon: Layers, text: "Smooth cuts, transitions & effects" },
  { icon: Music, text: "Background music sync & audio balancing" },
  { icon: Sparkles, text: "Motion graphics & animated text overlays" },
  { icon: Clock, text: "Fast 24–48hr delivery guaranteed" },
  { icon: RefreshCw, text: "Free revisions included" },
];

const defaultReviews = [
  {
    name: "Arjun Mehta",
    rating: 5,
    comment:
      "My YouTube channel views doubled after using their editing. Transitions are super smooth!",
    date: "12 Mar 2026",
  },
  {
    name: "Sneha Kapoor",
    rating: 5,
    comment:
      "Reels editing is top-notch. Got 100K views on my first reel edited by them!",
    date: "8 Mar 2026",
  },
  {
    name: "Vikram Rao",
    rating: 4,
    comment:
      "Very fast delivery and great communication. Color grading looks professional.",
    date: "2 Mar 2026",
  },
];

export default function VideoEditingSection() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [cartAdded, setCartAdded] = useState<string | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleAddToCart = (plan: (typeof plans)[0]) => {
    addToCart({
      id: `video-${plan.id}`,
      name: `Video Editing - ${plan.title}`,
      price: plan.finalPrice,
      category: "video-editing",
    });
    setCartAdded(plan.id);
    setTimeout(() => setCartAdded(null), 2000);
  };

  const handleOrder = (plan: (typeof plans)[0]) => {
    setSelectedPlan({
      name: `Video Editing - ${plan.title}`,
      price: `₹${plan.finalPrice.toLocaleString("en-IN")}`,
    });
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <section
        id="video-editing"
        ref={sectionRef}
        className="py-20 bg-gradient-to-br from-background via-primary/5 to-background"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(30px)",
              transition: "all 0.6s ease-out",
            }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              <Zap className="w-4 h-4" />
              Limited Time Offer — Prices May Increase Soon!
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="text-primary">Video Editing</span>{" "}
              Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
              Choose your plan based on video length. Transparent pricing, no
              hidden charges.
            </p>
            <p className="text-sm text-muted-foreground italic">
              * Price depends on complexity and editing style
            </p>
          </div>

          {/* Service Specifications */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.1s",
            }}
            className="max-w-4xl mx-auto mt-8 mb-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-extrabold text-gray-900 mb-5 text-lg text-center">
              What's Included in Every Plan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specs.map((s) => (
                <div key={s.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug mt-1">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards with Stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isPopular = plan.badge === "Most Popular";
              const isBestValue = plan.badge === "Best Value";
              return (
                <div
                  key={plan.id}
                  style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "none" : "translateY(40px)",
                    transition: `all 0.5s ease-out ${index * 150}ms`,
                  }}
                  className={`relative rounded-2xl border-2 ${
                    isPopular
                      ? "border-orange-400 shadow-orange-100"
                      : isBestValue
                        ? "border-green-400 shadow-green-100"
                        : plan.borderColor
                  } shadow-xl bg-white flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}
                >
                  {plan.badge && (
                    <div
                      className={`w-full text-center py-2 text-white font-bold text-sm tracking-wide ${
                        isPopular
                          ? "bg-gradient-to-r from-orange-500 to-amber-500"
                          : "bg-gradient-to-r from-green-600 to-teal-500"
                      }`}
                    >
                      {isPopular ? "⭐ Most Popular" : "🏆 Best Value"}
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-tight">
                          {plan.title}
                        </h3>
                        <p
                          className={`text-xs font-semibold ${plan.accentColor}`}
                        >
                          {plan.duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem]">
                      {plan.description}
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        55% OFF
                      </span>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground line-through">
                        ₹{plan.originalPrice.toLocaleString("en-IN")}
                      </p>
                      <p
                        className={`text-3xl font-extrabold ${plan.accentColor}`}
                      >
                        ₹{plan.finalPrice.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-muted-foreground">per video</p>
                    </div>
                    <ul className="space-y-1 mb-5 flex-1">
                      {[
                        "Professional color grading",
                        "Smooth transitions & effects",
                        "Fast delivery guaranteed",
                        "Free revisions included",
                      ].map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle
                            className={`w-3.5 h-3.5 ${plan.accentColor} flex-shrink-0`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleOrder(plan)}
                        className={`w-full font-bold text-white bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleAddToCart(plan)}
                        className={`w-full font-semibold border-2 transition-all ${
                          cartAdded === plan.id
                            ? "bg-green-50 border-green-500 text-green-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {cartAdded === plan.id
                          ? "Added to Cart ✓"
                          : "Add to Cart"}
                      </Button>
                      <button
                        type="button"
                        onClick={() =>
                          navigate({ to: `/service/video-${plan.id}` })
                        }
                        className="w-full text-xs text-center border border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white mt-2 py-1.5 rounded-lg transition-all font-medium"
                      >
                        View Full Details →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom notes */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transition: "all 0.6s ease-out 0.8s",
            }}
            className="text-center mt-8 space-y-2"
          >
            <p className="text-sm font-semibold text-red-600 animate-pulse">
              ⏰ Limited time offer — grab your slot before prices go up!
            </p>
            <p className="text-xs text-muted-foreground italic">
              * Final price may vary based on editing complexity and style
              requirements.
            </p>
          </div>

          {/* Live Reviews */}
          <ServiceReviews
            storageKey="reviews_video"
            defaultReviews={defaultReviews}
          />
        </div>
      </section>

      {selectedPlan && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          packageId={BigInt(0)}
          packageName={selectedPlan.name}
          packagePrice={selectedPlan.price}
          isVideoEditing={true}
        />
      )}
    </>
  );
}
