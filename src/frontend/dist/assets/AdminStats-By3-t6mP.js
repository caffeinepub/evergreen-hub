import { _ as createLucideIcon, a7 as useGetAdminStats, W as Users, y as ShoppingCart, t as Clock, j as jsxRuntimeExports, a8 as TrendingUp, Y as Skeleton } from "./index-Dvuqt7mL.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-S3LnciBG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
];
const IndianRupee = createLucideIcon("indian-rupee", __iconNode);
function AdminStats() {
  const { data: stats, isLoading } = useGetAdminStats();
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "Dashboard Statistics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: "Platform performance overview — auto-refreshes every 30 seconds" })
      ] })
    ] }),
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
    }) }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Status Overview" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-emerald-500 rounded-full transition-all",
                style: {
                  width: `${Number(stats.totalSales) + Number(stats.pendingPayments) > 0 ? Number(stats.totalSales) / (Number(stats.totalSales) + Number(stats.pendingPayments)) * 100 : 0}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-20 text-right", children: [
              Number(stats.totalSales),
              " approved"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-muted rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-orange-400 rounded-full transition-all",
                style: {
                  width: `${Number(stats.totalSales) + Number(stats.pendingPayments) > 0 ? Number(stats.pendingPayments) / (Number(stats.totalSales) + Number(stats.pendingPayments)) * 100 : 0}%`
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground w-20 text-right", children: [
              Number(stats.pendingPayments),
              " pending"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pt-1", children: [
            "Total payment submissions:",
            " ",
            Number(stats.totalSales) + Number(stats.pendingPayments)
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AdminStats as default
};
