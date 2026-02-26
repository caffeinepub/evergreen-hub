import { useState, useEffect, useRef } from 'react';
import { MessageCircle, CheckCircle, Send, Share2, X } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

interface ContactInterestFormProps {
  compact?: boolean; // For sidebar use
}

export default function ContactInterestForm({ compact = false }: ContactInterestFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; phone: string; email: string; message: string } | null>(null);
  const autoResetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-reset after 8 seconds
  useEffect(() => {
    if (submitted) {
      autoResetTimerRef.current = setTimeout(() => {
        handleReset();
      }, 8000);
    }
    return () => {
      if (autoResetTimerRef.current) {
        clearTimeout(autoResetTimerRef.current);
      }
    };
  }, [submitted]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s]{7,15}$/.test(phone.trim())) newErrors.phone = 'Enter a valid phone number';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = 'Enter a valid email';
    if (!message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    const whatsappMessage = encodeURIComponent(
      `🌟 *New Interest Form Submission*\n\n` +
      `👤 *Name:* ${name.trim()}\n` +
      `📱 *Phone:* ${phone.trim()}\n` +
      `📧 *Email:* ${email.trim()}\n\n` +
      `💬 *Message:*\n${message.trim()}`
    );

    const whatsappUrl = `https://wa.me/919263989760?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Save submitted data for WhatsApp share button
    setSubmittedData({ name: name.trim(), phone: phone.trim(), email: email.trim(), message: message.trim() });
    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedData(null);
    if (autoResetTimerRef.current) {
      clearTimeout(autoResetTimerRef.current);
    }
  };

  const handleWhatsAppShare = () => {
    if (!submittedData) return;
    const shareMessage = encodeURIComponent(
      `✅ *Form Submission Confirmed!*\n\n` +
      `👤 *Name:* ${submittedData.name}\n` +
      `📱 *Phone:* ${submittedData.phone}\n` +
      `📧 *Email:* ${submittedData.email}\n\n` +
      `💬 *Message:*\n${submittedData.message}\n\n` +
      `Thank you for reaching out to Evergreen Hub! We'll get back to you soon. 🌟`
    );
    window.open(`https://wa.me/919263989760?text=${shareMessage}`, '_blank', 'noopener,noreferrer');
  };

  if (submitted) {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${compact ? 'py-6 px-4' : 'py-8 px-6'}`}>
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
          <CheckCircle className="w-9 h-9 text-emerald-500" />
        </div>

        <h3 className={`font-bold text-foreground mb-2 ${compact ? 'text-base' : 'text-xl'}`}>
          🎉 Message Sent Successfully!
        </h3>
        <p className={`text-muted-foreground mb-1 ${compact ? 'text-xs' : 'text-sm'}`}>
          Aapka message WhatsApp pe bhej diya gaya hai.
        </p>
        <p className={`text-muted-foreground mb-5 ${compact ? 'text-xs' : 'text-sm'}`}>
          Hum jald hi aapse contact karenge! ✅
        </p>

        {/* WhatsApp Share Button */}
        <button
          onClick={handleWhatsAppShare}
          className={`w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] active:bg-[#17a854] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg mb-3 ${compact ? 'py-2.5 text-sm' : 'py-3 text-base'}`}
        >
          <SiWhatsapp className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
          Share on WhatsApp
          <Share2 className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
        </button>

        {/* Auto-reset note + dismiss */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className={`flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors ${compact ? 'text-xs' : 'text-sm'}`}
          >
            <X className="w-3 h-3" />
            Send another message
          </button>
        </div>
        <p className={`text-muted-foreground mt-2 ${compact ? 'text-xs' : 'text-xs'}`}>
          (Form 8 seconds mein automatically reset ho jayega)
        </p>
      </div>
    );
  }

  const inputClass = `w-full px-3 py-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${compact ? 'text-sm' : 'text-base'}`;
  const labelClass = `block font-medium text-foreground mb-1 ${compact ? 'text-xs' : 'text-sm'}`;
  const errorClass = 'text-xs text-red-500 mt-1';

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-3 ${compact ? '' : 'space-y-4'}`}>
      {/* Name */}
      <div>
        <label className={labelClass}>Full Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Apna naam likhein"
          className={`${inputClass} ${errors.name ? 'border-red-500' : 'border-border'}`}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={labelClass}>Phone Number *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Apna number likhein"
          className={`${inputClass} ${errors.phone ? 'border-red-500' : 'border-border'}`}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email ID *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Apna email likhein"
          className={`${inputClass} ${errors.email ? 'border-red-500' : 'border-border'}`}
        />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Apna message likhein..."
          rows={compact ? 3 : 4}
          className={`${inputClass} resize-none ${errors.message ? 'border-red-500' : 'border-border'}`}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg ${compact ? 'py-2.5 text-sm' : 'py-3 text-base'}`}
      >
        <MessageCircle className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
        WhatsApp pe Bhejo
        <Send className={compact ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

      <p className={`text-center text-muted-foreground ${compact ? 'text-xs' : 'text-xs'}`}>
        Form submit hone par WhatsApp new tab mein khulega
      </p>
    </form>
  );
}
