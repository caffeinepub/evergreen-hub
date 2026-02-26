import { useQuery } from '@tanstack/react-query';
import { useActor } from '../../hooks/useActor';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, Clock, CheckCircle, TrendingUp, Calendar, Wallet, Award } from 'lucide-react';
import type { PaymentProof, Earnings } from '../../backend';
import CommissionChart from '../../components/CommissionChart';
import MyReferralLink from '../../components/MyReferralLink';
import ReferralsSection from '../../components/ReferralsSection';

// Bubble configuration
const BUBBLES = [
  { size: 12, left: '8%', delay: '0s', duration: '12s', color: 'rgba(37, 99, 235, 0.25)' },
  { size: 20, left: '18%', delay: '1.5s', duration: '15s', color: 'rgba(245, 158, 11, 0.3)' },
  { size: 8, left: '28%', delay: '3s', duration: '11s', color: 'rgba(37, 99, 235, 0.2)' },
  { size: 24, left: '38%', delay: '0.5s', duration: '14s', color: 'rgba(124, 58, 237, 0.2)' },
  { size: 16, left: '50%', delay: '2s', duration: '13s', color: 'rgba(245, 158, 11, 0.25)' },
  { size: 10, left: '60%', delay: '4s', duration: '10s', color: 'rgba(37, 99, 235, 0.3)' },
  { size: 18, left: '70%', delay: '1s', duration: '16s', color: 'rgba(124, 58, 237, 0.25)' },
  { size: 14, left: '80%', delay: '2.5s', duration: '12s', color: 'rgba(245, 158, 11, 0.2)' },
  { size: 22, left: '88%', delay: '3.5s', duration: '14s', color: 'rgba(37, 99, 235, 0.2)' },
  { size: 9, left: '94%', delay: '0.8s', duration: '11s', color: 'rgba(124, 58, 237, 0.3)' },
];

function RisingBubbles() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {BUBBLES.map((bubble, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            bottom: '-30px',
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            borderRadius: '50%',
            backgroundColor: bubble.color,
            border: `1px solid ${bubble.color.replace(/[\d.]+\)$/, '0.5)')}`,
            animationName: 'riseBubble',
            animationDuration: bubble.duration,
            animationDelay: bubble.delay,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            willChange: 'transform, opacity',
          }}
        />
      ))}
      <style>{`
        @keyframes riseBubble {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

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

  const formatCurrency = (amount: number | bigint) => {
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="relative min-h-screen p-6 space-y-6 overflow-hidden">
      {/* Rising bubbles background animation */}
      <RisingBubbles />

      {/* All content above bubbles */}
      <div className="relative z-10 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {userProfile?.name || 'User'}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">Here's your dashboard overview</p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Earnings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Today's Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {earningsLoading ? '...' : formatCurrency(earnings?.today || 0)}
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">Daily commission</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Weekly Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                {earningsLoading ? '...' : formatCurrency(earnings?.weekly || 0)}
              </div>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">Monthly Earnings</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {earningsLoading ? '...' : formatCurrency(earnings?.monthly || 0)}
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">Lifetime Earnings</CardTitle>
              <Wallet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {earningsLoading ? '...' : formatCurrency(earnings?.lifetime || 0)}
              </div>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Packages</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedProofs.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Approved purchases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProofs.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <Award className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
              <p className="text-xs text-muted-foreground mt-1">In approved packages</p>
            </CardContent>
          </Card>
        </div>

        {/* Commission Chart */}
        <CommissionChart />

        {/* Referral Link */}
        <MyReferralLink />

        {/* Referrals Section */}
        <ReferralsSection />

        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Account Summary
            </CardTitle>
            <CardDescription>Your profile and account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium">{userProfile?.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium">{userProfile?.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium">{userProfile?.phone || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">
                    {userProfile?.createdAt
                      ? new Date(Number(userProfile.createdAt) / 1_000_000).toLocaleDateString('en-IN')
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Account Status</span>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <Badge variant="outline" className="capitalize">{userProfile?.role || 'user'}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        {paymentProofs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Payment History
              </CardTitle>
              <CardDescription>Your recent payment submissions</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4 text-muted-foreground">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {paymentProofs.slice(0, 5).map((proof) => {
                    const pkg = packages.find((p) => p.id === proof.packageId);
                    return (
                      <div
                        key={proof.id.toString()}
                        className="flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50"
                      >
                        <div className="flex items-center gap-3">
                          <Package className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{pkg?.name || 'Unknown Package'}</p>
                            <p className="text-xs text-muted-foreground">
                              Txn: {proof.transactionId}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-primary">
                            {pkg ? formatCurrency(pkg.price) : 'N/A'}
                          </span>
                          {getStatusBadge(proof.status as string)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
