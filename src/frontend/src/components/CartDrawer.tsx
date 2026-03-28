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
};

const CATEGORY_ICON: Record<string, string> = {
  "web-design": "🌐",
  "video-editing": "🎬",
  "photo-editing": "📸",
};

const CATEGORY_LABELS: Record<string, string> = {
  "web-design": "Web Design",
  "video-editing": "Video Editing",
  "photo-editing": "Photo Editing",
};

const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    progress: 10,
  },
  "In Progress": {
    icon: Loader2,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    progress: 55,
  },
  Completed: {
    icon: CheckCircle2,
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
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
        >
          {/* Gradient Header */}
          <SheetHeader className="px-6 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white">
            <SheetTitle className="flex items-center gap-2 text-white text-xl font-bold">
              <ShoppingCart className="h-6 w-6" />
              Evergreen Cart
              {items.length > 0 && (
                <span className="ml-1 bg-white text-green-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </SheetTitle>
            {/* Tabs */}
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setActiveTab("cart")}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "cart"
                    ? "bg-white text-green-600 shadow"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                🛒 Cart
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "orders"
                    ? "bg-white text-green-600 shadow"
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
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mb-4">
                      <ShoppingBag className="h-10 w-10 text-emerald-400" />
                    </div>
                    <p className="font-semibold text-foreground">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add services to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
                            <p className="font-semibold text-sm text-foreground truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
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
                            <p className="text-xs text-muted-foreground">
                              ₹{item.price.toLocaleString("en-IN")} each
                            </p>
                          </div>
                        </div>
                        {/* Quantity + Remove */}
                        <div className="flex items-center justify-between px-3 pb-3">
                          <div className="flex items-center gap-1 border rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-muted-foreground hover:text-red-600 transition-colors"
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
                              className="p-1.5 hover:bg-green-50 dark:hover:bg-green-950/30 text-muted-foreground hover:text-green-600 transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
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
                <div className="border-t px-4 py-4 space-y-4 bg-background">
                  {/* Coupon */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold flex items-center gap-1.5">
                      <Tag className="h-4 w-4 text-green-500" />
                      Coupon Code
                    </p>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-300 dark:border-green-700">
                        <div>
                          <span className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-900 px-2 py-0.5 rounded">
                            {appliedCoupon.code}
                          </span>
                          <p className="text-xs text-green-600 dark:text-green-500 mt-1">
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
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value);
                            setCouponError("");
                          }}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleApplyCoupon()
                          }
                          className="flex-1 text-sm uppercase tracking-widest"
                        />
                        <Button
                          size="sm"
                          onClick={handleApplyCoupon}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                    {couponError && (
                      <p className="text-xs text-destructive">{couponError}</p>
                    )}
                  </div>

                  <Separator />

                  {/* Price Summary */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-muted-foreground">
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
                    onClick={() => setShowPayment(true)}
                    className="w-full py-3 rounded-xl font-bold text-white text-base bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-green-200 dark:hover:shadow-green-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{ boxShadow: "0 4px 20px rgba(34,197,94,0.35)" }}
                  >
                    💳 Checkout — ₹{finalTotal.toLocaleString("en-IN")}
                  </button>
                  <Button
                    variant="ghost"
                    className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 text-sm"
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
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center mb-4">
                    <ShoppingBag className="h-10 w-10 text-purple-400" />
                  </div>
                  <p className="font-semibold text-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your order history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => {
                    const cfg =
                      STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={order.id}
                        className={`rounded-xl border p-4 space-y-3 ${cfg.bg}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-sm text-foreground">
                              {order.service}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
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
                            className={`h-4 w-4 ${cfg.color} ${order.status === "In Progress" ? "animate-spin" : ""}`}
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
                          <div className="flex justify-between text-xs text-muted-foreground">
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
