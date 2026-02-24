export default function BottomCTASection() {
  const handleScrollToCourses = () => {
    const coursesSection = document.getElementById('courses-section');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Start Learning Today
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of successful students and transform your career with our comprehensive courses
          </p>
          <button
            onClick={handleScrollToCourses}
            className="btn-cta btn-click-scale px-12 py-4 text-lg font-semibold shadow-soft-lg"
          >
            Explore Our Courses
          </button>
        </div>
      </div>
    </section>
  );
}
