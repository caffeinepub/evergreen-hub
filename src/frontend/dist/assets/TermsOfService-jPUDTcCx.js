import { n as useScrollAnimation, r as reactExports, j as jsxRuntimeExports, H as Header, F as Footer, l as FloatingWhatsAppButton, m as ScrollToTopButton } from "./index-DtQIrmWF.js";
function TermsOfService() {
  const s1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  reactExports.useEffect(() => {
    document.title = "Terms of Service - Evergreen Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-16 md:py-24 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: s1.ref,
          className: `mb-12 text-center transition-all duration-700 ${s1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl mb-4", children: "🔐" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-primary mb-3", children: "Terms of Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Welcome to our website. By using our services, you agree to the following terms." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: s2.ref,
          className: `space-y-6 transition-all duration-700 ${s2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold", children: "1" }),
                "Services"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mb-3", children: "We provide digital services including:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: ["Video Editing", "Photo Editing", "Web Design Services"].map(
                (s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-center gap-2 text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 shrink-0" }),
                      s
                    ]
                  },
                  s
                )
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-bold", children: "2" }),
                "User Responsibility"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
                "You must provide correct project details.",
                "Any misuse or illegal content is strictly prohibited."
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-2" }),
                s
              ] }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-bold", children: "3" }),
                "Payments"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
                "All services require payment before delivery (unless stated otherwise).",
                "Prices may vary depending on project complexity."
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-green-500 shrink-0 mt-2" }),
                s
              ] }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold", children: "4" }),
                "Delivery"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
                "Delivery time depends on the service selected.",
                "Delays may occur in case of revisions or incomplete information."
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" }),
                s
              ] }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center text-sm font-bold", children: "5" }),
                "Revisions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
                "Limited revisions are included.",
                "Extra revisions may be chargeable."
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-2" }),
                s
              ] }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-bold", children: "6" }),
                "Termination"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: "We reserve the right to cancel any order if terms are violated." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          ref: s3.ref,
          className: `mt-8 transition-all duration-700 ${s3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "Last updated:",
              " ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-2", children: "Questions? Contact us via WhatsApp or our contact form." })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWhatsAppButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollToTopButton, {})
  ] });
}
export {
  TermsOfService as default
};
