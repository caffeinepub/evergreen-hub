import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, H as Heart, y as BookOpen, U as Users, S as Shield, z as useScrollAnimation } from "./index-DLWhZ6P8.js";
import { E as Eye } from "./eye-C8zwLIoC.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function AnimatedSection({
  children,
  className = ""
}) {
  const { ref, isVisible } = useScrollAnimation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: `transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`,
      children
    }
  );
}
function AboutUs() {
  reactExports.useEffect(() => {
    document.title = "About Us | Evergreen Hub";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-4 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-4 h-4" }),
        "About Evergreen Hub"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl font-extrabold mb-4 leading-tight", children: [
        "Empowering Digital",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "Entrepreneurs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-emerald-100/80 text-lg leading-relaxed", children: "We are on a mission to make digital skills and online income accessible to everyone in India." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-emerald-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Who We Are" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-lg mb-4", children: "Evergreen Hub is a digital education platform dedicated to helping individuals across India build sustainable online income streams through affiliate marketing, digital skills, and entrepreneurship." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "Founded with a vision to bridge the gap between traditional education and the digital economy, we provide practical, actionable courses that deliver real results." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Our Mission" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-lg mb-4", children: "To democratize digital education and make online income opportunities accessible to every aspiring entrepreneur in India, regardless of their background or prior experience." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We believe that with the right knowledge, tools, and community support, anyone can build a successful online business and achieve financial freedom." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground mb-8", children: "What We Offer" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        {
          icon: BookOpen,
          title: "Comprehensive Courses",
          desc: "From beginner to advanced, our courses cover affiliate marketing, social media, SEO, and more.",
          color: "emerald"
        },
        {
          icon: Users,
          title: "Community Support",
          desc: "Join a vibrant community of learners and entrepreneurs who support each other's growth.",
          color: "blue"
        },
        {
          icon: Shield,
          title: "Proven Strategies",
          desc: "Learn battle-tested strategies that have helped real people build real online income.",
          color: "orange"
        }
      ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color === "emerald" ? "bg-emerald-100 dark:bg-emerald-900/30" : item.color === "blue" ? "bg-blue-100 dark:bg-blue-900/30" : "bg-orange-100 dark:bg-orange-900/30"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              item.icon,
              {
                className: `w-6 h-6 ${item.color === "emerald" ? "text-emerald-600" : item.color === "blue" ? "text-blue-600" : "text-orange-600"}`
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-foreground mb-2", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: item.desc })
      ] }) }, item.color)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-blue-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Why Choose Us" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        "Expert instructors with real-world experience",
        "Practical, hands-on learning approach",
        "Lifetime access to course materials",
        "Active community and peer support",
        "Regular content updates",
        "Dedicated WhatsApp support"
      ].map((point) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-xs font-bold", children: "✓" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: point })
      ] }, point)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-6 h-6 text-purple-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Our Vision" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-lg mb-4", children: "To become India's most trusted digital education platform, empowering millions of individuals to achieve financial independence through digital skills and online entrepreneurship." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We envision a future where geography and background are no barriers to success in the digital economy." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 px-4 bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatedSection, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-6 h-6 text-emerald-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Commitment to Transparency" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-lg mb-4", children: "We believe in complete transparency with our students. Our courses clearly outline what you will learn, what results are realistic, and what effort is required." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: "We do not make unrealistic income promises. Success in digital marketing requires dedication, consistent effort, and continuous learning. We provide the tools and knowledge — your success depends on your commitment." })
    ] }) }) })
  ] });
}
export {
  AboutUs as default
};
