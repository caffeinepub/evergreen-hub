import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '@tanstack/react-router';
import PaymentGateway from './PaymentGateway';
import PaymentProofForm from './PaymentProofForm';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useActor } from '../hooks/useActor';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ExternalBlob } from '../backend';

const packages = [
  {
    id: 1n,
    name: 'E-LITE PACKAGE',
    price: '₹699',
    image: '/assets/1736790168_99817e5b501599cb1a32.webp',
    courses: [
      'Ms Excel',
      'Time Management'
    ],
    totalCourses: 'Total 2 courses'
  },
  {
    id: 2n,
    name: 'SILVER PACKAGE',
    price: '₹1499',
    image: '/assets/1736790180_92ef8bcb1e432a9a949a.webp',
    courses: [
      'Canva mastery',
      'Kinemaster editing',
      'Photoshop editing',
      'Premium pro'
    ],
    totalCourses: '6 courses + E-lite free'
  },
  {
    id: 3n,
    name: 'GOLD PACKAGE',
    price: '₹2999',
    image: '/assets/1736790230_c5566f358eb6ca101c0d.webp',
    courses: [
      'YouTube growth',
      'Instagram growth',
      'Video Marketing',
      'Attractions Marketing',
      'Goal setting'
    ],
    totalCourses: '11 courses + E-lite & silver free'
  },
  {
    id: 4n,
    name: 'DIAMOND PACKAGE',
    price: '₹4999',
    popular: true,
    image: '/assets/1736790264_f670ec31ba7738d0be77.webp',
    courses: [
      'Finance Mastery',
      'Reselling Mastery',
      'Communication Mastery',
      'Public Speaking',
      'Facebook Mastery',
      'English Spoken'
    ],
    totalCourses: '17 courses + E-lite, silver and gold free'
  },
  {
    id: 5n,
    name: 'PLATINUM PACKAGE',
    price: '₹9999',
    image: '/assets/1736790287_1899f7fdfeac4fa91418.webp',
    courses: [
      'Stock Market',
      'Cryptocurrency',
      'AI game changer',
      'Interview Skills Mastery',
      '0 to hero AI content creation',
      'Viral Reels With AI',
      'ChatGPT Mastery'
    ],
    totalCourses: '24 courses + E-lite, silver, gold, diamond free'
  },
  {
    id: 6n,
    name: 'ULTRA PRO PACKAGE',
    price: '₹14999',
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
      'Blogging'
    ],
    totalCourses: '34 courses + All packages free'
  },
];

export default function PricingSection() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [expandedPackage, setExpandedPackage] = useState<bigint | null>(null);
  const [showPayment, setShowPayment] = useState<bigint | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const submitProofMutation = useMutation({
    mutationFn: async ({ packageId, transactionId, screenshot }: { packageId: bigint; transactionId: string; screenshot: ExternalBlob }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitPaymentProof(packageId, transactionId, screenshot);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPaymentProofs'] });
      queryClient.invalidateQueries({ queryKey: ['myPayments'] });
      toast.success('Payment proof submitted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit payment proof');
      throw error;
    },
  });

  const handlePackageClick = (packageId: bigint) => {
    if (expandedPackage === packageId) {
      setExpandedPackage(null);
      setShowPayment(null);
    } else {
      setExpandedPackage(packageId);
      setShowPayment(null);
    }
  };

  const handleProceedToPayment = (packageId: bigint) => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
      return;
    }
    setShowPayment(packageId);
  };

  const handleSubmit = async (packageId: bigint, transactionId: string, screenshot: ExternalBlob) => {
    await submitProofMutation.mutateAsync({ packageId, transactionId, screenshot });
  };

  const handleSuccess = (packageId: bigint) => {
    setTimeout(() => {
      setShowPayment(null);
      setExpandedPackage(null);
    }, 2000);
  };

  const handleVideoEditingClick = () => {
    const videoEditingSection = document.getElementById('video-editing-section');
    if (videoEditingSection) {
      videoEditingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="courses-section" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        {/* All Packages Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect package for your learning journey
            </p>
          </div>

          <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            {packages.map((pkg) => {
              const isExpanded = expandedPackage === pkg.id;
              const isPaymentVisible = showPayment === pkg.id;

              return (
                <Card
                  key={pkg.name}
                  className={`relative card-radius soft-shadow overflow-hidden bg-card border-border transition-all duration-300 ${
                    pkg.popular ? 'border-2 border-primary' : ''
                  } ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
                >
                  {pkg.popular && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground z-10">
                      Best Value
                    </Badge>
                  )}
                  
                  {/* Clickable Header Section */}
                  <div
                    onClick={() => handlePackageClick(pkg.id)}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <CardHeader className="pb-4">
                      <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
                        <img
                          src={pkg.image}
                          alt={pkg.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl text-foreground">{pkg.name}</CardTitle>
                        {isExpanded ? (
                          <ChevronUp className="w-6 h-6 text-primary" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-4xl font-bold text-primary">{pkg.price}</div>
                      <p className="text-sm text-muted-foreground font-medium">{pkg.totalCourses}</p>
                    </CardContent>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                      {/* Course List */}
                      <div className="bg-muted/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-4">Course Details</h3>
                        <ul className="space-y-2">
                          {pkg.courses.map((course, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2">✓</span>
                              <span className="text-foreground">{course}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-semibold text-primary">{pkg.totalCourses}</p>
                        </div>
                      </div>

                      {/* Payment Button */}
                      {!isPaymentVisible && (
                        <button
                          onClick={() => handleProceedToPayment(pkg.id)}
                          className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-4 rounded-lg font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
                        >
                          Proceed to Payment
                        </button>
                      )}

                      {/* Payment Section */}
                      {isPaymentVisible && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                          <div className="border-t border-border pt-6">
                            <h3 className="text-2xl font-bold text-foreground mb-2">Complete Your Payment</h3>
                            <p className="text-muted-foreground mb-6">
                              You're purchasing: <span className="font-semibold text-foreground">{pkg.name}</span> for{' '}
                              <span className="font-semibold text-primary">{pkg.price}</span>
                            </p>
                            
                            {/* Payment Gateway */}
                            <div className="mb-6">
                              <PaymentGateway />
                            </div>

                            {/* Payment Proof Form */}
                            <div className="bg-muted/30 rounded-lg p-6">
                              <PaymentProofForm
                                packageId={pkg.id}
                                onSuccess={() => handleSuccess(pkg.id)}
                                onSubmit={(transactionId, screenshot) => handleSubmit(pkg.id, transactionId, screenshot)}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Video Editing Charge Section */}
        <div className="text-center mt-16">
          <button
            onClick={handleVideoEditingClick}
            className="inline-block"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 hover:text-primary transition-colors cursor-pointer">
              Video Editing Charge
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Click to view our professional video editing services
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
