import { a as useAuth, j as jsxRuntimeExports, U as User } from "./index-DW6oDmMl.js";
import { B as Badge } from "./badge-CoZzXXUi.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BIfxuzP4.js";
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
  const { userProfile } = useAuth();
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", children: "Active" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "capitalize", children: (userProfile == null ? void 0 : userProfile.role) || "user" })
            ] })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  DashboardOverview as default
};
