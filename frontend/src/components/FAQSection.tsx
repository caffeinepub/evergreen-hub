import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const faqs = [
  {
    question: 'What is affiliate marketing?',
    answer: 'Affiliate marketing is a performance-based business model where you earn commissions by promoting other companies\' products or services. When someone makes a purchase through your unique affiliate link, you earn a percentage of the sale.',
  },
  {
    question: 'Do I need any prior experience to start?',
    answer: 'No prior experience is required! Our courses are designed specifically for beginners. We start from the basics and guide you step-by-step through the entire process of building a successful affiliate marketing business.',
  },
  {
    question: 'How long does it take to see results?',
    answer: 'Results vary depending on your effort and consistency. Some students see their first commission within 2-4 weeks, while others may take 2-3 months. The key is to follow the training consistently and implement what you learn.',
  },
  {
    question: 'What kind of support do I get?',
    answer: 'All our packages include lifetime access to course materials. Depending on your package, you\'ll get email support, WhatsApp support, live Q&A sessions, or even one-on-one mentorship. We\'re committed to helping you succeed!',
  },
  {
    question: 'Can I really earn money from home?',
    answer: 'Absolutely! Affiliate marketing is a legitimate way to earn money online from anywhere. Many of our students are earning consistent income from home. Success depends on learning the right strategies and taking consistent action.',
  },
];

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about affiliate marketing
            </p>
          </div>

          <div ref={ref} className={`scroll-fade-in ${isVisible ? 'visible' : ''}`}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 hover:border-emerald-500/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-emerald-500 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
