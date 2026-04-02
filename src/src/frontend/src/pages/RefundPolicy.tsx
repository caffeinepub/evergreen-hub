import { useEffect } from "react";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function RefundPolicy() {
  const s1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    document.title = "Refund Policy - Evergreen Hub";
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white text-3xl mb-4">
            💸
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Refund Policy
          </h1>
          <p className="text-muted-foreground">
            We want you to be satisfied with our services.
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
          {/* Full Refund */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm border-green-200 dark:border-green-800">
            <h2 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">✅</span> Full Refund Conditions
            </h2>
            <ul className="space-y-3">
              {[
                "If work has NOT started",
                "If you cancel within initial stage",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/30"
                >
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                    ✓
                  </span>
                  <span className="text-foreground font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Partial Refund */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm border-amber-200 dark:border-amber-800">
            <h2 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">✅</span> Partial Refund
            </h2>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">
                ~
              </span>
              <span className="text-foreground font-medium">
                If work is partially completed
              </span>
            </div>
          </div>

          {/* No Refund */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm border-red-200 dark:border-red-800">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">❌</span> No Refund
            </h2>
            <ul className="space-y-3">
              {[
                "If project is completed and delivered",
                "If delay is caused by user",
              ].map((s) => (
                <li
                  key={s}
                  className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/30"
                >
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
                    ✗
                  </span>
                  <span className="text-foreground font-medium">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Condition */}
          <div className="rounded-2xl border bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 p-6">
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
              <span className="text-2xl">💬</span> Special Condition
            </h2>
            <div className="flex items-start gap-3">
              <span className="text-2xl">👉</span>
              <p className="text-foreground font-medium">
                If you don't like the final result, you can request a refund
                after review.
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
          <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800 p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-foreground mt-2">
              For refund requests, contact us via WhatsApp or our contact form.
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
