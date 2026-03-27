import { u as useNavigate, a as useAuth, r as reactExports, e as ue, j as jsxRuntimeExports, f as Shield, A as Alert, C as CircleAlert, g as AlertDescription, B as Button, d as Link } from "./index-DW6oDmMl.js";
import { B as Badge } from "./badge-CoZzXXUi.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BIfxuzP4.js";
function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin, isInitializing } = useAuth();
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (isAuthenticated && !isInitializing) {
      if (isAdmin) {
        navigate({ to: "/admin/stats" });
      } else {
        ue.error("Access denied. Admin privileges required.");
        navigate({ to: "/dashboard" });
      }
    }
  }, [isAuthenticated, isAdmin, isInitializing, navigate]);
  const handleLogin = async () => {
    setLoading(true);
    try {
      await login();
    } catch (error) {
      console.error("Login error:", error);
      ue.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-primary/10 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md border-primary/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "gap-1 px-3 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
        "Admin Access"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-bold text-center", children: "Admin Panel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-center", children: "Secure login for administrators only" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "Admin authentication uses Internet Identity with role verification. Only authorized administrators can access the admin panel." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleLogin, className: "w-full", disabled: loading, children: loading ? "Authenticating..." : "Login as Admin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-primary hover:underline", children: "← Back to Home" }) })
    ] })
  ] }) });
}
export {
  AdminLogin as default
};
