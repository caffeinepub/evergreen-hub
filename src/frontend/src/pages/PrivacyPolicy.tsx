import { useEffect } from "react";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function PrivacyPolicy() {
  const s1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    document.title = "Privacy Policy - Evergreen Hub";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Hero */}
        <section
          ref={s1.ref}
          className={`mb-12 text-center transition-all duration-700 ${
            s1.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-white text-3xl mb-4">
            🔒
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            We respect your privacy and ensure your data is protected.
          </p>
        </section>

        <section
          ref={s2.ref}
          className={`space-y-6 transition-all duration-700 ${
            s2.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* 1. Info Collected */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              Information We Collect
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Name", "Email", "Contact details", "Project files"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex flex-col items-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                  >
                    <span className="text-2xl mb-1">
                      {item === "Name"
                        ? "👤"
                        : item === "Email"
                          ? "📧"
                          : item === "Contact details"
                            ? "📱"
                            : "📁"}
                    </span>
                    <span className="text-xs font-medium text-center text-foreground">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* 2. How We Use */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-bold">
                2
              </span>
              How We Use Data
            </h2>
            <ul className="space-y-2">
              {[
                "To complete your order",
                "To improve services",
                "For customer support",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2 text-foreground">
                  <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Data Protection */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-bold">
                3
              </span>
              Data Protection
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <p className="text-2xl mb-1">🛡️</p>
                <p className="font-semibold text-sm text-foreground">
                  Your data is safe and never sold.
                </p>
              </div>
              <div className="flex-1 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <p className="text-2xl mb-1">🔐</p>
                <p className="font-semibold text-sm text-foreground">
                  We use secure systems to protect information.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Third-party */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">
                4
              </span>
              Third-party Sharing
            </h2>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <span className="text-2xl">🚫</span>
              <p className="text-foreground font-medium">
                We do not share your data with third parties.
              </p>
            </div>
          </div>

          {/* 5. Cookies */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center text-sm font-bold">
                5
              </span>
              Cookies
            </h2>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800">
              <span className="text-2xl">🍪</span>
              <p className="text-foreground">
                We may use cookies to improve user experience.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={s3.ref}
          className={`mt-8 transition-all duration-700 ${
            s3.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border border-purple-200 dark:border-purple-800 p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-foreground mt-2">
              For data-related queries, contact us via WhatsApp or our contact
              form.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
}
