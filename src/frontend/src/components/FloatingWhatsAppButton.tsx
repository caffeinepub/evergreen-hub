import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingWhatsAppButton() {
  const handleClick = () => {
    window.open(
      'https://wa.me/919263989760?text=Hi%2C%20I%20have%20a%20question%20about%20Evergreen%20Hub',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 p-0 whatsapp-floating"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
}
