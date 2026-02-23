import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building2, CreditCard, User, Hash } from 'lucide-react';

export default function PaymentGateway() {
  return (
    <Card className="border-emerald-500/30">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Building2 className="h-6 w-6 text-emerald-500" />
          Payment Method
        </CardTitle>
        <CardDescription>
          Scan the QR code below to make payment via PhonePe
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code Section */}
        <div className="flex justify-center items-center p-6 bg-emerald-950/20 rounded-lg border border-emerald-500/20">
          <div className="max-w-sm w-full">
            <img
              src="/assets/AccountQRCodeIndia Post Payment Bank - 5673_DARK_THEME.png"
              alt="PhonePe Payment QR Code"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>

        <Separator />

        {/* Bank Details Section with Masked Account Number */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-muted-foreground">Bank Details (for manual transfer):</h4>
          
          <div className="flex items-start gap-3 p-4 bg-emerald-950/20 rounded-lg border border-emerald-500/20">
            <Building2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
              <p className="text-lg font-semibold">India Post Payment Bank</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-emerald-950/20 rounded-lg border border-emerald-500/20">
            <CreditCard className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Account Number</p>
              <p className="text-lg font-semibold font-mono">****5673</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-emerald-950/20 rounded-lg border border-emerald-500/20">
            <Hash className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">IFSC Code</p>
              <p className="text-lg font-semibold font-mono">IPOS0000001</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-emerald-950/20 rounded-lg border border-emerald-500/20">
            <User className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Account Holder Name</p>
              <p className="text-lg font-semibold">Rudra Pratap Singh</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h4 className="font-semibold text-sm">Payment Instructions:</h4>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Scan the QR code above using PhonePe app to make payment</li>
            <li>Or transfer the exact package amount to the bank account manually</li>
            <li>Save the transaction ID and take a screenshot of the payment confirmation</li>
            <li>Submit the transaction ID and screenshot using the form below</li>
            <li>Your payment will be verified within 24 hours</li>
            <li>You'll receive access to your courses once payment is approved</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
