import ContactInterestForm from './ContactInterestForm';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { MessageCircle } from 'lucide-react';

export default function ContactFormSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact-form-section" className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto scroll-fade-in ${isVisible ? 'visible' : ''}`}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15 mb-4">
              <MessageCircle className="w-7 h-7 text-emerald-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Interested? Contact Us!
            </h2>
            <p className="text-muted-foreground text-lg">
              Apna naam, number aur message bharo — seedha hamare WhatsApp pe aa jayega
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border border-border rounded-2xl p-8 soft-shadow">
            <ContactInterestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
