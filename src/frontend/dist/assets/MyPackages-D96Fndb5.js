import { G as useActor, J as useQuery, j as jsxRuntimeExports, C as Card, k as CardContent, K as Package, f as CardHeader, h as CardTitle, i as CardDescription, N as CreditCard, B as Badge } from "./index-SgGMw7jr.js";
import { C as Calendar } from "./calendar-MC89Xx42.js";
function MyPackages() {
  const { actor } = useActor();
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
  const getPackageName = (packageId) => {
    const pkg = packages.find((p) => p.id === packageId);
    return (pkg == null ? void 0 : pkg.name) || "Unknown Package";
  };
  const getPackagePrice = (packageId) => {
    const pkg = packages.find((p) => p.id === packageId);
    return pkg ? `₹${pkg.price}` : "N/A";
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
      case "rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Rejected" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: status });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading your packages..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: "My Packages" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "View all your purchased packages and payment status" })
    ] }),
    paymentProofs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-16 w-16 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-2", children: "No Packages Yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center max-w-md", children: "You haven't purchased any packages yet. Browse our pricing section to get started!" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6", children: paymentProofs.map((proof) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: getPackageName(proof.packageId) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-2xl font-bold text-emerald-500 mt-2", children: getPackagePrice(proof.packageId) })
        ] }),
        getStatusBadge(proof.status)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Transaction ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold", children: proof.transactionId })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Purchase Date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: new Date(
                Number(proof.createdAt) / 1e6
              ).toLocaleDateString() })
            ] })
          ] })
        ] }),
        proof.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-yellow-600 dark:text-yellow-500", children: "Your payment is being verified. This usually takes up to 24 hours." }) }),
        proof.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-green-600 dark:text-green-500", children: "Payment verified! You now have access to all courses in this package." }) }),
        proof.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600 dark:text-red-500", children: "Payment verification failed. Please contact support for assistance." }) })
      ] })
    ] }, proof.id.toString())) })
  ] });
}
export {
  MyPackages as default
};
