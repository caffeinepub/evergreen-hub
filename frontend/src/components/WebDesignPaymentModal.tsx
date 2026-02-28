import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Building2, CreditCard, User, Hash, MessageCircle, X, CheckCircle } from 'lucide-react';

// Hardcoded UPI ID — never rendered as visible text
const HARDCODED_UPI_ID = '7970705775@ybl';

interface WebDesignPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  packagePrice: number;
}

export default function WebDesignPaymentModal({
  isOpen,
  onClose,
  packageName,
  packagePrice,
}: WebDesignPaymentModalProps) {
  const [transactionId, setTransactionId] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // UPI deep link — ID embedded in link, never shown as text
  const upiDeepLink = `upi://pay?pa=${HARDCODED_UPI_ID}&pn=EvergreenHub&am=${packagePrice}&cu=INR`;

  const handleSendToWhatsApp = () => {
    const msg = encodeURIComponent(
      `🎉 Payment Proof for Web Design Package\n\n` +
        `📦 Package: ${packageName}\n` +
        `💰 Amount: ₹${packagePrice.toLocaleString('en-IN')}\n` +
        `🔖 Transaction ID: ${transactionId || 'Not provided'}\n` +
        `📸 Screenshot: ${screenshotFile ? screenshotFile.name : 'Not attached'}\n\n` +
        `Please verify my payment and proceed with the website development. Thank you!`
    );
    window.open(`https://wa.me/919263989760?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  const handleClose = () => {
    setTransactionId('');
    setScreenshotFile(null);
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 transition-colors duration-300 p-0">
        {/* Custom Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-xl">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-white text-xl font-bold mb-1">
                Complete Payment
              </DialogTitle>
              <DialogDescription className="text-blue-100 text-sm">
                {packageName}
              </DialogDescription>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-bold">
                ₹{packagePrice.toLocaleString('en-IN')}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {submitted ? (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-2">
                WhatsApp Opened!
              </h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-6">
                Your payment details have been sent to WhatsApp. Please also send the screenshot in the WhatsApp chat for faster verification.
              </p>
              <button
                onClick={handleClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* QR Code Section */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  Scan QR Code to Pay
                </h4>
                <a href={upiDeepLink} className="block">
                  <div className="flex justify-center bg-gray-50 dark:bg-slate-700 rounded-xl p-4 border border-gray-200 dark:border-slate-600 cursor-pointer hover:shadow-md transition-shadow">
                    <img
                      src="/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png"
                      alt="Payment QR Code"
                      className="max-w-[220px] w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </a>
                <p className="text-center text-xs text-gray-500 dark:text-slate-400 mt-2">
                  Tap to open in UPI app, or scan with PhonePe, Google Pay, Paytm
                </p>
              </div>

              <Separator className="bg-gray-200 dark:bg-slate-600" />

              {/* Bank Details */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  Bank Transfer Details
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3 border border-gray-200 dark:border-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-slate-400">Bank Name</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 leading-tight">
                      India Post Payment Bank
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3 border border-gray-200 dark:border-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-slate-400">Account No.</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 font-mono">
                      ****5673
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3 border border-gray-200 dark:border-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                      <Hash className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-slate-400">IFSC Code</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 font-mono">
                      IPOS0000001
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-3 border border-gray-200 dark:border-slate-600">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-slate-400">Account Holder</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 leading-tight">
                      Rudra Pratap Singh
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-200 dark:bg-slate-600" />

              {/* Transaction ID Input */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  Enter Transaction ID
                </h4>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter your UPI/bank transaction ID"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Screenshot Upload */}
              <div>
                <h4 className="text-sm font-bold text-gray-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  Upload Payment Screenshot
                </h4>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {screenshotFile ? (
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        ✓ {screenshotFile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> screenshot
                        </p>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setScreenshotFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              {/* Send to WhatsApp Button */}
              <button
                onClick={handleSendToWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-md hover:shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Send Screenshot to WhatsApp
              </button>

              <p className="text-center text-xs text-gray-400 dark:text-slate-500">
                After clicking, WhatsApp will open with your payment details pre-filled
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
