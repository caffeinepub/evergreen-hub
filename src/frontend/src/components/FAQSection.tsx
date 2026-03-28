import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const faqs = [
  {
    question: "What web design services do you offer?",
    answer:
      "We offer a range of packages starting from a Basic Landing Page (₹2,999) to an Ultra Premium multi-page website (₹24,999). All packages include mobile-friendly design, WhatsApp/Call button, Contact Form, and demo availability. You can choose from Coaching Centre, Local Business, Blogger/Portfolio, or Affiliate Marketing website types.",
  },
  {
    question: "How long does it take to deliver a website?",
    answer:
      "Delivery time depends on the package: Basic Package takes 2–3 days, Starter Package takes 5 days, Growth Package takes 7–10 days, Authority Package takes 10–15 days, and Ultra Premium Package takes 15–20 days. Timelines start after we receive all required content and information from you.",
  },
  {
    question: "Do you offer demo or preview before final delivery?",
    answer:
      "Yes! All our web design packages include demo availability so you can review and request changes before the final site goes live.",
  },
  {
    question: "What types of videos do you edit?",
    answer:
      "We edit all types of videos including Instagram Reels/Shorts (up to 60 sec), YouTube vlogs and tutorials (up to 5 min), YouTube Pro content (up to 10 min), and Long-form videos (up to 30 min). We also offer add-ons like thumbnails, color grading, motion graphics, and sound effects.",
  },
  {
    question: "How much does video editing cost?",
    answer:
      "Our video editing prices start at ₹799 for Shorts/Reels. YouTube Basic (5 min) is ₹1,999, YouTube Pro (10 min) is ₹3,999, and Long Video (30 min) is ₹7,999. We also have bulk deals — 10 Reels Pack for ₹5,999 and monthly creator plans.",
  },
  {
    question: "How do I submit my video/photos for editing?",
    answer:
      "After placing your order, you can upload your files directly or share a Google Drive link. Our team will start editing and deliver via WhatsApp or Drive link within the promised timeframe.",
  },
  {
    question: "What is included in photo editing?",
    answer:
      "Basic Photo Editing (₹149) includes color correction, brightness/contrast adjustment, and basic retouch — delivered in 12–24 hours. Advanced Photo Editing (₹299) includes skin retouching, background removal, color grading, and high-end finish — delivered in 24–48 hours. We also offer a 5 Photos Pack for ₹499.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI/PhonePe for local/national payments and PayPal for international payments. You can also pay via bank transfer. After payment, share your transaction ID and we\u2019ll confirm your order immediately.",
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
              Everything you need to know about our services
            </p>
          </div>

          <div
            ref={ref}
            className={`scroll-fade-in ${isVisible ? "visible" : ""}`}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`item-${index}`}
                  data-ocid={`faq.item.${index + 1}`}
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
