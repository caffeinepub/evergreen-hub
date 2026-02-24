import { useQuery } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, Clock, CheckCircle, TrendingUp, Calendar, Wallet, Award } from 'lucide-react';
import type { PaymentProof, Earnings } from '../../backend';

export default function DashboardOverview() {
  const { actor } = useActor();
  const { userProfile } = useAuth();

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

  const { data: earnings, isLoading: earningsLoading } = useQuery<Earnings>({
    queryKey: ['earnings', userProfile?.principal.toString()],
    queryFn: async () => {
      if (!actor || !userProfile) throw new Error('Actor or user profile not available');
      return actor.getEarnings(userProfile.principal);
    },
    enabled: !!actor && !!userProfile,
  });

  const approvedProofs = paymentProofs.filter((p) => p.status === 'approved');
  const pendingProofs = paymentProofs.filter((p) => p.status === 'pending');

  const totalSpent = approvedProofs.reduce((sum, proof) => {
    const pkg = packages.find((p) => p.id === proof.packageId);
    return sum + (pkg ? Number(pkg.price) : 0);
  }, 0);

  const getPackageName = (packageId: bigint) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg?.name || 'Unknown Package';
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

  if (isLoading || earningsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your account summary</p>
      </div>

      {/* Earnings Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          Your Earnings
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">₹{Number(earnings?.today || 0)}</div>
              <p className="text-xs text-muted-foreground">Today's earnings</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly</CardTitle>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">₹{Number(earnings?.weekly || 0)}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly</CardTitle>
              <Wallet className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">₹{Number(earnings?.monthly || 0)}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 to-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lifetime</CardTitle>
              <Award className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">₹{Number(earnings?.lifetime || 0)}</div>
              <p className="text-xs text-muted-foreground">Total earnings</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Summary Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedProofs.length}</div>
              <p className="text-xs text-muted-foreground">Active packages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSpent}</div>
              <p className="text-xs text-muted-foreground">On approved packages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProofs.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting verification</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedProofs.length}</div>
              <p className="text-xs text-muted-foreground">Verified payments</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payment History</CardTitle>
          <CardDescription>Your latest payment submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {paymentProofs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No payment history yet
            </div>
          ) : (
            <div className="space-y-4">
              {paymentProofs.slice(0, 5).map((proof) => (
                <div
                  key={proof.id.toString()}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold">{getPackageName(proof.packageId)}</p>
                    <p className="text-sm text-muted-foreground">
                      Transaction ID: {proof.transactionId}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(Number(proof.createdAt) / 1000000).toLocaleDateString()}
                    </p>
                  </div>
                  {getStatusBadge(proof.status)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
