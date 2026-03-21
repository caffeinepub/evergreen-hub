import { q as useScrollAnimation, r as reactExports, j as jsxRuntimeExports, H as Header, F as Footer, p as FloatingWhatsAppButton, s as ScrollToTopButton } from "./index-DHWa7f2a.js";
function PrivacyPolicy() {
  const section1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section4 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section5 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const lastUpdated = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  reactExports.useEffect(() => {
    document.title = "Privacy Policy - Evergreen Hub | Data Protection & User Rights";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Evergreen Hub Privacy Policy: Learn how we protect your personal information, data security practices, GDPR-style privacy standards, and user rights for our digital education platform."
      );
    }
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute(
        "content",
        "privacy policy, data protection, user rights, digital education, online courses, Evergreen Hub, affiliate marketing training, GDPR compliance, personal information security"
      );
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto px-4 py-16 md:py-24 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: section1.ref,
          className: `mb-12 transition-all duration-700 ${section1.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: { transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-primary mb-4 text-center", children: "Privacy Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-muted-foreground text-sm", children: [
              "Last Updated: ",
              lastUpdated
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: section2.ref,
          className: `mb-12 transition-all duration-700 ${section2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: { transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Introduction" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "Welcome to Evergreen Hub. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our online educational platform for digital courses and affiliate marketing training." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: "By accessing or using Evergreen Hub, you agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, please discontinue use of our platform immediately." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: section3.ref,
          className: `mb-12 transition-all duration-700 ${section3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: { transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Information We Collect" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: "Personal Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "When you register or interact with our platform, we may collect the following personal information:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-6 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Full name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Email address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Phone number (if provided)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Account credentials and authentication data" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Profile information you choose to provide" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: "Payment Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-6", children: "All payment transactions are processed through secure third-party payment providers. We do not store your complete credit card or debit card information on our servers. Payment processors may collect billing information, transaction details, and payment method information necessary to complete your purchase." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-foreground mb-3", children: "Usage Data & Analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "We automatically collect certain information about your device and how you interact with our platform, including:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "IP address and geographic location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Browser type and version" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Device information (operating system, device type)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pages visited, time spent on pages, and navigation patterns" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Referral sources and exit pages" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Course enrollment and completion data" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: section4.ref,
          className: `mb-12 transition-all duration-700 ${section4.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: { transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "How We Use Information" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "We use the information we collect for the following purposes:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To provide, maintain, and improve our educational services" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To process transactions and deliver purchased courses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To communicate with you about your account, courses, and updates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To provide customer support and respond to your inquiries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To personalize your learning experience" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To analyze platform usage and improve our content" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To detect, prevent, and address technical issues or fraudulent activity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To comply with legal obligations and enforce our terms" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed font-semibold", children: "Important: We do not sell, rent, or trade your personal information to third parties for marketing purposes." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: section5.ref,
          className: `mb-12 transition-all duration-700 ${section5.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: { transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Cookies Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "Evergreen Hub uses cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device that help us recognize you, remember your preferences, and analyze site traffic." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "We use the following types of cookies:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Essential Cookies:" }),
                " Required for the platform to function properly"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Performance Cookies:" }),
                " Help us understand how visitors interact with our platform"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Functional Cookies:" }),
                " Remember your preferences and settings"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Analytics Cookies:" }),
                " Collect information about platform usage and performance"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: "You can control cookie settings through your browser preferences. However, disabling certain cookies may affect the functionality of our platform." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Third-Party Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "We may use third-party service providers to facilitate our services, including:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Payment processors (PhonePe, bank transfer services)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Analytics providers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Cloud hosting services" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Customer support tools" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: "These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Data Security" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Encryption of sensitive data in transit and at rest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Regular security audits and vulnerability assessments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Access controls and authentication mechanisms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Secure data storage on the Internet Computer blockchain" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: "However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Data Retention" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we will securely delete or anonymize it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Your Rights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "You have the following rights regarding your personal information:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Access:" }),
            " Request a copy of the personal information we hold about you"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Correction:" }),
            " Request correction of inaccurate or incomplete information"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Deletion:" }),
            " Request deletion of your personal information"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Objection:" }),
            " Object to the processing of your personal information"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Data Portability:" }),
            " Request transfer of your data to another service"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: "To exercise these rights, please contact us via WhatsApp at ********60 or through our contact page." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Children's Privacy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: "Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Changes to This Privacy Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed", children: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a new "Last Updated" date. Your continued use of our platform after such changes constitutes acceptance of the updated policy.' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 p-6 bg-card border border-border rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-accent mb-4", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground leading-relaxed mb-4", children: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "WhatsApp:" }),
            " ********60"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Instagram:" }),
            " @rajput.rudra_s"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Platform:" }),
            " Evergreen Hub"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWhatsAppButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollToTopButton, {})
  ] });
}
export {
  PrivacyPolicy as default
};
