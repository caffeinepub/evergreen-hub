import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { useGetActivePackages } from '../hooks/useQueries';
import { useState } from 'react';
import PaymentModal from './PaymentModal';

interface CoursePackagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoursePackagesModal({ isOpen, onClose }: CoursePackagesModalProps) {
  const { data: packages, isLoading } = useGetActivePackages();
  const [selectedPackage, setSelectedPackage] = useState<{
    id: bigint;
    name: string;
    price: string;
  } | null>(null);

  const handleSelectPackage = (pkg: { id: bigint; name: string; price: bigint }) => {
    setSelectedPackage({
      id: pkg.id,
      name: pkg.name,
      price: `₹${pkg.price}`,
    });
  };

  const handleClosePaymentModal = () => {
    setSelectedPackage(null);
  };

  // Package images mapping
  const packageImages: Record<string, string> = {
    'E-LITE PACKAGE': '/assets/1736790168_99817e5b501599cb1a32.webp',
    'SILVER PACKAGE': '/assets/1736790180_92ef8bcb1e432a9a949a.webp',
    'GOLD PACKAGE': '/assets/1736790230_c5566f358eb6ca101c0d.webp',
    'DIAMOND PACKAGE': '/assets/1736790264_f670ec31ba7738d0be77.webp',
    'PLATINUM PACKAGE': '/assets/1736790287_1899f7fdfeac4fa91418.webp',
    'ULTRA PRO PACKAGE': '/assets/1736790311_3efed5100955914f22fb.webp',
  };

  return (
    <>
      <Dialog open={isOpen && !selectedPackage} onOpenChange={onClose}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center">Choose Your Course Package</DialogTitle>
            <DialogDescription className="text-center text-lg">
              Select the perfect package to kickstart your affiliate marketing journey
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages?.map((pkg) => {
                  const isPopular = pkg.name === 'DIAMOND PACKAGE';
                  const courseList = pkg.courses.split('\n').filter(c => c.trim());

                  return (
                    <Card
                      key={pkg.id.toString()}
                      className={`relative transition-all duration-300 hover:shadow-xl bg-card border-border ${
                        isPopular
                          ? 'border-emerald-500 border-2 shadow-emerald-500/20 shadow-lg'
                          : 'hover:border-emerald-500/50'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                          <Badge className="bg-emerald-500 text-black font-bold px-3 py-1 text-xs">
                            <Sparkles className="h-3 w-3 mr-1 inline" />
                            MOST POPULAR
                          </Badge>
                        </div>
                      )}

                      <CardHeader className="text-center pb-3 pt-6">
                        <div className="mb-3 flex justify-center">
                          <img
                            src={packageImages[pkg.name] || '/assets/1736790168_99817e5b501599cb1a32.webp'}
                            alt={pkg.name}
                            className="w-32 h-32 object-contain"
                          />
                        </div>
                        <CardTitle className="text-xl font-bold mb-1">{pkg.name}</CardTitle>
                        <CardDescription className="text-3xl font-black text-emerald-500 mb-1">
                          ₹{pkg.price.toString()}
                        </CardDescription>
                        <p className="text-xs text-muted-foreground font-semibold">
                          {courseList.length} courses included
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-2 max-h-48 overflow-y-auto">
                        {courseList.map((course, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{course}</span>
                          </div>
                        ))}
                      </CardContent>

                      <CardFooter className="pt-4">
                        <Button
                          onClick={() => handleSelectPackage(pkg)}
                          className={`w-full font-bold text-base py-5 transition-all duration-300 ${
                            isPopular
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-black shadow-lg hover:shadow-emerald-500/50'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          Select Package
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {selectedPackage && (
        <PaymentModal
          isOpen={!!selectedPackage}
          onClose={handleClosePaymentModal}
          packageId={selectedPackage.id}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}
    </>
  );
}
