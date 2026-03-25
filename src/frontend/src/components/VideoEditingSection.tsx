import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Sparkles,
  Star,
  Trophy,
  Video,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import PaymentModal from "./PaymentModal";

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

const features = [
  { icon: CheckCircle, text: "Professional color grading" },
  { icon: CheckCircle, text: "Smooth transitions & effects" },
  { icon: Clock, text: "Fast delivery guaranteed" },
  { icon: Sparkles, text: "Free revisions included" },
];

export default function VideoEditingSection() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const { ref, isVisible } = useScrollAnimation();

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
        ref={ref}
        className="py-20 bg-gradient-to-br from-background via-primary/5 to-background"
      >
        <div
          className={`container mx-auto px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-4">
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

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-10">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isPopular = plan.badge === "Most Popular";
              const isBestValue = plan.badge === "Best Value";
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-2xl border-2 ${
                    isPopular
                      ? "border-orange-400 shadow-orange-100"
                      : isBestValue
                        ? "border-green-400 shadow-green-100"
                        : plan.borderColor
                  } shadow-xl bg-white flex flex-col overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300`}
                >
                  {/* Top Badge Banner */}
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

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-5">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                          plan.color
                        } flex items-center justify-center flex-shrink-0`}
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

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem]">
                      {plan.description}
                    </p>

                    {/* 55% OFF Badge */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        55% OFF
                      </span>
                    </div>

                    {/* Pricing */}
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

                    {/* Features */}
                    <ul className="space-y-1 mb-5 flex-1">
                      {features.map((f) => (
                        <li
                          key={f.text}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <f.icon
                            className={`w-3.5 h-3.5 ${plan.accentColor} flex-shrink-0`}
                          />
                          {f.text}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleOrder(plan)}
                      className={`w-full font-bold text-white bg-gradient-to-r ${
                        plan.color
                      } hover:opacity-90 transition-opacity`}
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom notes */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm font-semibold text-red-600 animate-pulse">
              ⏰ Limited time offer — grab your slot before prices go up!
            </p>
            <p className="text-xs text-muted-foreground italic">
              * Final price may vary based on editing complexity and style
              requirements.
            </p>
          </div>
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
