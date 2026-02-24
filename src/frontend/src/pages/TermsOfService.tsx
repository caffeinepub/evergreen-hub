import { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import EvergreenAIChatbot from '../components/EvergreenAIChatbot';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function TermsOfService() {
  const section1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section4 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section5 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    document.title = 'Terms of Service - Evergreen Hub | User Agreement';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Evergreen Hub Terms of Service: User agreement, course access terms, lifetime access, intellectual property rights, payment terms, and no income guarantee disclaimer for our digital education platform.'
      );
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute(
        'content',
        'terms of service, user agreement, terms and conditions, digital education, online courses, Evergreen Hub, affiliate marketing training, course access, legal terms, user responsibilities'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header */}
        <section
          ref={section1.ref}
          className={`mb-12 transition-all duration-700 ${
            section1.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#2563EB] mb-4 text-center">
            Terms of Service
          </h1>
          <p className="text-center text-muted-foreground text-sm">
            Last Updated: {lastUpdated}
          </p>
        </section>

        {/* Acceptance of Terms */}
        <section
          ref={section2.ref}
          className={`mb-12 transition-all duration-700 ${
            section2.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Acceptance of Terms</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Welcome to Evergreen Hub. By accessing, browsing, or using our online educational platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            These Terms constitute a legally binding agreement between you and Evergreen Hub. If you do not agree with any part of these Terms, you must immediately discontinue use of our platform and services.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            We reserve the right to modify these Terms at any time. Your continued use of the platform after changes are posted constitutes acceptance of the modified Terms.
          </p>
        </section>

        {/* Eligibility */}
        <section
          ref={section3.ref}
          className={`mb-12 transition-all duration-700 ${
            section3.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Eligibility to Use Website</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            To use Evergreen Hub, you must:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
            <li>Have the legal capacity to enter into binding contracts</li>
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Not be prohibited from using our services under applicable laws</li>
            <li>Not have been previously suspended or banned from our platform</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            By creating an account, you represent and warrant that you meet all eligibility requirements. We reserve the right to verify your eligibility and refuse service to anyone at our sole discretion.
          </p>
        </section>

        {/* User Account Responsibility */}
        <section
          ref={section4.ref}
          className={`mb-12 transition-all duration-700 ${
            section4.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">User Account Responsibility</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            When you create an account with Evergreen Hub, you are responsible for:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Ensuring your account information remains accurate and up-to-date</li>
            <li>Notifying us immediately of any unauthorized access or security breach</li>
            <li>Not sharing your account with others or allowing others to access your account</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            You agree not to create multiple accounts, use false identities, or impersonate any person or entity. We are not liable for any loss or damage arising from your failure to protect your account information.
          </p>
        </section>

        {/* Course Access */}
        <section
          ref={section5.ref}
          className={`mb-12 transition-all duration-700 ${
            section5.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Course Access</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Upon successful purchase of a course or package, you will receive lifetime access to the course materials unless otherwise stated at the time of purchase. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Access to all course videos, materials, and resources</li>
            <li>Future updates and improvements to the course content</li>
            <li>Access through your personal account on our platform</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            However, we reserve the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Modify, update, or discontinue courses at any time</li>
            <li>Revoke access if you violate these Terms of Service</li>
            <li>Suspend access for maintenance or technical reasons</li>
            <li>Terminate your account for breach of terms or fraudulent activity</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            Course access is for personal use only. You may not share, distribute, or resell course content without explicit written permission from Evergreen Hub.
          </p>
        </section>

        {/* Intellectual Property Rights */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Intellectual Property Rights</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            All content on Evergreen Hub, including but not limited to courses, videos, text, graphics, logos, images, audio clips, digital downloads, and software, is the exclusive property of Evergreen Hub or its content creators and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            You are granted a limited, non-exclusive, non-transferable license to access and use the course materials for personal educational purposes only. You may not:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Copy, reproduce, distribute, or publicly display course content</li>
            <li>Modify, adapt, or create derivative works from our content</li>
            <li>Reverse engineer, decompile, or disassemble any software or materials</li>
            <li>Remove or alter any copyright, trademark, or proprietary notices</li>
            <li>Use our content for commercial purposes without authorization</li>
            <li>Share login credentials or course access with unauthorized users</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            Unauthorized use of our intellectual property may result in immediate termination of your account and legal action.
          </p>
        </section>

        {/* Payment Terms */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Payment Terms</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            All prices displayed on Evergreen Hub are in the specified currency and are subject to change without notice. By making a purchase, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Pay all fees and charges associated with your purchase</li>
            <li>Provide accurate and complete payment information</li>
            <li>Authorize us to charge your selected payment method</li>
            <li>Be responsible for all applicable taxes and fees</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Payment processing is handled by secure third-party payment providers. We do not store your complete payment card information. All transactions are final and subject to our Refund Policy.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            In the event of payment disputes, chargebacks, or fraudulent transactions, we reserve the right to suspend or terminate your account and take appropriate legal action.
          </p>
        </section>

        {/* No Income Guarantee Disclaimer */}
        <section className="mb-12 bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border-2 border-[#F59E0B]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">No Income Guarantee Disclaimer</h2>
          <p className="text-foreground/90 leading-relaxed mb-4 font-semibold">
            IMPORTANT: Evergreen Hub provides educational content and training related to affiliate marketing, digital skills, and online business strategies. However, we make NO GUARANTEES regarding income, earnings, or financial results.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Any income claims, earnings examples, or success stories presented on our platform are for illustrative purposes only and do not represent typical results. Individual results will vary significantly based on numerous factors including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Individual effort, dedication, and time commitment</li>
            <li>Prior experience and skill level</li>
            <li>Market conditions and competition</li>
            <li>Implementation of strategies and techniques</li>
            <li>External economic factors beyond our control</li>
            <li>Personal circumstances and resources available</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4 font-semibold">
            Results vary based on individual effort, experience, and market conditions. Success in affiliate marketing or any online business requires hard work, persistence, and often involves financial risk.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            By purchasing our courses, you acknowledge that you understand there are no guaranteed outcomes and that your success depends entirely on your own actions and circumstances. Evergreen Hub is not responsible for your business decisions or financial results.
          </p>
        </section>

        {/* Prohibited Activities */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Prohibited Activities</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            You agree not to engage in any of the following prohibited activities:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Violating any applicable laws, regulations, or third-party rights</li>
            <li>Sharing, distributing, or reselling course content without authorization</li>
            <li>Using the platform for fraudulent, illegal, or unauthorized purposes</li>
            <li>Attempting to gain unauthorized access to our systems or other user accounts</li>
            <li>Uploading viruses, malware, or any harmful code</li>
            <li>Harassing, threatening, or abusing other users or staff</li>
            <li>Impersonating any person or entity or misrepresenting your affiliation</li>
            <li>Scraping, data mining, or extracting data from our platform</li>
            <li>Interfering with the proper functioning of the platform</li>
            <li>Creating multiple accounts to circumvent restrictions or bans</li>
            <li>Posting spam, promotional content, or unsolicited communications</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            Violation of these prohibitions may result in immediate termination of your account, forfeiture of access to purchased courses, and potential legal action.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Limitation of Liability</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, EVERGREEN HUB AND ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Loss of profits, revenue, or business opportunities</li>
            <li>Loss of data or information</li>
            <li>Business interruption or loss of goodwill</li>
            <li>Personal injury or property damage</li>
            <li>Any other pecuniary loss</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or otherwise) and whether or not we have been advised of the possibility of such damages.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Our total liability to you for any claims arising from your use of the platform shall not exceed the amount you paid to Evergreen Hub in the twelve (12) months preceding the claim.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.
          </p>
        </section>

        {/* Termination / Account Suspension */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Termination / Account Suspension</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            We reserve the right to suspend, restrict, or terminate your account and access to our platform at any time, with or without notice, for any reason, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Violation of these Terms of Service</li>
            <li>Fraudulent, abusive, or illegal activity</li>
            <li>Chargebacks or payment disputes</li>
            <li>Sharing account credentials or course content</li>
            <li>Harassment of other users or staff</li>
            <li>Any conduct that we deem harmful to our platform or community</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Upon termination:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Your access to all courses and materials will be immediately revoked</li>
            <li>You will not be entitled to any refund of fees paid</li>
            <li>All licenses granted to you will terminate</li>
            <li>You must cease all use of our platform and content</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            You may terminate your account at any time by contacting us via the official website contact form. However, termination does not entitle you to a refund of any fees paid.
          </p>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Governing Law</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these Terms or your use of Evergreen Hub shall be resolved through binding arbitration or in courts of competent jurisdiction.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            You agree to submit to the personal jurisdiction of such courts and waive any objection to venue or inconvenient forum. If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            These Terms constitute the entire agreement between you and Evergreen Hub regarding your use of the platform and supersede all prior agreements and understandings.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-12 bg-secondary p-6 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Contact Us</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            If you have any questions, concerns, or require clarification regarding these Terms of Service, please contact us via the official website contact form.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            We are committed to addressing your inquiries and will respond in a timely manner.
          </p>
        </section>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
      <EvergreenAIChatbot />
      <ScrollToTopButton />
    </div>
  );
}
