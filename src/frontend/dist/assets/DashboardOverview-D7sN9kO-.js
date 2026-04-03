import { a as useAuth, r as reactExports, j as jsxRuntimeExports, U as User, D as Badge, E as ShoppingBag } from "./index-DtQIrmWF.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-DVWv_6Rq.js";
const BUBBLES = [
  {
    size: 12,
    left: "8%",
    delay: "0s",
    duration: "12s",
    color: "rgba(22, 163, 74, 0.25)"
  },
  {
    size: 20,
    left: "18%",
    delay: "1.5s",
    duration: "15s",
    color: "rgba(234, 179, 8, 0.3)"
  },
  {
    size: 8,
    left: "28%",
    delay: "3s",
    duration: "11s",
    color: "rgba(22, 163, 74, 0.2)"
  },
  {
    size: 24,
    left: "38%",
    delay: "0.5s",
    duration: "14s",
    color: "rgba(234, 179, 8, 0.2)"
  },
  {
    size: 16,
    left: "50%",
    delay: "2s",
    duration: "13s",
    color: "rgba(22, 163, 74, 0.25)"
  },
  {
    size: 10,
    left: "60%",
    delay: "4s",
    duration: "10s",
    color: "rgba(234, 179, 8, 0.3)"
  },
  {
    size: 18,
    left: "70%",
    delay: "1s",
    duration: "16s",
    color: "rgba(22, 163, 74, 0.25)"
  },
  {
    size: 14,
    left: "80%",
    delay: "2.5s",
    duration: "12s",
    color: "rgba(234, 179, 8, 0.2)"
  },
  {
    size: 22,
    left: "88%",
    delay: "3.5s",
    duration: "14s",
    color: "rgba(22, 163, 74, 0.2)"
  },
  {
    size: 9,
    left: "94%",
    delay: "0.8s",
    duration: "11s",
    color: "rgba(234, 179, 8, 0.3)"
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
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(0.6); opacity: 0; }
        }
      ` })
      ]
    }
  );
}
const STATUS_COLORS = {
  Delivered: "bg-green-100 text-green-800",
  Completed: "bg-green-100 text-green-800",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Pending: "bg-orange-100 text-orange-800",
  "Image Received": "bg-blue-100 text-blue-800",
  "Editing in Progress": "bg-purple-100 text-purple-800",
  Cancelled: "bg-red-100 text-red-800"
};
const CATEGORY_COLORS = {
  "Web Design": "bg-blue-100 text-blue-700",
  "Video Editing": "bg-purple-100 text-purple-700",
  "Photo Editing": "bg-pink-100 text-pink-700",
  "Thumbnail Design": "bg-orange-100 text-orange-700",
  "Ads Campaign": "bg-amber-100 text-amber-700"
};
const SAMPLE_ORDERS = [
  {
    id: "ORD-001",
    service: "Basic Web Design Package",
    serviceName: "Web Design",
    category: "Web Design",
    price: 2999,
    status: "In Progress",
    date: "2026-03-20",
    createdAt: "2026-03-20"
  },
  {
    id: "ORD-002",
    service: "YouTube Pro Video Editing",
    serviceName: "Video Editing",
    category: "Video Editing",
    price: 3999,
    status: "Delivered",
    date: "2026-03-18",
    createdAt: "2026-03-18"
  },
  {
    id: "ORD-003",
    service: "Advanced Photo Editing",
    serviceName: "Photo Editing",
    category: "Photo Editing",
    price: 299,
    status: "Image Received",
    date: "2026-03-22",
    createdAt: "2026-03-22"
  }
];
function DashboardOverview() {
  const { userProfile } = useAuth();
  const [orders, setOrders] = reactExports.useState(SAMPLE_ORDERS);
  reactExports.useEffect(() => {
    const tryLoad = () => {
      for (const key of ["evergreen_orders", "evergreenhub_orders"]) {
        try {
          const stored = localStorage.getItem(key);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const normalized = parsed.map((o) => ({
                id: o.id || "ORD",
                service: o.service || o.serviceName || o.planName || "",
                serviceName: o.serviceName || o.service || "",
                category: o.category || o.serviceName || o.service || "",
                price: o.price || 0,
                status: o.status || "Pending",
                date: o.date || o.createdAt || "",
                createdAt: o.createdAt || o.date || ""
              }));
              setOrders(normalized);
              return;
            }
          }
        } catch {
        }
      }
    };
    tryLoad();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen p-6 space-y-6 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RisingBubbles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold text-foreground", children: [
          "Welcome back, ",
          (userProfile == null ? void 0 : userProfile.name) || "User",
          "! 👋"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Manage your profile and account settings" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5 text-primary" }),
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: (userProfile == null ? void 0 : userProfile.role) || "user" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5 text-primary" }),
            "My Orders"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your recent service orders" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "orders.empty_state",
            className: "text-center py-8 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-10 w-10 mx-auto mb-3 opacity-30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No orders yet. Browse our services to get started!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: orders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `orders.item.${idx + 1}`,
            className: "flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card/50 gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground", children: order.service }),
                  (order.category || order.serviceName) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: `text-xs ${CATEGORY_COLORS[order.category || order.serviceName] || ""}`,
                      children: order.category || order.serviceName
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                  "Order #",
                  order.id,
                  " · ",
                  order.date || order.createdAt
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary text-sm", children: [
                  "₹",
                  order.price.toLocaleString("en-IN")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: `text-xs ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-700"}`,
                    children: order.status
                  }
                )
              ] })
            ]
          },
          order.id
        )) }) })
      ] })
    ] })
  ] });
}
export {
  DashboardOverview as default
};
