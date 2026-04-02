import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  IndianRupee,
  Package,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Order } from "../../contexts/CartContext";
import { useGetAdminStats } from "../../hooks/useQueries";

const ORDERS_KEY = "evergreenhub_orders";

function useLocalOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      setOrders(stored ? JSON.parse(stored) : []);
    } catch {
      setOrders([]);
    }

    // Poll every 10s for live updates
    const interval = setInterval(() => {
      try {
        const stored = localStorage.getItem(ORDERS_KEY);
        setOrders(stored ? JSON.parse(stored) : []);
      } catch {
        setOrders([]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
  const totalOrders = orders.length;

  const serviceStats: Record<string, number> = {};
  for (const o of orders) {
    const key = o.service || o.category || "Unknown";
    serviceStats[key] = (serviceStats[key] || 0) + (o.price || 0);
  }

  const statusCounts = {
    Pending: orders.filter((o) => o.status === "Pending").length,
    "In Progress": orders.filter((o) => o.status === "In Progress").length,
    Completed: orders.filter((o) => o.status === "Completed").length,
  };

  return { orders, totalRevenue, totalOrders, serviceStats, statusCounts };
}

const SERVICE_COLORS: Record<string, string> = {
  "Web Design": "bg-blue-500",
  "web-design": "bg-blue-500",
  "Video Editing": "bg-purple-500",
  "video-editing": "bg-purple-500",
  "Photo Editing": "bg-pink-500",
  "photo-editing": "bg-pink-500",
  "Thumbnail Design": "bg-orange-500",
  "thumbnail-design": "bg-orange-500",
};

const getServiceColor = (key: string) =>
  SERVICE_COLORS[key] || SERVICE_COLORS[key.toLowerCase()] || "bg-emerald-500";

export default function AdminStats() {
  const { data: stats, isLoading } = useGetAdminStats();
  const { totalRevenue, totalOrders, serviceStats, statusCounts } =
    useLocalOrders();

  const statCards = [
    {
      title: "Total Users",
      value: Number(stats?.totalUsers ?? 0),
      description: "Registered users",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Total Sales",
      value: Number(stats?.totalSales ?? 0),
      description: "Completed transactions",
      icon: ShoppingCart,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Total Revenue",
      value: `₹${Number(stats?.totalRevenue ?? 0).toLocaleString("en-IN")}`,
      description: "Lifetime earnings",
      icon: IndianRupee,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
    },
    {
      title: "Pending Payments",
      value: Number(stats?.pendingPayments ?? 0),
      description: "Awaiting approval",
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30",
    },
  ];

  const orderCards = [
    {
      title: "Total Orders",
      value: totalOrders,
      description: "All service orders placed",
      icon: ShoppingBag,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
    },
    {
      title: "Total Order Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      description: "Sum of all order prices",
      icon: IndianRupee,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Completed Orders",
      value: statusCounts.Completed,
      description: "Successfully delivered",
      icon: Package,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      title: "Active Orders",
      value: statusCounts["In Progress"],
      description: "Currently in progress",
      icon: TrendingUp,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-950/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Backend Stats */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Platform Stats
        </h2>
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
                      <p className="text-xs text-muted-foreground mt-1">
                        {card.description}
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Order Stats (from localStorage) */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
          Live Order Stats
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {orderCards.map((card) => {
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
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Per-Service Revenue Breakdown */}
      {Object.keys(serviceStats).length > 0 && (
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Revenue by Service
          </h2>
          <Card>
            <CardContent className="pt-5 space-y-4">
              {Object.entries(serviceStats)
                .sort(([, a], [, b]) => b - a)
                .map(([service, revenue]) => {
                  const maxRevenue = Math.max(...Object.values(serviceStats));
                  const pct = maxRevenue > 0 ? (revenue / maxRevenue) * 100 : 0;
                  return (
                    <div key={service}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium capitalize">
                          {service.replace(/-/g, " ")}
                        </span>
                        <span className="text-muted-foreground">
                          ₹{revenue.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getServiceColor(
                            service,
                          )}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Order Status + Quick Summary */}
      {!isLoading && stats && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">
                  Conversion Rate
                </span>
                <span className="font-semibold text-sm">
                  {Number(stats.totalUsers) > 0
                    ? (
                        (Number(stats.totalSales) / Number(stats.totalUsers)) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">
                  Avg. Revenue per Sale
                </span>
                <span className="font-semibold text-sm">
                  ₹
                  {Number(stats.totalSales) > 0
                    ? Math.round(
                        Number(stats.totalRevenue) / Number(stats.totalSales),
                      ).toLocaleString("en-IN")
                    : "0"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">
                  Pending Approval Rate
                </span>
                <span className="font-semibold text-sm">
                  {Number(stats.totalSales) + Number(stats.pendingPayments) > 0
                    ? (
                        (Number(stats.pendingPayments) /
                          (Number(stats.totalSales) +
                            Number(stats.pendingPayments))) *
                        100
                      ).toFixed(1)
                    : "0.0"}
                  %
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Status Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  label: "Pending",
                  count: statusCounts.Pending,
                  color: "bg-orange-400",
                },
                {
                  label: "In Progress",
                  count: statusCounts["In Progress"],
                  color: "bg-blue-400",
                },
                {
                  label: "Completed",
                  count: statusCounts.Completed,
                  color: "bg-emerald-500",
                },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all`}
                      style={{
                        width:
                          totalOrders > 0
                            ? `${(count / totalOrders) * 100}%`
                            : "0%",
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-28 text-right">
                    {count} {label}
                  </span>
                </div>
              ))}
              <p className="text-xs text-muted-foreground pt-1">
                Total orders: {totalOrders}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
