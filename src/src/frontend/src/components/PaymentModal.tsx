import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ExternalBlob } from "../backend";
import { useAuth } from "../contexts/AuthContext";
import { useActor } from "../hooks/useActor";
import CongratulationsModal from "./CongratulationsModal";
import PaymentGateway from "./PaymentGateway";
import PaymentProofForm from "./PaymentProofForm";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageId: bigint;
  packageName: string;
  packagePrice: string;
  isVideoEditing?: boolean;
}

export default function PaymentModal({
  isOpen,
  onClose,
  packageId,
  packageName,
  packagePrice,
  isVideoEditing: _isVideoEditing = false,
}: PaymentModalProps) {
  const { actor } = useActor();
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const [showCongrats, setShowCongrats] = useState(false);
  const [_discountedAmount, setDiscountedAmount] = useState<
    number | undefined
  >();

  // Parse numeric amount from price string like "₹1,499" or "1499"
  const numericAmount =
    Number.parseInt(packagePrice.replace(/[^0-9]/g, ""), 10) || undefined;

  const submitProofMutation = useMutation({
    mutationFn: async ({
      transactionId,
      screenshot,
    }: { transactionId: string; screenshot: ExternalBlob }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitPaymentProof(packageId, transactionId, screenshot);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPaymentProofs"] });
      queryClient.invalidateQueries({ queryKey: ["myPayments"] });
      toast.success("Payment proof submitted successfully!");
      setShowCongrats(true);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit payment proof");
      throw error;
    },
  });

  const handleSubmit = async (
    transactionId: string,
    screenshot: ExternalBlob,
  ) => {
    await submitProofMutation.mutateAsync({ transactionId, screenshot });
  };

  const handleSuccess = () => {};

  const handleCongratsClose = () => {
    setShowCongrats(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showCongrats} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900 dark:text-gray-100">
              Complete Your Purchase
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300">
              You're purchasing:{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {packageName}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-2">
            <Alert className="border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20">
              <AlertCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
              <AlertDescription className="text-gray-900 dark:text-gray-100 text-sm">
                Add to cart, apply coupon (optional), then choose your payment
                method.
              </AlertDescription>
            </Alert>

            <PaymentGateway
              packageName={packageName}
              amount={numericAmount}
              onDiscountedAmount={setDiscountedAmount}
            />

            <Separator className="bg-gray-300 dark:bg-slate-700" />

            <PaymentProofForm
              packageId={packageId}
              onSuccess={handleSuccess}
              onSubmit={handleSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>

      <CongratulationsModal
        isOpen={showCongrats}
        onClose={handleCongratsClose}
        userName={userProfile?.name || ""}
        packageName={packageName}
      />
    </>
  );
}
