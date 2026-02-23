import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Student',
    content: 'Evergreen Hub transformed my life! I went from zero knowledge to earning my first commission in just 3 weeks. The step-by-step guidance is incredible.',
    rating: 5,
    initials: 'RS',
  },
  {
    name: 'Priya Patel',
    role: 'Freelancer',
    content: 'Best investment I ever made! The WhatsApp support is super responsive and the course content is easy to understand. Already made back my investment!',
    rating: 5,
    initials: 'PP',
  },
  {
    name: 'Amit Kumar',
    role: 'College Student',
    content: 'As a beginner, I was nervous about starting. But the beginner-friendly approach and lifetime access gave me confidence. Now I earn while studying!',
    rating: 5,
    initials: 'AK',
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-emerald-950/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our students are saying about their journey with Evergreen Hub
          </p>
        </div>

        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-border hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl"
            >
              <CardContent className="pt-8 space-y-4">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3 pt-4">
                  <Avatar className="h-12 w-12 bg-emerald-500">
                    <AvatarFallback className="bg-emerald-500 text-black font-bold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
