import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const handleExploreCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A]">
      {/* Dark Mode Gradient Glow */}
      <div className="absolute inset-0 pointer-events-none dark:block hidden">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="hero-headline text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Master Affiliate Marketing
            <br />
            <span className="text-primary">Build Your Success</span>
          </h1>
          
          <p className="hero-subheadline text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful students learning proven strategies to earn online. 
            Get lifetime access to premium courses with expert guidance.
          </p>

          <div className="hero-cta flex justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              onClick={handleExploreCourses}
              className="px-8 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
