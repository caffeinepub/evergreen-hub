import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SiYoutube } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

export default function YouTubeSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center">
              <SiYoutube className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Watch & Learn on YouTube</h2>
          <p className="text-muted-foreground text-sm">
            Free tutorials, tips, and strategies on our YouTube channel
          </p>
        </div>

        {/* Video Embed */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-md mb-6 aspect-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/videoseries?list=PLrAXtmErZgOeiKm4sgNOknc9TTnkwVqKB"
            title="Evergreen Hub YouTube Channel"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <div className="text-center">
          <a
            href="https://www.youtube.com/@evergreenhub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors"
          >
            <SiYoutube className="w-5 h-5" />
            Subscribe to Channel
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
