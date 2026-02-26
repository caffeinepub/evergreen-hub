import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SiFacebook } from 'react-icons/si';
import { ExternalLink, ThumbsUp } from 'lucide-react';

const FACEBOOK_URL = 'https://www.facebook.com/share/1AWvNBtfuD/';

export default function FacebookSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div
          className="rounded-2xl p-8 text-center text-white"
          style={{
            background: 'linear-gradient(135deg, #1877f2 0%, #0a5dc2 100%)',
          }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <SiFacebook className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Follow Us on Facebook</h2>
          <p className="text-white/80 mb-2 font-medium">Evergreen Hub</p>
          <p className="text-white/70 text-sm mb-6">
            Stay updated with our latest courses, tips, and community highlights. Like our page for daily digital marketing insights!
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-blue-600 hover:bg-white/90 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Like Page
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Page
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
