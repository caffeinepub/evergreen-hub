import { a3 as createLucideIcon, j as jsxRuntimeExports, C as Card, f as CardHeader, h as CardTitle, b4 as Award, i as CardDescription, k as CardContent, a2 as TrendingUp, b5 as useInternetIdentity, r as reactExports, b6 as Share2, V as Input, n as Button, e as ue, a as useAuth, b7 as useGetReferralsByUser, b8 as useGetTotalCommissions, a6 as Users, ae as Clock, B as Badge, G as useActor, J as useQuery, a9 as DollarSign, b9 as Wallet, x as CircleCheckBig, K as Package } from "./index-SgGMw7jr.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-udYxbxbV.js";
import { C as Check } from "./check-DENotwVp.js";
import { C as Calendar } from "./calendar-MC89Xx42.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
const commissionData = [
  { package: "E-LITE", price: 699, activeIncome: 470, passiveIncome: 50 },
  { package: "SILVER", price: 1499, activeIncome: 1e3, passiveIncome: 100 },
  { package: "GOLD", price: 2999, activeIncome: 2e3, passiveIncome: 250 },
  { package: "DIAMOND", price: 4999, activeIncome: 3400, passiveIncome: 400 },
  { package: "PLATINUM", price: 9999, activeIncome: 6700, passiveIncome: 800 },
  {
    package: "ULTRA PRO",
    price: 14999,
    activeIncome: 1e4,
    passiveIncome: 1100
  }
];
function CommissionChart() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white dark:bg-slate-800 border-2 border-emerald-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-5 w-5 text-emerald-500" }),
        "Commission Chart"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Earn commissions when you refer users to purchase packages" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Package" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-500" }),
            "Active Income"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-end gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-yellow-500" }),
            "Passive Income"
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: commissionData.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: item.package }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
            "₹",
            item.price
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-green-600 dark:text-green-400", children: [
            "₹",
            item.activeIncome
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-yellow-600 dark:text-yellow-400", children: [
            "₹",
            item.passiveIncome
          ] }) })
        ] }, item.package)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-emerald-800 dark:text-emerald-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Active Income:" }),
          " Earned immediately when your referral purchases a package"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-emerald-800 dark:text-emerald-200 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Passive Income:" }),
          " Additional earnings from your referral network"
        ] })
      ] })
    ] })
  ] });
}
function MyReferralLink() {
  const { identity } = useInternetIdentity();
  const [copied, setCopied] = reactExports.useState(false);
  const referralLink = identity ? `${window.location.origin}/register?ref=${encodeURIComponent(identity.getPrincipal().toString())}` : "";
  const handleCopy = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      ue.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2e3);
    } catch (_error) {
      ue.error("Failed to copy link");
    }
  };
  if (!identity) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white dark:bg-slate-800 border-2 border-yellow-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-5 w-5 text-yellow-500" }),
        "Your Referral Link"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Share this link to earn commissions when users register and purchase packages" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: referralLink,
            readOnly: true,
            className: "font-mono text-sm bg-slate-50 dark:bg-slate-900"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleCopy,
            variant: "outline",
            size: "icon",
            className: "shrink-0",
            children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-green-500" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-yellow-800 dark:text-yellow-200", children: [
        "💡 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tip:" }),
        " Share this link on social media, WhatsApp, or with friends to start earning commissions!"
      ] }) })
    ] })
  ] });
}
function ReferralsSection() {
  const { userProfile } = useAuth();
  const userId = (userProfile == null ? void 0 : userProfile.principal.toString()) || "";
  const { data: referrals = [], isLoading: referralsLoading } = useGetReferralsByUser(userId || null);
  const { data: commissions, isLoading: commissionsLoading } = useGetTotalCommissions(userId || null);
  const getPackageName = (packageId) => {
    const packages = {
      "1": "E-LITE",
      "2": "SILVER",
      "3": "GOLD",
      "4": "DIAMOND",
      "5": "PLATINUM",
      "6": "ULTRA PRO"
    };
    return packages[packageId.toString()] || `Package #${packageId}`;
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500", children: "Approved" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "border-yellow-500 text-yellow-600",
            children: "Pending"
          }
        );
      case "paid":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-blue-500", children: "Paid" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: status });
    }
  };
  if (referralsLoading || commissionsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-emerald-500" }),
        "Your Referrals"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white dark:bg-slate-800 border-2 border-green-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Active Income" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-600 dark:text-green-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-green-600 dark:text-green-400", children: [
              "₹",
              Number((commissions == null ? void 0 : commissions.totalActive) || 0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "From direct referrals" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white dark:bg-slate-800 border-2 border-yellow-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Passive Income" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-yellow-600 dark:text-yellow-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-yellow-600 dark:text-yellow-400", children: [
              "₹",
              Number((commissions == null ? void 0 : commissions.totalPassive) || 0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "From network earnings" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white dark:bg-slate-800 border-2 border-orange-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Pending Commission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-orange-600 dark:text-orange-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-orange-600 dark:text-orange-400", children: [
              "₹",
              Number((commissions == null ? void 0 : commissions.pending) || 0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Awaiting approval" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-white dark:bg-slate-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
          "Referred Users (",
          referrals.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Users who joined through your referral link" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: referrals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 mx-auto mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No referrals yet. Share your referral link to start earning!" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: referrals.map((referral) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-700",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                referral.referredUserId.toString().slice(0, 12),
                "..."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Package: ",
                getPackageName(referral.packageId)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-emerald-600", children: [
                "₹",
                Number(referral.commissionAmount)
              ] }),
              getStatusBadge(referral.status)
            ] })
          ]
        },
        referral.id.toString()
      )) }) })
    ] })
  ] });
}
const BUBBLES = [
  {
    size: 12,
    left: "8%",
    delay: "0s",
    duration: "12s",
    color: "rgba(37, 99, 235, 0.25)"
  },
  {
    size: 20,
    left: "18%",
    delay: "1.5s",
    duration: "15s",
    color: "rgba(245, 158, 11, 0.3)"
  },
  {
    size: 8,
    left: "28%",
    delay: "3s",
    duration: "11s",
    color: "rgba(37, 99, 235, 0.2)"
  },
  {
    size: 24,
    left: "38%",
    delay: "0.5s",
    duration: "14s",
    color: "rgba(124, 58, 237, 0.2)"
  },
  {
    size: 16,
    left: "50%",
    delay: "2s",
    duration: "13s",
    color: "rgba(245, 158, 11, 0.25)"
  },
  {
    size: 10,
    left: "60%",
    delay: "4s",
    duration: "10s",
    color: "rgba(37, 99, 235, 0.3)"
  },
  {
    size: 18,
    left: "70%",
    delay: "1s",
    duration: "16s",
    color: "rgba(124, 58, 237, 0.25)"
  },
  {
    size: 14,
    left: "80%",
    delay: "2.5s",
    duration: "12s",
    color: "rgba(245, 158, 11, 0.2)"
  },
  {
    size: 22,
    left: "88%",
    delay: "3.5s",
    duration: "14s",
    color: "rgba(37, 99, 235, 0.2)"
  },
  {
    size: 9,
    left: "94%",
    delay: "0.8s",
    duration: "11s",
    color: "rgba(124, 58, 237, 0.3)"
  }
];
function RisingBubbles() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 overflow-hidden pointer-events-none",
      style: { zIndex: 0 },
      "aria-hidden": "true",
      children: [
        BUBBLES.map((bubble) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              bottom: "-30px",
              left: bubble.left,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              borderRadius: "50%",
              backgroundColor: bubble.color,
              border: `1px solid ${bubble.color.replace(/[\d.]+\)$/, "0.5)")}`,
              animationName: "riseBubble",
              animationDuration: bubble.duration,
              animationDelay: bubble.delay,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              willChange: "transform, opacity"
            }
          },
          `bubble-${bubble.left}-${bubble.size}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
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
      ` })
      ]
    }
  );
}
function DashboardOverview() {
  const { actor } = useActor();
  const { userProfile } = useAuth();
  const { data: paymentProofs = [], isLoading } = useQuery({
    queryKey: ["myPaymentProofs"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getMyPaymentProofs();
    },
    enabled: !!actor
  });
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getAllPackages();
    },
    enabled: !!actor
  });
  const { data: earnings, isLoading: earningsLoading } = useQuery({
    queryKey: ["earnings", userProfile == null ? void 0 : userProfile.principal.toString()],
    queryFn: async () => {
      if (!actor || !userProfile)
        throw new Error("Actor or user profile not available");
      return actor.getEarnings(userProfile.principal);
    },
    enabled: !!actor && !!userProfile
  });
  const approvedProofs = paymentProofs.filter((p) => p.status === "approved");
  const pendingProofs = paymentProofs.filter((p) => p.status === "pending");
  const totalSpent = approvedProofs.reduce((sum, proof) => {
    const pkg = packages.find((p) => p.id === proof.packageId);
    return sum + (pkg ? Number(pkg.price) : 0);
  }, 0);
  const formatCurrency = (amount) => {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", children: "Approved" });
      case "pending":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200", children: "Pending" });
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200", children: "Rejected" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: status });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen p-6 space-y-6 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RisingBubbles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground", children: [
            "Welcome back, ",
            (userProfile == null ? void 0 : userProfile.name) || "User",
            "! 👋"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Here's your dashboard overview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-yellow-800 dark:text-yellow-200", children: "Today's Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-yellow-600 dark:text-yellow-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-yellow-900 dark:text-yellow-100", children: earningsLoading ? "..." : formatCurrency((earnings == null ? void 0 : earnings.today) || 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-700 dark:text-yellow-300 mt-1", children: "Daily commission" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-green-800 dark:text-green-200", children: "Weekly Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-green-600 dark:text-green-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-green-900 dark:text-green-100", children: earningsLoading ? "..." : formatCurrency((earnings == null ? void 0 : earnings.weekly) || 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-700 dark:text-green-300 mt-1", children: "This week" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-blue-800 dark:text-blue-200", children: "Monthly Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-blue-600 dark:text-blue-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-900 dark:text-blue-100", children: earningsLoading ? "..." : formatCurrency((earnings == null ? void 0 : earnings.monthly) || 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-700 dark:text-blue-300 mt-1", children: "This month" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium text-purple-800 dark:text-purple-200", children: "Lifetime Earnings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-purple-600 dark:text-purple-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-purple-900 dark:text-purple-100", children: earningsLoading ? "..." : formatCurrency((earnings == null ? void 0 : earnings.lifetime) || 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-purple-700 dark:text-purple-300 mt-1", children: "All time" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Active Packages" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: approvedProofs.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Approved purchases" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Pending Payments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-yellow-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: pendingProofs.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Awaiting approval" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Invested" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-blue-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: formatCurrency(totalSpent) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "In approved packages" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommissionChart, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MyReferralLink, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReferralsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-5 w-5 text-primary" }),
            "Account Summary"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your profile and account details" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: (userProfile == null ? void 0 : userProfile.name) || "N/A" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: (userProfile == null ? void 0 : userProfile.email) || "N/A" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: (userProfile == null ? void 0 : userProfile.phone) || "N/A" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Member Since" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: (userProfile == null ? void 0 : userProfile.createdAt) ? new Date(
                Number(userProfile.createdAt) / 1e6
              ).toLocaleDateString("en-IN") : "N/A" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Account Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: (userProfile == null ? void 0 : userProfile.role) || "user" })
            ] })
          ] })
        ] }) })
      ] }),
      paymentProofs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-5 w-5 text-primary" }),
            "Payment History"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your recent payment submissions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-4 text-muted-foreground", children: "Loading..." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: paymentProofs.slice(0, 5).map((proof) => {
          const pkg = packages.find((p) => p.id === proof.packageId);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: (pkg == null ? void 0 : pkg.name) || "Unknown Package" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Txn: ",
                      proof.transactionId
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: pkg ? formatCurrency(pkg.price) : "N/A" }),
                  getStatusBadge(proof.status)
                ] })
              ]
            },
            proof.id.toString()
          );
        }) }) })
      ] })
    ] })
  ] });
}
export {
  DashboardOverview as default
};
