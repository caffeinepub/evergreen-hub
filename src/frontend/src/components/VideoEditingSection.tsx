import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, Sparkles, MessageCircle, CreditCard } from 'lucide-react';
import PaymentModal from './PaymentModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function VideoEditingSection() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation();

  const handleOrderNow = () => {
    window.open(
      'https://wa.me/919263989760?text=Hi%2C%20I%27d%20like%20to%20order%20video%20editing%20service',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handlePayNow = () => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
      return;
    }
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
              <Card className="border-2 border-emerald-500/30 shadow-2xl shadow-emerald-500/10 overflow-hidden">
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-black/30 rounded-full mb-6">
                    <Video className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Professional Long Video Editing
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-lg font-semibold">Premium Quality Service</span>
                  </div>
                </div>

                <CardContent className="p-8 space-y-6">
                  <div className="text-center space-y-4">
                    <p className="text-xl text-muted-foreground">
                      I provide high-quality long video editing at just
                    </p>
                    <div className="inline-block bg-emerald-500/10 border-2 border-emerald-500 rounded-2xl px-8 py-4">
                      <span className="text-5xl font-black text-emerald-500">₹500</span>
                      <span className="text-xl text-muted-foreground ml-2">per video</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground mb-1">Professional</div>
                      <div className="text-sm text-muted-foreground">Quality Editing</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground mb-1">Fast</div>
                      <div className="text-sm text-muted-foreground">Turnaround Time</div>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-foreground mb-1">Affordable</div>
                      <div className="text-sm text-muted-foreground">Pricing</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={handlePayNow}
                      size="lg"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-lg py-6 rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Pay Now
                    </Button>
                    <Button
                      onClick={handleOrderNow}
                      size="lg"
                      variant="outline"
                      className="w-full border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black font-bold text-lg py-6 rounded-lg shadow-lg transition-all duration-300"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Order via WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          packageId={BigInt(0)}
          packageName="Professional Long Video Editing"
          packagePrice="₹500"
          isVideoEditing={true}
        />
      )}
    </>
  );
}
