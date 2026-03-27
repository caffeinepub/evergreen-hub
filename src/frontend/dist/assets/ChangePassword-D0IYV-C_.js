import { j as jsxRuntimeExports, w as Info } from "./index-DW6oDmMl.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BIfxuzP4.js";
function ChangePassword() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-gray-900 dark:text-gray-100", children: "Change Password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Account security settings" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "max-w-2xl bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-gray-900 dark:text-gray-100 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-5 w-5 text-blue-500" }),
          "Password Management"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-gray-600 dark:text-gray-400", children: "About your account security" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-800 dark:text-blue-200 font-medium", children: "This platform uses Internet Identity for authentication." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-700 dark:text-blue-300", children: "Internet Identity is a secure, passwordless authentication system. Your account is protected by your device's biometrics or security key — there is no traditional password to change." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-blue-700 dark:text-blue-300", children: [
          "To manage your Internet Identity security settings, visit",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "https://identity.ic0.app",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "underline font-medium hover:text-blue-900 dark:hover:text-blue-100",
              children: "identity.ic0.app"
            }
          ),
          "."
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ChangePassword as default
};
