import {
  Camera,
  Globe,
  Heart,
  Shield,
  Target,
  Users,
  Video,
} from "lucide-react";
import type React from "react";
import { useEffect } from "react";
import FloatingWhatsAppButton from "../components/FloatingWhatsAppButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTopButton from "../components/ScrollToTopButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function AnimatedSection({
  children,
  className = "",
}: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutUs() {
  useEffect(() => {
    document.title =
      "About Us | Evergreen Hub - Professional Web Design, Video & Photo Editing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Evergreen Hub provides professional web design, video editing, and photo editing services to coaching institutes, local businesses, bloggers, and affiliate marketers across India.",
      );
    }
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white text-center">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              About Evergreen Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Professional Digital{" "}
              <span className="text-emerald-400">Services</span>
            </h1>
            <p className="text-emerald-100/80 text-lg leading-relaxed">
              We help businesses and creators grow online with expert web
              design, video editing, and photo editing services.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Globe className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Evergreen Hub is a professional services platform founded by Rudra
              Pratap Singh from Bihar. We specialize in delivering high-quality
              web design, video editing, and photo editing services to clients
              across India and beyond.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Our mission is simple: help coaching institutes, local businesses,
              bloggers, and affiliate marketers build a powerful online presence
              without the complexity or high costs typically associated with
              digital services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              What We Offer
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">Web Design</h3>
                <p className="text-muted-foreground text-sm">
                  From a simple landing page to a full multi-page website —
                  clean, fast, and mobile-first designs tailored for your
                  business.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Video className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Video Editing
                </h3>
                <p className="text-muted-foreground text-sm">
                  Professional video editing for YouTube, Instagram Reels, and
                  long-form content — with add-ons like thumbnails, color
                  grading, and motion graphics.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-7 h-7 text-pink-600" />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Photo Editing
                </h3>
                <p className="text-muted-foreground text-sm">
                  From basic color correction to advanced skin retouching and
                  background removal — delivering studio-quality results.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Who We Serve
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Coaching Institutes looking for a professional website",
                "Local businesses needing an online presence",
                "Bloggers and content creators wanting a portfolio",
                "Affiliate marketers building high-converting landing pages",
                "YouTube creators needing consistent video editing",
                "Businesses wanting high-quality photo editing at scale",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/40"
                >
                  <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Our Mission
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              At Evergreen Hub, our mission is to combine modern design, smart
              functionality, and high-quality creative work to deliver solutions
              that not only look professional but also drive real results.
              Whether you're starting your first website, boosting your online
              presence, or creating engaging marketing content, we make sure
              your business stands out in the digital world.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppButton />
      <ScrollToTopButton />
    </main>
  );
}
