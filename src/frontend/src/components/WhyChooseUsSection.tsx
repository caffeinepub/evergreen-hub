import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    title: 'Beginner Friendly Training',
    description: 'Step-by-step courses designed for complete beginners with no prior experience required.',
    image: '/assets/generated/benefit-beginner.dim_128x128.png',
  },
  {
    title: 'Step-by-Step Guidance',
    description: 'Clear, actionable instructions that guide you through every stage of your journey.',
    image: '/assets/generated/benefit-guidance.dim_128x128.png',
  },
  {
    title: 'Lifetime Access',
    description: 'Learn at your own pace with unlimited access to all course materials forever.',
    image: '/assets/generated/benefit-lifetime.dim_128x128.png',
  },
  {
    title: 'WhatsApp Support',
    description: 'Get instant help and answers to your questions directly via WhatsApp.',
    image: '/assets/generated/benefit-whatsapp.dim_128x128.png',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose Evergreen Hub?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to succeed in affiliate marketing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="border-border hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <CardContent className="pt-8 text-center space-y-4">
                <div className="flex justify-center">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
