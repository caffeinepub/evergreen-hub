import { p as useParams, t as useCart, u as useNavigate, r as reactExports, j as jsxRuntimeExports, H as Header, v as Clock, w as Star, U as User, x as Package, y as CircleCheckBig, B as Button, z as ShoppingCart, A as PaymentModal } from "./index-Bxztzs8-.js";
const serviceData = {
  "web-design-basic": {
    name: "Basic Website Package",
    price: 2999,
    originalPrice: 5999,
    delivery: "2–3 Days",
    category: "web-design",
    description: "Perfect for small businesses and individuals starting their online journey. A clean, minimal landing page with all essentials.",
    features: [
      "1–2 page website",
      "Mobile-friendly design",
      "Contact form",
      "WhatsApp / Call button",
      "Google Map pin",
      "15 days support"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  },
  "web-design-growth": {
    name: "Growth Website Package",
    price: 8999,
    originalPrice: 17999,
    delivery: "7–10 Days",
    category: "web-design",
    description: "4–5 page professional website ideal for growing businesses. Includes Google Business Profile setup and basic SEO.",
    features: [
      "4–5 page professional website",
      "WhatsApp integration",
      "Google Business Profile setup",
      "Basic SEO",
      "Contact form",
      "3 months support"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  },
  "video-shorts": {
    name: "Shorts / Reels Editing",
    price: 799,
    originalPrice: 1599,
    delivery: "24 Hours",
    category: "video-editing",
    description: "Professional editing for Instagram Reels, YouTube Shorts & TikTok. Eye-catching cuts with smooth transitions.",
    features: [
      "Up to 60 seconds",
      "Smooth transitions",
      "Color grading",
      "Background music sync",
      "Text overlays",
      "Free revisions"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  },
  "video-youtube-pro": {
    name: "YouTube Pro Editing",
    price: 3999,
    originalPrice: 7999,
    delivery: "48 Hours",
    category: "video-editing",
    description: "Perfect for growing YouTube channels. Professional cuts, engaging visuals, and audience-retention techniques.",
    features: [
      "Up to 10 minutes",
      "Jump cuts & transitions",
      "Color grading",
      "Motion graphics",
      "Sound effects",
      "Multiple revisions"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  },
  "photo-basic": {
    name: "Basic Photo Editing",
    price: 149,
    originalPrice: 299,
    delivery: "12–24 Hours",
    category: "photo-editing",
    description: "Quick, clean edits for everyday photos. Perfect for simple retouching and color correction needs.",
    features: [
      "Color correction",
      "Brightness & contrast",
      "Basic retouch",
      "Fast delivery"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  },
  "photo-advanced": {
    name: "Advanced Photo Editing",
    price: 299,
    originalPrice: 599,
    delivery: "24–48 Hours",
    category: "photo-editing",
    description: "High-end editing for professional results. Background removal, skin retouching, and full color grading.",
    features: [
      "Skin retouching",
      "Background removal",
      "Color grading",
      "High-end finish",
      "Multiple revisions"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  },
  "thumb-basic": {
    name: "Basic Thumbnail Design",
    price: 199,
    originalPrice: 399,
    delivery: "12–24 Hours",
    category: "thumbnail-design",
    description: "Click-worthy thumbnail designs that boost your CTR. Custom layout, text overlay, and color grading.",
    features: [
      "Custom design",
      "Click-worthy layout",
      "Text overlay",
      "Basic color grading",
      "High-res export"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  },
  "thumb-advanced": {
    name: "Advanced Thumbnail Design",
    price: 499,
    originalPrice: 999,
    delivery: "24–48 Hours",
    category: "thumbnail-design",
    description: "Premium thumbnail designs for serious creators. Brand-consistent style with custom illustrations and multiple revisions.",
    features: [
      "Premium design",
      "Brand-consistent style",
      "Custom illustrations",
      "Multiple revisions",
      "High-res export",
      "Commercial license"
    ],
    images: ["/assets/CC_20260226_043346-1.png"]
  }
};
const CATEGORY_COLORS = {
  "web-design": "from-blue-500 to-indigo-600",
  "video-editing": "from-purple-500 to-violet-600",
  "photo-editing": "from-pink-500 to-rose-500",
  "thumbnail-design": "from-yellow-500 to-orange-500"
};
const CATEGORY_ICONS = {
  "web-design": "🌐",
  "video-editing": "🎬",
  "photo-editing": "📸",
  "thumbnail-design": "🖼️"
};
function getReviews(serviceId) {
  try {
    const stored = localStorage.getItem(`reviews_${serviceId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
function saveReviews(serviceId, reviews) {
  localStorage.setItem(`reviews_${serviceId}`, JSON.stringify(reviews));
}
function ServiceDetailPage() {
  const { serviceId } = useParams({ from: "/service/$serviceId" });
  const service = serviceData[serviceId];
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [cartAdded, setCartAdded] = reactExports.useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = reactExports.useState(false);
  const [reviews, setReviews] = reactExports.useState(() => getReviews(serviceId));
  const [reviewName, setReviewName] = reactExports.useState("");
  const [reviewRating, setReviewRating] = reactExports.useState(5);
  const [reviewComment, setReviewComment] = reactExports.useState("");
  const [reviewSubmitted, setReviewSubmitted] = reactExports.useState(false);
  if (!service) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Service not found." }) });
  }
  const gradient = CATEGORY_COLORS[service.category] || "from-gray-500 to-gray-600";
  const icon = CATEGORY_ICONS[service.category] || "📦";
  const handleAddToCart = () => {
    addToCart({
      id: serviceId,
      name: service.name,
      price: service.price,
      category: service.category
    });
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2e3);
  };
  const handleSubmitReview = () => {
    if (!reviewName.trim() || !reviewComment.trim()) return;
    const newReview = {
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN")
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    saveReviews(serviceId, updated);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-gray-50 pt-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: `bg-gradient-to-br ${gradient} text-white py-16`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl mb-4", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-extrabold mb-4", children: service.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/90 text-lg mb-6", children: service.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/20 rounded-2xl px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: "Original Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white line-through text-sm", children: [
              "₹",
              service.originalPrice
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl px-5 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500", children: "Your Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-2xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`,
                children: [
                  "₹",
                  service.price
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/20 rounded-2xl px-5 py-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/70", children: "Delivery" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: service.delivery })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white font-extrabold px-4 py-2 rounded-full text-sm", children: "50% OFF" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: service.images[0],
              alt: service.name,
              className: "w-full h-48 object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/CC_20260226_043346-1.png",
                  alt: "Rudra Pratap Singh",
                  className: "w-12 h-12 rounded-full object-cover border-2 border-emerald-400"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-900 text-sm", children: "Rudra Pratap Singh" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-emerald-600", children: "Founder, Evergreen Hub" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mb-2", children: "Expert since 2020 in web design, video editing & creative services." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-amber-400", children: [
              [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-current" }, i)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 ml-1", children: "5.0 Publisher Rating" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs text-gray-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3" }),
              "Published by Rudra Pratap Singh"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-gray-900 text-sm mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 text-emerald-500" }),
              " Delivery Timeline"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [
              {
                step: "1",
                label: "Order Placed",
                sub: "Immediately after payment"
              },
              {
                step: "2",
                label: "Work Starts",
                sub: "Within 1–2 hours"
              },
              { step: "3", label: "Delivered", sub: service.delivery }
            ].map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-7 h-7 rounded-full bg-gradient-to-br ${gradient} text-white text-xs font-bold flex items-center justify-center flex-shrink-0`,
                  children: s.step
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-800", children: s.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: s.sub })
              ] }),
              idx < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute" })
            ] }, s.step)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-extrabold text-xl text-gray-900 mb-4", children: "What's Included" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: service.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-2.5 text-sm text-gray-700",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-emerald-500 flex-shrink-0" }),
                  f
                ]
              },
              f
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-extrabold text-xl text-gray-900 mb-2", children: "Order This Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-gray-400 line-through", children: [
                "₹",
                service.originalPrice
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-extrabold text-emerald-600", children: [
                "₹",
                service.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full self-center", children: "50% OFF" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "service_detail.primary_button",
                onClick: () => setIsPaymentOpen(true),
                className: `w-full bg-gradient-to-r ${gradient} text-white font-bold rounded-xl py-5 text-base hover:opacity-90`,
                children: [
                  "Order Now — ₹",
                  service.price
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                "data-ocid": "service_detail.secondary_button",
                onClick: handleAddToCart,
                className: `w-full font-semibold border-2 rounded-xl py-4 ${cartAdded ? "bg-green-50 border-green-500 text-green-700" : ""}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 mr-2" }),
                  cartAdded ? "Added to Cart ✓" : "Add to Cart"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-gray-100 shadow-sm p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-extrabold text-xl text-gray-900 mb-5", children: "⭐ Live Reviews" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-800 text-sm mb-3", children: "Write a Review" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    "data-ocid": "service_review.input",
                    value: reviewName,
                    onChange: (e) => setReviewName(e.target.value),
                    placeholder: "Your name",
                    className: "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-500 mr-2", children: "Rating:" }),
                  [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setReviewRating(star),
                      className: `text-2xl transition-transform hover:scale-110 ${star <= reviewRating ? "text-amber-400" : "text-gray-300"}`,
                      children: "★"
                    },
                    star
                  ))
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    "data-ocid": "service_review.textarea",
                    value: reviewComment,
                    onChange: (e) => setReviewComment(e.target.value),
                    placeholder: "Share your experience...",
                    rows: 3,
                    className: "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": "service_review.submit_button",
                    onClick: handleSubmitReview,
                    className: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl px-6 py-2",
                    children: "Submit Review"
                  }
                ),
                reviewSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    "data-ocid": "service_review.success_state",
                    className: "text-green-600 text-sm font-semibold",
                    children: "✅ Review submitted! Thank you."
                  }
                )
              ] })
            ] }),
            reviews.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "service_review.empty_state",
                className: "text-center py-8 text-gray-400",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl mb-2", children: "⭐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No reviews yet. Be the first!" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: reviews.map((review, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `service_review.item.${idx + 1}`,
                className: "bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 p-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm`,
                          children: review.name.charAt(0).toUpperCase()
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-gray-900 text-sm", children: review.name })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gray-400", children: review.date })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-2", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-base ${s <= review.rating ? "text-amber-400" : "text-gray-200"}`,
                      children: "★"
                    },
                    s
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700", children: review.comment })
                ]
              },
              `${review.name}-${idx}`
            )) })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border-t border-gray-100 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 max-w-4xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-extrabold text-2xl text-gray-900 mb-6", children: "✨ You may also like" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: Object.entries(serviceData).filter(([id]) => id !== serviceId).slice(0, 3).map(([id, svc]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: CATEGORY_ICONS[svc.category] || "📦" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-gray-900 text-sm leading-tight", children: svc.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 mt-0.5 line-clamp-2", children: svc.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 line-through", children: [
                  "₹",
                  svc.originalPrice
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-emerald-600", children: [
                  "₹",
                  svc.price
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full", children: "50% OFF" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "service_suggestions.button",
                  onClick: () => navigate({ to: `/service/${id}` }),
                  className: `w-full py-2 rounded-xl text-white text-xs font-bold bg-gradient-to-r ${CATEGORY_COLORS[svc.category] || "from-gray-500 to-gray-600"} hover:opacity-90 transition-opacity`,
                  children: "View Details"
                }
              )
            ]
          },
          id
        )) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaymentModal,
      {
        isOpen: isPaymentOpen,
        onClose: () => setIsPaymentOpen(false),
        packageId: 0n,
        packageName: service.name,
        packagePrice: `₹${service.price}`
      }
    )
  ] });
}
export {
  ServiceDetailPage as default
};
