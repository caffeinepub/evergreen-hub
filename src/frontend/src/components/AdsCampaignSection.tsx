import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  CheckCircle,
  Clock,
  Globe,
  Megaphone,
  MousePointerClick,
  ShoppingCart,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../contexts/CartContext";
import PaymentModal from "./PaymentModal";
import ServiceReviews from "./ServiceReviews";

const plans = [
  {
    id: "ads-basic",
    title: "Basic Ads Campaign",
    icon: Target,
    description: "Get started with targeted digital advertising",
    originalPrice: 2999,
    finalPrice: 1499,
    deliveryTime: "3–5 Days",
    badge: null,
    gradientFrom: "from-amber-400",
    gradientTo: "to-yellow-500",
    borderColor: "border-amber-200",
    accentColor: "text-amber-600",
    shadowColor: "shadow-amber-100",
    bgAccent: "bg-amber-50",
    features: [
      "Google Ads Setup",
      "Facebook/Instagram Ads",
      "Campaign Targeting",
      "3-Day Reporting",
      "Ad Copy Design",
    ],
  },
  {
    id: "ads-advanced",
    title: "Advanced Ads Campaign",
    icon: Star,
    description: "Full-scale ad management for maximum ROI",
    originalPrice: 5999,
    finalPrice: 2999,
    deliveryTime: "5–7 Days",
    badge: "Most Popular",
    gradientFrom: "from-yellow-500",
    gradientTo: "to-orange-500",
    borderColor: "border-orange-300",
    accentColor: "text-orange-600",
    shadowColor: "shadow-orange-100",
    bgAccent: "bg-orange-50",
    features: [
      "Google + Meta Ads",
      "Pixel Setup & Tracking",
      "Retargeting Campaigns",
      "Full Analytics Report",
      "A/B Testing",
      "Lead Generation Funnel",
    ],
  },
];

const specs = [
  { icon: Globe, text: "Google, Facebook & Instagram Ads" },
  { icon: Target, text: "Audience targeting & retargeting" },
  { icon: MousePointerClick, text: "High CTR ad copy & creatives" },
  { icon: BarChart2, text: "Full analytics & ROI reporting" },
  { icon: TrendingUp, text: "Lead generation campaigns" },
  { icon: Clock, text: "Campaign setup in 3–7 days" },
];

const galleryImages = [
  "/assets/1775027503923-019d4d7c-b7d7-758c-9254-52f5aeca50f6.png",
  "/assets/img_20260401_104324-019d4d7c-ba49-7753-b464-4e0537a76681.png",
  "/assets/1775027496900-019d4d7c-d4e6-707d-8135-9f8a4c94d3d7.png",
  "/assets/1775027510849-019d4d7c-d6ef-7384-9c20-2419cab99491.png",
  "/assets/1775027519954-019d4d7c-d924-77e9-a8b7-e4f9ce4a5f7c.png",
  "/assets/1775027553522-019d4d7c-d9be-706b-a4e0-af79eeec39d7.png",
];

const defaultReviews = [
  {
    name: "Anjali Mishra",
    rating: 5,
    comment:
      "Evergreen Hub's Google Ads campaign brought 3x more leads in the first week! The targeting was spot on and ROI was incredible.",
    date: "25 Mar 2026",
  },
  {
    name: "Vikas Sharma",
    rating: 5,
    comment:
      "Our Facebook Ads were set up professionally. The retargeting campaigns worked amazing for our coaching institute.",
    date: "20 Mar 2026",
  },
  {
    name: "Priya Jaiswal",
    rating: 4,
    comment:
      "Great ad copies, pixel setup done correctly. Our local business visibility improved massively with these campaigns.",
    date: "15 Mar 2026",
  },
];

