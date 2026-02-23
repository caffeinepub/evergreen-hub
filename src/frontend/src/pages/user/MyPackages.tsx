import { useQuery } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, CreditCard } from 'lucide-react';
import type { PaymentProof } from '../../backend';

export default function MyPackages() {
  const { actor } = useActor();

  const { data: paymentProofs = [], isLoading } = useQuery<PaymentProof[]>({
    queryKey: ['myPaymentProofs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMyPaymentProofs();
    },
    enabled: !!actor,
  });

  const { data: packages = [] } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllPackages();
    },
    enabled: !!actor,
  });

  const getPackageName = (packageId: bigint) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg?.name || 'Unknown Package';
  };

  const getPackagePrice = (packageId: bigint) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg ? `₹${pkg.price}` : 'N/A';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Packages</h1>
        <p className="text-muted-foreground mt-1">View all your purchased packages and payment status</p>
      </div>

      {paymentProofs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Packages Yet</h3>
            <p className="text-muted-foreground text-center max-w-md">
              You haven't purchased any packages yet. Browse our pricing section to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {paymentProofs.map((proof) => (
            <Card key={proof.id.toString()}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{getPackageName(proof.packageId)}</CardTitle>
                    <CardDescription className="text-2xl font-bold text-emerald-500 mt-2">
                      {getPackagePrice(proof.packageId)}
                    </CardDescription>
                  </div>
                  {getStatusBadge(proof.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-mono text-sm font-semibold">{proof.transactionId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Purchase Date</p>
                      <p className="text-sm font-semibold">
                        {new Date(Number(proof.createdAt) / 1000000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                {proof.status === 'pending' && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-sm text-yellow-600 dark:text-yellow-500">
                      Your payment is being verified. This usually takes up to 24 hours.
                    </p>
                  </div>
                )}
                {proof.status === 'approved' && (
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-500">
                      Payment verified! You now have access to all courses in this package.
                    </p>
                  </div>
                )}
                {proof.status === 'rejected' && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-500">
                      Payment verification failed. Please contact support for assistance.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
