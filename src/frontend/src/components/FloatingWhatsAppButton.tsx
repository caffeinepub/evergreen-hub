import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('Hello, I am interested in your course packages.');
    window.open(`https://wa.me/919263989760?text=${message}`, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-black shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 p-0"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </Button>
  );
}
