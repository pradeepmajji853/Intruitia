import { useState, useEffect, useRef } from 'react';
import { RefreshCw, FileText } from 'lucide-react';
import Footer from './Footer-ai';
import Navbar from './Navbar-ai';

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
                Refund Policy
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
                  <p>Intruitia uses Razorpay as our authorized payment gateway for all UPI transactions. All payments are processed securely and in compliance with RBI guidelines.</p>
                  <p className="mt-1">For any UPI payment-related issues, please contact us at support@intruitia.in with your transaction reference number.</p>
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
                  At Intruitia, we are committed to providing high-quality digital services. This Refund Policy outlines our guidelines regarding refunds for payments made through UPI, credit/debit cards, net banking, and other electronic payment methods processed through our payment gateway partner Razorpay.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  This Refund Policy is governed by and complies with the applicable laws of India, including but not limited to the Information Technology Act, 2000, the Payment and Settlement Systems Act, 2007, and the guidelines issued by the Reserve Bank of India (RBI) and the National Payments Corporation of India (NPCI).
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By engaging our services and making payments through our platform, you agree to the terms of this Refund Policy. This policy should be read in conjunction with our <a href="/terms-and-conditions" className="text-blue-600 hover:underline">Terms and Conditions</a>, <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, and <a href="/cancellation-policy" className="text-blue-600 hover:underline">Cancellation Policy</a>. Please read all documents carefully before making any payments.
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
                <p className="text-slate-600 leading-relaxed mb-4">
                  For information on how to cancel your order or service, please refer to our separate <a href="/cancellation-policy" className="text-blue-600 hover:underline">Cancellation Policy</a>. The following sections detail our refund terms for different services after a cancellation has been approved.
                </p>
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
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  How to Request a Refund
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-4">
                  <li>Send an email to support@intruitia.in with the subject line "Refund Request - [Your Name/Company Name]".</li>
                  <li>Include your order details, project name, and reason for the refund request.</li>
                  <li>For services paid via UPI, please include your UPI transaction reference ID and the date of the transaction.</li>
                  <li>We will acknowledge your refund request within 24 hours.</li>
                  <li>Our team will review your request and contact you to discuss the refund terms based on the project stage and our refund policy.</li>
                </ol>
                <p className="text-slate-600 leading-relaxed">
                  All refund requests must be submitted in writing. Verbal refund requests will not be considered official until confirmed in writing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Payment Processing & Refunds
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All payments are processed securely through Razorpay, our trusted payment gateway partner. Razorpay is a RBI-approved payment solution that complies with the Payment Card Industry Data Security Standard (PCI-DSS).
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Refund Processing:</span> Refunds will be issued through the original payment method used for the transaction.</li>
                  <li><span className="font-semibold">Processing Time:</span> Processing time is typically 5-7 business days, depending on your bank or payment provider.</li>
                  <li><span className="font-semibold">Transaction Fees:</span> Any transaction fees charged by Razorpay or your bank are non-refundable.</li>
                  <li><span className="font-semibold">Partial Refunds:</span> In certain cases, we may issue partial refunds based on the circumstances and the portion of services already rendered.</li>
                  <li><span className="font-semibold">Refund Confirmation:</span> Once a refund is processed, you will receive a confirmation email with the refund details.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Payment Method-Specific Refund Policies
                </h3>
                
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  UPI Payment Refunds
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Processing Time:</span> UPI refunds typically take 2-5 business days to reflect in your bank account.</li>
                  <li><span className="font-semibold">Failed Transactions:</span> In the event of a failed UPI transaction where your account was debited, the amount will be automatically reversed within 5 business days as per NPCI guidelines.</li>
                  <li><span className="font-semibold">Refund Method:</span> Refunds for UPI payments will be processed back to the same UPI ID used for the original payment.</li>
                  <li><span className="font-semibold">Transaction Reference:</span> For any issues with UPI payments or refunds, please contact us with your UPI transaction reference number.</li>
                  <li><span className="font-semibold">Regulatory Compliance:</span> All UPI transactions and refunds are processed in accordance with the guidelines set by the National Payments Corporation of India (NPCI) and the Reserve Bank of India (RBI).</li>
                  <li><span className="font-semibold">Instant Refunds:</span> For eligible transactions, we may offer instant refunds that will be credited to your UPI account within minutes. Eligibility for instant refunds is determined on a case-by-case basis.</li>
                  <li><span className="font-semibold">Refund Cancellation:</span> Once a refund is initiated, it cannot be cancelled or reversed.</li>
                </ul>
                
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  Credit/Debit Card Refunds
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Processing Time:</span> Card refunds typically take 7-14 business days to reflect in your account, depending on your card issuer's policies.</li>
                  <li><span className="font-semibold">Refund Method:</span> Refunds will be processed to the same card that was used for the original payment.</li>
                  <li><span className="font-semibold">Card Expiry:</span> If your card has expired or been replaced, the refund will still be processed to the original card account.</li>
                </ul>
                
                <h4 className="text-lg font-semibold text-slate-800 mb-2">
                  Net Banking & Other Payment Methods
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Net Banking:</span> Refunds for net banking transactions will be credited back to the bank account used for the original payment.</li>
                  <li><span className="font-semibold">Digital Wallets:</span> Refunds for payments made through digital wallets will be credited back to the same wallet account.</li>
                  <li><span className="font-semibold">Processing Time:</span> Processing times may vary depending on the payment method and your financial institution.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Automatic Refunds for Failed Transactions
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  In case of a payment failure or technical error where your account has been debited but the transaction was not completed on our platform:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>The amount will be automatically refunded to your payment instrument as per the timelines defined by the relevant regulatory authorities.</li>
                  <li>For UPI transactions, this is typically within 5 business days as per NPCI guidelines.</li>
                  <li>You will receive a notification from Razorpay and/or your bank regarding the refund.</li>
                  <li>If you do not receive the refund within the stipulated time frame, please contact us with your transaction details within 7 days of the failed transaction.</li>
                  <li>For UPI transactions, please provide the UPI transaction reference number, date and time of transaction, and your UPI ID.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Dispute Resolution for Refunds
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you are dissatisfied with our refund decision or have any concerns regarding payments or refunds, please contact us directly at support@intruitia.in to discuss your concerns. We aim to resolve all issues promptly and fairly within 7 business days of receiving your complaint.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For disputes related to refunds for payments processed through Razorpay:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>Please provide your transaction ID, date of transaction, and detailed description of the issue.</li>
                  <li>Our team will coordinate with Razorpay to investigate and resolve the matter.</li>
                  <li>For UPI-related refund disputes, we follow the dispute resolution process as per the NPCI guidelines.</li>
                  <li>For card-related refund disputes, we follow the chargeback procedures established by the card networks and RBI regulations.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If we cannot reach an agreement through our standard dispute resolution process, disputes will be resolved according to the terms outlined in our Terms and Conditions.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  All payment and refund disputes will be handled in accordance with the applicable Indian laws, including the Consumer Protection Act, 2019, the Information Technology Act, 2000, and the guidelines issued by the Reserve Bank of India.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Regulatory Compliance for Digital Payments
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Intruitia is committed to ensuring compliance with all applicable regulations governing digital payments in India, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Reserve Bank of India (RBI) Guidelines:</span> We adhere to all RBI directives related to digital payments, including customer authentication, data storage, and transaction security.</li>
                  <li><span className="font-semibold">Information Technology Act, 2000:</span> Our payment processing complies with the IT Act provisions related to electronic transactions and data privacy.</li>
                  <li><span className="font-semibold">Payment and Settlement Systems Act, 2007:</span> All payment systems used by us operate in accordance with this Act.</li>
                  <li><span className="font-semibold">NPCI Guidelines for UPI:</span> Our UPI payment implementation follows all guidelines set by the National Payments Corporation of India.</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  UPI Transaction Security and Compliance
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For UPI transactions specifically:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>All UPI transactions are authenticated using multi-factor authentication as required by regulatory guidelines.</li>
                  <li>Transaction information is stored in compliance with the Payment Aggregator and Payment Gateway guidelines issued by the RBI.</li>
                  <li>We maintain records of all transactions for the period specified by applicable laws and regulations.</li>
                  <li>Personal and financial information is protected as per our Privacy Policy and applicable data protection laws.</li>
                  <li>In case of any security incidents or data breaches affecting payment information, we will notify affected users and relevant authorities as required by law.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Changes to This Policy
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting on our website. Existing projects will follow the policy that was in effect at the time of contract signing.
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
                  If you have any questions about this Refund Policy, please contact us:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
                  <p className="font-semibold text-slate-900 mb-1">Intruitia</p>
                  <p className="text-slate-600">Owner: Majji Pradeep Kumar</p>
                  <p className="text-slate-600">Email: support@intruitia.in</p>
                  <p className="text-slate-600">Phone: +91 8184889557</p>
                  <p className="text-slate-600">Address: Flat No. 2-90/9/2/1, Jeevan Jyothi Nagar, Suraram Colony, Hyderabad, Telangana 500055, India</p>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  Grievance Officer
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  In accordance with the Information Technology Act, 2000 and the rules made thereunder, the name and contact details of the Grievance Officer for addressing payment-related issues are provided below:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Grievance Officer</p>
                  <p className="text-slate-600">Name: Majji Pradeep Kumar</p>
                  <p className="text-slate-600">Email: support@intruitia.in</p>
                  <p className="text-slate-600">Phone: +91 8184889557</p>
                  <p className="text-slate-600">Address: Flat No. 2-90/9/2/1, Jeevan Jyothi Nagar, Suraram Colony, Hyderabad, Telangana 500055, India</p>
                  <p className="text-slate-600 mt-2">The Grievance Officer will acknowledge your complaint within 24 hours and resolve it within 7 business days from the date of receipt.</p>
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
