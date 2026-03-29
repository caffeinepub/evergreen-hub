import { MessageCircle, Minimize2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
}

// Knowledge base for Evergreen Hub services
const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["website", "web design", "web development", "site", "webpage"],
    answer:
      "We offer professional Website Development services! Packages:\n\n🌐 Basic Package – ₹2,999\n• 1-2 page website, mobile friendly, contact form, WhatsApp button, Google Map, 15 days support. Delivery: 2-3 days.\n\n🌐 Starter – ₹4,999\n• 3-5 page website, basic SEO, 1 month support. Delivery: 3-5 days.\n\n🌐 Growth – ₹8,999 (Most Popular)\n• 5-8 pages, advanced SEO, Google Analytics, 3 months support. Delivery: 7-10 days.\n\n🌐 Authority – ₹14,999\n• 10-15 pages, custom animations, e-commerce ready, 6 months support.\n\n🌐 Ultra Premium – ₹24,999\n• 6-10 custom pages, full Google Business optimization, advanced SEO, lead capture. Delivery: 15+ days.\n\nAll packages include Demo availability. Contact us on WhatsApp for more details!",
  },
  {
    keywords: [
      "video editing",
      "video edit",
      "reel",
      "youtube",
      "short",
      "clip",
    ],
    answer:
      "We offer Professional Video Editing services! \n\n🎬 Shorts/Reels (up to 60 sec) – ₹799\nPerfect for Instagram Reels, YouTube Shorts & TikTok\n\n🎬 YouTube Basic (up to 5 min) – ₹1,999\nGreat for vlogs, tutorials & short YouTube videos\n\n🎬 YouTube Pro (up to 10 min) – ₹3,999 ⭐ Most Popular\nPerfect for growing YouTube channels\n\n🎬 Long Video (up to 30 min) – ₹7,999 🏆 Best Value\nIdeal for documentaries & full-length content\n\nAll plans include: color grading, smooth transitions, free revisions, and fast delivery. Add-ons available: Thumbnail (+₹299), Express Delivery (+₹999), Motion Graphics (+₹999).",
  },
  {
    keywords: [
      "photo editing",
      "photo edit",
      "image editing",
      "retouching",
      "background removal",
    ],
    answer:
      "We offer Professional Photo Editing services!\n\n📸 Basic Photo Editing – ₹149\n• Color correction, brightness & contrast, basic retouch\n• Delivery: 12-24 hours\n\n📸 Advanced Photo Editing – ₹299 ⭐ Most Popular\n• Skin retouching, background removal, color grading, high-end finish\n• Delivery: 24-48 hours\n\n📸 5 Photos Pack – ₹499 (Best Deal!)\n\nAfter ordering, share your images via WhatsApp or Google Drive link. We deliver via WhatsApp or Drive.",
  },
  {
    keywords: ["thumbnail", "thumbnail design", "youtube thumbnail", "click"],
    answer:
      "We offer Professional Thumbnail Design services!\n\n🖼️ Basic Thumbnail – ₹199\n• Custom design, click-worthy layout, text overlay, basic color grading\n• Delivery: 12-24 hours\n\n🖼️ Advanced Thumbnail – ₹499 ⭐ Most Popular\n• Premium design, brand-consistent style, custom illustrations, multiple revisions\n• Delivery: 24-48 hours\n\n📦 10 Thumbnails Pack – ₹1,499 (Best Deal!)\n\nPerfect for YouTube, Instagram & social media platforms!",
  },
  {
    keywords: ["price", "cost", "charge", "rate", "fee", "kitna", "pricing"],
    answer:
      "Here's a quick price overview:\n\n🌐 Website Development:\n• Basic: ₹2,999 | Starter: ₹4,999 | Growth: ₹8,999 | Authority: ₹14,999 | Ultra Premium: ₹24,999\n\n🎬 Video Editing:\n• Shorts/Reels: ₹799 | YouTube Basic: ₹1,999 | YouTube Pro: ₹3,999 | Long Video: ₹7,999\n\n📸 Photo Editing:\n• Basic: ₹149 | Advanced: ₹299 | 5 Photos Pack: ₹499\n\n🖼️ Thumbnail Design:\n• Basic: ₹199 | Advanced: ₹499 | 10 Pack: ₹1,499\n\nCoupon codes available: EVERGREEN10 (10% off), HUB25 (25% off), WELCOME50 (₹100 off)",
  },
  {
    keywords: ["coupon", "discount", "offer", "promo", "code"],
    answer:
      "We have coupon codes you can use at checkout!\n\n🎁 EVERGREEN10 → 10% OFF\n🎁 HUB25 → 25% OFF\n🎁 WELCOME50 → ₹100 OFF\n🎁 EVERGREEN → ₹50 OFF\n🎁 HUB150 → ₹150 OFF\n\nApply the coupon code in the checkout section before payment. Only one coupon per order.",
  },
  {
    keywords: ["payment", "pay", "upi", "paypal", "bank"],
    answer:
      "We accept multiple payment methods:\n\n💳 UPI/PhonePe (Local/National):\nUPI ID: 79705775@ybl\n\n🌍 PayPal (International):\nhttps://www.paypal.me/RudraSingh383\n\n🏦 Bank Transfer also available\n\nAfter payment, share the transaction ID with us on WhatsApp.",
  },
  {
    keywords: ["delivery", "time", "days", "kab milega", "when"],
    answer:
      "Delivery timelines:\n\n🌐 Website Development: 2-15 days depending on package\n🎬 Video Editing: 24-48 hours (Express: 24 hours +₹999)\n📸 Photo Editing: 12-48 hours\n🖼️ Thumbnail Design: 12-48 hours\n\nDelivery time may vary based on complexity and revision requests.",
  },
  {
    keywords: ["contact", "whatsapp", "call", "reach", "support"],
    answer:
      "You can reach us via:\n\n💬 WhatsApp: +91 9263989760\n📧 Email: rudrapratapsingh6060@gmail.com\n📱 Instagram: @evergreenhub2026\n▶️ YouTube: @evergreengamerz\n\nWe typically respond within 1-2 hours on WhatsApp!",
  },
  {
    keywords: ["refund", "cancel", "return", "money back"],
    answer:
      "Our Refund Policy:\n\n✅ Full Refund: If work has NOT started or you cancel in the initial stage\n✅ Partial Refund: If work is partially completed\n❌ No Refund: If project is completed and delivered\n\nIf you're not satisfied with the result, you can request a review. We want you to be happy with our services!",
  },
  {
    keywords: ["who", "founder", "rudra", "about", "team"],
    answer:
      "Evergreen Hub is founded by Rudra Pratap Singh from Bihar! 🌿\n\nHello! I help coaching institutes, bloggers, local businesses grow online with professional websites, video editing, photo editing, and thumbnail design services.\n\nMy mission: Modern design + smart functionality + high-quality content = real results for your business.\n\nBuilt with ❤️ in Bihar!",
  },
  {
    keywords: ["cart", "order", "buy", "purchase"],
    answer:
      "To order a service:\n\n1️⃣ Browse our services (Web Design, Video Editing, Photo Editing, Thumbnail Design)\n2️⃣ Click 'Order Now' for direct checkout OR 'Add to Cart' for multiple services\n3️⃣ Apply a coupon code (optional) for discount\n4️⃣ Complete payment via UPI/PayPal\n5️⃣ Share transaction ID on WhatsApp\n\nYou can track your order status in the Dashboard section!",
  },
  {
    keywords: ["faq", "frequently", "question"],
    answer:
      "Common FAQ:\n\n❓ How do I order?\n→ Click 'Order Now' on any service, pay, and share txn ID on WhatsApp.\n\n❓ What formats do you deliver?\n→ Videos: MP4 | Photos: JPG/PNG | Thumbnails: PNG/JPG | Websites: Live URL\n\n❓ Do you offer revisions?\n→ Yes! All services include free revisions.\n\n❓ How do I track my order?\n→ Check the Dashboard section after logging in.\n\n❓ Is my data safe?\n→ Yes, we never share your files or data with third parties.",
  },
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const item of knowledgeBase) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.answer;
    }
  }
  return "Hi! I'm Evergreen AI, your assistant for Evergreen Hub services. I can help you with:\n\n🌐 Website Development pricing & packages\n🎬 Video Editing services\n📸 Photo Editing services\n🖼️ Thumbnail Design services\n💰 Pricing & discounts\n📦 Order & delivery info\n\nWhat would you like to know? Type your question!";
}

