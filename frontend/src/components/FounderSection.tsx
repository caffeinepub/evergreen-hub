import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Award, Globe, TrendingUp, Video, MapPin, Star } from 'lucide-react';

interface FounderSectionProps {
  compact?: boolean;
}

export default function FounderSection({ compact = false }: FounderSectionProps) {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation();

  const badges = [
    { icon: Globe, label: 'Web Design Expert' },
    { icon: TrendingUp, label: 'Digital Entrepreneur' },
    { icon: Video, label: 'Video Editor' },
    { icon: MapPin, label: 'Google Map Pro' },
  ];

  return (
    <section className={`relative overflow-hidden ${compact ? 'py-12' : 'py-20'} px-4`}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-gray-950 to-emerald-900 opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent" />

      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-emerald-500/10 pointer-events-none" />
      <div className="absolute top-16 right-16 w-48 h-48 rounded-full border border-emerald-500/10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-yellow-500/10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-emerald-400" />
            Meet the Visionary
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            The Person Behind{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              Evergreen Hub
            </span>
          </h2>
        </div>

        {/* Main Card */}
        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 delay-200 ${
            cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              {/* Left: Photo Column */}
              <div className="lg:w-2/5 bg-gradient-to-br from-emerald-900/60 to-gray-900/60 p-8 flex flex-col items-center justify-center gap-6">
                {/* Photo with glowing ring */}
                <div className="relative">
                  {/* Outer glow ring */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-emerald-400 via-yellow-400 to-emerald-600 opacity-70 blur-sm" />
                  {/* Inner ring */}
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-emerald-400 to-yellow-400" />
                  {/* Photo */}
                  <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-gray-900">
                    <img
                      src="/assets/IMG_20260209_103145.png"
                      alt="Rudra Pratap Singh - Founder of Evergreen Hub"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Award badge */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-2 shadow-lg border-2 border-gray-900">
                    <Award className="w-5 h-5 text-gray-900" />
                  </div>
                </div>

                {/* Name & Title */}
                <div className="text-center">
                  <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-1">
                    Our Founder
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                    Rudra Pratap Singh
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Digital Entrepreneur & Web Designer</p>
                </div>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {badges.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Bio Column */}
              <div className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                {/* Decorative quote mark */}
                <div className="text-emerald-500/20 text-8xl font-serif leading-none mb-2 select-none">"</div>

                <div className="space-y-4 text-gray-300 leading-relaxed -mt-6">
                  <p className="text-lg text-white font-medium">
                    Hello! I'm{' '}
                    <span className="bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent font-bold">
                      Rudra Pratap Singh
                    </span>
                    , the founder of{' '}
                    <span className="text-emerald-400 font-semibold">Evergreen Hub</span>.
                  </p>

                  <p>
                    I help coaching institutes, affiliate marketers, bloggers, and local businesses grow online with
                    professional websites, Google Map profiles, and lead-focused digital solutions.
                  </p>

                  <p>
                    As a passionate digital entrepreneur and affiliate marketer, I also provide{' '}
                    <span className="text-emerald-300 font-medium">affiliate marketing support</span> and{' '}
                    <span className="text-emerald-300 font-medium">video editing services</span> to help businesses
                    promote their brand and products effectively online.
                  </p>

                  <p>
                    At Evergreen Hub, my mission is to combine modern design, smart functionality, and high-quality
                    content to deliver solutions that not only look professional but also{' '}
                    <span className="text-yellow-400 font-medium">drive real results</span>. Whether you're starting
                    your first website, boosting your online presence, or creating engaging marketing videos, I make
                    sure your business stands out in the digital world.
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://wa.me/919263989760?text=Hi%20Rudra%2C%20I%20want%20to%20grow%20my%20business%20online!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-emerald-900/40 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Connect on WhatsApp
                  </a>
                  <a
                    href="/web-design-services"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-full transition-all text-sm"
                  >
                    View Services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
