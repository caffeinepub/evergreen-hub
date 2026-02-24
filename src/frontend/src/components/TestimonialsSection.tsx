import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    rating: 5,
    text: 'Evergreen Hub transformed my career! The courses are comprehensive and easy to follow. I started earning within 2 months!',
    image: '/assets/generated/benefit-beginner.dim_128x128.png',
  },
  {
    name: 'Priya Sharma',
    rating: 5,
    text: 'Best investment I made! The WhatsApp support is amazing and the instructors are always ready to help. Highly recommended!',
    image: '/assets/generated/benefit-guidance.dim_128x128.png',
  },
  {
    name: 'Amit Patel',
    rating: 5,
    text: 'The DIAMOND package is worth every penny. Learned so much about affiliate marketing and digital skills. Thank you Evergreen Hub!',
    image: '/assets/generated/benefit-lifetime.dim_128x128.png',
  },
];

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied students who transformed their lives
          </p>
        </div>

        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-radius soft-shadow bg-background">
              <CardContent className="pt-8 space-y-4">
                <div className="flex justify-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground text-center italic">
                  "{testimonial.text}"
                </p>
                <p className="text-foreground font-semibold text-center">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
