import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Verma',
    location: 'Patna, Bihar',
    rating: 5,
    text: 'Evergreen Hub ne meri zindagi badal di. Affiliate marketing seekh ke ab main ghar se hi achha income kar raha hoon.',
    avatar: 'RV',
  },
  {
    name: 'Priya Kumari',
    location: 'Ranchi, Jharkhand',
    rating: 5,
    text: 'Courses bahut practical hain. Jo sikhaya woh directly apply kar saka. Instructors bhi bahut helpful hain.',
    avatar: 'PK',
  },
  {
    name: 'Amit Singh',
    location: 'Varanasi, UP',
    rating: 5,
    text: 'Pehle online income ke baare mein kuch nahi pata tha. Ab main confidently digital marketing kar raha hoon.',
    avatar: 'AS',
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              What Our Students Say
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real experiences from real learners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderRadius: '12px' }}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
