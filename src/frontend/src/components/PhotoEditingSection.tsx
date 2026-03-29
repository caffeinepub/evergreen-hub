import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera,
  CheckCircle,
  Clock,
  ImageIcon,
  ShoppingCart,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const plans = [
  {
    id: "basic-photo",
    title: "Basic Photo Editing",
    icon: ImageIcon,
    description: "Perfect for simple and quick edits",
    originalPrice: 299,
    finalPrice: 149,
    deliveryTime: "12–24 hours",
    badge: null,
    gradientFrom: "from-cyan-500",
    gradientTo: "to-blue-500",
    borderColor: "border-cyan-200",
    accentColor: "text-cyan-600",
    shadowColor: "shadow-cyan-100",
    bgAccent: "bg-cyan-50",
    features: [
      "Color correction",
      "Brightness & contrast adjustment",
      "Basic retouch",
    ],
  },
  {
    id: "advanced-photo",
    title: "Advanced Photo Editing",
    icon: Star,
    description: "Professional editing for high-quality results",
    originalPrice: 599,
    finalPrice: 299,
    deliveryTime: "24–48 hours",
    badge: "Most Popular",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-500",
    borderColor: "border-purple-300",
    accentColor: "text-purple-600",
    shadowColor: "shadow-purple-100",
    bgAccent: "bg-purple-50",
    features: [
      "Skin retouching",
      "Background removal",
      "Color grading",
      "High-end finish",
    ],
  },
];

export default function PhotoEditingSection() {
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
      id: `photo-${plan.id}`,
      name: plan.title,
      price: plan.finalPrice,
      category: "photo-editing",
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
        id="photo-editing"
        ref={ref}
        className="py-20 bg-gradient-to-br from-purple-50 via-white to-cyan-50"
      >
        <div
          className={`container mx-auto px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-5">
              <Camera className="w-4 h-4" />
              Professional Photo Editing
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
              Professional{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Photo Editing
              </span>{" "}
              Services
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Enhance your photos with high-quality professional editing — fast
              turnaround, stunning results
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
                  data-ocid={`photo_pricing.${plan.id}.card`}
                  className={`relative rounded-3xl border-2 ${
                    isPopular
                      ? "border-purple-400 shadow-2xl shadow-purple-100"
                      : `${plan.borderColor} shadow-xl ${plan.shadowColor}`
                  } bg-white flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                >
                  {/* Most Popular Banner */}
                  {isPopular && (
                    <div className="w-full text-center py-2.5 text-white font-bold text-sm tracking-wide bg-gradient-to-r from-purple-500 to-pink-500">
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
                        per photo / set
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
                        data-ocid={`photo_pricing.${plan.id}.primary_button`}
                        onClick={() => handleOrder(plan)}
                        className={`w-full font-bold text-white bg-gradient-to-r ${plan.gradientFrom} ${plan.gradientTo} hover:opacity-90 transition-opacity rounded-xl py-5 text-base shadow-md`}
                      >
                        Order Now
                      </Button>
                      <Button
                        variant="outline"
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
                        onClick={() =>
                          navigate({
                            to: `/service/${plan.id === "basic-photo" ? "photo-basic" : "photo-advanced"}`,
                          })
                        }
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

          {/* Trust Note */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <p className="text-sm text-gray-500 italic">
                * Final result depends on image quality and editing complexity
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <PhotoPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          serviceName={selectedPlan.name}
          servicePrice={selectedPlan.price}
        />
      )}
    </>
  );
}

// ─── Photo Payment Modal ────────────────────────────────────────────────────

interface PhotoPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePrice: string;
}

