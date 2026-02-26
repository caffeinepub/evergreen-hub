import React from 'react';
import { Users, BookOpen, Headphones, Shield } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const badges = [
  {
    icon: BookOpen,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with real-world experience',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Get help whenever you need it with our dedicated support team',
  },
  {
    icon: Shield,
    title: 'Money-Back Guarantee',
    description: 'Not satisfied? We offer a hassle-free refund policy',
  },
];

export default function TrustBadgesSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-10 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`flex flex-wrap justify-center gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 bg-card border border-border rounded-xl px-6 py-4 shadow-sm min-w-[220px]"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{badge.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
