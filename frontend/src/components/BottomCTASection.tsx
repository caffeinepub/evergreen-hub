import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowRight } from 'lucide-react';

export default function BottomCTASection() {
  const { ref, isVisible } = useScrollAnimation();

  const handleScroll = () => {
    const el = document.getElementById('courses');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white text-center">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Start Learning Today
        </h2>
        <p className="text-emerald-100/80 text-lg mb-8 max-w-xl mx-auto">
          Take the first step towards your digital income journey. Expert guidance, practical skills, and a supportive community await you.
        </p>
        <button
          onClick={handleScroll}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-lg"
          style={{ boxShadow: '0 0 30px rgba(249,115,22,0.3)' }}
        >
          Explore Courses <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
