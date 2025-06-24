import { useState, useEffect, useRef } from 'react';
import { RefreshCw, FileText } from 'lucide-react';

const RefundPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12121e] to-[#0e0e1a] text-white">
      <section 
        ref={sectionRef}
        className="py-20 relative"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Professional Header */}
          <div className="text-center mb-12">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4 border border-blue-500/30">
                <RefreshCw className="w-4 h-4 mr-2" />
                Payment Policies
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Refund Policy
              </h1>
            </div>
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg text-gray-300">
                Last Updated: June 24, 2025
              </p>
            </div>
          </div>

          {/* Razorpay UPI Compliance Notice */}
          <div className={`bg-blue-500/10 rounded-xl border border-blue-500/20 p-6 mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-500/20 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-300">Razorpay UPI Payment Information</h3>
                <div className="mt-2 text-sm text-blue-200">
                  <p>Intruitia uses Razorpay as our authorized payment gateway for all UPI transactions. All payments are processed securely and in compliance with RBI guidelines.</p>
                  <p className="mt-1">For any UPI payment-related issues, please contact us at support@intruitia.in with your transaction reference number.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`bg-white/5 rounded-xl border border-white/10 p-8 mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-400" />
                  Introduction
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  At Intruitia, we are committed to providing high-quality digital services. This Refund Policy outlines our guidelines regarding refunds for payments made through UPI, credit/debit cards, net banking, and other electronic payment methods processed through our payment gateway partner Razorpay.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This Refund Policy is governed by and complies with the applicable laws of India, including but not limited to the Information Technology Act, 2000, the Payment and Settlement Systems Act, 2007, and the guidelines issued by the Reserve Bank of India (RBI) and the National Payments Corporation of India (NPCI).
                </p>
                <p className="text-gray-300 leading-relaxed">
                  By engaging our services and making payments through our platform, you agree to the terms of this Refund Policy. This policy should be read in conjunction with our Terms and Conditions, Privacy Policy, and Cancellation Policy. Please read all documents carefully before making any payments.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Payment Structure
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Our services are offered through various payment models:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>One-time project fees for web development and design services</li>
                  <li>Monthly subscription fees for AI tool access and premium features</li>
                  <li>Pay-per-use charges for individual AI tool usage</li>
                  <li>Consultation and support service fees</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Refund Eligibility
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Refunds may be considered under the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Technical issues preventing access to purchased services</li>
                  <li>Duplicate payments made due to system errors</li>
                  <li>Services not delivered as specified in our agreement</li>
                  <li>Cancellation within the specified cooling-off period</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Refund Process
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  To request a refund, please contact us at support@intruitia.in with the following information:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Transaction ID or payment reference number</li>
                  <li>Date and amount of payment</li>
                  <li>Reason for refund request</li>
                  <li>Supporting documentation (if applicable)</li>
                </ul>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Refund requests will be processed within 7-10 business days after approval. Approved refunds will be credited back to the original payment method.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Non-Refundable Items
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The following items are generally non-refundable:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                  <li>Completed custom development work</li>
                  <li>AI tool usage that has been successfully utilized</li>
                  <li>Consultation services that have been provided</li>
                  <li>Third-party service fees and integration costs</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  For any questions regarding this Refund Policy or to request a refund, please contact us:
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-300 font-medium">Email: support@intruitia.in</p>
                  <p className="text-blue-300">Address: Suraram, Hyderabad 500055, Telangana, India</p>
                  <p className="text-blue-300">Business Registration: UDYAM-TS-20-0135173</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
