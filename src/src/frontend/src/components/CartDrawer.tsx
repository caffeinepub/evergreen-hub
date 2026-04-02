import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import PaymentModal from "./PaymentModal";

const COUPONS: Record<string, { type: "percent" | "fixed"; value: number }> = {
  EVERGREEN10: { type: "percent", value: 10 },
  HUB25: { type: "percent", value: 25 },
  WELCOME50: { type: "fixed", value: 100 },
  HUB20: { type: "percent", value: 20 },
  EVERGREEN: { type: "fixed", value: 50 },
  HUB150: { type: "fixed", value: 150 },
};

const CATEGORY_GRADIENT: Record<string, string> = {
  "web-design": "from-blue-500 to-indigo-600",
  "video-editing": "from-purple-500 to-violet-600",
  "photo-editing": "from-pink-500 to-rose-500",
  "thumbnail-design": "from-yellow-500 to-orange-500",
};

const CATEGORY_ICON: Record<string, string> = {
  "web-design": "🌐",
  "video-editing": "🎬",
  "photo-editing": "📸",
  "thumbnail-design": "🖼️",
};

const CATEGORY_LABELS: Record<string, string> = {
  "web-design": "Web Design",
  "video-editing": "Video Editing",
  "photo-editing": "Photo Editing",
  "thumbnail-design": "Thumbnail Design",
};

