import React, { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Target, Users, BookOpen, Shield, Eye, Heart } from 'lucide-react';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutUs() {
  useEffect(() => {
    document.title = 'About Us | Evergreen Hub';
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 text-white text-center">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-1.5 text-emerald-300 text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              About Evergreen Hub
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Empowering Digital{' '}
              <span className="text-emerald-400">Entrepreneurs</span>
            </h1>
            <p className="text-emerald-100/80 text-lg leading-relaxed">
              We are on a mission to make digital skills and online income accessible to everyone in India.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <BookOpen className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Who We Are</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Evergreen Hub is a digital education platform dedicated to helping individuals across India build sustainable online income streams through affiliate marketing, digital skills, and entrepreneurship.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Founded with a vision to bridge the gap between traditional education and the digital economy, we provide practical, actionable courses that deliver real results.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              To democratize digital education and make online income opportunities accessible to every aspiring entrepreneur in India, regardless of their background or prior experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that with the right knowledge, tools, and community support, anyone can build a successful online business and achieve financial freedom.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-foreground mb-8">What We Offer</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Comprehensive Courses',
                desc: 'From beginner to advanced, our courses cover affiliate marketing, social media, SEO, and more.',
                color: 'emerald',
              },
              {
                icon: Users,
                title: 'Community Support',
                desc: 'Join a vibrant community of learners and entrepreneurs who support each other\'s growth.',
                color: 'blue',
              },
              {
                icon: Shield,
                title: 'Proven Strategies',
                desc: 'Learn battle-tested strategies that have helped real people build real online income.',
                color: 'orange',
              },
            ].map((item, i) => (
              <AnimatedSection key={i}>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    item.color === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                    item.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-orange-100 dark:bg-orange-900/30'
                  }`}>
                    <item.icon className={`w-6 h-6 ${
                      item.color === 'emerald' ? 'text-emerald-600' :
                      item.color === 'blue' ? 'text-blue-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Why Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Expert instructors with real-world experience',
                'Practical, hands-on learning approach',
                'Lifetime access to course materials',
                'Active community and peer support',
                'Regular content updates',
                'Dedicated WhatsApp support',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              To become India's most trusted digital education platform, empowering millions of individuals to achieve financial independence through digital skills and online entrepreneurship.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We envision a future where geography and background are no barriers to success in the digital economy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Commitment to Transparency */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Commitment to Transparency</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              We believe in complete transparency with our students. Our courses clearly outline what you will learn, what results are realistic, and what effort is required.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We do not make unrealistic income promises. Success in digital marketing requires dedication, consistent effort, and continuous learning. We provide the tools and knowledge — your success depends on your commitment.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
