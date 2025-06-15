import { useState, useEffect, useRef } from 'react';
import { XCircle, FileText, Clock, AlertTriangle } from 'lucide-react';
import Footer from './Footer-ai';
import Navbar from './Navbar-ai';

const CancellationPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section 
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-slate-50 to-white relative"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Professional Header */}
          <div className="text-center mb-12">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                <XCircle className="w-4 h-4 mr-2" />
                Order Policies
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Cancellation Policy
              </h1>
            </div>
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg text-slate-600">
                Last Updated: June 13, 2025
              </p>
            </div>
          </div>

          {/* Razorpay UPI Compliance Notice */}
          <div className={`bg-blue-50 rounded-xl border border-blue-200 p-6 mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Razorpay UPI Payment Information</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Intruitia uses Razorpay as our authorized payment gateway for all UPI transactions. All payment cancellations are processed securely and in compliance with RBI guidelines.</p>
                  <p className="mt-1">For any UPI payment-related cancellation issues, please contact us at support@intruitia.in with your transaction reference number.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Introduction
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  At Intruitia, we understand that circumstances change, and you may need to cancel a service or project. This Cancellation Policy outlines our guidelines regarding order cancellations, including services paid for through UPI, credit/debit cards, net banking, and other electronic payment methods processed through our payment gateway partner Razorpay.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  This Cancellation Policy is governed by and complies with the applicable laws of India, including but not limited to the Information Technology Act, 2000, the Payment and Settlement Systems Act, 2007, and the guidelines issued by the Reserve Bank of India (RBI) and the National Payments Corporation of India (NPCI).
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By engaging our services and making payments through our platform, you agree to the terms of this Cancellation Policy. This policy should be read in conjunction with our <a href="/terms-and-conditions" className="text-blue-600 hover:underline">Terms and Conditions</a>, <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, and <a href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</a>. Please read all documents carefully before making any payments.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-amber-500" />
                  General Cancellation Terms
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our cancellation terms vary depending on the type of service and the stage of the project:
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
                  Web Development & Design Services
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li><span className="font-semibold">Pre-Project Initiation:</span> If you cancel before we begin work (before the initial deposit is paid), no cancellation fee applies.</li>
                  <li><span className="font-semibold">After Project Initiation:</span> If you cancel after we've begun work (after the initial deposit is paid), the deposit is non-refundable as it covers project setup, initial consultations, and resource allocation.</li>
                  <li><span className="font-semibold">During Development:</span> If you cancel during development, you will be billed for all work completed up to the cancellation date.</li>
                  <li><span className="font-semibold">Near Completion:</span> If you cancel when the project is 75% or more complete, you will be billed for the entire project as agreed upon in the initial contract.</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Content Creation Services
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li><span className="font-semibold">Before Content Creation:</span> You may cancel at any time before we begin creating content with no cancellation fee.</li>
                  <li><span className="font-semibold">During Content Creation:</span> If we have started creating content, a cancellation fee of 50% of the total project cost applies.</li>
                  <li><span className="font-semibold">After Delivery:</span> Once content has been delivered, cancellation is not possible.</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Consulting Services
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li><span className="font-semibold">Scheduled Sessions:</span> Cancellation must be made at least 48 hours before the scheduled session to avoid any cancellation fee.</li>
                  <li><span className="font-semibold">Late Cancellation:</span> Cancellations made less than 48 hours before the scheduled session will incur a 50% cancellation fee.</li>
                  <li><span className="font-semibold">No-Show:</span> If you fail to attend a scheduled session without prior notice, the full session fee will be charged.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  How to Request a Cancellation
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  To request a cancellation, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-4">
                  <li>Send an email to support@intruitia.in with the subject line "Cancellation Request - [Your Name/Company Name]".</li>
                  <li>Include your order details, project name, and reason for cancellation.</li>
                  <li>For services paid via UPI, please include your UPI transaction reference ID and the date of the transaction.</li>
                  <li>We will acknowledge your cancellation request within 24 hours.</li>
                  <li>Our team will review your request and contact you to discuss the cancellation terms based on the project stage.</li>
                </ol>
                <p className="text-slate-600 leading-relaxed">
                  All cancellation requests must be submitted in writing. Verbal cancellation requests will not be considered official until confirmed in writing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  UPI Payment Cancellation
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For payments made through UPI (Unified Payments Interface):
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Immediate Cancellation:</span> UPI payments cannot be cancelled once initiated and completed successfully. If you wish to cancel a service paid for via UPI, you must follow our standard cancellation process outlined above.</li>
                  <li><span className="font-semibold">Pending Transactions:</span> If a UPI transaction is pending, it will automatically expire after the timeout period (usually 2-5 minutes) if not completed.</li>
                  <li><span className="font-semibold">Cancellation Confirmation:</span> Once your cancellation request is approved, we will send you a confirmation email with details of any applicable cancellation fees and refund information (if applicable).</li>
                  <li><span className="font-semibold">Order Cancellation Process:</span> To cancel an order or service paid via UPI, please email us at support@intruitia.in with your order reference and transaction ID within 48 hours of purchase. Cancellation requests are subject to our eligibility criteria outlined above.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All UPI payment cancellations are processed in compliance with the guidelines set by the National Payments Corporation of India (NPCI) and the Reserve Bank of India (RBI).
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Please note that any refunds resulting from cancellations will be processed according to our <a href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</a>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Subscription & Recurring Services
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For ongoing services such as maintenance plans or retainer agreements:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Cancellation requires a 30-day written notice.</li>
                  <li>If you cancel a subscription service, you will continue to have access to the service until the end of your current billing period.</li>
                  <li>There are no refunds for partially used service periods.</li>
                  <li>Pre-paid annual subscriptions may be eligible for a prorated refund of unused months, less a 15% administrative fee.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-amber-500" />
                  Project Cancellation by Intruitia
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We reserve the right to cancel a project if:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li>Project requirements change significantly from the original scope.</li>
                  <li>Necessary information or feedback is not provided within 30 days after request.</li>
                  <li>Payment milestones are not met according to the agreed schedule.</li>
                  <li>The working relationship becomes untenable due to communication issues or other problems.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  In such cases, you will be billed only for work completed, and any excess pre-payment will be refunded according to our <a href="/refund-policy" className="text-blue-600 hover:underline">Refund Policy</a>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Dispute Resolution
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you have any concerns regarding cancellations or disagree with cancellation fees, please contact us directly at support@intruitia.in to discuss your concerns. We aim to resolve all issues promptly and fairly within 7 business days of receiving your complaint.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For disputes related to cancellations of payments processed through Razorpay:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>Please provide your transaction ID, date of transaction, and a detailed description of the issue.</li>
                  <li>Our team will coordinate with Razorpay to investigate and resolve the matter.</li>
                  <li>For UPI-related disputes, we follow the dispute resolution process as per the NPCI guidelines.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  If we cannot reach an agreement through our standard dispute resolution process, disputes will be resolved according to the terms outlined in our <a href="/terms-and-conditions" className="text-blue-600 hover:underline">Terms and Conditions</a>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We reserve the right to modify this Cancellation Policy at any time. Changes will be effective immediately upon posting on our website. Existing projects will follow the policy that was in effect at the time of contract signing.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  In case of any material changes to this policy, especially those affecting UPI payments or other digital payment methods, we will notify users through email or prominently display a notice on our website at least 30 days before the changes take effect, as required by applicable regulations.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Contact Us
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you have any questions about this Cancellation Policy, please contact us:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Intruitia</p>
                  <p className="text-slate-600">Owner: Majji Pradeep Kumar</p>
                  <p className="text-slate-600">Email: support@intruitia.in</p>
                  <p className="text-slate-600">Phone: +91 8184889557</p>
                  <p className="text-slate-600">Address: Flat No. 2-90/9/2/1, Jeevan Jyothi Nagar, Suraram Colony, Hyderabad, Telangana 500055, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CancellationPolicy;
