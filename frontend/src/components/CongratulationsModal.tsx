import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Trophy, Share2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const MOTIVATIONAL_QUOTES = [
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. 🌟",
  "The secret of getting ahead is getting started. Your journey to success begins today! 🚀",
  "Believe you can and you're halfway there. You've taken the first step — now conquer the rest! 💪",
  "Every expert was once a beginner. Your investment today is the foundation of your success tomorrow! 🏆",
  "The best investment you can make is in yourself. Knowledge is the one asset that can never be taken away! 📚",
  "Success usually comes to those who are too busy to be looking for it. Keep learning, keep growing! 🌱",
  "Don't watch the clock; do what it does. Keep going — your dreams are worth every effort! ⏰",
];

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  packageName?: string;
}

export default function CongratulationsModal({
  isOpen,
  onClose,
  userName,
  packageName,
}: CongratulationsModalProps) {
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    return MOTIVATIONAL_QUOTES[randomIndex];
  });

  const handleWhatsAppShare = () => {
    const displayName = userName || 'Friend';
    const packageText = packageName ? ` for the *${packageName}*` : '';
    const message = encodeURIComponent(
      `🎉 *Congratulations ${displayName}!* 🎉\n\n` +
      `Your payment${packageText} has been submitted successfully!\n\n` +
      `💡 *Motivation for you:*\n"${quote}"\n\n` +
      `Keep learning, keep growing! 🚀\n` +
      `— Evergreen Hub Team`
    );
    window.open(`https://wa.me/919263989760?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white dark:bg-slate-900 border-0 shadow-2xl overflow-hidden p-0">
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-accent px-6 pt-8 pb-10 text-white text-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Trophy Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
              <Trophy className="w-10 h-10 text-yellow-300" />
            </div>
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center">
              🎉 Congratulations!
            </DialogTitle>
            <DialogDescription className="text-white/90 text-center mt-1 text-base">
              {userName ? (
                <>
                  <span className="font-semibold text-yellow-200">{userName}</span>, aapka payment proof submit ho gaya!
                </>
              ) : (
                'Aapka payment proof submit ho gaya!'
              )}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-5">
          {/* Package info */}
          {packageName && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 text-center">
              <p className="text-sm text-muted-foreground">Package purchased:</p>
              <p className="font-bold text-primary text-lg">{packageName}</p>
            </div>
          )}

          {/* Motivational Quote */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl px-4 py-4">
            <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">💡 Today's Motivation</p>
            <p className="text-sm text-foreground leading-relaxed italic">"{quote}"</p>
          </div>

          {/* Status note */}
          <p className="text-xs text-muted-foreground text-center">
            Aapka payment 24 ghante mein verify ho jayega. Hum aapko update karenge! ✅
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <Button
              onClick={handleWhatsAppShare}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold gap-2 py-5"
            >
              <SiWhatsapp className="w-5 h-5" />
              Share on WhatsApp
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-border text-foreground hover:bg-muted"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
