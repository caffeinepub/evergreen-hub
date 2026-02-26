import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { BookOpen, Users, Zap, Shield } from 'lucide-react';

const benefits = [
  {
    icon: BookOpen,
    title: 'Expert-Led Courses',
    description: 'Learn from industry professionals with hands-on experience in affiliate marketing and digital skills.',
    image: '/assets/generated/benefit-guidance.dim_128x128.png',
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Join a supportive community of learners and get help whenever you need it on your journey.',
    image: '/assets/generated/benefit-whatsapp.dim_128x128.png',
  },
  {
    icon: Zap,
    title: 'Beginner Friendly',
    description: 'No prior experience needed. Our courses are designed for complete beginners to advanced learners.',
    image: '/assets/generated/benefit-beginner.dim_128x128.png',
  },
  {
    icon: Shield,
    title: 'Lifetime Access',
    description: 'Get lifetime access to all course materials and future updates at no extra cost.',
    image: '/assets/generated/benefit-lifetime.dim_128x128.png',
  },
];

export default function WhyChooseUsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Why Choose Evergreen Hub?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to start and grow your digital income journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  style={{ borderRadius: '12px' }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