function PhotoPaymentModal({
  isOpen,
  onClose,
  serviceName,
  servicePrice,
}: PhotoPaymentModalProps) {
  const [step, setStep] = useState<"payment" | "upload">("payment");
  const [txnId, setTxnId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const coupons: Record<string, { type: "percent" | "fixed"; value: number }> =
    {
      WELCOME50: { type: "fixed", value: 100 },
      EVERGREEN: { type: "fixed", value: 50 },
      HUB150: { type: "fixed", value: 150 },
      EVERGREEN10: { type: "percent", value: 10 },
      HUB25: { type: "percent", value: 25 },
    };

  const rawPrice = Number(servicePrice.replace("₹", ""));

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    const def = coupons[code];
    if (!def) {
      setCouponMsg("Invalid Coupon Code");
      setDiscount(0);
      return;
    }
    const d =
      def.type === "percent"
        ? Math.round((rawPrice * def.value) / 100)
        : def.value;
    const finalDiscount = Math.min(d, rawPrice - 1);
    setDiscount(finalDiscount);
    setCouponApplied(true);
    setCouponMsg(
      `Coupon applied successfully 🎉 Discount Applied: -₹${finalDiscount}`,
    );
  };

  const finalPrice = Math.max(rawPrice - discount, 1);

  if (!isOpen) return null;

  const whatsappMsg = `Hello, I have placed a photo editing order.\n\nService: ${serviceName}\nPrice Paid: ₹${finalPrice}\nTransaction ID: ${txnId || "XXXXX"}\n\nI will upload my images now.`;

  return (
    <div
      data-ocid="photo_payment.modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 z-10">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">
              {step === "payment"
                ? "Complete Your Order"
                : "Upload Your Images"}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${step === "payment" ? "bg-purple-500" : "bg-gray-300"}`}
              />
              <span
                className={`w-2 h-2 rounded-full ${step === "upload" ? "bg-green-500" : "bg-gray-300"}`}
              />
              <span className="text-xs text-gray-400 ml-1">
                Step {step === "payment" ? "1" : "2"} of 2
              </span>
            </div>
          </div>
          <button
            type="button"
            data-ocid="photo_payment.close_button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {step === "payment" ? (
            <div className="space-y-5">
              {/* Service Info */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                <p className="font-semibold text-purple-800 text-sm">
                  {serviceName}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  {discount > 0 && (
                    <p className="text-sm line-through text-gray-400">
                      ₹{rawPrice}
                    </p>
                  )}
                  <p className="text-3xl font-extrabold text-purple-700">
                    ₹{finalPrice}
                  </p>
                  {discount > 0 && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                      -₹{discount} OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Coupon */}
              {!couponApplied ? (
                <div>
                  <label
                    htmlFor="photo-coupon"
                    className="text-sm font-semibold text-gray-700 block mb-1.5"
                  >
                    Coupon Code{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="photo-coupon"
                      data-ocid="photo_payment.input"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <button
                      type="button"
                      data-ocid="photo_payment.secondary_button"
                      onClick={applyCoupon}
                      className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p
                      className={`text-xs mt-1.5 ${
                        couponMsg.includes("Invalid")
                          ? "text-red-500"
                          : "text-green-600 font-semibold"
                      }`}
                    >
                      {couponMsg}
                    </p>
                  )}
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="text-green-700 text-sm font-semibold">
                    {couponMsg}
                  </p>
                  <p className="text-green-800 font-bold mt-0.5">
                    Final Price: ₹{finalPrice}
                  </p>
                </div>
              )}

              {/* UPI Payment */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Pay via UPI
                  <span className="ml-2 text-xs font-normal bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                    Local / National
                  </span>
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center">
                  <p className="text-sm font-bold text-orange-700">
                    📱 PhonePe / Google Pay / UPI
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    UPI ID:{" "}
                    <span className="font-mono font-bold">79705775@ybl</span>
                  </p>
                  <a
                    href={`upi://pay?pa=79705775@ybl&pn=Evergreen%20Hub&am=${finalPrice}&cu=INR`}
                    className="mt-3 block bg-orange-500 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors"
                  >
                    Pay ₹{finalPrice} via UPI
                  </a>
                </div>
              </div>

              {/* PayPal */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Pay via PayPal
                  <span className="ml-2 text-xs font-normal bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                    International
                  </span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
                  <a
                    href="https://www.paypal.me/RudraSingh383"
                    target="_blank"
                    rel="noreferrer"
                    className="block bg-blue-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                  >
                    Pay with PayPal
                  </a>
                </div>
              </div>

              {/* Transaction ID */}
              <div>
                <label
                  htmlFor="photo-txn"
                  className="text-sm font-semibold text-gray-700 block mb-1.5"
                >
                  Transaction ID{" "}
                  <span className="text-gray-400 font-normal">
                    (after payment)
                  </span>
                </label>
                <input
                  id="photo-txn"
                  data-ocid="photo_payment.textarea"
                  value={txnId}
                  onChange={(e) => setTxnId(e.target.value)}
                  placeholder="Enter Transaction ID"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <Button
                data-ocid="photo_payment.submit_button"
                onClick={() => setStep("upload")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:opacity-90 rounded-xl py-5 text-base"
              >
                Proceed to Upload Images →
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Upload Prompt */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <p className="font-extrabold text-purple-900 text-lg mb-2">
                  Upload Your Images
                </p>
                <p className="text-sm text-gray-600">
                  Please share your images via WhatsApp or send a Google Drive
                  link.
                </p>
              </div>

              {/* WhatsApp message preview */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Your WhatsApp message preview:
                </p>
                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                  {whatsappMsg}
                </pre>
              </div>

              {/* Order Status */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-blue-700 mb-3">
                  Order Status Flow:
                </p>
                <div className="space-y-2">
                  {[
                    { emoji: "🟡", label: "Image Received" },
                    { emoji: "🔵", label: "Editing in Progress" },
                    { emoji: "🟢", label: "Delivered" },
                  ].map((s, i) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <span className="text-base">{s.emoji}</span>
                      <span className="text-sm text-gray-700 font-medium">
                        {s.label}
                      </span>
                      {i < 2 && <div className="flex-1 h-px bg-blue-200" />}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Edited photos will be delivered via WhatsApp or Drive link
                  within the promised delivery time.
                </p>
              </div>

              <Button
                data-ocid="photo_payment.confirm_button"
                onClick={() => {
                  window.open(
                    `https://wa.me/919263989760?text=${encodeURIComponent(whatsappMsg)}`,
                    "_blank",
                  );
                  onClose();
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-5 text-base"
              >
                💬 Send via WhatsApp
              </Button>

              <button
                type="button"
                data-ocid="photo_payment.cancel_button"
                onClick={onClose}
                className="w-full text-sm text-gray-400 hover:text-gray-600 py-2 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
