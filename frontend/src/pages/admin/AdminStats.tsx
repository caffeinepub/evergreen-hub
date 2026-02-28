import { useGetAdminStats } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingCart, IndianRupee, Clock, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminStats() {
  const { data: stats, isLoading } = useGetAdminStats();

  const statCards = [
    {
      title: 'Total Users',
      value: Number(stats?.totalUsers ?? 0),
      description: 'Registered users',
      icon: Users,
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      title: 'Total Sales',
      value: Number(stats?.totalSales ?? 0),
      description: 'Completed transactions',
      icon: ShoppingCart,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    {
      title: 'Total Revenue',
      value: `₹${Number(stats?.totalRevenue ?? 0).toLocaleString('en-IN')}`,
      description: 'Lifetime earnings',
      icon: IndianRupee,
      color: 'text-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-950/30',
    },
    {
      title: 'Pending Payments',
      value: Number(stats?.pendingPayments ?? 0),
      description: 'Awaiting approval',
      icon: Clock,
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-950/30',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Dashboard Statistics</h1>
          <p className="text-muted-foreground mt-0.5">
            Platform performance overview — auto-refreshes every 30 seconds
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bg}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!isLoading && stats && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Conversion Rate</span>
                <span className="font-semibold text-sm">
                  {Number(stats.totalUsers) > 0
                    ? ((Number(stats.totalSales) / Number(stats.totalUsers)) * 100).toFixed(1)
                    : '0.0'}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Avg. Revenue per Sale</span>
                <span className="font-semibold text-sm">
                  ₹{Number(stats.totalSales) > 0
                    ? Math.round(Number(stats.totalRevenue) / Number(stats.totalSales)).toLocaleString('en-IN')
                    : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Pending Approval Rate</span>
                <span className="font-semibold text-sm">
                  {Number(stats.totalSales) + Number(stats.pendingPayments) > 0
                    ? ((Number(stats.pendingPayments) / (Number(stats.totalSales) + Number(stats.pendingPayments))) * 100).toFixed(1)
                    : '0.0'}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{
                      width: `${
                        Number(stats.totalSales) + Number(stats.pendingPayments) > 0
                          ? (Number(stats.totalSales) / (Number(stats.totalSales) + Number(stats.pendingPayments))) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">
                  {Number(stats.totalSales)} approved
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-orange-400 rounded-full transition-all"
                    style={{
                      width: `${
                        Number(stats.totalSales) + Number(stats.pendingPayments) > 0
                          ? (Number(stats.pendingPayments) / (Number(stats.totalSales) + Number(stats.pendingPayments))) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-20 text-right">
                  {Number(stats.pendingPayments)} pending
                </span>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                Total payment submissions: {Number(stats.totalSales) + Number(stats.pendingPayments)}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
