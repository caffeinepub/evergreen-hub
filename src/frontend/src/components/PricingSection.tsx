import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import PaymentModal from './PaymentModal';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const packages = [
  {
    id: 1n,
    name: 'E-LITE PACKAGE',
    price: '₹699',
    description: 'Perfect for beginners starting their journey in affiliate marketing',
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
    description: 'Essential tools for content creators and video editors',
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
    description: 'Comprehensive social media marketing and growth strategies',
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
    description: 'Advanced business and communication skills for professionals',
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
    description: 'Master modern technologies and AI-powered content creation',
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
    description: 'Complete web development and digital marketing mastery',
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
  const { ref, isVisible } = useScrollAnimation();

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
      <section id="courses-section" className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your Success Path
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the perfect package to kickstart your affiliate marketing journey
            </p>
          </div>

          <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            {packages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`relative card-radius soft-shadow card-hover overflow-hidden ${
                  pkg.popular ? 'border-2 border-primary' : ''
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground z-10">
                    Best Value
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{pkg.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold text-primary">{pkg.price}</div>
                  <ul className="space-y-2">
                    {pkg.courses.map((course, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{course}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <button
                    onClick={() => handleBuyNow(pkg)}
                    className="w-full btn-cta btn-click-scale py-3 font-semibold"
                  >
                    Buy Now
                  </button>
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
