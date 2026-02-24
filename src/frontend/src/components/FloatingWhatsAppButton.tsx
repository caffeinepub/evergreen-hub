import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsAppButton() {
  const phoneNumber = '9263989760';
  const maskedNumber = '********60';
  const message = encodeURIComponent('Hello! I am interested in your courses.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-2 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-black rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-float"></div>
        <button className="relative flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-float">
          <MessageCircle className="h-7 w-7" />
        </button>
      </div>
      <span className="text-xs font-medium text-white bg-black px-3 py-1 rounded-full shadow-md cursor-pointer hover:bg-zinc-900 transition-colors">
        {maskedNumber}
      </span>
    </a>
  );
}
