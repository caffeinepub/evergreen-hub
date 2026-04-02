import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  CreditCard,
  Hash,
  MessageCircle,
  ShoppingCart,
  Tag,
  User,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const HARDCODED_UPI_ID = "7970705775@ybl";

const COUPONS: Record<string, { type: "percent" | "flat"; value: number }> = {
  WELCOME50: { type: "flat", value: 100 },
  EVERGREEN: { type: "flat", value: 50 },
  HUB150: { type: "flat", value: 150 },
};

interface WebDesignPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: number;
}

type Step = "cart" | "payment" | "submitted";

export default function WebDesignPaymentModal({
  isOpen,
  onClose,
  packageName,
  packagePrice,
}: WebDesignPaymentModalProps) {
  const [step, setStep] = useState<Step>("cart");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  const finalAmount = appliedCoupon
    ? Math.max(0, packagePrice - appliedCoupon.discount)
    : packagePrice;

  const upiDeepLink = `upi://pay?pa=${HARDCODED_UPI_ID}&pn=EvergreenHub&am=${finalAmount}&cu=INR`;
  const paypalLink = "https://www.paypal.me/RudraSingh383";

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError("");
    setCouponSuccess("");
    if (!code) return;
    if (appliedCoupon) {
      setCouponError("Only 1 coupon allowed per order.");
      return;
    }
    const coupon = COUPONS[code];
    if (!coupon) {
      setCouponError("Invalid Coupon Code");
      setAppliedCoupon(null);
      return;
    }
    const discount =
      coupon.type === "percent"
        ? Math.round((packagePrice * coupon.value) / 100)
        : coupon.value;
    setAppliedCoupon({ code, discount });
    setCouponSuccess("Coupon applied successfully 🎉");
    setCouponError("");
  };

  const handleSendToWhatsApp = () => {
    const msg = encodeURIComponent(
      `🎉 Payment Proof for Web Design Package\n\n📦 Package: ${packageName}\n💰 Amount: ₹${finalAmount.toLocaleString("en-IN")}${appliedCoupon ? ` (Coupon: ${appliedCoupon.code}, Discount: -₹${appliedCoupon.discount})` : ""}\n🔖 Transaction ID: ${transactionId || "Not provided"}\n📸 Screenshot: ${screenshotFile ? screenshotFile.name : "Not attached"}\n\nPlease verify my payment. Thank you!`,
    );
    window.open(`https://wa.me/919263989760?text=${msg}`, "_blank");
    setStep("submitted");
  };

  const handleClose = () => {
    setStep("cart");
    setCouponCode("");
    setAppliedCoupon(null);
    setCouponError("");
    setCouponSuccess("");
    setTransactionId("");
    setScreenshotFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-white text-xl font-bold mb-1">
                Complete Payment
              </DialogTitle>
              <DialogDescription className="text-blue-100 text-sm">
                {packageName}
              </DialogDescription>
              <div className="mt-2 flex items-center gap-3">
                {appliedCoupon ? (
                  <>
                    <span className="text-blue-200 line-through text-sm">
                      ₹{packagePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ₹{finalAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="bg-green-400/20 text-green-200 px-2 py-0.5 rounded-full text-xs">
                      -{appliedCoupon.discount}
                    </span>
                  </>
                ) : (
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ₹{packagePrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* ── SUCCESS STATE ── */}
          {step === "submitted" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-2">
                WhatsApp Opened!
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">
                Your payment details have been sent to WhatsApp. Please also
                send the screenshot in the chat for faster verification.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm"
              >
                Close
              </button>
            </div>
          )}

          {/* ── CART STEP ── */}
          {step === "cart" && (
            <>
              {/* Cart Summary */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                    Your Cart
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {packageName}
                  </p>
                  <div className="text-right">
                    {appliedCoupon ? (
                      <>
                        <p className="text-sm line-through text-gray-400">
                          ₹{packagePrice.toLocaleString("en-IN")}
                        </p>
                        <p className="font-bold text-green-600 dark:text-green-400">
                          ₹{finalAmount.toLocaleString("en-IN")}
                        </p>
                      </>
                    ) : (
                      <p className="font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{packagePrice.toLocaleString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price breakdown */}
                {appliedCoupon && (
                  <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-700 space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Original Price</span>
                      <span>₹{packagePrice.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-xs text-red-500 font-medium">
                      <span>Discount Applied: -{appliedCoupon.code}</span>
                      <span>-₹{appliedCoupon.discount}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-green-600 dark:text-green-400 pt-1 border-t border-emerald-200 dark:border-emerald-700">
                      <span>Final Price</span>
                      <span>₹{finalAmount.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Coupon */}
              <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl p-4 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                    Coupon Code (Optional)
                  </span>
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-100 dark:bg-green-900/20 rounded-xl px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm font-bold text-green-700">
                          {appliedCoupon.code} applied!
                        </p>
                        <p className="text-xs text-green-600">
                          Discount Applied: -₹{appliedCoupon.discount}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode("");
                        setCouponSuccess("");
                      }}
                      className="text-xs text-red-500 hover:text-red-700 underline"
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
                        setCouponSuccess("");
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleApplyCoupon()
                      }
                      className="flex-1 uppercase text-sm"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
                    >
                      Apply
                    </Button>
                  </div>
                )}
                {couponSuccess && (
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    <p className="text-xs text-green-600 font-semibold">
                      {couponSuccess}
                    </p>
                  </div>
                )}
                {couponError && (
                  <div className="flex items-center gap-1 mt-2">
                    <XCircle className="w-3.5 h-3.5 text-red-500" />
                    <p className="text-xs text-red-500">{couponError}</p>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setStep("payment")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2"
              >
                Proceed to Payment <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-center text-xs text-gray-400">
                Coupon is optional — you can skip and pay directly.
              </p>
            </>
          )}

          {/* ── PAYMENT STEP ── */}
          {step === "payment" && (
            <>
              {/* Final Amount Summary */}
              {appliedCoupon && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-200 dark:border-green-800">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Original Price</span>
                    <span>₹{packagePrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-red-500 font-medium mb-1">
                    <span>Discount Applied: -{appliedCoupon.code}</span>
                    <span>-₹{appliedCoupon.discount}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-green-600 dark:text-green-400 pt-1 border-t border-green-200 dark:border-green-700">
                    <span>Final Price</span>
                    <span>₹{finalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              )}

              {/* ─ LOCAL / NATIONAL PAYMENT ─ */}
              <div className="rounded-2xl overflow-hidden border border-orange-200 dark:border-orange-800">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5">
                  <span className="text-white font-bold text-sm">
                    📱 Local / National Payment
                  </span>
                  <span className="text-orange-100 text-xs ml-2">
                    (PhonePe · Google Pay · UPI)
                  </span>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 flex flex-col items-center gap-3">
                  <a href={upiDeepLink} className="block">
                    <div className="bg-white rounded-xl p-3 shadow border border-orange-200 hover:shadow-md transition-all hover:scale-105 cursor-pointer">
                      <img
                        src="/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png"
                        alt="UPI QR Code"
                        className="w-44 h-44 object-contain rounded"
                      />
                    </div>
                  </a>
                  <p className="text-xs text-gray-500 text-center">
                    Scan with PhonePe, Google Pay, Paytm or any UPI app
                  </p>
                  <a
                    href={upiDeepLink}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    Pay via PhonePe / UPI
                  </a>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-slate-600" />

              {/* ─ INTERNATIONAL PAYMENT ─ */}
              <div className="rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-800">
                <div className="bg-gradient-to-r from-[#003087] to-[#009cde] px-4 py-2.5">
                  <span className="text-white font-bold text-sm">
                    🌍 International Payment
                  </span>
                  <span className="text-blue-100 text-xs ml-2">(PayPal)</span>
                </div>
                <div className="bg-[#003087]/5 dark:bg-[#003087]/20 p-4 flex flex-col items-center gap-3">
                  <a
                    href={paypalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-white rounded-xl p-3 shadow border border-[#009cde]/30 hover:shadow-md transition-all hover:scale-105 cursor-pointer">
                      <img
                        src="/assets/uploads/pp_p2p_my_qrcode_1773022721070-1.jpg"
                        alt="PayPal QR Code"
                        className="w-44 h-44 object-contain"
                      />
                    </div>
                  </a>
                  <p className="text-xs text-gray-500 text-center">
                    Scan or tap to pay via PayPal
                  </p>
                  <a
                    href={paypalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#003087] hover:bg-[#002060] text-white font-bold py-2.5 px-6 rounded-xl text-center text-sm transition-colors"
                  >
                    Pay with PayPal
                  </a>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-slate-600" />

              {/* ─ BANK TRANSFER ─ */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2.5">
                  <span className="text-white font-bold text-sm">
                    🏦 Bank Transfer / NEFT / IMPS
                  </span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-500">
                      <Building2 className="w-3 h-3" /> Bank
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      India Post Payment Bank
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <CreditCard className="w-3 h-3" /> Account
                    </div>
                    <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                      ****5673
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Hash className="w-3 h-3" /> IFSC
                    </div>
                    <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                      IPOS0000001
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <User className="w-3 h-3" /> Holder
                    </div>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">
                      Rudra Pratap Singh
                    </span>
                  </div>
                  <a
                    href={upiDeepLink}
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-2.5 px-6 rounded-xl text-center text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Building2 className="w-4 h-4" /> Open Banking App
                  </a>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-slate-600" />

              {/* Transaction ID */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                    4
                  </span>
                  Enter Transaction ID
                </h4>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter your UPI/bank transaction ID"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-slate-100 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                    5
                  </span>
                  Upload Payment Screenshot
                </h4>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 transition-colors">
                  {screenshotFile ? (
                    <p className="text-sm text-blue-600 font-medium">
                      ✓ {screenshotFile.name}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-blue-600">
                        Click to upload
                      </span>{" "}
                      screenshot
                    </p>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      setScreenshotFile(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              {/* Send to WhatsApp */}
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md"
              >
                <MessageCircle className="h-5 w-5" />
                Send Screenshot to WhatsApp
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
