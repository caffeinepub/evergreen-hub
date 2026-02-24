import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGetReferralsByUser, useGetTotalCommissions, useGetUserProfile } from '../hooks/useQueries';
import type { Referral } from '../backend';
import { ReactElement } from 'react';

export default function ReferralsSection() {
  const { userProfile } = useAuth();
  const userId = userProfile?.principal.toString() || '';

  const { data: referrals = [], isLoading: referralsLoading } = useGetReferralsByUser(userId);
  const { data: commissions, isLoading: commissionsLoading } = useGetTotalCommissions(userId);

  const getPackageName = (packageId: bigint) => {
    const packages: Record<string, string> = {
      '1': 'E-LITE',
      '2': 'SILVER',
      '3': 'GOLD',
      '4': 'DIAMOND',
      '5': 'PLATINUM',
      '6': 'ULTRA PRO',
    };
    return packages[packageId.toString()] || `Package #${packageId}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Pending</Badge>;
      case 'paid':
        return <Badge className="bg-blue-500">Paid</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (referralsLoading || commissionsLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-emerald-500" />
          Your Referrals
        </h2>

        {/* Commission Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className="bg-white dark:bg-slate-800 border-2 border-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Income</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{Number(commissions?.totalActive || 0)}
              </div>
              <p className="text-xs text-muted-foreground">From direct referrals</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-2 border-yellow-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Passive Income</CardTitle>
              <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                ₹{Number(commissions?.totalPassive || 0)}
              </div>
              <p className="text-xs text-muted-foreground">From network earnings</p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-slate-800 border-2 border-orange-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Commission</CardTitle>
              <Clock className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                ₹{Number(commissions?.pending || 0)}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Referrals List */}
      <Card className="bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle>Referred Users ({referrals.length})</CardTitle>
          <CardDescription>Users who joined through your referral link</CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No referrals yet</p>
              <p className="text-sm mt-1">Share your referral link to start earning commissions!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <ReferralCard key={referral.id.toString()} referral={referral} getPackageName={getPackageName} getStatusBadge={getStatusBadge} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ReferralCard({ 
  referral, 
  getPackageName, 
  getStatusBadge 
}: { 
  referral: Referral; 
  getPackageName: (id: bigint) => string;
  getStatusBadge: (status: string) => ReactElement;
}) {
  const { data: userProfile } = useGetUserProfile(referral.referredUserId.toString());

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-slate-800">
      <div className="flex-1">
        <p className="font-semibold">
          {userProfile?.name || referral.referredUserId.toString().slice(0, 10) + '...'}
        </p>
        <p className="text-sm text-muted-foreground">
          Package: {getPackageName(referral.packageId)}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs">
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {referral.commissionType === 'active' ? 'Active' : 'Passive'}:
            </span>{' '}
            ₹{Number(referral.commissionAmount)}
          </span>
          <span className="text-xs text-muted-foreground">
            {new Date(Number(referral.createdAt) / 1000000).toLocaleDateString()}
          </span>
        </div>
      </div>
      {getStatusBadge(referral.status)}
    </div>
  );
}
