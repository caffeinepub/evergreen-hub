import { n as useScrollAnimation, r as reactExports, j as jsxRuntimeExports, H as Header, F as Footer, l as FloatingWhatsAppButton, m as ScrollToTopButton } from "./index-Bxztzs8-.js";
function PrivacyPolicy() {
  const s1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  reactExports.useEffect(() => {
    document.title = "Privacy Policy - Evergreen Hub";
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white text-3xl mb-4", children: "🔒" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-primary mb-3", children: "Privacy Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We respect your privacy and ensure your data is protected." })
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold", children: "1" }),
                "Information We Collect"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: ["Name", "Email", "Contact details", "Project files"].map(
                (item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex flex-col items-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl mb-1", children: item === "Name" ? "👤" : item === "Email" ? "📧" : item === "Contact details" ? "📱" : "📁" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-center text-foreground", children: item })
                    ]
                  },
                  item
                )
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-bold", children: "2" }),
                "How We Use Data"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: [
                "To complete your order",
                "To improve services",
                "For customer support"
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs", children: "✓" }),
                s
              ] }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-bold", children: "3" }),
                "Data Protection"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-1", children: "🛡️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Your data is safe and never sold." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl mb-1", children: "🔐" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "We use secure systems to protect information." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold", children: "4" }),
                "Third-party Sharing"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🚫" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "We do not share your data with third parties." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 shadow-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold text-accent mb-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center text-sm font-bold", children: "5" }),
                "Cookies"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🍪" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: "We may use cookies to improve user experience." })
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
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-200 dark:border-purple-800 p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
              "Last updated:",
              " ",
              (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground mt-2", children: "For data-related queries, contact us via WhatsApp or our contact form." })
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
  PrivacyPolicy as default
};
