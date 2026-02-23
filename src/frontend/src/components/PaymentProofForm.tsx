import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ExternalBlob } from '../backend';

interface PaymentProofFormProps {
  packageId: bigint;
  onSuccess: () => void;
  onSubmit: (transactionId: string, screenshot: ExternalBlob) => Promise<void>;
}

interface FormData {
  transactionId: string;
  screenshot: FileList;
}

export default function PaymentProofForm({ packageId, onSuccess, onSubmit }: PaymentProofFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const selectedFile = watch('screenshot');

  const onFormSubmit = async (data: FormData) => {
    setError(null);
    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const file = data.screenshot[0];
      if (!file) {
        throw new Error('Please select a screenshot');
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please upload an image file');
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }

      // Convert file to bytes
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);

      // Create ExternalBlob with progress tracking
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      // Submit payment proof
      await onSubmit(data.transactionId, blob);

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit payment proof');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppSubmit = () => {
    window.open(
      'https://wa.me/919263989760?text=Hi%2C%20I%20need%20help%20with%20payment%20proof%20submission',
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (success) {
    return (
      <Card className="border-green-500/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Payment Proof Submitted!</h3>
              <p className="text-muted-foreground">
                Your payment proof has been submitted successfully. We'll verify it within 24 hours.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Payment Proof</CardTitle>
        <CardDescription>
          Upload your transaction details and payment screenshot
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="transactionId">
              Transaction ID <span className="text-destructive">*</span>
            </Label>
            <Input
              id="transactionId"
              placeholder="Enter your transaction ID"
              {...register('transactionId', {
                required: 'Transaction ID is required',
                minLength: {
                  value: 5,
                  message: 'Transaction ID must be at least 5 characters',
                },
              })}
              disabled={isSubmitting}
            />
            {errors.transactionId && (
              <p className="text-sm text-destructive">{errors.transactionId.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenshot">
              Payment Screenshot <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-4">
              <Input
                id="screenshot"
                type="file"
                accept="image/*"
                {...register('screenshot', {
                  required: 'Payment screenshot is required',
                })}
                disabled={isSubmitting}
                className="cursor-pointer"
              />
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            {selectedFile && selectedFile.length > 0 && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile[0].name} ({(selectedFile[0].size / 1024).toFixed(2)} KB)
              </p>
            )}
            {errors.screenshot && (
              <p className="text-sm text-destructive">{errors.screenshot.message}</p>
            )}
          </div>

          {isSubmitting && uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Uploading...</span>
                <span className="font-semibold">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Payment Proof'}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Prefer to send your screenshot directly?
            </p>
            <Button
              type="button"
              onClick={handleWhatsAppSubmit}
              className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Send Screenshot via WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
