import { useState, useEffect, useRef } from 'react';
import { FileText, Scale, AlertTriangle } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const TermsAndConditions = () => {
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
                <Scale className="w-4 h-4 mr-2" />
                Legal Agreement
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Terms and Conditions
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
                  Welcome to Intruitia. These Terms and Conditions govern your use of our website and services. By accessing our website or using our services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Intruitia is a registered Micro Enterprise based in Hyderabad, India (UDYAM-TS-20-0135173), providing services including but not limited to computer programming activities, video production, and digital solutions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Definitions
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li><span className="font-semibold">"We," "Our," or "Us"</span> refers to Intruitia.</li>
                  <li><span className="font-semibold">"You" or "Your"</span> refers to the user or viewer of our website or client of our services.</li>
                  <li><span className="font-semibold">"Services"</span> refers to all services provided by Intruitia, including web development, content creation, and consulting services.</li>
                  <li><span className="font-semibold">"Website"</span> refers to intruitia.in and all associated content.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Services and Pricing
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We offer a range of digital services, including web development, content creation, and startup consulting. Detailed descriptions of our services and corresponding pricing are available upon request and will be provided in your service proposal or contract.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  All prices are quoted in Indian Rupees (INR) unless otherwise stated. We reserve the right to change our pricing at any time; however, any price changes will not affect services for which you have already signed a contract.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The full scope of work, deliverables, timeline, and payment schedule will be detailed in a separate service agreement or proposal provided to you.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Payment Terms
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Payment terms will be specified in your service agreement or proposal. Typically, we require:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>An initial deposit before commencing work</li>
                  <li>Milestone payments throughout the project</li>
                  <li>Final payment upon project completion</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We accept payments through bank transfers, credit/debit cards, and digital payment platforms including Razorpay. All payments processed through Razorpay are subject to Razorpay's terms of service and privacy policy.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Invoices are due upon receipt unless otherwise specified. Late payments may incur a late fee of 2% per month on the outstanding amount.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Intellectual Property Rights
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Upon full payment of all invoices related to your project, you will receive ownership rights to the final deliverables, except for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>Third-party materials that may be incorporated into the deliverables</li>
                  <li>Our proprietary tools, code libraries, or methodologies used to create the deliverables</li>
                  <li>Generic elements that are not unique to your project</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to showcase your project in our portfolio unless you specifically request otherwise in writing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Cancellation and Refund Policy
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Our cancellation and refund policy is as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Initial deposits are non-refundable as they cover initial consultations and project setup.</li>
                  <li>If you cancel a project after work has begun, you will be billed for all work completed up to the cancellation date.</li>
                  <li>For ongoing retainer services, cancellation requires a 30-day written notice.</li>
                  <li>All refunds, when applicable, will be processed within 14 business days through the original payment method.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 text-amber-500" />
                  Limitation of Liability
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  To the maximum extent permitted by law, Intruitia shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the services; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any interruption or cessation of transmission to or from our services; (d) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our services by any third party.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Governing Law
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Changes to Terms
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Contact Us
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us:
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

export default TermsAndConditions;
