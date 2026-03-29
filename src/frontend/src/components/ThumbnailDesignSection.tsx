import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  ImageIcon,
  ShoppingCart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import PaymentModal from "./PaymentModal";

const plans = [
  {
    id: "thumb-basic",
    title: "Basic Thumbnail Design",
    icon: ImageIcon,
    description: "Click-worthy thumbnails that drive views",
    originalPrice: 399,
    finalPrice: 199,
    deliveryTime: "12–24 hours",
    badge: null,
    gradientFrom: "from-amber-400",
    gradientTo: "to-yellow-500",
    borderColor: "border-amber-200",
    accentColor: "text-amber-600",
    shadowColor: "shadow-amber-100",
    bgAccent: "bg-amber-50",
    features: [
      "Custom design",
      "Click-worthy layout",
      "Text overlay",
      "Basic color grading",
    ],
  },
  {
    id: "thumb-advanced",
    title: "Advanced Thumbnail Design",
    icon: Star,
    description: "Premium thumbnails for maximum CTR & brand identity",
    originalPrice: 999,
    finalPrice: 499,
    deliveryTime: "24–48 hours",
    badge: "Most Popular",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-orange-500",
    borderColor: "border-orange-300",
    accentColor: "text-orange-600",
    shadowColor: "shadow-orange-100",
    bgAccent: "bg-orange-50",
    features: [
      "Premium design",
      "Brand-consistent style",
      "Custom illustrations",
      "Multiple revisions",
      "High-res export",
    ],
  },
];

export default function ThumbnailDesignSection() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const { ref, isVisible } = useScrollAnimation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [cartAdded, setCartAdded] = useState<string | null>(null);

  const handleAddToCart = (plan: (typeof plans)[0]) => {
    addToCart({
      id: plan.id,
      name: plan.title,
      price: plan.finalPrice,
      category: "thumbnail-design",
    });
    setCartAdded(plan.id);
    setTimeout(() => setCartAdded(null), 2000);
  };

  const handleOrder = (plan: (typeof plans)[0]) => {
    setSelectedPlan({
      name: plan.title,
      price: `₹${plan.finalPrice}`,
    });
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <section
        id="thumbnail-design"
        ref={ref}
        className="py-20 bg-gradient-to-br from-yellow-50 via-white to-orange-50"
      >
        <div
          className={`container mx-auto px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-5">
              <Zap className="w-4 h-4" />
              Professional Thumbnail Design
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Professional{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                Thumbnail Design
              </span>{" "}
              Services
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Eye-catching thumbnails that get more clicks — designed for
              YouTube, Instagram &amp; social media platforms
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const isPopular = plan.badge === "Most Popular";
              return (
                <div
                  key={plan.id}
                  data-ocid={`thumbnail_pricing.${plan.id}.card`}
                  className={`relative rounded-3xl border-2 ${
                    isPopular
                      ? "border-orange-400 shadow-2xl shadow-orange-100"
                      : `${plan.borderColor} shadow-xl ${plan.shadowColor}`
                  } bg-white flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  {/* Most Popular Banner */}
                  {isPopular && (
                    <div className="w-full text-center py-2.5 text-white font-bold text-sm tracking-wide bg-gradient-to-r from-yellow-500 to-orange-500">
                      ⭐ Most Popular
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${plan.gradientFrom} ${plan.gradientTo} flex items-center justify-center flex-shrink-0 shadow-md`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-extrabold text-lg text-gray-900 leading-tight">
                        {plan.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 mb-5">
                      {plan.description}
                    </p>

                    {/* Price Block */}
                    <div className={`rounded-2xl ${plan.bgAccent} p-4 mb-5`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-400 line-through font-medium">
                          ₹{plan.originalPrice}
                        </span>
                        <span className="bg-red-500 text-white text-xs font-extrabold px-2 py-0.5 rounded-full">
                          50% OFF
                        </span>
                      </div>
                      <p
                        className={`text-4xl font-extrabold ${plan.accentColor} leading-none`}
                      >
                        ₹{plan.finalPrice}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        per thumbnail
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-5 flex-1">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-sm text-gray-700"
                        >
                          <CheckCircle
                            className={`w-4 h-4 ${plan.accentColor} flex-shrink-0`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Delivery Time */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      Delivery: {plan.deliveryTime}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col gap-2">
                      <Button
                        data-ocid={`thumbnail_pricing.${plan.id}.primary_button`}
                        onClick={() => handleOrder(plan)}
                        className={`w-full font-bold text-white bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} hover:opacity-90 transition-opacity rounded-xl py-5 text-base shadow-md`}
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outline"
                        data-ocid={`thumbnail_pricing.${plan.id}.secondary_button`}
                        onClick={() => handleAddToCart(plan)}
                        className={`w-full font-semibold border-2 rounded-xl py-4 transition-all ${cartAdded === plan.id ? "bg-green-50 border-green-500 text-green-700" : "hover:bg-gray-50"}`}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {cartAdded === plan.id
                          ? "Added to Cart ✓"
                          : "Add to Cart"}
                      </Button>
                      <button
                        type="button"
                        onClick={() => navigate({ to: `/service/${plan.id}` })}
                        className="w-full text-xs text-center text-blue-500 hover:text-blue-700 mt-1 underline transition-colors"
                      >
                        View Full Details 2192
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upsell */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-5 text-white text-center shadow-lg">
              <p className="text-lg font-extrabold">
                🔥 10 Thumbnails Pack – ₹1,499
              </p>
              <p className="text-yellow-100 text-sm mt-1">
                Best Deal — Save over ₹500!
              </p>
              <button
                type="button"
                data-ocid="thumbnail_upsell.primary_button"
                onClick={() => {
                  setSelectedPlan({
                    name: "10 Thumbnails Pack",
                    price: "₹1499",
                  });
                  setIsPaymentModalOpen(true);
                }}
                className="mt-3 bg-white text-orange-600 font-bold px-6 py-2 rounded-full text-sm hover:bg-orange-50 transition-colors"
              >
                Get Best Deal 🔥
              </button>
            </div>
          </div>

          {/* Trust Note */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <p className="text-sm text-gray-500 italic">
                * Thumbnails are designed specifically for YouTube, Instagram
                &amp; social media platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          packageId={0n}
          packageName={selectedPlan.name}
          packagePrice={selectedPlan.price}
        />
      )}
    </>
  );
}
