import { useState, useEffect, useRef } from 'react';
import { RefreshCw, FileText, Clock } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const RefundPolicy = () => {
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
                <RefreshCw className="w-4 h-4 mr-2" />
                Payment Policies
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Refund & Cancellation Policy
              </h1>
            </div>
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg text-slate-600">
                Last Updated: June 12, 2024
              </p>
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
                  At Intruitia, we are committed to providing high-quality digital services. This Refund and Cancellation Policy outlines our guidelines regarding refunds, cancellations, and project terminations.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By engaging our services, you agree to the terms of this Refund and Cancellation Policy. Please read this document carefully before making any payments.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Payment Structure
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our payment structure typically follows this format:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><span className="font-semibold">Initial Deposit:</span> 25-50% of the total project cost, due before work begins</li>
                  <li><span className="font-semibold">Milestone Payments:</span> Divided based on project scope and timeline</li>
                  <li><span className="font-semibold">Final Payment:</span> Remaining balance due upon project completion before final delivery</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <RefreshCw className="w-6 h-6 mr-2 text-emerald-600" />
                  Refund Policy
                </h2>
                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
                  Web Development & Design Services
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li><span className="font-semibold">Initial Deposits:</span> Non-refundable as they cover project setup, initial consultations, and resource allocation.</li>
                  <li><span className="font-semibold">Milestone Payments:</span> Once work related to a milestone is completed, approved, and paid for, that payment is non-refundable.</li>
                  <li><span className="font-semibold">Complete Projects:</span> No refunds will be issued for completed projects after the final deliverables have been provided.</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Content Creation Services
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li><span className="font-semibold">Before Content Creation:</span> Full refund is possible if no work has started.</li>
                  <li><span className="font-semibold">During Content Creation:</span> 50% refund if work has started but not been delivered.</li>
                  <li><span className="font-semibold">After Delivery:</span> No refund after content has been delivered unless it substantially fails to meet the agreed specifications.</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Consulting Services
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li><span className="font-semibold">Scheduled Sessions:</span> Full refund if cancelled more than 48 hours in advance.</li>
                  <li><span className="font-semibold">Late Cancellation:</span> 50% refund if cancelled less than 48 hours before the scheduled session.</li>
                  <li><span className="font-semibold">After Session:</span> No refunds after the consulting session has been conducted.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-amber-500" />
                  Cancellation Policy
                </h2>
                <h3 className="text-xl font-semibold text-slate-800 mb-3 mt-6">
                  Project Cancellation by Client
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you decide to cancel a project after it has begun:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                  <li>You will be billed for all work completed up to the cancellation date.</li>
                  <li>The initial deposit is non-refundable.</li>
                  <li>A formal written notice of cancellation is required.</li>
                  <li>Any licensed materials or third-party services already purchased for your project are non-refundable.</li>
                </ul>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Project Cancellation by Intruitia
                </h3>
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
                  In such cases, you will be billed only for work completed, and any excess pre-payment will be refunded.
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
                  <li>No refunds for partially used service periods.</li>
                  <li>Pre-paid annual subscriptions may be eligible for a prorated refund of unused months, less a 15% administrative fee.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Payment Processing & Refunds
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All payments are processed securely through Razorpay, our trusted payment gateway partner.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When applicable, refunds will be processed as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Refunds will be issued through the original payment method.</li>
                  <li>Processing time is typically 5-14 business days, depending on your bank or payment provider.</li>
                  <li>Any transaction fees charged by Razorpay or your bank are non-refundable.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Dispute Resolution
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  If you are dissatisfied with our services, please contact us directly at pradeepmajji853@gmail.com to discuss your concerns. We aim to resolve all issues promptly and fairly. If we cannot reach an agreement, disputes will be resolved according to the terms outlined in our Terms and Conditions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to modify this Refund and Cancellation Policy at any time. Changes will be effective immediately upon posting on our website. Existing projects will follow the policy that was in effect at the time of contract signing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Contact Us
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you have any questions about this Refund and Cancellation Policy, please contact us:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Intruitia</p>
                  <p className="text-slate-600">Owner: Majji Pradeep Kumar</p>
                  <p className="text-slate-600">Email: pradeepmajji853@gmail.com</p>
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

export default RefundPolicy;
