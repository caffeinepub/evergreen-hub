import React from 'react';
import { useGetPersistentSiteContent } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

// Hardcoded UPI ID — never rendered as visible text
const HARDCODED_UPI_ID = '7970705775@ybl';

interface PaymentGatewayProps {
  packageName?: string;
  amount?: number;
}

export default function PaymentGateway({ packageName, amount }: PaymentGatewayProps) {
  const { data: siteContent, isLoading } = useGetPersistentSiteContent();

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

  // Use QR from site content if available, else fallback to static asset
  const qrUrl = phonePe?.qrCodeBlob
    ? phonePe.qrCodeBlob.getDirectURL()
    : '/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png';

  const accountNumber = bank?.accountNumber || '****5673';
  const accountHolder = bank?.accountHolderName || 'Rudra Pratap Singh';
  const ifsc = bank?.ifsc || 'IPOS0000001';
  const branch = bank?.branch || 'India Post Payment Bank';

  const maskedAccount = accountNumber.length > 4
    ? '****' + accountNumber.slice(-4)
    : accountNumber;

  // UPI deep link — UPI ID embedded in link, never shown as text
  const upiDeepLink = `upi://pay?pa=${HARDCODED_UPI_ID}&pn=EvergreenHub&am=${amount || ''}&cu=INR`;

  return (
    <div className="space-y-6">
      {packageName && amount && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
            Paying for: <span className="font-bold">{packageName}</span>
          </p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            ₹{amount.toLocaleString('en-IN')}
          </p>
        </div>
      )}

      {/* QR Code */}
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
                (e.target as HTMLImageElement).src = '/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png';
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
        <span className="text-xs text-gray-400 font-medium">OR BANK TRANSFER</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Bank Details */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2 border border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-3">Bank Account Details</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400">Account Holder</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{accountHolder}</span>

          <span className="text-gray-500 dark:text-gray-400">Account Number</span>
          <span className="font-mono font-medium text-gray-800 dark:text-gray-200">{maskedAccount}</span>

          <span className="text-gray-500 dark:text-gray-400">Bank</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{branch}</span>

          <span className="text-gray-500 dark:text-gray-400">IFSC Code</span>
          <span className="font-mono font-medium text-gray-800 dark:text-gray-200">{ifsc}</span>
        </div>
      </div>

      <p className="text-xs text-center text-gray-400">
        After payment, upload your screenshot below to confirm your purchase.
      </p>
    </div>
  );
}
