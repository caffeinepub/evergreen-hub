import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Tag, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useGetPersistentSiteContent } from "../hooks/useQueries";

// Hardcoded UPI ID — never rendered as visible text
const HARDCODED_UPI_ID = "7970705775@ybl";

const COUPONS: Record<string, { type: "percent" | "flat"; value: number }> = {
  EVERGREEN10: { type: "percent", value: 10 },
  HUB25: { type: "percent", value: 25 },
  WELCOME50: { type: "flat", value: 100 },
};

interface PaymentGatewayProps {
  packageName?: string;
  amount?: number;
  onDiscountedAmount?: (amount: number) => void;
}

export default function PaymentGateway({
  packageName,
  amount,
  onDiscountedAmount,
}: PaymentGatewayProps) {
  const { data: siteContent, isLoading } = useGetPersistentSiteContent();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    setCouponError("");
    if (!code) return;
    const coupon = COUPONS[code];
    if (!coupon) {
      setCouponError("Invalid coupon code. Please try again.");
      setAppliedCoupon(null);
      return;
    }
    if (appliedCoupon?.code === code) {
      setCouponError("Coupon already applied.");
      return;
    }
    const baseAmount = amount || 0;
    const discount =
      coupon.type === "percent"
        ? Math.round((baseAmount * coupon.value) / 100)
        : coupon.value;
    setAppliedCoupon({ code, discount });
    setCouponError("");
    if (onDiscountedAmount)
      onDiscountedAmount(Math.max(0, baseAmount - discount));
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
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

  return (
    <div className="space-y-6">
      {packageName && amount && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
            Paying for: <span className="font-bold">{packageName}</span>
          </p>
          <div className="mt-1">
            {appliedCoupon ? (
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm line-through text-gray-400">
                  ₹{amount.toLocaleString("en-IN")}
                </span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ₹{finalAmount?.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  You save ₹{appliedCoupon.discount}
                </span>
              </div>
            ) : (
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                ₹{amount.toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Coupon Code Section */}
      {amount && (
        <div className="bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">
              Have a coupon code?
            </span>
          </div>
          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-green-100 dark:bg-green-900/20 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    {appliedCoupon.code} applied!
                  </p>
                  <p className="text-xs text-green-600">
                    You save ₹{appliedCoupon.discount}
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
      )}

      {/* UPI QR Code */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Scan QR Code to Pay via PhonePe / UPI
        </p>
        <a href={upiDeepLink} className="block">
          <div className="bg-white rounded-2xl p-3 shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow">
            <img
              src={qrUrl}
              alt="Payment QR Code"
              className="w-48 h-48 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png";
              }}
            />
          </div>
        </a>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tap QR to open in UPI app, or scan with PhonePe / Google Pay / Paytm
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs text-gray-400 font-medium">OR PAYPAL</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* PayPal QR Section */}
      <div className="flex flex-col items-center gap-3 bg-[#003087]/5 dark:bg-[#003087]/20 rounded-2xl p-5 border border-[#009cde]/30">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#003087] dark:text-[#009cde]">
            Pay
          </span>
          <span className="text-lg font-bold text-[#009cde]">Pal</span>
        </div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Scan or Click to Pay via PayPal
        </p>
        <a
          href={paypalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-white rounded-2xl p-3 shadow-md border border-[#009cde]/30 cursor-pointer hover:shadow-lg transition-all hover:scale-105">
            <img
              src="/assets/uploads/pp_p2p_my_qrcode_1773022721070-1.jpg"
              alt="PayPal QR Code - Rudra Singh"
              className="w-48 h-48 object-contain"
            />
          </div>
        </a>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Tap QR to open PayPal
        </p>
        <a
          href={paypalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs bg-[#003087] hover:bg-[#002060] text-white font-semibold py-3 px-6 rounded-full text-center transition-colors shadow-md"
          data-ocid="payment.paypal_button"
        >
          Pay with PayPal
        </a>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        <span className="text-xs text-gray-400 font-medium">
          OR BANK TRANSFER
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Bank Details */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2 border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">
          Bank Account Details
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Account Holder
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {accountHolder}
          </span>

          <span className="text-gray-500 dark:text-gray-400">
            Account Number
          </span>
          <span className="font-mono font-medium text-gray-800 dark:text-gray-200">
            {maskedAccount}
          </span>

          <span className="text-gray-500 dark:text-gray-400">Bank</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {branch}
          </span>

          <span className="text-gray-500 dark:text-gray-400">IFSC Code</span>
          <span className="font-mono font-medium text-gray-800 dark:text-gray-200">
            {ifsc}
          </span>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        After payment, upload your screenshot below to confirm your purchase.
      </p>
    </div>
  );
}
