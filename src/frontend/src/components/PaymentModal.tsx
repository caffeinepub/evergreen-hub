import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import PaymentGateway from './PaymentGateway';
import PaymentProofForm from './PaymentProofForm';
import { useActor } from '../hooks/useActor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ExternalBlob } from '../backend';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: bigint;
  packageName: string;
  packagePrice: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  packageId,
  packageName,
  packagePrice,
}: PaymentModalProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const submitProofMutation = useMutation({
    mutationFn: async ({ transactionId, screenshot }: { transactionId: string; screenshot: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitPaymentProof(packageId, transactionId, screenshot);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPaymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['myPayments'] });
      toast.success('Payment proof submitted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit payment proof');
      throw error;
    },
  });

  const handleSubmit = async (transactionId: string, screenshot: ExternalBlob) => {
    await submitProofMutation.mutateAsync({ transactionId, screenshot });
  };

  const handleSuccess = () => {
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You're purchasing: <span className="font-semibold text-foreground">{packageName}</span> for{' '}
            <span className="font-semibold text-emerald-500">{packagePrice}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <Alert className="border-emerald-500/30 bg-emerald-950/10">
            <AlertCircle className="h-4 w-4 text-emerald-500" />
            <AlertDescription>
              Please complete the bank transfer and submit your payment proof below. Your access will be granted within 24 hours after verification.
            </AlertDescription>
          </Alert>

          <PaymentGateway />

          <Separator />

          <PaymentProofForm
            packageId={packageId}
            onSuccess={handleSuccess}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
