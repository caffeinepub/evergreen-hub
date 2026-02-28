import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, MessageCircle, Share2, X } from 'lucide-react';
import { useSubmitContactInterest, useGetPersistentSiteContent } from '../hooks/useQueries';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactInterestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const submitContactInterest = useSubmitContactInterest();
  const { data: siteContent } = useGetPersistentSiteContent();

  const whatsappNumber = siteContent?.whatsappPhoneNumber || '919263989760';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Save to backend
    try {
      await submitContactInterest.mutateAsync({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
      });
    } catch (err) {
      // Even if backend fails, still open WhatsApp
      console.error('Failed to save contact interest:', err);
    }

    setSubmittedData({ ...formData });
    setSubmitted(true);

    // Open WhatsApp
    const waMessage = encodeURIComponent(
      `Hi! I'm interested in Evergreen Hub courses.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${waMessage}`, '_blank');

    // Auto-reset after 8 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSubmittedData(null);
    }, 8000);
  };

  const handleWhatsAppShare = () => {
    if (!submittedData) return;
    const waMessage = encodeURIComponent(
      `Hi! I'm interested in Evergreen Hub courses.\n\nName: ${submittedData.name}\nPhone: ${submittedData.phone}\nEmail: ${submittedData.email}\nMessage: ${submittedData.message}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${waMessage}`, '_blank');
  };

  const handleDismiss = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setSubmittedData(null);
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Your inquiry has been saved. WhatsApp has been opened for you to send the message directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            onClick={handleWhatsAppShare}
            className="bg-green-500 hover:bg-green-600 text-white gap-2"
          >
            <Share2 className="h-4 w-4" />
            Open WhatsApp Again
          </Button>
          <Button variant="outline" onClick={handleDismiss} className="gap-2">
            <X className="h-4 w-4" />
            Dismiss
          </Button>
        </div>
        <p className="text-xs text-gray-400">Auto-dismisses in 8 seconds</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us what you're interested in..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
        disabled={submitContactInterest.isPending}
      >
        {submitContactInterest.isPending ? (
          <>
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <MessageCircle className="h-4 w-4" />
            Send via WhatsApp
          </>
        )}
      </Button>
      <p className="text-xs text-gray-400 text-center">
        WhatsApp will open in a new tab. Your inquiry is also saved to our system.
      </p>
    </form>
  );
}
