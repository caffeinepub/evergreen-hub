import { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import EvergreenAIChatbot from '../components/EvergreenAIChatbot';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { CheckCircle2 } from 'lucide-react';

export default function AboutUs() {
  const section1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section4 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section5 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section6 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    document.title = 'About Us - Evergreen Hub | Digital Learning & Earning Platform';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Evergreen Hub empowers students, beginners, job seekers, and housewives with skill-based courses and affiliate marketing opportunities for online earning.'
      );
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'About Us - Evergreen Hub | Digital Learning & Earning Platform');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        'Evergreen Hub empowers students, beginners, job seekers, and housewives with skill-based courses and affiliate marketing opportunities for online earning.'
      );
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (twitterCard) {
      twitterCard.setAttribute('content', 'summary_large_image');
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'About Us - Evergreen Hub | Digital Learning & Earning Platform');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute(
        'content',
        'Evergreen Hub empowers students, beginners, job seekers, and housewives with skill-based courses and affiliate marketing opportunities for online earning.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        {/* Introduction */}
        <section
          ref={section1.ref}
          className={`mb-16 transition-all duration-700 ${
            section1.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-6 text-center">
            About Evergreen Hub
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-4">
              Welcome to <span className="font-semibold text-emerald-500">Evergreen Hub</span> – your trusted partner in digital learning and online earning. We are a modern platform designed to empower individuals from all walks of life, including students, beginners, job seekers, housewives, and anyone aspiring to start their journey toward financial independence through online opportunities.
            </p>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              At Evergreen Hub, we believe that everyone deserves access to quality education and practical tools that can help them build sustainable income streams. Whether you're looking to learn new skills, explore affiliate marketing, or grow your online presence, we're here to guide you every step of the way.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section
          ref={section2.ref}
          className={`mb-16 transition-all duration-700 ${
            section2.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-emerald-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-500 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-card-foreground leading-relaxed">
              Our mission is simple yet powerful: to provide accessible, high-quality digital education and earning opportunities that transform lives. We aim to bridge the gap between ambition and achievement by offering comprehensive training, practical resources, and ongoing support. We're committed to helping you develop real skills, build confidence, and create meaningful income opportunities – all while maintaining complete transparency and honesty about what it takes to succeed online.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section
          ref={section3.ref}
          className={`mb-16 transition-all duration-700 ${
            section3.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-500 mb-8 text-center">
              What We Offer
            </h2>
            <div className="grid gap-4 md:gap-6">
              <div className="flex items-start gap-4 bg-card p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Skill-Based Online Courses</h3>
                  <p className="text-card-foreground/80">Comprehensive courses designed to teach you in-demand digital skills from scratch.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-card p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Affiliate Marketing Opportunities</h3>
                  <p className="text-card-foreground/80">Learn how to promote products and earn commissions through proven affiliate marketing strategies.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-card p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Ready-Made Landing Pages</h3>
                  <p className="text-card-foreground/80">Professional landing pages that you can use immediately to start promoting and earning.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-card p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Training Sessions and Webinars</h3>
                  <p className="text-card-foreground/80">Live and recorded training sessions to keep you updated with the latest strategies and techniques.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-card p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Performance Tracking Dashboard</h3>
                  <p className="text-card-foreground/80">Monitor your progress, track your earnings, and analyze your performance with our intuitive dashboard.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 bg-card p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">Community and Team Support System</h3>
                  <p className="text-card-foreground/80">Join a supportive community of like-minded individuals and receive guidance from experienced mentors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Evergreen Hub */}
        <section
          ref={section4.ref}
          className={`mb-16 transition-all duration-700 ${
            section4.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-500 mb-8 text-center">
              Why Choose Evergreen Hub?
            </h2>
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-emerald-500/20">
              <p className="text-lg text-card-foreground leading-relaxed mb-6">
                What sets us apart is our commitment to authenticity and your success. Unlike platforms that make unrealistic promises, we focus on providing genuine value through quality education and practical tools. We understand that building an online income takes time, effort, and dedication – and we're here to support you throughout that journey.
              </p>
              <p className="text-lg text-card-foreground leading-relaxed mb-6">
                Our courses are designed by industry experts who understand the real challenges beginners face. We provide step-by-step guidance, real-world examples, and ongoing support to ensure you're never alone in your learning journey. Whether you're a student looking to earn while studying, a housewife seeking financial independence, or a job seeker exploring new opportunities, Evergreen Hub offers the resources and community you need to succeed.
              </p>
              <p className="text-lg text-card-foreground leading-relaxed">
                We believe in empowering you with knowledge and skills that last a lifetime. Our platform is built on the principles of transparency, integrity, and continuous improvement – values that guide everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Our Vision for the Future */}
        <section
          ref={section5.ref}
          className={`mb-16 transition-all duration-700 ${
            section5.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl p-8 md:p-12 border border-emerald-500/30">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-500 mb-6">
              Our Vision for the Future
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              Looking ahead, we envision Evergreen Hub as a leading platform where thousands of individuals achieve financial freedom through digital skills and online opportunities. We're constantly expanding our course offerings, improving our tools, and building stronger community connections. Our goal is to create an ecosystem where learning never stops, opportunities are abundant, and success stories are celebrated. We're committed to staying at the forefront of digital education and earning trends, ensuring that our members always have access to the most relevant and effective strategies for building sustainable online income.
            </p>
          </div>
        </section>

        {/* Commitment to Transparency & Support */}
        <section
          ref={section6.ref}
          className={`mb-8 transition-all duration-700 ${
            section6.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-500 mb-8 text-center">
              Our Commitment to Transparency & Support
            </h2>
            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-emerald-500/20">
              <p className="text-lg text-card-foreground leading-relaxed mb-6">
                At Evergreen Hub, transparency isn't just a buzzword – it's the foundation of everything we do. We believe in setting realistic expectations and providing honest guidance about what it takes to succeed in the digital world. We never make false promises about overnight success or guaranteed income. Instead, we focus on equipping you with genuine skills, proven strategies, and the support system you need to build sustainable results over time.
              </p>
              <p className="text-lg text-card-foreground leading-relaxed">
                Our dedicated support team is always ready to help you overcome challenges, answer your questions, and celebrate your wins. We're not just a platform – we're a community of learners and achievers who believe in lifting each other up. When you join Evergreen Hub, you're not just enrolling in courses; you're becoming part of a movement toward financial empowerment and personal growth. Together, we'll help you turn your aspirations into achievements, one step at a time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
      <EvergreenAIChatbot />
      <ScrollToTopButton />
    </div>
  );
}
