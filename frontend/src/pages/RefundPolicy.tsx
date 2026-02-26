import { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { AlertTriangle } from 'lucide-react';

export default function RefundPolicy() {
  const section1 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section2 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section3 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });
  const section4 = useScrollAnimation({ threshold: 0.1, triggerOnce: true });

  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    document.title = 'Refund Policy - Evergreen Hub | No Refund Terms';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Evergreen Hub Refund Policy: Firm no-refund policy for digital products, all sales final, limited exceptions for duplicate payments or technical failures. Review before purchasing online courses.'
      );
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute(
        'content',
        'refund policy, no refund, digital products, all sales final, online courses, Evergreen Hub, affiliate marketing training, non-refundable, digital education, course purchase terms'
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
            Refund Policy
          </h1>
          <p className="text-center text-muted-foreground text-sm">
            Last Updated: {lastUpdated}
          </p>
        </section>

        {/* Important Notice */}
        <section
          ref={section2.ref}
          className={`mb-12 transition-all duration-700 ${
            section2.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border-2 border-red-500 flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">
                STRICT NO REFUND POLICY
              </h2>
              <p className="text-foreground/90 leading-relaxed font-semibold">
                Please read this policy carefully before making any purchase. By completing a transaction on Evergreen Hub, you acknowledge and accept that ALL SALES ARE FINAL and NO REFUNDS will be issued under any circumstances except as explicitly stated below.
              </p>
            </div>
          </div>
        </section>

        {/* Nature of Digital Products */}
        <section
          ref={section3.ref}
          className={`mb-12 transition-all duration-700 ${
            section3.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Nature of Digital Products</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Evergreen Hub offers digital educational products including online courses, training programs, and affiliate marketing materials. Due to the instant access and downloadable nature of digital products:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>All course content is delivered immediately upon successful payment</li>
            <li>Digital products cannot be "returned" once accessed</li>
            <li>Course materials are non-transferable and non-refundable</li>
            <li>You gain immediate access to proprietary educational content</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            Unlike physical products, digital content cannot be retrieved or "un-delivered" after purchase. Therefore, all sales are considered final at the moment of transaction completion.
          </p>
        </section>

        {/* All Sales Are Final */}
        <section
          ref={section4.ref}
          className={`mb-12 transition-all duration-700 ${
            section4.isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">All Sales Are Final</h2>
          <p className="text-foreground/90 leading-relaxed mb-4 font-semibold text-lg">
            Once you complete a purchase on Evergreen Hub, the transaction is FINAL and IRREVERSIBLE. No refunds, credits, or exchanges will be provided.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            This policy applies to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>All individual courses and course packages</li>
            <li>All training programs and educational materials</li>
            <li>All digital downloads and resources</li>
            <li>All subscription-based services</li>
            <li>All promotional or discounted purchases</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed">
            By clicking "Purchase" or "Buy Now," you explicitly acknowledge and agree to this no-refund policy.
          </p>
        </section>

        {/* No Refund After Purchase */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">No Refund After Purchase</h2>
          <p className="text-foreground/90 leading-relaxed mb-4 font-semibold">
            Evergreen Hub will NOT issue refunds for any of the following reasons:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">1. Change of Mind</h3>
              <p className="text-foreground/90 leading-relaxed">
                If you change your mind after purchase, decide you no longer want the course, or simply regret your decision, no refund will be issued. All purchases are considered final and binding.
              </p>
            </div>

            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">2. Lack of Time</h3>
              <p className="text-foreground/90 leading-relaxed">
                If you do not have sufficient time to complete the course, are too busy, or cannot dedicate the necessary effort to learning, no refund will be provided. Time management is your personal responsibility.
              </p>
            </div>

            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">3. Financial Issues</h3>
              <p className="text-foreground/90 leading-relaxed">
                If you experience financial difficulties, unexpected expenses, or can no longer afford the purchase after completion, no refund will be granted. You are responsible for ensuring you can afford the purchase before buying.
              </p>
            </div>

            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">4. Failure to Understand Content</h3>
              <p className="text-foreground/90 leading-relaxed">
                If you find the course content difficult to understand, too advanced, too basic, or not aligned with your expectations, no refund will be issued. Course descriptions and previews are provided for your review before purchase.
              </p>
            </div>

            <div className="bg-secondary p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-2">5. Personal Reasons</h3>
              <p className="text-foreground/90 leading-relaxed">
                Any other personal reasons, circumstances, or situations that arise after purchase will not qualify for a refund. This includes but is not limited to: loss of interest, dissatisfaction with results, technical issues on your end, or any other subjective reasons.
              </p>
            </div>
          </div>

          <p className="text-foreground/90 leading-relaxed font-semibold">
            These exclusions are comprehensive and apply without exception. No appeals or special considerations will be made.
          </p>
        </section>

        {/* Responsibility to Review */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Responsibility to Review Course Details Before Purchase</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            It is YOUR RESPONSIBILITY to thoroughly review all course information before making a purchase. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Reading complete course descriptions and curriculum details</li>
            <li>Reviewing course objectives, learning outcomes, and prerequisites</li>
            <li>Watching any available preview videos or sample content</li>
            <li>Understanding the course format, duration, and delivery method</li>
            <li>Verifying that the course meets your specific needs and expectations</li>
            <li>Ensuring you have the necessary technical requirements and skills</li>
            <li>Reading and understanding this Refund Policy in its entirety</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            We provide detailed information about each course to help you make an informed decision. By proceeding with a purchase, you confirm that:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>You have read and understood all course details</li>
            <li>The course meets your requirements and expectations</li>
            <li>You accept full responsibility for your purchase decision</li>
            <li>You agree to the no-refund policy without reservation</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed font-semibold">
            Failure to review course details before purchase does not constitute grounds for a refund.
          </p>
        </section>

        {/* Chargeback Policy */}
        <section className="mb-12 bg-red-50 dark:bg-red-950/20 p-6 rounded-lg border-2 border-red-500">
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-4">Chargeback Policy</h2>
          <p className="text-foreground/90 leading-relaxed mb-4 font-semibold">
            IMPORTANT: Filing an unauthorized chargeback or payment dispute with your bank or credit card company is considered a serious violation of our Terms of Service and may result in severe consequences.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            If you initiate a chargeback or payment dispute without valid grounds (such as fraud or unauthorized transaction), the following actions will be taken immediately:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li><strong>Account Suspension:</strong> Your account will be permanently suspended without warning</li>
            <li><strong>Revocation of Course Access:</strong> All access to purchased courses and materials will be immediately revoked</li>
            <li><strong>Blacklist:</strong> Your account, email address, and payment information will be blacklisted from future purchases</li>
            <li><strong>Legal Action:</strong> We reserve the right to pursue legal action to recover costs, damages, and legal fees</li>
            <li><strong>Reporting:</strong> Fraudulent chargebacks may be reported to relevant authorities and credit agencies</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Valid reasons for chargebacks include:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Unauthorized transaction (fraud or stolen card)</li>
            <li>Duplicate charge for the same purchase</li>
            <li>Technical error resulting in incorrect charge amount</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed font-semibold">
            Before initiating a chargeback, you MUST contact us via the official website contact form to resolve any billing issues. We are committed to addressing legitimate concerns promptly and professionally.
          </p>
        </section>

        {/* Limited Exception */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Limited Exception</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Refunds may ONLY be considered in the following extremely limited circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li><strong>Verified Duplicate Payment:</strong> If you are charged multiple times for the same purchase due to a technical error, and we can verify the duplicate transaction in our system</li>
            <li><strong>Technical Access Failure:</strong> If you are unable to access your purchased course due to a verified technical issue on our platform that we cannot resolve within a reasonable timeframe (typically 7-14 business days)</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4">
            To request consideration under these limited exceptions, you must:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Contact us immediately via the official website contact form</li>
            <li>Provide detailed information about the issue, including transaction details</li>
            <li>Provide proof of the duplicate payment or technical access failure</li>
            <li>Allow us reasonable time to investigate and attempt to resolve the issue</li>
            <li>Cooperate fully with our support team during the investigation</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mb-4 font-semibold">
            Even in these limited cases, refunds are granted at our sole discretion after thorough investigation. We reserve the right to offer alternative solutions such as account credit, course transfer, or technical support instead of a monetary refund.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            These exceptions do NOT apply to:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Technical issues on your end (internet connection, device compatibility, browser issues)</li>
            <li>Failure to access courses due to forgotten passwords or account issues</li>
            <li>Dissatisfaction with course content, quality, or teaching style</li>
            <li>Any of the reasons listed in the "No Refund After Purchase" section</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-12 bg-secondary p-6 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Contact Us</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            If you have questions about this Refund Policy or need to report a verified duplicate payment or technical access failure, please contact us only via the official website contact form.
          </p>
          <p className="text-foreground/90 leading-relaxed mb-4">
            When contacting us, please provide:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>Your full name and account email address</li>
            <li>Transaction ID or order number</li>
            <li>Detailed description of the issue</li>
            <li>Supporting documentation (screenshots, receipts, etc.)</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed font-semibold">
            We will respond to all legitimate inquiries within 3-5 business days. Please note that contacting us does not guarantee a refund and all decisions are final.
          </p>
        </section>

        {/* Final Notice */}
        <section className="mb-12 bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border-2 border-[#F59E0B]">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-4">Final Notice</h2>
          <p className="text-foreground/90 leading-relaxed mb-4 font-semibold text-lg">
            By making a purchase on Evergreen Hub, you explicitly acknowledge that:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 text-foreground/90">
            <li>You have read and fully understand this Refund Policy</li>
            <li>You agree to the strict no-refund terms without reservation</li>
            <li>You accept full responsibility for your purchase decision</li>
            <li>You will not initiate unauthorized chargebacks or payment disputes</li>
            <li>All sales are final and non-refundable except as explicitly stated</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed font-semibold">
            This Refund Policy is effective as of the date listed above and supersedes all previous refund policies. Evergreen Hub reserves the right to modify this policy at any time without prior notice.
          </p>
        </section>
      </main>

      <Footer />
      <FloatingWhatsAppButton />
      <ScrollToTopButton />
    </div>
  );
}
