import { ArrowRight } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function BottomCTASection() {
  const { ref, isVisible } = useScrollAnimation();

  const handleScroll = () => {
    const el =
      document.getElementById("web-design-promo") ||
      document.getElementById("video-editing-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white text-center">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Grow Your Business Online
        </h2>
        <p className="text-emerald-100/80 text-lg mb-8 max-w-xl mx-auto">
          Professional web design, video editing, aur photo editing services ke
          liye aaj hi contact karein.
        </p>
        <button
          type="button"
          onClick={handleScroll}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{ boxShadow: "0 0 30px rgba(249,115,22,0.3)" }}
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
