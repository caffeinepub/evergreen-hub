import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { ExternalBlob } from '../backend';

interface PaymentProofFormProps {
  packageId: bigint;
  onSuccess: () => void;
  onSubmit: (transactionId: string, screenshot: ExternalBlob) => Promise<void>;
}

export default function PaymentProofForm({ packageId, onSuccess, onSubmit }: PaymentProofFormProps) {
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const phoneNumber = '9263989760';
  const maskedNumber = '********60';
  const message = encodeURIComponent(`Hello! I need help with payment proof submission for package ID: ${packageId}`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      setScreenshot(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      setError('Please enter transaction ID');
      return;
    }

    if (!screenshot) {
      setError('Please upload payment screenshot');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress(0);

    try {
      const arrayBuffer = await screenshot.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      await onSubmit(transactionId, blob);
      
      setSuccess(true);
      setTransactionId('');
      setScreenshot(null);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to submit payment proof');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  if (success) {
    return (
      <Alert className="border-green-500/30 bg-green-950/10">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <AlertDescription className="text-green-400">
          Payment proof submitted successfully! We'll verify it within 24 hours.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="transactionId">Transaction ID *</Label>
        <Input
          id="transactionId"
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter your transaction ID"
          required
          disabled={uploading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="screenshot">Payment Screenshot *</Label>
        <div className="flex items-center gap-2">
          <Input
            id="screenshot"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            disabled={uploading}
            className="cursor-pointer"
          />
          {screenshot && (
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Upload a clear screenshot of your payment (Max 5MB)
        </p>
      </div>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          disabled={uploading}
          className="flex-1"
        >
          {uploading ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Submitting... {uploadProgress}%
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Submit Payment Proof
            </>
          )}
        </Button>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            WhatsApp Support: {maskedNumber}
          </Button>
        </a>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Having trouble? Contact us on WhatsApp for assistance
      </p>
    </form>
  );
}
