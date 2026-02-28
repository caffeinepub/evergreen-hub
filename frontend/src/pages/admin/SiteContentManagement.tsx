import React, { useState, useEffect } from 'react';
import { useGetPersistentSiteContent, useSetPersistentSiteContent } from '../../hooks/useQueries';
import { ExternalBlob, SiteContent } from '../../backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Save, Phone, CreditCard, Building2, Upload, CheckCircle, Loader2 } from 'lucide-react';

export default function SiteContentManagement() {
  const { data: siteContent, isLoading } = useGetPersistentSiteContent();
  const setSiteContent = useSetPersistentSiteContent();

  const [whatsapp, setWhatsapp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [phonePeQrFile, setPhonePeQrFile] = useState<File | null>(null);
  const [phonePeQrPreview, setPhonePeQrPreview] = useState<string>('');

  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [branch, setBranch] = useState('');
  const [upiHandle, setUpiHandle] = useState('');
  const [bankQrFile, setBankQrFile] = useState<File | null>(null);
  const [bankQrPreview, setBankQrPreview] = useState<string>('');

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (siteContent) {
      setWhatsapp(siteContent.whatsappPhoneNumber || '');
      setUpiId(siteContent.phonePeDetails?.upiId || '');
      setAccountNumber(siteContent.bankDetails?.accountNumber || '');
      setAccountHolderName(siteContent.bankDetails?.accountHolderName || '');
      setIfsc(siteContent.bankDetails?.ifsc || '');
      setBranch(siteContent.bankDetails?.branch || '');
      setUpiHandle(siteContent.bankDetails?.upiHandle || '');

      if (siteContent.phonePeDetails?.qrCodeBlob) {
        setPhonePeQrPreview(siteContent.phonePeDetails.qrCodeBlob.getDirectURL());
      }
      if (siteContent.bankDetails?.qrCodeBlob) {
        setBankQrPreview(siteContent.bankDetails.qrCodeBlob.getDirectURL());
      }
    }
  }, [siteContent]);

  const handlePhonePeQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhonePeQrFile(file);
      setPhonePeQrPreview(URL.createObjectURL(file));
    }
  };

  const handleBankQrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBankQrFile(file);
      setBankQrPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    let phonePeQrBlob: ExternalBlob;
    let bankQrBlob: ExternalBlob;

    if (phonePeQrFile) {
      const bytes = new Uint8Array(await phonePeQrFile.arrayBuffer());
      phonePeQrBlob = ExternalBlob.fromBytes(bytes);
    } else if (siteContent?.phonePeDetails?.qrCodeBlob) {
      phonePeQrBlob = siteContent.phonePeDetails.qrCodeBlob;
    } else {
      phonePeQrBlob = ExternalBlob.fromBytes(new Uint8Array(0));
    }

    if (bankQrFile) {
      const bytes = new Uint8Array(await bankQrFile.arrayBuffer());
      bankQrBlob = ExternalBlob.fromBytes(bytes);
    } else if (siteContent?.bankDetails?.qrCodeBlob) {
      bankQrBlob = siteContent.bankDetails.qrCodeBlob;
    } else {
      bankQrBlob = ExternalBlob.fromBytes(new Uint8Array(0));
    }

    const content: SiteContent = {
      whatsappPhoneNumber: whatsapp,
      phonePeDetails: {
        upiId,
        qrCodeBlob: phonePeQrBlob,
      },
      bankDetails: {
        accountNumber,
        accountHolderName,
        ifsc,
        branch,
        upiHandle,
        qrCodeBlob: bankQrBlob,
      },
    };

    await setSiteContent.mutateAsync(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Content Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Update WhatsApp number, payment details, and bank account info
        </p>
      </div>

      {/* WhatsApp */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Phone className="h-5 w-5 text-green-500" />
            WhatsApp Contact
          </CardTitle>
          <CardDescription>Phone number used for WhatsApp button and contact forms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Phone Number</Label>
            <Input
              id="whatsapp"
              placeholder="e.g. 919263989760"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <p className="text-xs text-gray-400">Include country code without + (e.g. 919263989760 for India)</p>
          </div>
        </CardContent>
      </Card>

      {/* PhonePe / UPI */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CreditCard className="h-5 w-5 text-purple-500" />
            PhonePe / UPI Details
          </CardTitle>
          <CardDescription>Shown in the payment gateway for UPI transfers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID</Label>
            <Input
              id="upiId"
              placeholder="e.g. yourname@ybl"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>PhonePe QR Code Image</Label>
            <div className="flex items-start gap-4">
              {phonePeQrPreview && (
                <img
                  src={phonePeQrPreview}
                  alt="PhonePe QR"
                  className="w-24 h-24 object-contain border rounded-lg bg-white"
                />
              )}
              <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
                <Upload className="h-5 w-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-400">Upload QR</span>
                <input type="file" accept="image/*" className="hidden" onChange={handlePhonePeQrChange} />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card className="border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5 text-blue-500" />
            Bank Account Details
          </CardTitle>
          <CardDescription>Shown for manual bank transfer payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountHolderName">Account Holder Name</Label>
              <Input
                id="accountHolderName"
                placeholder="e.g. Rudra Pratap Singh"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                placeholder="e.g. 1234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifsc">IFSC Code</Label>
              <Input
                id="ifsc"
                placeholder="e.g. IPOS0000001"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                placeholder="e.g. India Post Payment Bank"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upiHandle">UPI Handle</Label>
              <Input
                id="upiHandle"
                placeholder="e.g. yourname@postpay"
                value={upiHandle}
                onChange={(e) => setUpiHandle(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Bank QR Code Image</Label>
            <div className="flex items-start gap-4">
              {bankQrPreview && (
                <img
                  src={bankQrPreview}
                  alt="Bank QR"
                  className="w-24 h-24 object-contain border rounded-lg bg-white"
                />
              )}
              <label className="flex flex-col items-center justify-center w-32 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
                <Upload className="h-5 w-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-400">Upload QR</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleBankQrChange} />
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={setSiteContent.isPending}
          className="min-w-32"
        >
          {setSiteContent.isPending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
