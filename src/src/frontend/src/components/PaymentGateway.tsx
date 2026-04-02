import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  CreditCard,
  Hash,
  ShoppingCart,
  Tag,
  User,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { useGetPersistentSiteContent } from "../hooks/useQueries";

const HARDCODED_UPI_ID = "7970705775@ybl";

const COUPONS: Record<
  string,
  { type: "percent" | "flat"; value: number; label: string }
> = {
  WELCOME50: { type: "flat", value: 100, label: "₹100 OFF" },
  EVERGREEN: { type: "flat", value: 50, label: "₹50 OFF" },
  HUB150: { type: "flat", value: 150, label: "₹150 OFF" },
};

interface PaymentGatewayProps {
  packageName?: string;
  amount?: number;
  onDiscountedAmount?: (amount: number) => void;
}

type Step = "cart" | "payment";

export default function PaymentGateway({
  packageName,
  amount,
  onDiscountedAmount,
}: PaymentGatewayProps) {
  const { data: siteContent, isLoading } = useGetPersistentSiteContent();
  const [step, setStep] = useState<Step>("cart");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

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
    const baseAmount = amount || 0;
    const discount =
      coupon.type === "percent"
        ? Math.round((baseAmount * coupon.value) / 100)
        : coupon.value;
    const finalAmt = Math.max(0, baseAmount - discount);
    setAppliedCoupon({ code, discount });
    setCouponSuccess("Coupon applied successfully 🎉");
    setCouponError("");
    if (onDiscountedAmount) onDiscountedAmount(finalAmt);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    setCouponSuccess("");
    if (onDiscountedAmount && amount) onDiscountedAmount(amount);
  };

  const finalAmount = amount
    ? appliedCoupon
      ? Math.max(0, amount - appliedCoupon.discount)
      : amount
    : undefined;

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-48 w-48 mx-auto rounded-xl" />
        <Skeleton className="h-6 w-40 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  const phonePe = siteContent?.phonePeDetails;
  const bank = siteContent?.bankDetails;

  const qrUrl = phonePe?.qrCodeBlob
    ? phonePe.qrCodeBlob.getDirectURL()
    : "/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png";

  const accountNumber = bank?.accountNumber || "****5673";
  const accountHolder = bank?.accountHolderName || "Rudra Pratap Singh";
  const ifsc = bank?.ifsc || "IPOS0000001";
  const branch = bank?.branch || "India Post Payment Bank";
  const maskedAccount =
    accountNumber.length > 4 ? `****${accountNumber.slice(-4)}` : accountNumber;

  const upiDeepLink = `upi://pay?pa=${HARDCODED_UPI_ID}&pn=EvergreenHub&am=${finalAmount || ""}&cu=INR`;
  const paypalLink = "https://www.paypal.me/RudraSingh383";

  // ─── STEP 1: CART + COUPON ────────────────────────────────────────────────
  if (step === "cart") {
    return (
      <div className="space-y-5">
        {/* Cart Summary */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-700 dark:text-emerald-300 text-base">
              Your Cart
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Package
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {packageName || "Selected Package"}
              </p>
            </div>
            <div className="text-right">
              {appliedCoupon ? (
                <>
                  <p className="text-sm line-through text-gray-400">
                    ₹{amount?.toLocaleString("en-IN")}
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ₹{finalAmount?.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-green-600 font-semibold">
                    Discount Applied: -₹{appliedCoupon.discount}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {amount ? `₹${amount.toLocaleString("en-IN")}` : ""}
                </p>
              )}
            </div>
          </div>

          {/* Price breakdown when coupon applied */}
          {appliedCoupon && (
            <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700 space-y-1">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Original Price</span>
                <span>₹{amount?.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-red-500 font-medium">
                <span>Discount Applied: -{appliedCoupon.code}</span>
                <span>-₹{appliedCoupon.discount}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-green-600 dark:text-green-400 pt-1 border-t border-emerald-200 dark:border-emerald-700">
                <span>Final Price</span>
                <span>₹{finalAmount?.toLocaleString("en-IN")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Coupon Section */}
        <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl p-4 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
              Have a coupon code? (Optional)
            </span>
          </div>

          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-green-100 dark:bg-green-900/20 rounded-xl px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    {appliedCoupon.code} applied!
                  </p>
                  <p className="text-xs text-green-600">
                    Discount: -₹{appliedCoupon.discount} off
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-xs text-red-500 hover:text-red-700 underline"
                data-ocid="coupon.delete_button"
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
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                className="flex-1 uppercase text-sm"
                data-ocid="coupon.input"
              />
              <Button
                onClick={handleApplyCoupon}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4"
                data-ocid="coupon.submit_button"
              >
                Apply
              </Button>
            </div>
          )}

          {couponSuccess && (
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <p className="text-xs text-green-600 font-semibold">
                {couponSuccess}
              </p>
            </div>
          )}

          {couponError && (
            <div
              className="flex items-center gap-1 mt-2"
              data-ocid="coupon.error_state"
            >
              <XCircle className="w-4 h-4 text-red-500" />
              <p className="text-xs text-red-500">{couponError}</p>
            </div>
          )}
        </div>

        {/* Proceed to Payment */}
        <Button
          onClick={() => setStep("payment")}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 text-base rounded-xl flex items-center justify-center gap-2"
          data-ocid="cart.primary_button"
        >
          Proceed to Payment
          <ArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-center text-xs text-gray-400">
          Coupon code is optional — you can skip and pay directly.
        </p>
      </div>
    );
  }

  // ─── STEP 2: PAYMENT OPTIONS ──────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Amount Summary */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Paying for
            </p>
            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
              {packageName || "Selected Package"}
            </p>
          </div>
          <div className="text-right">
            {appliedCoupon && (
              <p className="text-xs line-through text-gray-400">
                ₹{amount?.toLocaleString("en-IN")}
              </p>
            )}
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {finalAmount ? `₹${finalAmount.toLocaleString("en-IN")}` : ""}
            </p>
          </div>
        </div>
        {appliedCoupon && (
          <div className="pt-2 border-t border-emerald-200 dark:border-emerald-700 space-y-0.5">
            <div className="flex justify-between text-xs text-red-500 font-medium">
              <span>Discount Applied: -{appliedCoupon.code}</span>
              <span>-₹{appliedCoupon.discount}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-green-600 dark:text-green-400">
              <span>Final Price</span>
              <span>₹{finalAmount?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── LOCAL / NATIONAL PAYMENT (UPI / PhonePe) ── */}
      <div className="rounded-2xl overflow-hidden border border-orange-200 dark:border-orange-800">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 flex items-center gap-2">
          <span className="text-white font-bold text-sm">
            📱 Local / National Payment
          </span>
          <span className="text-orange-100 text-xs">
            (PhonePe · Google Pay · Paytm · UPI)
          </span>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/10 p-4 flex flex-col items-center gap-3">
          <a href={upiDeepLink} className="block">
            <div className="bg-white rounded-2xl p-3 shadow-md border border-orange-200 cursor-pointer hover:shadow-lg transition-all hover:scale-105">
              <img
                src={qrUrl}
                alt="PhonePe / UPI QR Code"
                className="w-48 h-48 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png";
                }}
              />
            </div>
          </a>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Scan QR with PhonePe, Google Pay, Paytm or any UPI app
          </p>
          <a
            href={upiDeepLink}
            className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl text-center text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            data-ocid="payment.upi_button"
          >
            <span>Pay via PhonePe / UPI</span>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs text-gray-400 font-medium uppercase">OR</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* ── INTERNATIONAL PAYMENT (PayPal) ── */}
      <div className="rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-800">
        <div className="bg-gradient-to-r from-[#003087] to-[#009cde] px-4 py-2.5 flex items-center gap-2">
          <span className="text-white font-bold text-sm">
            🌍 International Payment
          </span>
          <span className="text-blue-100 text-xs">
            (PayPal · Outside India)
          </span>
        </div>
        <div className="bg-[#003087]/5 dark:bg-[#003087]/20 p-4 flex flex-col items-center gap-3">
          <a
            href={paypalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="bg-white rounded-2xl p-3 shadow-md border border-[#009cde]/30 cursor-pointer hover:shadow-lg transition-all hover:scale-105">
              <img
                src="/assets/uploads/pp_p2p_my_qrcode_1773022721070-1.jpg"
                alt="PayPal QR Code"
                className="w-48 h-48 object-contain"
              />
            </div>
          </a>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Scan or tap to pay via PayPal
          </p>
          <a
            href={paypalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs bg-[#003087] hover:bg-[#002060] text-white font-bold py-3 px-6 rounded-xl text-center text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            data-ocid="payment.paypal_button"
          >
            Pay with PayPal
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs text-gray-400 font-medium uppercase">OR</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* ── BANK TRANSFER ── */}
      <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2.5 flex items-center gap-2">
          <span className="text-white font-bold text-sm">
            🏦 Bank Transfer / NEFT / IMPS
          </span>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <User className="w-3.5 h-3.5" />
              <span>Account Holder</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {accountHolder}
            </span>

            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <CreditCard className="w-3.5 h-3.5" />
              <span>Account No.</span>
            </div>
            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
              {maskedAccount}
            </span>

            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>Bank</span>
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {branch}
            </span>

            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <Hash className="w-3.5 h-3.5" />
              <span>IFSC Code</span>
            </div>
            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
              {ifsc}
            </span>
          </div>

          <a
            href={upiDeepLink}
            className="w-full mt-2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-center text-sm transition-colors shadow-md flex items-center justify-center gap-2"
            data-ocid="payment.bank_button"
          >
            <Building2 className="w-4 h-4" />
            Pay via Bank App / Net Banking
          </a>
          <p className="text-xs text-center text-gray-400">
            Click to open your banking app directly
          </p>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        After payment, upload your screenshot below to confirm your purchase.
      </p>
    </div>
  );
}
