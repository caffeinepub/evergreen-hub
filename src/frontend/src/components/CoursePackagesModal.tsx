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

  const handleSelectPackage = (pkg: any) => {
    setSelectedPackage({
      id: pkg.id,
      name: pkg.name,
      price: `₹${Number(pkg.price).toLocaleString('en-IN')}`,
    });
  };

  const handleClosePayment = () => {
    setSelectedPackage(null);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
              Choose Your Package
            </DialogTitle>
            <DialogDescription className="text-center text-gray-700 dark:text-gray-300">
              Select the perfect package for your learning journey
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {packages?.map((pkg) => {
                const courseList = pkg.courses.split(',').map((c) => c.trim());
                const isDiamond = pkg.name.toLowerCase().includes('diamond');

                return (
                  <Card
                    key={Number(pkg.id)}
                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700 ${
                      isDiamond ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {isDiamond && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-white">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Best Value
                        </Badge>
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">{pkg.name}</CardTitle>
                      <CardDescription className="text-gray-700 dark:text-gray-300">
                        <span className="text-3xl font-bold text-primary">
                          ₹{Number(pkg.price).toLocaleString('en-IN')}
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-2">
                        {courseList.map((course, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-900 dark:text-gray-100">
                            <Check className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{course}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter>
                      <Button
                        onClick={() => handleSelectPackage(pkg)}
                        className="w-full btn-cta"
                      >
                        Select Package
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {selectedPackage && (
        <PaymentModal
          isOpen={!!selectedPackage}
          onClose={handleClosePayment}
          packageId={selectedPackage.id}
          packageName={selectedPackage.name}
          packagePrice={selectedPackage.price}
        />
      )}
    </>
  );
}