const QUICK_CHIPS = [
  { label: "Website Packages?", query: "website packages" },
  { label: "Video Editing Price?", query: "video editing price" },
  { label: "Photo Editing?", query: "photo editing" },
  { label: "Thumbnail Design?", query: "thumbnail design" },
  { label: "Coupon Codes?", query: "coupon codes" },
  { label: "Delivery Time?", query: "delivery time" },
];

export default function EvergreenAIChatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messageCounter = useRef(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "bot",
      text: "👋 Hi! I'm Evergreen AI!\n\nI can help you with our services:\n🌐 Website Development\n🎬 Video Editing\n📸 Photo Editing\n🖼️ Thumbnail Design\n\nAsk me anything!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for toggle event from Header
  useEffect(() => {
    const handler = () => setOpen((prev) => !prev);
    window.addEventListener("toggle-evergreen-ai", handler);
    return () => window.removeEventListener("toggle-evergreen-ai", handler);
  }, []);

  // Scroll to bottom when messages change
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change intentional
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed) return;
    messageCounter.current += 2;
    const userMsg: Message = {
      id: messageCounter.current - 1,
      role: "user",
      text: trimmed,
    };
    const botMsg: Message = {
      id: messageCounter.current,
      role: "bot",
      text: getBotResponse(trimmed),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Window — fixed bottom-right, no drag */}
      {open && (
        <div
          className="fixed z-[9000] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            width: "340px",
            height: minimized ? "56px" : "500px",
            bottom: "24px",
            right: "16px",
            transition: "height 0.3s ease",
            background: "#ffffff",
            border: "2px solid #10b981",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Evergreen AI</p>
                <p className="text-emerald-100 text-xs">Always here to help</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMinimized(!minimized)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "bot" && (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-sm whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-emerald-500 text-white rounded-br-sm"
                          : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick FAQ Chips */}
              <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto flex-shrink-0 scrollbar-none">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    type="button"
                    key={chip.label}
                    onClick={() => sendMessage(chip.query)}
                    className="flex-shrink-0 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full hover:bg-emerald-100 transition-colors whitespace-nowrap"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-gray-100 flex-shrink-0">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  className="flex-1 text-sm border border-gray-200 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => sendMessage()}
                  className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
