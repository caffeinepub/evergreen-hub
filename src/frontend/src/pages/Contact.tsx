import Header from '../components/Header';
import Footer from '../components/Footer';
import InstagramSection from '../components/InstagramSection';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const whatsappNumber = '919263989760';
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground">
                Have questions? We're here to help you succeed!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/10 p-3 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">WhatsApp</h3>
                    <p className="text-muted-foreground mb-3">
                      Get instant support and quick responses
                    </p>
                    <Button
                      onClick={() => window.open(whatsappUrl, '_blank')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat Now
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground mb-3">
                      Call us for personalized assistance
                    </p>
                    <a
                      href={`tel:+${whatsappNumber}`}
                      className="text-emerald-500 hover:text-emerald-400 font-semibold transition-colors"
                    >
                      +91 9263989760
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-950/20 to-emerald-900/10 border border-emerald-500/20 rounded-2xl p-8 text-center">
              <Mail className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Ready to Start Your Journey?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of successful affiliate marketers who have transformed their lives with our courses. 
                Contact us today to get started!
              </p>
              <Button
                onClick={() => window.open(whatsappUrl, '_blank')}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-6"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Learning Today
              </Button>
            </div>
          </div>
        </div>
      </main>

      <InstagramSection />
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}
