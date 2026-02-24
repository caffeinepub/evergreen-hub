import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Video, Clock, CheckCircle, Sparkles } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function VideoEditingSection() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const phoneNumber = '9263989760';
  const maskedNumber = '********60';
  const message = encodeURIComponent('Hello! I want to order video editing service.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const features = [
    { icon: Video, title: 'Professional Editing', description: 'High-quality video editing with transitions and effects' },
    { icon: Clock, title: 'Fast Turnaround', description: 'Quick delivery without compromising quality' },
    { icon: CheckCircle, title: 'Unlimited Revisions', description: 'We work until you\'re 100% satisfied' },
    { icon: Sparkles, title: 'Creative Touch', description: 'Professional polish for your content' },
  ];

  return (
    <>
      <section ref={ref} className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className={`container mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Professional <span className="text-primary">Video Editing</span> Service
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your raw footage into stunning videos. Perfect for YouTube, Instagram, and promotional content.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold">Long Video Editing</CardTitle>
                <CardDescription className="text-lg">Professional editing at an affordable price</CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-primary">₹500</span>
                  <span className="text-muted-foreground ml-2">per video</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <feature.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    size="lg"
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-lg px-8 py-6"
                  >
                    Order Now - ₹500
                  </Button>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-6 w-full sm:w-auto cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      WhatsApp: {maskedNumber}
                    </Button>
                  </a>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  💡 Tip: Send us your raw footage via WhatsApp or Google Drive link after payment
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        packageId={BigInt(0)}
        packageName="Video Editing Service"
        packagePrice="₹500"
        isVideoEditing={true}
      />
    </>
  );
}
