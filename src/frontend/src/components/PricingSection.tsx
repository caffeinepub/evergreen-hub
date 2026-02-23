import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import PaymentModal from './PaymentModal';

const packages = [
  {
    id: 1n,
    name: 'E-LITE PACKAGE',
    price: '₹699',
    description: 'Total 2 courses',
    image: '/assets/1736790168_99817e5b501599cb1a32.webp',
    courses: [
      'Ms Excel',
      'Time Management',
    ],
  },
  {
    id: 2n,
    name: 'SILVER PACKAGE',
    price: '₹1499',
    description: '6 courses + E-lite free',
    image: '/assets/1736790180_92ef8bcb1e432a9a949a.webp',
    courses: [
      'Canva mastery',
      'Kinemaster editing',
      'Photoshop editing',
      'Premiere Pro',
    ],
  },
  {
    id: 3n,
    name: 'GOLD PACKAGE',
    price: '₹2999',
    description: '11 courses + E-lite & silver free',
    image: '/assets/1736790230_c5566f358eb6ca101c0d.webp',
    courses: [
      'YouTube growth',
      'Instagram growth',
      'Video Marketing',
      'Attractions Marketing',
      'Goal setting',
    ],
  },
  {
    id: 4n,
    name: 'DIAMOND PACKAGE',
    price: '₹4999',
    popular: true,
    description: '17 courses + E-lite, silver and gold free',
    image: '/assets/1736790264_f670ec31ba7738d0be77.webp',
    courses: [
      'Finance Mastery',
      'Reselling Mastery',
      'Communication Mastery',
      'Public Speaking',
      'Facebook Mastery',
      'English Spoken',
    ],
  },
  {
    id: 5n,
    name: 'PLATINUM PACKAGE',
    price: '₹9999',
    description: '24 courses + E-lite, silver, gold, diamond free',
    image: '/assets/1736790287_1899f7fdfeac4fa91418.webp',
    courses: [
      'Stock Market',
      'Cryptocurrency',
      'AI game changer',
      'Interview Skills Mastery',
      '0 to hero AI content creation',
      'Viral Reels With AI',
      'ChatGPT Mastery',
    ],
  },
  {
    id: 6n,
    name: 'ULTRA PRO PACKAGE',
    price: '₹14999',
    description: '34 courses + All packages free',
    image: '/assets/1736790311_3efed5100955914f22fb.webp',
    courses: [
      'Website development',
      'JavaScript',
      'Blockchain',
      'Python',
      'SEO',
      'HTML',
      'CSS Mastery',
      'Google Ads',
      'E-commerce business mastery',
      'Blogging',
    ],
  },
];

export default function PricingSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<{
    id: bigint;
    name: string;
    price: string;
  } | null>(null);

  const handleBuyNow = (pkg: typeof packages[0]) => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
      return;
    }
    setSelectedPackage({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
    });
  };

  return (
    <>
      <section id="pricing" className="py-20 bg-gradient-to-b from-background to-emerald-950/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Success Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the perfect package to kickstart your affiliate marketing journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  pkg.popular
                    ? 'border-emerald-500 border-2 shadow-emerald-500/20 shadow-xl scale-105'
                    : 'border-border hover:border-emerald-500/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-emerald-500 text-black font-bold px-4 py-1 text-sm">
                      <Sparkles className="h-3 w-3 mr-1 inline" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-8">
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-4xl font-black text-emerald-500 mb-2">
                    {pkg.price}
                  </CardDescription>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {pkg.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  {pkg.courses.map((course, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{course}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter className="pt-6">
                  <Button
                    onClick={() => handleBuyNow(pkg)}
                    className={`w-full font-bold text-lg py-6 transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-black shadow-lg hover:shadow-emerald-500/50'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedPackage && (
        <PaymentModal
          isOpen={!!selectedPackage}
          onClose={() => setSelectedPackage(null)}
          packageId={selectedPackage.id}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}
    </>
  );
}