export default function AdsCampaignSection() {
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
      id: plan.id,
      name: plan.title,
      price: plan.finalPrice,
      category: "ads-campaign",
    });
    setCartAdded(plan.id);
    setTimeout(() => setCartAdded(null), 2000);
  };

  const handleOrder = (plan: (typeof plans)[0]) => {
    setSelectedPlan({ name: plan.title, price: `₹${plan.finalPrice}` });
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <section
        id="ads-campaign"
        ref={sectionRef}
        className="py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(30px)",
              transition: "all 0.6s ease-out",
            }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-5">
              <Megaphone className="w-4 h-4" />
              Digital Advertising
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Digital{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Ads Campaign
              </span>{" "}
              Services
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Boost your business with targeted Google, Facebook &amp; Instagram
              ads — more leads, more sales
            </p>
          </div>

          {/* Service Specifications */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(20px)",
              transition: "all 0.6s ease-out 0.15s",
            }}
            className="max-w-4xl mx-auto mb-12 bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-extrabold text-gray-900 mb-5 text-lg text-center">
              What We Do
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specs.map((s) => (
                <div key={s.text} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4 h-4 text-amber-600" />
                  </div>
                  <p className="text-sm text-gray-700 leading-snug mt-1">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const isPopular = plan.badge === "Most Popular";
              return (
                <div
                  key={plan.id}
                  data-ocid={`ads_pricing.${plan.id}.card`}
                  style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "none" : "translateY(40px)",
                    transition: `all 0.5s ease-out ${index * 150}ms`,
                  }}
                  className={`relative rounded-3xl border-2 ${
                    isPopular
                      ? "border-orange-400 shadow-2xl shadow-orange-100"
                      : `${plan.borderColor} shadow-xl ${plan.shadowColor}`
                  } bg-white flex flex-col overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}
                >
                  {isPopular && (
                    <div className="w-full text-center py-2.5 text-white font-bold text-sm tracking-wide bg-gradient-to-r from-amber-500 to-orange-500">
                      ⭐ Most Popular
                    </div>
                  )}
                  <div className="flex flex-col flex-1 p-6">
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
                    <p className="text-sm text-gray-500 mb-5">
                      {plan.description}
                    </p>
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
                      <p className="text-xs text-gray-400 mt-1">per campaign</p>
                    </div>
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
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      Delivery: {plan.deliveryTime}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        data-ocid={`ads_pricing.${plan.id}.primary_button`}
                        onClick={() => handleOrder(plan)}
                        className={`w-full font-bold text-white bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} hover:opacity-90 transition-opacity rounded-xl py-5 text-base shadow-md`}
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outline"
                        data-ocid={`ads_pricing.${plan.id}.secondary_button`}
                        onClick={() => handleAddToCart(plan)}
                        className={`w-full font-semibold border-2 rounded-xl py-4 transition-all ${
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
                        onClick={() => navigate({ to: `/service/${plan.id}` })}
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

          {/* Work Gallery */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "none" : "translateY(30px)",
              transition: "all 0.6s ease-out 0.4s",
            }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                Our Work{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Gallery
                </span>
              </h3>
              <p className="text-gray-500 text-sm">
                Real campaigns and ad creatives delivered to our clients
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                <div
                  key={img}
                  data-ocid={`ads_gallery.item.${idx + 1}`}
                  style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "none" : "translateY(20px)",
                    transition: `all 0.5s ease-out ${0.45 + idx * 0.08}s`,
                  }}
                  className="group relative rounded-2xl overflow-hidden border border-amber-100 shadow-md aspect-video bg-amber-50"
                >
                  <img
                    src={img}
                    alt={`Ads campaign work ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Upsell */}
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transition: "all 0.6s ease-out 0.6s",
            }}
            className="mt-8 max-w-md mx-auto"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white text-center shadow-lg">
              <p className="text-lg font-extrabold">
                🔥 3-Month Campaign Bundle – ₹7,499
              </p>
              <p className="text-yellow-100 text-sm mt-1">
                Best Deal — Consistent growth for 3 months!
              </p>
              <button
                type="button"
                data-ocid="ads_upsell.primary_button"
                onClick={() => {
                  setSelectedPlan({
                    name: "3-Month Campaign Bundle",
                    price: "₹7499",
                  });
                  setIsPaymentModalOpen(true);
                }}
                className="mt-3 bg-white text-orange-600 font-bold px-6 py-2 rounded-full text-sm hover:bg-orange-50 transition-colors"
              >
                Get Bundle Deal 🔥
              </button>
            </div>
          </div>

          {/* Trust Note */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <p className="text-sm text-gray-500 italic">
                * Campaign performance depends on budget, industry &amp; market
                competition.
              </p>
            </div>
          </div>

          {/* Live Reviews */}
          <ServiceReviews
            storageKey="reviews_ads"
            defaultReviews={defaultReviews}
          />
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
