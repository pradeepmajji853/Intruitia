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
                Last Updated: June 13, 2025
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
                  At Intruitia, we are committed to providing high-quality digital services. This Refund and Cancellation Policy outlines our guidelines regarding refunds, cancellations, and project terminations, including all payment methods such as UPI, credit/debit cards, net banking, and other electronic payment methods processed through our payment gateway partner Razorpay.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  This Refund and Cancellation Policy is governed by and complies with the applicable laws of India, including but not limited to the Information Technology Act, 2000, the Payment and Settlement Systems Act, 2007, and the guidelines issued by the Reserve Bank of India (RBI) and the National Payments Corporation of India (NPCI).
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By engaging our services and making payments through our platform, you agree to the terms of this Refund and Cancellation Policy. Please read this document carefully before making any payments.
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
                <p className="text-slate-600 leading-relaxed mb-6">
                  In such cases, you will be billed only for work completed, and any excess pre-payment will be refunded.
                </p>

                <h3 className="text-xl font-semibold text-slate-800 mb-3">
                  UPI Payment Cancellation
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For payments made through UPI (Unified Payments Interface):
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Immediate Cancellation:</span> UPI payments cannot be cancelled once initiated and completed successfully. If you wish to cancel a service paid for via UPI, you must follow our standard refund process.</li>
                  <li><span className="font-semibold">Pending Transactions:</span> If a UPI transaction is pending, it will automatically expire after the timeout period (usually 2-5 minutes) if not completed.</li>
                  <li><span className="font-semibold">Failed Transactions:</span> For failed UPI transactions where money was debited from your account, the amount will be automatically refunded to your account within 5 business days as per NPCI guidelines.</li>
                  <li><span className="font-semibold">Duplicate Transactions:</span> In case of duplicate payments for the same service, the additional amount will be refunded automatically within 7 business days.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All UPI payment cancellations and refunds are processed in compliance with the guidelines set by the National Payments Corporation of India (NPCI) and the Reserve Bank of India (RBI).
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
                  All payments are processed securely through Razorpay, our trusted payment gateway partner. Razorpay is a RBI-approved payment solution that complies with the Payment Card Industry Data Security Standard (PCI-DSS).
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  When applicable, refunds will be processed as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Refund Processing:</span> Refunds will be issued through the original payment method used for the transaction.</li>
                  <li><span className="font-semibold">Processing Time:</span> Processing time is typically 5-14 business days, depending on your bank or payment provider.</li>
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
                  <li>If you do not receive the refund within the stipulated time frame, please contact us with your transaction details.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Dispute Resolution
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you are dissatisfied with our services or have any concerns regarding payments or refunds, please contact us directly at pradeepmajji853@gmail.com to discuss your concerns. We aim to resolve all issues promptly and fairly within 7 business days of receiving your complaint.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For disputes related to payments processed through Razorpay:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>Please provide your transaction ID, date of transaction, and detailed description of the issue.</li>
                  <li>Our team will coordinate with Razorpay to investigate and resolve the matter.</li>
                  <li>For UPI-related disputes, we follow the dispute resolution process as per the NPCI guidelines.</li>
                  <li>For card-related disputes, we follow the chargeback procedures established by the card networks and RBI regulations.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If we cannot reach an agreement through our standard dispute resolution process, disputes will be resolved according to the terms outlined in our Terms and Conditions.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  All payment disputes will be handled in accordance with the applicable Indian laws, including the Consumer Protection Act, 2019, the Information Technology Act, 2000, and the guidelines issued by the Reserve Bank of India.
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
                  We reserve the right to modify this Refund and Cancellation Policy at any time. Changes will be effective immediately upon posting on our website. Existing projects will follow the policy that was in effect at the time of contract signing.
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
                  If you have any questions about this Refund and Cancellation Policy, please contact us:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-4">
                  <p className="font-semibold text-slate-900 mb-1">Intruitia</p>
                  <p className="text-slate-600">Owner: Majji Pradeep Kumar</p>
                  <p className="text-slate-600">Email: pradeepmajji853@gmail.com</p>
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
                  <p className="text-slate-600">Email: grievance.intruitia@gmail.com</p>
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
