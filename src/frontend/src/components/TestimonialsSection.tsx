import { Star } from "lucide-react";
import type React from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Rahul Verma",
    location: "Patna, Bihar",
    rating: 5,
    service: "Website Development",
    text: "Evergreen Hub ne mera business website 3 din me ready kar diya. Design ekdum professional tha aur Google Map bhi set kar diya. Bahut achha kaam hai!",
    avatar: "RV",
  },
  {
    name: "Priya Kumari",
    location: "Ranchi, Jharkhand",
    rating: 5,
    service: "Photo Editing",
    text: "Meri product photos ka background removal aur color grading bahut hi achhe se kiya. 24 ghante me delivered mila. Highly recommended!",
    avatar: "PK",
  },
  {
    name: "Amit Singh",
    location: "Varanasi, UP",
    rating: 5,
    service: "Video Editing",
    text: "YouTube channel ke liye 5 videos edit karwaye. Transitions, color grading sab premium tha. Subscribers bhi badhe! Great work Rudra bhai.",
    avatar: "AS",
  },
  {
    name: "Sunita Devi",
    location: "Muzaffarpur, Bihar",
    rating: 5,
    service: "Website Development",
    text: "Coaching institute ke liye Growth Package liya. SEO bhi tha, ab Google pe search hone laga hoon. Worth every rupee!",
    avatar: "SD",
  },
  {
    name: "Vikash Kumar",
    location: "Bhagalpur, Bihar",
    rating: 5,
    service: "Video Editing",
    text: "Instagram Reels editing karwaya Shorts plan se. Editing quality ekdum top-notch thi. Engagement bohot badh gaya mera!",
    avatar: "VK",
  },
  {
    name: "Neha Sharma",
    location: "Lucknow, UP",
    rating: 5,
    service: "Photo Editing",
    text: "Advanced plan me skin retouching aur background removal karwaya. Portfolio photos bilkul studio-quality ho gayi. Thank you!",
    avatar: "NS",
  },
];

const serviceColors: Record<string, string> = {
  "Website Development": "bg-blue-100 text-blue-700",
  "Photo Editing": "bg-purple-100 text-purple-700",
  "Video Editing": "bg-orange-100 text-orange-700",
};

export default function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real experiences from real clients — Website Development, Video
              Editing &amp; Photo Editing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderRadius: "12px" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }, (_, j) => j).map((j) => (
                      <Star
                        key={`${t.name}-star-${j}`}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${serviceColors[t.service]}`}
                  >
                    {t.service}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  “{t.text}”
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {t.location}
                    </p>
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
