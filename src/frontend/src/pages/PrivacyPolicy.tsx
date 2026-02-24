import { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import EvergreenAIChatbot from '../components/EvergreenAIChatbot';
import ScrollToTopButton from '../components/ScrollToTopButton';

export default function PrivacyPolicy() {
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
    document.title = 'Privacy Policy - Evergreen Hub | Data Protection & User Rights';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Evergreen Hub Privacy Policy: Learn how we protect your personal information, data security practices, GDPR-style privacy standards, and user rights for our digital education platform.'
      );
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute(
        'content',
        'privacy policy, data protection, user rights, digital education, online courses, Evergreen Hub, affiliate marketing training, GDPR compliance, personal information security'
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-center text-muted-foreground text-sm">
            Last Updated: {lastUpdated}
          </p>
        </section>

        {/* Introduction */}
        <section
          ref={section2.ref}
          className={`mb-12 transition-all duration-700 ${
            section2.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Introduction</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Welcome to Evergreen Hub. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our online educational platform for digital courses and affiliate marketing training.
          </p>
          <p className="text-foreground leading-relaxed">
            By accessing or using Evergreen Hub, you agree to the terms outlined in this Privacy Policy. If you do not agree with these terms, please discontinue use of our platform immediately.
          </p>
        </section>

        {/* Information We Collect */}
        <section
          ref={section3.ref}
          className={`mb-12 transition-all duration-700 ${
            section3.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
          <p className="text-foreground leading-relaxed mb-4">
            When you register or interact with our platform, we may collect the following personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6 text-foreground">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number (if provided)</li>
            <li>Account credentials and authentication data</li>
            <li>Profile information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3">Payment Information</h3>
          <p className="text-foreground leading-relaxed mb-6">
            All payment transactions are processed through secure third-party payment providers. We do not store your complete credit card or debit card information on our servers. Payment processors may collect billing information, transaction details, and payment method information necessary to complete your purchase.
          </p>

          <h3 className="text-xl font-semibold text-foreground mb-3">Usage Data & Analytics</h3>
          <p className="text-foreground leading-relaxed mb-4">
            We automatically collect certain information about your device and how you interact with our platform, including:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
            <li>IP address and geographic location</li>
            <li>Browser type and version</li>
            <li>Device information (operating system, device type)</li>
            <li>Pages visited, time spent on pages, and navigation patterns</li>
            <li>Referral sources and exit pages</li>
            <li>Course enrollment and completion data</li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section
          ref={section4.ref}
          className={`mb-12 transition-all duration-700 ${
            section4.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">How We Use Information</h2>
          <p className="text-foreground leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
            <li>To provide, maintain, and improve our educational services</li>
            <li>To process transactions and deliver purchased courses</li>
            <li>To communicate with you about your account, courses, and updates</li>
            <li>To provide customer support and respond to your inquiries</li>
            <li>To personalize your learning experience</li>
            <li>To analyze platform usage and improve our content</li>
            <li>To detect, prevent, and address technical issues or fraudulent activity</li>
            <li>To comply with legal obligations and enforce our terms</li>
          </ul>
          <p className="text-foreground leading-relaxed font-semibold">
            Important: We do not sell, rent, or trade your personal information to third parties for marketing purposes.
          </p>
        </section>

        {/* Cookies Policy */}
        <section
          ref={section5.ref}
          className={`mb-12 transition-all duration-700 ${
            section5.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Cookies Policy</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Evergreen Hub uses cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device that help us recognize you, remember your preferences, and analyze site traffic.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            We use the following types of cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
            <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
            <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our platform</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            <li><strong>Analytics Cookies:</strong> Collect information about platform usage and performance</li>
          </ul>
          <p className="text-foreground leading-relaxed">
            You can control cookie settings through your browser preferences. However, disabling certain cookies may affect the functionality of our platform.
          </p>
        </section>

        {/* Third-Party Services */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Third-Party Services</h2>
          <p className="text-foreground leading-relaxed mb-4">
            We may use third-party service providers to facilitate our services, including:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
            <li>Payment processors (PhonePe, bank transfer services)</li>
            <li>Analytics providers</li>
            <li>Cloud hosting services</li>
            <li>Customer support tools</li>
          </ul>
          <p className="text-foreground leading-relaxed">
            These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.
          </p>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Data Security</h2>
          <p className="text-foreground leading-relaxed mb-4">
            We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
            <li>Encryption of sensitive data in transit and at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Secure data storage on the Internet Computer blockchain</li>
          </ul>
          <p className="text-foreground leading-relaxed">
            However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee absolute security.
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Data Retention</h2>
          <p className="text-foreground leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your data is no longer needed, we will securely delete or anonymize it.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Your Rights</h2>
          <p className="text-foreground leading-relaxed mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Objection:</strong> Object to the processing of your personal information</li>
            <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
          </ul>
          <p className="text-foreground leading-relaxed">
            To exercise these rights, please contact us via WhatsApp at ********60 or through our contact page.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Children's Privacy</h2>
          <p className="text-foreground leading-relaxed">
            Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete it.
          </p>
        </section>

        {/* Changes to Privacy Policy */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Changes to This Privacy Policy</h2>
          <p className="text-foreground leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a new "Last Updated" date. Your continued use of our platform after such changes constitutes acceptance of the updated policy.
          </p>
        </section>

        {/* Contact Information */}
        <section className="mb-12 p-6 bg-card border border-border rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4">Contact Us</h2>
          <p className="text-foreground leading-relaxed mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <ul className="space-y-2 text-foreground">
            <li><strong>WhatsApp:</strong> ********60</li>
            <li><strong>Instagram:</strong> @rajput.rudra_s</li>
            <li><strong>Platform:</strong> Evergreen Hub</li>
          </ul>
        </section>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
      <EvergreenAIChatbot />
      <ScrollToTopButton />
    </div>
  );
}
