import { l as useScrollAnimation, r as reactExports, j as jsxRuntimeExports, H as Header, F as Footer, k as FloatingWhatsAppButton, m as ScrollToTopButton } from "./index-Bg1cP8Tr.js";
function RefundPolicy() {
  const s1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  reactExports.useEffect(() => {
    document.title = "Refund Policy - Evergreen Hub";
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white text-3xl mb-4", children: "💸" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-primary mb-3", children: "Refund Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We want you to be satisfied with our services." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: s2.ref,
          className: `space-y-6 transition-all duration-700 ${s2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm border-green-200 dark:border-green-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✅" }),
                " Full Refund Conditions"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
                "If work has NOT started",
                "If you cancel within initial stage"
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/30",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold", children: "✓" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: s })
                  ]
                },
                s
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm border-amber-200 dark:border-amber-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✅" }),
                " Partial Refund"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold", children: "~" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "If work is partially completed" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm border-red-200 dark:border-red-800", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "❌" }),
                " No Refund"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: [
                "If project is completed and delivered",
                "If delay is caused by user"
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold", children: "✗" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: s })
                  ]
                },
                s
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 p-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "💬" }),
                " Special Condition"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "👉" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "If you don't like the final result, you can request a refund after review." })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          ref: s3.ref,
          className: `mt-8 transition-all duration-700 ${s3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "Last updated:",
              " ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-2", children: "For refund requests, contact us via WhatsApp or our contact form." })
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
  RefundPolicy as default
};
