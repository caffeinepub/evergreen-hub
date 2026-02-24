import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton() {
  const phoneNumber = '9263989760';
  const maskedNumber = '********60';
  const message = encodeURIComponent('Hello! I want to know more about your courses.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6 z-40 flex items-center gap-3 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 whatsapp-floating group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="font-semibold hidden sm:inline group-hover:scale-105 transition-transform">
        {maskedNumber}
      </span>
    </a>
  );
}
