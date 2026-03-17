import { z as useScrollAnimation, r as reactExports, j as jsxRuntimeExports, D as Header, J as Footer, K as FloatingWhatsAppButton, N as ScrollToTopButton } from "./index-DLWhZ6P8.js";
function TermsOfService() {
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
    document.title = "Terms of Service - Evergreen Hub | User Agreement";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Evergreen Hub Terms of Service: User agreement, course access terms, lifetime access, intellectual property rights, payment terms, and no income guarantee disclaimer for our digital education platform."
      );
    }
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute(
        "content",
        "terms of service, user agreement, terms and conditions, digital education, online courses, Evergreen Hub, affiliate marketing training, course access, legal terms, user responsibilities"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#2563EB] mb-4 text-center", children: "Terms of Service" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Acceptance of Terms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Welcome to Evergreen Hub. By accessing, browsing, or using our online educational platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "These Terms constitute a legally binding agreement between you and Evergreen Hub. If you do not agree with any part of these Terms, you must immediately discontinue use of our platform and services." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "We reserve the right to modify these Terms at any time. Your continued use of the platform after changes are posted constitutes acceptance of the modified Terms." })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Eligibility to Use Website" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "To use Evergreen Hub, you must:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Be at least 18 years of age or the age of majority in your jurisdiction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Have the legal capacity to enter into binding contracts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide accurate, current, and complete information during registration" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not be prohibited from using our services under applicable laws" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not have been previously suspended or banned from our platform" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "By creating an account, you represent and warrant that you meet all eligibility requirements. We reserve the right to verify your eligibility and refuse service to anyone at our sole discretion." })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "User Account Responsibility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "When you create an account with Evergreen Hub, you are responsible for:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Maintaining the confidentiality of your account credentials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All activities that occur under your account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Ensuring your account information remains accurate and up-to-date" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Notifying us immediately of any unauthorized access or security breach" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Not sharing your account with others or allowing others to access your account" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "You agree not to create multiple accounts, use false identities, or impersonate any person or entity. We are not liable for any loss or damage arising from your failure to protect your account information." })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Course Access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Upon successful purchase of a course or package, you will receive lifetime access to the course materials unless otherwise stated at the time of purchase. This includes:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Access to all course videos, materials, and resources" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Future updates and improvements to the course content" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Access through your personal account on our platform" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "However, we reserve the right to:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Modify, update, or discontinue courses at any time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Revoke access if you violate these Terms of Service" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Suspend access for maintenance or technical reasons" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Terminate your account for breach of terms or fraudulent activity" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "Course access is for personal use only. You may not share, distribute, or resell course content without explicit written permission from Evergreen Hub." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Intellectual Property Rights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "All content on Evergreen Hub, including but not limited to courses, videos, text, graphics, logos, images, audio clips, digital downloads, and software, is the exclusive property of Evergreen Hub or its content creators and is protected by copyright, trademark, and other intellectual property laws." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "You are granted a limited, non-exclusive, non-transferable license to access and use the course materials for personal educational purposes only. You may not:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Copy, reproduce, distribute, or publicly display course content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Modify, adapt, or create derivative works from our content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reverse engineer, decompile, or disassemble any software or materials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Remove or alter any copyright, trademark, or proprietary notices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Use our content for commercial purposes without authorization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Share login credentials or course access with unauthorized users" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "Unauthorized use of our intellectual property may result in immediate termination of your account and legal action." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Payment Terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "All prices displayed on Evergreen Hub are in the specified currency and are subject to change without notice. By making a purchase, you agree to:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Pay all fees and charges associated with your purchase" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide accurate and complete payment information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Authorize us to charge your selected payment method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Be responsible for all applicable taxes and fees" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Payment processing is handled by secure third-party payment providers. We do not store your complete payment card information. All transactions are final and subject to our Refund Policy." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "In the event of payment disputes, chargebacks, or fraudulent transactions, we reserve the right to suspend or terminate your account and take appropriate legal action." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border-2 border-[#F59E0B]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "No Income Guarantee Disclaimer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4 font-semibold", children: "IMPORTANT: Evergreen Hub provides educational content and training related to affiliate marketing, digital skills, and online business strategies. However, we make NO GUARANTEES regarding income, earnings, or financial results." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Any income claims, earnings examples, or success stories presented on our platform are for illustrative purposes only and do not represent typical results. Individual results will vary significantly based on numerous factors including but not limited to:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Individual effort, dedication, and time commitment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Prior experience and skill level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Market conditions and competition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Implementation of strategies and techniques" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "External economic factors beyond our control" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Personal circumstances and resources available" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4 font-semibold", children: "Results vary based on individual effort, experience, and market conditions. Success in affiliate marketing or any online business requires hard work, persistence, and often involves financial risk." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "By purchasing our courses, you acknowledge that you understand there are no guaranteed outcomes and that your success depends entirely on your own actions and circumstances. Evergreen Hub is not responsible for your business decisions or financial results." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Prohibited Activities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "You agree not to engage in any of the following prohibited activities:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Violating any applicable laws, regulations, or third-party rights" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sharing, distributing, or reselling course content without authorization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Using the platform for fraudulent, illegal, or unauthorized purposes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Attempting to gain unauthorized access to our systems or other user accounts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Uploading viruses, malware, or any harmful code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Harassing, threatening, or abusing other users or staff" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Impersonating any person or entity or misrepresenting your affiliation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Scraping, data mining, or extracting data from our platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Interfering with the proper functioning of the platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Creating multiple accounts to circumvent restrictions or bans" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Posting spam, promotional content, or unsolicited communications" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "Violation of these prohibitions may result in immediate termination of your account, forfeiture of access to purchased courses, and potential legal action." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Limitation of Liability" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, EVERGREEN HUB AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Loss of profits, revenue, or business opportunities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Loss of data or information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Business interruption or loss of goodwill" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Personal injury or property damage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Any other pecuniary loss" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or otherwise) and whether or not we have been advised of the possibility of such damages." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Our total liability to you for any claims arising from your use of the platform shall not exceed the amount you paid to Evergreen Hub in the twelve (12) months preceding the claim." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Termination / Account Suspension" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "We reserve the right to suspend, restrict, or terminate your account and access to our platform at any time, with or without notice, for any reason, including but not limited to:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Violation of these Terms of Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Fraudulent, abusive, or illegal activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Chargebacks or payment disputes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Sharing account credentials or course content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Harassment of other users or staff" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Any conduct that we deem harmful to our platform or community" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Upon termination:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your access to all courses and materials will be immediately revoked" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You will not be entitled to any refund of fees paid" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All licenses granted to you will terminate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You must cease all use of our platform and content" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "You may terminate your account at any time by contacting us via the official website contact form. However, termination does not entitle you to any refund of fees previously paid." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Governing Law" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our platform shall be subject to the exclusive jurisdiction of the courts located in India." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 bg-secondary p-6 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "If you have any questions about these Terms of Service, please contact us:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-foreground/90", children: [
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
  TermsOfService as default
};
