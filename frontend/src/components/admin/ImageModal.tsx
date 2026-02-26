import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Payment Screenshot</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center bg-gray-50 dark:bg-slate-800 p-4 rounded-lg">
          <img
            src={imageUrl}
            alt="Payment screenshot"
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
