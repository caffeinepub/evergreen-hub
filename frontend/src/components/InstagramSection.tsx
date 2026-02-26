import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SiInstagram } from 'react-icons/si';
import { ExternalLink, Heart } from 'lucide-react';

const INSTAGRAM_URL = 'https://www.instagram.com/evergreenhub2026?igsh=bm1icXo1bWxrNTMw';

export default function InstagramSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div
          className="rounded-2xl p-8 text-center text-white"
          style={{
            background: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
          }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <SiInstagram className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Follow Us on Instagram</h2>
          <p className="text-white/80 mb-2 font-medium">@evergreenhub2026</p>
          <p className="text-white/70 text-sm mb-6">
            Get daily motivation, tips, and behind-the-scenes content. Follow us for your daily dose of digital inspiration!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-pink-600 hover:bg-white/90 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <Heart className="w-4 h-4" />
              Follow Us
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
