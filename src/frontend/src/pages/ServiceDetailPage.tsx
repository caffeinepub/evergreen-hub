import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  Package,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import Header from "../components/Header";
import PaymentModal from "../components/PaymentModal";
import { useCart } from "../contexts/CartContext";
import type { CartItem } from "../contexts/CartContext";

interface ServiceData {
  name: string;
  price: number;
  originalPrice: number;
  delivery: string;
  category: CartItem["category"];
  description: string;
  features: string[];
  images: string[];
}

const serviceData: Record<string, ServiceData> = {
  "web-design-basic": {
    name: "Basic Website Package",
    price: 2999,
    originalPrice: 5999,
    delivery: "2–3 Days",
    category: "web-design",
    description:
      "Perfect for small businesses and individuals starting their online journey. A clean, minimal landing page with all essentials.",
    features: [
      "1–2 page website",
      "Mobile-friendly design",
      "Contact form",
      "WhatsApp / Call button",
      "Google Map pin",
      "15 days support",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
  "web-design-growth": {
    name: "Growth Website Package",
    price: 8999,
    originalPrice: 17999,
    delivery: "7–10 Days",
    category: "web-design",
    description:
      "4–5 page professional website ideal for growing businesses. Includes Google Business Profile setup and basic SEO.",
    features: [
      "4–5 page professional website",
      "WhatsApp integration",
      "Google Business Profile setup",
      "Basic SEO",
      "Contact form",
      "3 months support",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
  "video-shorts": {
    name: "Shorts / Reels Editing",
    price: 799,
    originalPrice: 1599,
    delivery: "24 Hours",
    category: "video-editing",
    description:
      "Professional editing for Instagram Reels, YouTube Shorts & TikTok. Eye-catching cuts with smooth transitions.",
    features: [
      "Up to 60 seconds",
      "Smooth transitions",
      "Color grading",
      "Background music sync",
      "Text overlays",
      "Free revisions",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
  "video-youtube-pro": {
    name: "YouTube Pro Editing",
    price: 3999,
    originalPrice: 7999,
    delivery: "48 Hours",
    category: "video-editing",
    description:
      "Perfect for growing YouTube channels. Professional cuts, engaging visuals, and audience-retention techniques.",
    features: [
      "Up to 10 minutes",
      "Jump cuts & transitions",
      "Color grading",
      "Motion graphics",
      "Sound effects",
      "Multiple revisions",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
  "photo-basic": {
    name: "Basic Photo Editing",
    price: 149,
    originalPrice: 299,
    delivery: "12–24 Hours",
    category: "photo-editing",
    description:
      "Quick, clean edits for everyday photos. Perfect for simple retouching and color correction needs.",
    features: [
      "Color correction",
      "Brightness & contrast",
      "Basic retouch",
      "Fast delivery",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
  "photo-advanced": {
    name: "Advanced Photo Editing",
    price: 299,
    originalPrice: 599,
    delivery: "24–48 Hours",
    category: "photo-editing",
    description:
      "High-end editing for professional results. Background removal, skin retouching, and full color grading.",
    features: [
      "Skin retouching",
      "Background removal",
      "Color grading",
      "High-end finish",
      "Multiple revisions",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
  "thumb-basic": {
    name: "Basic Thumbnail Design",
    price: 199,
    originalPrice: 399,
    delivery: "12–24 Hours",
    category: "thumbnail-design",
    description:
      "Click-worthy thumbnail designs that boost your CTR. Custom layout, text overlay, and color grading.",
    features: [
      "Custom design",
      "Click-worthy layout",
      "Text overlay",
      "Basic color grading",
      "High-res export",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
  "thumb-advanced": {
    name: "Advanced Thumbnail Design",
    price: 499,
    originalPrice: 999,
    delivery: "24–48 Hours",
    category: "thumbnail-design",
    description:
      "Premium thumbnail designs for serious creators. Brand-consistent style with custom illustrations and multiple revisions.",
    features: [
      "Premium design",
      "Brand-consistent style",
      "Custom illustrations",
      "Multiple revisions",
      "High-res export",
      "Commercial license",
    ],
    images: ["/assets/CC_20260226_043346-1.png"],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "web-design": "from-blue-500 to-indigo-600",
  "video-editing": "from-purple-500 to-violet-600",
  "photo-editing": "from-pink-500 to-rose-500",
  "thumbnail-design": "from-yellow-500 to-orange-500",
};

const CATEGORY_ICONS: Record<string, string> = {
  "web-design": "🌐",
  "video-editing": "🎬",
  "photo-editing": "📸",
  "thumbnail-design": "🖼️",
};

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

function getReviews(serviceId: string): Review[] {
  try {
    const stored = localStorage.getItem(`reviews_${serviceId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveReviews(serviceId: string, reviews: Review[]) {
  localStorage.setItem(`reviews_${serviceId}`, JSON.stringify(reviews));
}

export default function ServiceDetailPage() {
  const { serviceId } = useParams({ from: "/service/$serviceId" });
  const service = serviceData[serviceId];
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [cartAdded, setCartAdded] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(() => getReviews(serviceId));
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Service not found.</p>
      </div>
    );
  }

  const gradient =
    CATEGORY_COLORS[service.category] || "from-gray-500 to-gray-600";
  const icon = CATEGORY_ICONS[service.category] || "📦";

  const handleAddToCart = () => {
    addToCart({
      id: serviceId,
      name: service.name,
      price: service.price,
      category: service.category,
    });
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleSubmitReview = () => {
    if (!reviewName.trim() || !reviewComment.trim()) return;
    const newReview: Review = {
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toLocaleDateString("en-IN"),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(serviceId, updated);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <section className={`bg-gradient-to-br ${gradient} text-white py-16`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="text-5xl mb-4">{icon}</div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                {service.name}
              </h1>
              <p className="text-white/90 text-lg mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="bg-white/20 rounded-2xl px-5 py-3">
                  <p className="text-xs text-white/70">Original Price</p>
                  <p className="text-white line-through text-sm">
                    ₹{service.originalPrice}
                  </p>
                </div>
                <div className="bg-white rounded-2xl px-5 py-3">
                  <p className="text-xs text-gray-500">Your Price</p>
                  <p
                    className={`text-2xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                  >
                    ₹{service.price}
                  </p>
                </div>
                <div className="bg-white/20 rounded-2xl px-5 py-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <div>
                    <p className="text-xs text-white/70">Delivery</p>
                    <p className="font-bold">{service.delivery}</p>
                  </div>
                </div>
                <span className="bg-red-500 text-white font-extrabold px-4 py-2 rounded-full text-sm">
                  50% OFF
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Images + Publisher */}
            <div className="md:col-span-1 space-y-5">
              {/* Service Image */}
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img
                  src={service.images[0]}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Publisher Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/assets/CC_20260226_043346-1.png"
                    alt="Rudra Pratap Singh"
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      Rudra Pratap Singh
                    </p>
                    <p className="text-xs text-emerald-600">
                      Founder, Evergreen Hub
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  Expert since 2020 in web design, video editing & creative
                  services.
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    5.0 Publisher Rating
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <User className="w-3 h-3" />
                  Published by Rudra Pratap Singh
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-500" /> Delivery
                  Timeline
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      step: "1",
                      label: "Order Placed",
                      sub: "Immediately after payment",
                    },
                    {
                      step: "2",
                      label: "Work Starts",
                      sub: "Within 1–2 hours",
                    },
                    { step: "3", label: "Delivered", sub: service.delivery },
                  ].map((s, idx) => (
                    <div key={s.step} className="flex gap-3">
                      <div
                        className={`w-7 h-7 rounded-full bg-gradient-to-br ${gradient} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`}
                      >
                        {s.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {s.label}
                        </p>
                        <p className="text-xs text-gray-400">{s.sub}</p>
                      </div>
                      {idx < 2 && <div className="absolute" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Features + Actions + Reviews */}
            <div className="md:col-span-2 space-y-6">
              {/* Features */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-extrabold text-xl text-gray-900 mb-4">
                  What's Included
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-gray-700"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
                <h2 className="font-extrabold text-xl text-gray-900 mb-2">
                  Order This Service
                </h2>
                <div className="flex gap-3">
                  <span className="text-sm text-gray-400 line-through">
                    ₹{service.originalPrice}
                  </span>
                  <span className="text-2xl font-extrabold text-emerald-600">
                    ₹{service.price}
                  </span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full self-center">
                    50% OFF
                  </span>
                </div>
                <Button
                  data-ocid="service_detail.primary_button"
                  onClick={() => setIsPaymentOpen(true)}
                  className={`w-full bg-gradient-to-r ${gradient} text-white font-bold rounded-xl py-5 text-base hover:opacity-90`}
                >
                  Order Now — ₹{service.price}
                </Button>
                <Button
                  variant="outline"
                  data-ocid="service_detail.secondary_button"
                  onClick={handleAddToCart}
                  className={`w-full font-semibold border-2 rounded-xl py-4 ${cartAdded ? "bg-green-50 border-green-500 text-green-700" : ""}`}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {cartAdded ? "Added to Cart ✓" : "Add to Cart"}
                </Button>
              </div>

              {/* Live Reviews */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-extrabold text-xl text-gray-900 mb-5">
                  ⭐ Live Reviews
                </h2>

                {/* Write Review */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                  <h3 className="font-bold text-gray-800 text-sm mb-3">
                    Write a Review
                  </h3>
                  <div className="space-y-3">
                    <input
                      data-ocid="service_review.input"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 mr-2">
                        Rating:
                      </span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className={`text-2xl transition-transform hover:scale-110 ${
                            star <= reviewRating
                              ? "text-amber-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <textarea
                      data-ocid="service_review.textarea"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience..."
                      rows={3}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                    />
                    <Button
                      data-ocid="service_review.submit_button"
                      onClick={handleSubmitReview}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl px-6 py-2"
                    >
                      Submit Review
                    </Button>
                    {reviewSubmitted && (
                      <p
                        data-ocid="service_review.success_state"
                        className="text-green-600 text-sm font-semibold"
                      >
                        ✅ Review submitted! Thank you.
                      </p>
                    )}
                  </div>
                </div>

                {/* Review List */}
                {reviews.length === 0 ? (
                  <div
                    data-ocid="service_review.empty_state"
                    className="text-center py-8 text-gray-400"
                  >
                    <p className="text-3xl mb-2">⭐</p>
                    <p className="text-sm">No reviews yet. Be the first!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review, idx) => (
                      <div
                        key={`${review.name}-${idx}`}
                        data-ocid={`service_review.item.${idx + 1}`}
                        className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm`}
                            >
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {review.name}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span
                              key={s}
                              className={`text-base ${s <= review.rating ? "text-amber-400" : "text-gray-200"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-700">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You may also like */}
        <div className="bg-white border-t border-gray-100 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-extrabold text-2xl text-gray-900 mb-6">
              ✨ You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(serviceData)
                .filter(([id]) => id !== serviceId)
                .slice(0, 3)
                .map(([id, svc]) => (
                  <div
                    key={id}
                    className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl">
                      {CATEGORY_ICONS[svc.category] || "📦"}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-tight">
                        {svc.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                        {svc.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-xs text-gray-400 line-through">
                        ₹{svc.originalPrice}
                      </span>
                      <span className="font-bold text-emerald-600">
                        ₹{svc.price}
                      </span>
                      <span className="ml-auto bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">
                        50% OFF
                      </span>
                    </div>
                    <button
                      type="button"
                      data-ocid="service_suggestions.button"
                      onClick={() => navigate({ to: `/service/${id}` })}
                      className={`w-full py-2 rounded-xl text-white text-xs font-bold bg-gradient-to-r ${CATEGORY_COLORS[svc.category] || "from-gray-500 to-gray-600"} hover:opacity-90 transition-opacity`}
                    >
                      View Details
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        packageId={0n}
        packageName={service.name}
        packagePrice={`₹${service.price}`}
      />
    </>
  );
}