const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50",
    progress: 10,
  },
  "In Progress": {
    icon: Loader2,
    color: "text-blue-500",
    bg: "bg-blue-50",
    progress: 55,
  },
  Completed: {
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-50",
    progress: 100,
  },
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    orders,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    type: "percent" | "fixed";
    value: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<"cart" | "orders">("cart");

  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round((cartTotal * appliedCoupon.value) / 100)
      : Math.min(appliedCoupon.value, cartTotal)
    : 0;
  const finalTotal = Math.max(0, cartTotal - discount);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    const coupon = COUPONS[code];
    if (!coupon) {
      setCouponError("❌ Invalid coupon code");
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon({ code, ...coupon });
    setCouponError("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="right"
          className="w-full sm:w-[440px] flex flex-col p-0 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
          }}
        >
          {/* Colorful Rainbow Gradient Header */}
          <SheetHeader
            className="px-6 py-4 text-white"
            style={{
              background:
                "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
            }}
          >
            <SheetTitle className="flex items-center gap-2 text-white text-xl font-bold">
              <ShoppingCart className="h-6 w-6" />
              Evergreen Cart
              {items.length > 0 && (
                <span className="ml-1 bg-white text-purple-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
            {/* Service count summary */}
            {activeTab === "cart" && items.length > 0 && (
              <div className="mt-1 px-1 py-1.5 bg-white/15 rounded-xl text-white text-xs font-semibold text-center">
                🛍️ {totalItems} service{totalItems !== 1 ? "s" : ""} in cart —
                Total: ₹{cartTotal.toLocaleString("en-IN")}
              </div>
            )}
            {/* Tabs */}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                data-ocid="cart.tab"
                onClick={() => setActiveTab("cart")}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "cart"
                    ? "bg-white text-purple-600 shadow"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                🛒 Cart
              </button>
              <button
                type="button"
                data-ocid="cart.tab"
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "orders"
                    ? "bg-white text-purple-600 shadow"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                📦 My Orders {orders.length > 0 && `(${orders.length})`}
              </button>
            </div>
          </SheetHeader>

          {/* Cart Tab */}
          {activeTab === "cart" && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                {items.length === 0 ? (
                  <div
                    data-ocid="cart.empty_state"
                    className="flex flex-col items-center justify-center h-48 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-purple-100 flex items-center justify-center mb-4">
                      <ShoppingBag className="h-10 w-10 text-purple-400" />
                    </div>
                    <p className="font-semibold text-gray-700">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Add services to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item, idx) => (
                      <div
                        key={item.id}
                        data-ocid={`cart.item.${idx + 1}`}
                        className="rounded-xl border border-white/80 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {/* Color bar */}
                        <div
                          className={`h-1.5 bg-gradient-to-r ${CATEGORY_GRADIENT[item.category] || "from-gray-400 to-gray-500"}`}
                        />
                        <div className="flex items-center gap-3 p-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${CATEGORY_GRADIENT[item.category] || "from-gray-400 to-gray-500"} flex items-center justify-center text-lg shrink-0`}
                          >
                            {CATEGORY_ICON[item.category] || "📦"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {CATEGORY_LABELS[item.category]}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="font-bold text-green-600">
                              ₹
                              {(item.price * item.quantity).toLocaleString(
                                "en-IN",
                              )}
                            </p>
                            <p className="text-xs text-gray-400">
                              ₹{item.price.toLocaleString("en-IN")} each
                            </p>
                          </div>
                        </div>
                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between px-3 pb-3">
                          <div className="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden bg-white">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="px-3 py-1 text-sm font-bold min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1.5 hover:bg-green-50 text-gray-500 hover:text-green-600 transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            data-ocid={`cart.delete_button.${idx + 1}`}
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-white/60 px-4 py-4 space-y-4 bg-white shadow-lg">
                  {/* Coupon */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold flex items-center gap-1.5 text-gray-800">
                      <Tag className="h-4 w-4 text-green-500" />
                      Coupon Code
                    </p>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-50 border border-green-300">
                        <div>
                          <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-0.5 rounded">
                            {appliedCoupon.code}
                          </span>
                          <p className="text-xs text-green-600 mt-1">
                            🎉 Discount Applied: -₹
                            {discount.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-red-500 hover:text-red-700 text-xs underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          data-ocid="cart.input"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponError("");
                          }}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                          className="flex-1 text-sm uppercase tracking-widest bg-white"
                        />
                        <Button
                          size="sm"
                          data-ocid="cart.secondary_button"
                          onClick={handleApplyCoupon}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                    {couponError && (
                      <p
                        data-ocid="cart.error_state"
                        className="text-xs text-red-600"
                      >
                        {couponError}
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Price Summary */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>Discount</span>
                        <span>-₹{discount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-base pt-1">
                      <span>Total</span>
                      <span className="text-xl text-green-600">
                        ₹{finalTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    type="button"
                    data-ocid="cart.primary_button"
                    onClick={() => setShowPayment(true)}
                    className="w-full py-3 rounded-xl font-bold text-white text-base hover:opacity-90 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)",
                      boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
                    }}
                  >
                    💳 Checkout — ₹{finalTotal.toLocaleString("en-IN")}
                  </button>
                  <Button
                    variant="ghost"
                    data-ocid="cart.delete_button"
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 text-sm"
                    onClick={() => {
                      clearCart();
                      handleRemoveCoupon();
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {orders.length === 0 ? (
                <div
                  data-ocid="orders.empty_state"
                  className="flex flex-col items-center justify-center h-48 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-purple-400" />
                  </div>
                  <p className="font-semibold text-gray-700">No orders yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Your order history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order, idx) => {
                    const cfg =
                      STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={order.id}
                        data-ocid={`orders.item.${idx + 1}`}
                        className="rounded-xl border border-white/80 p-4 space-y-3 bg-white shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-sm text-gray-900">
                              {order.service}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              #{order.id} · {order.date}
                            </p>
                          </div>
                          <span className="font-bold text-green-600 shrink-0">
                            ₹{order.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        {/* Status */}
                        <div className="flex items-center gap-2">
                          <Icon
                            className={`h-4 w-4 ${cfg.color} ${
                              order.status === "In Progress"
                                ? "animate-spin"
                                : ""
                            }`}
                          />
                          <Badge
                            className={`text-xs font-semibold ${cfg.color} bg-transparent border-current`}
                            variant="outline"
                          >
                            {order.status}
                          </Badge>
                        </div>
                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <Progress value={cfg.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Pending</span>
                            <span>In Progress</span>
                            <span>Completed</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        packageId={0n}
        packageName={
          items.length === 1 ? items[0].name : `${items.length} Services Bundle`
        }
        packagePrice={String(finalTotal)}
      />
    </>
  );
}
