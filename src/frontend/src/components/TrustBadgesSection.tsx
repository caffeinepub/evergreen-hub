import { Users, Award, Clock, Shield } from 'lucide-react';

const badges = [
  {
    icon: Users,
    text: '1000+ Students',
  },
  {
    icon: Award,
    text: 'Expert Instructors',
  },
  {
    icon: Clock,
    text: '24/7 Support',
  },
  {
    icon: Shield,
    text: 'Money-Back Guarantee',
  },
];

export default function TrustBadgesSection() {
  return (
    <section className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-3">
                <Icon className="h-8 w-8 text-primary" />
                <span className="text-muted-foreground font-medium">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
