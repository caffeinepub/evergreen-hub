import { X as useGetAdminStats, k as Users, z as ShoppingCart, v as Clock, E as ShoppingBag, x as Package, Y as TrendingUp, j as jsxRuntimeExports, Z as Skeleton, r as reactExports } from "./index-Bxztzs8-.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-AjzlJkoI.js";
import { I as IndianRupee } from "./indian-rupee-DlImvxvd.js";
const ORDERS_KEY = "evergreenhub_orders";
function useLocalOrders() {
  const [orders, setOrders] = reactExports.useState([]);
  reactExports.useEffect(() => {
    try {
      const stored = localStorage.getItem(ORDERS_KEY);
      setOrders(stored ? JSON.parse(stored) : []);
    } catch {
      setOrders([]);
    }
    const interval = setInterval(() => {
      try {
        const stored = localStorage.getItem(ORDERS_KEY);
        setOrders(stored ? JSON.parse(stored) : []);
      } catch {
        setOrders([]);
      }
    }, 1e4);
    return () => clearInterval(interval);
  }, []);
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
  const totalOrders = orders.length;
  const serviceStats = {};
  for (const o of orders) {
    const key = o.service || o.category || "Unknown";
    serviceStats[key] = (serviceStats[key] || 0) + (o.price || 0);
  }
  const statusCounts = {
    Pending: orders.filter((o) => o.status === "Pending").length,
    "In Progress": orders.filter((o) => o.status === "In Progress").length,
    Completed: orders.filter((o) => o.status === "Completed").length
  };
  return { orders, totalRevenue, totalOrders, serviceStats, statusCounts };
}
const SERVICE_COLORS = {
  "Web Design": "bg-blue-500",
  "web-design": "bg-blue-500",
  "Video Editing": "bg-purple-500",
  "video-editing": "bg-purple-500",
  "Photo Editing": "bg-pink-500",
  "photo-editing": "bg-pink-500",
  "Thumbnail Design": "bg-orange-500",
  "thumbnail-design": "bg-orange-500"
};
const getServiceColor = (key) => SERVICE_COLORS[key] || SERVICE_COLORS[key.toLowerCase()] || "bg-emerald-500";
function AdminStats() {
  const { data: stats, isLoading } = useGetAdminStats();
  const { totalRevenue, totalOrders, serviceStats, statusCounts } = useLocalOrders();
  const statCards = [
    {
      title: "Total Users",
      value: Number((stats == null ? void 0 : stats.totalUsers) ?? 0),
      description: "Registered users",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-950/30"
    },
    {
      title: "Total Sales",
      value: Number((stats == null ? void 0 : stats.totalSales) ?? 0),
      description: "Completed transactions",
      icon: ShoppingCart,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    {
      title: "Total Revenue",
      value: `₹${Number((stats == null ? void 0 : stats.totalRevenue) ?? 0).toLocaleString("en-IN")}`,
      description: "Lifetime earnings",
      icon: IndianRupee,
      color: "text-yellow-500",
      bg: "bg-yellow-50 dark:bg-yellow-950/30"
    },
    {
      title: "Pending Payments",
      value: Number((stats == null ? void 0 : stats.pendingPayments) ?? 0),
      description: "Awaiting approval",
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-950/30"
    }
  ];
  const orderCards = [
    {
      title: "Total Orders",
      value: totalOrders,
      description: "All service orders placed",
      icon: ShoppingBag,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-950/30"
    },
    {
      title: "Total Order Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      description: "Sum of all order prices",
      icon: IndianRupee,
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30"
    },
    {
      title: "Completed Orders",
      value: statusCounts.Completed,
      description: "Successfully delivered",
      icon: Package,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/30"
    },
    {
      title: "Active Orders",
      value: statusCounts["In Progress"],
      description: "Currently in progress",
      icon: TrendingUp,
      color: "text-violet-500",
      bg: "bg-violet-50 dark:bg-violet-950/30"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Dashboard Statistics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: "Platform performance overview — auto-refreshes every 30 seconds" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3", children: "Platform Stats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: statCards.map((card) => {
        const Icon = card.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${card.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${card.color}` }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: card.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: card.description })
          ] }) })
        ] }, card.title);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3", children: "Live Order Stats" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: orderCards.map((card) => {
        const Icon = card.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${card.bg}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-4 w-4 ${card.color}` }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: card.value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: card.description })
          ] })
        ] }, card.title);
      }) })
    ] }),
    Object.keys(serviceStats).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3", children: "Revenue by Service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 space-y-4", children: Object.entries(serviceStats).sort(([, a], [, b]) => b - a).map(([service, revenue]) => {
        const maxRevenue = Math.max(...Object.values(serviceStats));
        const pct = maxRevenue > 0 ? revenue / maxRevenue * 100 : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: service.replace(/-/g, " ") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "₹",
              revenue.toLocaleString("en-IN")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-full rounded-full transition-all duration-500 ${getServiceColor(
                service
              )}`,
              style: { width: `${pct}%` }
            }
          ) })
        ] }, service);
      }) }) })
    ] }),
    !isLoading && stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Quick Summary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Conversion Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
              Number(stats.totalUsers) > 0 ? (Number(stats.totalSales) / Number(stats.totalUsers) * 100).toFixed(1) : "0.0",
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Avg. Revenue per Sale" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
              "₹",
              Number(stats.totalSales) > 0 ? Math.round(
                Number(stats.totalRevenue) / Number(stats.totalSales)
              ).toLocaleString("en-IN") : "0"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Pending Approval Rate" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-sm", children: [
              Number(stats.totalSales) + Number(stats.pendingPayments) > 0 ? (Number(stats.pendingPayments) / (Number(stats.totalSales) + Number(stats.pendingPayments)) * 100).toFixed(1) : "0.0",
              "%"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Order Status Overview" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          [
            {
              label: "Pending",
              count: statusCounts.Pending,
              color: "bg-orange-400"
            },
            {
              label: "In Progress",
              count: statusCounts["In Progress"],
              color: "bg-blue-400"
            },
            {
              label: "Completed",
              count: statusCounts.Completed,
              color: "bg-emerald-500"
            }
          ].map(({ label, count, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `h-full ${color} rounded-full transition-all`,
                style: {
                  width: totalOrders > 0 ? `${count / totalOrders * 100}%` : "0%"
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-28 text-right", children: [
              count,
              " ",
              label
            ] })
          ] }, label)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pt-1", children: [
            "Total orders: ",
            totalOrders
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminStats as default
};
