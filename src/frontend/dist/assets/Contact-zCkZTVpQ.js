import { j as jsxRuntimeExports, H as Header, M as MessageCircle, n as Button, P as Phone, o as ContactInterestForm, I as InstagramSection, F as Footer, p as FloatingWhatsAppButton } from "./index-DHWa7f2a.js";
function Contact() {
  const whatsappNumber = "919263989760";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-24 pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: "Get in Touch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground", children: "Have questions? We're here to help you succeed!" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-10 mb-16 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-8 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-500/10 p-3 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-6 w-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "WhatsApp" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "Get instant support and quick responses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: () => window.open(
                    whatsappUrl,
                    "_blank",
                    "noopener,noreferrer"
                  ),
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                    "Chat Now"
                  ]
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-8 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-emerald-500/10 p-3 rounded-lg flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-6 w-6 text-emerald-500" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-3", children: "Call us for personalized assistance" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: `tel:+${whatsappNumber}`,
                  className: "text-emerald-500 hover:text-emerald-400 font-semibold transition-colors",
                  children: "+91 9263989760"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-emerald-950/20 to-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground mb-2", children: "Ready to Start Your Journey?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Join thousands of successful affiliate marketers who have transformed their lives with our courses." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => window.open(whatsappUrl, "_blank", "noopener,noreferrer"),
                className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
                  "Start Learning Today"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-8 soft-shadow", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Send Us a Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Form bharo — seedha hamare WhatsApp pe aa jayega (new tab mein khulega, page redirect nahi hoga)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContactInterestForm, {})
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InstagramSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWhatsAppButton, {})
  ] });
}
export {
  Contact as default
};
