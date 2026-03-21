import { a3 as createLucideIcon, q as useScrollAnimation, r as reactExports, j as jsxRuntimeExports, H as Header, F as Footer, p as FloatingWhatsAppButton, s as ScrollToTopButton } from "./index-SgGMw7jr.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function RefundPolicy() {
  const section1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section4 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const lastUpdated = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  reactExports.useEffect(() => {
    document.title = "Refund Policy - Evergreen Hub | No Refund Terms";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Evergreen Hub Refund Policy: Firm no-refund policy for digital products, all sales final, limited exceptions for duplicate payments or technical failures. Review before purchasing online courses."
      );
    }
    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute(
        "content",
        "refund policy, no refund, digital products, all sales final, online courses, Evergreen Hub, affiliate marketing training, non-refundable, digital education, course purchase terms"
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold text-[#2563EB] mb-4 text-center", children: "Refund Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-muted-foreground text-sm", children: [
              "Last Updated: ",
              lastUpdated
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "section",
        {
          ref: section2.ref,
          className: `mb-12 transition-all duration-700 ${section2.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: { transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border-2 border-red-500 flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8 text-red-500 flex-shrink-0 mt-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-red-600 dark:text-red-400 mb-3", children: "STRICT NO REFUND POLICY" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed font-semibold", children: "Please read this policy carefully before making any purchase. By completing a transaction on Evergreen Hub, you acknowledge and accept that ALL SALES ARE FINAL and NO REFUNDS will be issued under any circumstances except as explicitly stated below." })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "section",
        {
          ref: section3.ref,
          className: `mb-12 transition-all duration-700 ${section3.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
          style: { transitionTimingFunction: "cubic-bezier(0.4, 0.0, 0.2, 1)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Nature of Digital Products" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Evergreen Hub offers digital educational products including online courses, training programs, and affiliate marketing materials. Due to the instant access and downloadable nature of digital products:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All course content is delivered immediately upon successful payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Digital products cannot be "returned" once accessed' }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Course materials are non-transferable and non-refundable" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You gain immediate access to proprietary educational content" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: 'Unlike physical products, digital content cannot be retrieved or "un-delivered" after purchase. Therefore, all sales are considered final at the moment of transaction completion.' })
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "All Sales Are Final" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4 font-semibold text-lg", children: "Once you complete a purchase on Evergreen Hub, the transaction is FINAL and IRREVERSIBLE. No refunds, credits, or exchanges will be provided." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "This policy applies to:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All individual courses and course packages" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All training programs and educational materials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All digital downloads and resources" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All subscription-based services" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All promotional or discounted purchases" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: 'By clicking "Purchase" or "Buy Now," you explicitly acknowledge and agree to this no-refund policy.' })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "No Refund After Purchase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4 font-semibold", children: "Evergreen Hub will NOT issue refunds for any of the following reasons:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "1. Change of Mind" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "If you change your mind after purchase, decide you no longer want the course, or simply regret your decision, no refund will be issued. All purchases are considered final and binding." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "2. Lack of Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "If you do not have sufficient time to complete the course, are too busy, or cannot dedicate the necessary effort to learning, no refund will be provided. Time management is your personal responsibility." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "3. Financial Issues" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "If you experience financial difficulties, unexpected expenses, or can no longer afford the purchase after completion, no refund will be granted. You are responsible for ensuring you can afford the purchase before buying." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "4. Failure to Understand Content" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "If you find the course content difficult to understand, too advanced, too basic, or not aligned with your expectations, no refund will be issued. Course descriptions and previews are provided for your review before purchase." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary p-4 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-foreground mb-2", children: "5. Personal Reasons" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "Any other personal reasons, circumstances, or situations that arise after purchase will not qualify for a refund. This includes but is not limited to: loss of interest, dissatisfaction with results, technical issues on your end, or any other subjective reasons." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed font-semibold", children: "These exclusions are comprehensive and apply without exception. No appeals or special considerations will be made." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Responsibility to Review Course Details Before Purchase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "It is YOUR RESPONSIBILITY to thoroughly review all course information before making a purchase. This includes:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reading complete course descriptions and curriculum details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reviewing course objectives, learning outcomes, and prerequisites" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Watching any available preview videos or sample content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Understanding the course format, duration, and delivery method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Verifying that the course meets your specific needs and expectations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Ensuring you have the necessary technical requirements and skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Reading and understanding this Refund Policy in its entirety" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "We provide detailed information about each course to help you make an informed decision. By proceeding with a purchase, you confirm that:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You have read and understood all course details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The course meets your requirements and expectations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You accept full responsibility for your purchase decision" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You agree to the no-refund policy without reservation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed font-semibold", children: "Failure to review course details before purchase does not constitute grounds for a refund." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border-2 border-red-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-4", children: "Chargeback Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4 font-semibold", children: "IMPORTANT: Filing an unauthorized chargeback or payment dispute with your bank or credit card company is considered a serious violation of our Terms of Service and may result in severe consequences." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "If you initiate a chargeback or payment dispute without valid grounds (such as fraud or unauthorized transaction), the following actions will be taken immediately:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Account Suspension:" }),
            " Your account will be permanently suspended without warning"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Revocation of Course Access:" }),
            " All access to purchased courses and materials will be immediately revoked"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Blacklist:" }),
            " Your account, email address, and payment information will be blacklisted from future purchases"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Legal Action:" }),
            " We reserve the right to pursue legal action to recover costs, damages, and legal fees"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reporting:" }),
            " Fraudulent chargebacks may be reported to relevant authorities and credit agencies"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Valid reasons for chargebacks include:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Unauthorized transaction (fraud or stolen card)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Duplicate charge for the same purchase" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Technical error resulting in incorrect charge amount" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed font-semibold", children: "Before initiating a chargeback, you MUST contact us via the official website contact form to resolve any billing issues. We are committed to addressing legitimate concerns promptly and professionally." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Limited Exception" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "Refunds may ONLY be considered in the following extremely limited circumstances:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Verified Duplicate Payment:" }),
            " If you are charged multiple times for the same purchase due to a technical error, and we can verify the duplicate transaction in our system"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Technical Access Failure:" }),
            " If you are unable to access your purchased course due to a verified technical issue on our platform that we cannot resolve within a reasonable timeframe (typically 7-14 business days)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "To request consideration under these limited exceptions, you must:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Contact us immediately via the official website contact form" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide detailed information about the issue, including transaction details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide proof of the duplicate payment or technical access failure" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Allow us reasonable time to investigate and attempt to resolve the issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Cooperate fully with our support team during the investigation" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4 font-semibold", children: "Even in these limited cases, refunds are granted at our sole discretion after thorough investigation. We reserve the right to offer alternative solutions such as account credit, course transfer, or technical support instead of a monetary refund." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed", children: "These exceptions do NOT apply to:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Technical issues on your end (internet connection, device compatibility, browser issues)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Failure to access courses due to forgotten passwords or account issues" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Dissatisfaction with course content, quality, or teaching style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: 'Any of the reasons listed in the "No Refund After Purchase" section' })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 bg-secondary p-6 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "If you have questions about this Refund Policy or need to report a verified duplicate payment or technical access failure, please contact us only via the official website contact form." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4", children: "When contacting us, please provide:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your full name and account email address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Transaction ID or order number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Detailed description of the issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Supporting documentation (screenshots, receipts, etc.)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed font-semibold", children: "We will respond to all legitimate inquiries within 3-5 business days. Please note that contacting us does not guarantee a refund and all decisions are final." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12 bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border-2 border-[#F59E0B]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4", children: "Final Notice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed mb-4 font-semibold text-lg", children: "By making a purchase on Evergreen Hub, you explicitly acknowledge that:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-4 text-foreground/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You have read and fully understand this Refund Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You agree to the strict no-refund terms without reservation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You accept full responsibility for your purchase decision" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You will not initiate unauthorized chargebacks or payment disputes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "All sales are final and non-refundable except as explicitly stated" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 leading-relaxed font-semibold", children: "This Refund Policy is effective as of the date listed above and supersedes all previous refund policies. Evergreen Hub reserves the right to modify this policy at any time without prior notice." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingWhatsAppButton, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollToTopButton, {})
  ] });
}
export {
  RefundPolicy as default
};
