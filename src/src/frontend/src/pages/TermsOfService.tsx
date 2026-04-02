import { useEffect } from "react";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function TermsOfService() {
  const s1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const s3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    document.title = "Terms of Service - Evergreen Hub";
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-3xl mb-4">
            🔐
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">
            Welcome to our website. By using our services, you agree to the
            following terms.
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
          {/* 1. Services */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">
                1
              </span>
              Services
            </h2>
            <p className="text-foreground mb-3">
              We provide digital services including:
            </p>
            <ul className="space-y-2">
              {["Video Editing", "Photo Editing", "Web Design Services"].map(
                (s) => (
                  <li
                    key={s}
                    className="flex items-center gap-2 text-foreground"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    {s}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* 2. User Responsibility */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm font-bold">
                2
              </span>
              User Responsibility
            </h2>
            <ul className="space-y-2">
              {[
                "You must provide correct project details.",
                "Any misuse or illegal content is strictly prohibited.",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0 mt-2" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Payments */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-bold">
                3
              </span>
              Payments
            </h2>
            <ul className="space-y-2">
              {[
                "All services require payment before delivery (unless stated otherwise).",
                "Prices may vary depending on project complexity.",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-2" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Delivery */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-sm font-bold">
                4
              </span>
              Delivery
            </h2>
            <ul className="space-y-2">
              {[
                "Delivery time depends on the service selected.",
                "Delays may occur in case of revisions or incomplete information.",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Revisions */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center text-sm font-bold">
                5
              </span>
              Revisions
            </h2>
            <ul className="space-y-2">
              {[
                "Limited revisions are included.",
                "Extra revisions may be chargeable.",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2 text-foreground">
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-2" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* 6. Termination */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-bold text-accent mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-bold">
                6
              </span>
              Termination
            </h2>
            <p className="text-foreground">
              We reserve the right to cancel any order if terms are violated.
            </p>
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
          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-foreground mt-2">
              Questions? Contact us via WhatsApp or our contact form.
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
