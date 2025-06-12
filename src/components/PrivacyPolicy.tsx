import { useState, useEffect, useRef } from 'react';
import { Shield, Lock, FileText } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const PrivacyPolicy = () => {
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
                <Shield className="w-4 h-4 mr-2" />
                Data Protection
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Privacy Policy
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
                  <Lock className="w-6 h-6 mr-2 text-blue-600" />
                  Introduction
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  At Intruitia ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  We are a web development and digital solutions company based in Hyderabad, India. This policy applies to all visitors, users, and customers of our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Information We Collect
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We collect and process the following categories of personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Contact Information:</span> Name, email address, phone number, company name</li>
                  <li><span className="font-semibold">Technical Data:</span> IP address, browser type, device information</li>
                  <li><span className="font-semibold">Usage Data:</span> Information about how you use our website and services</li>
                  <li><span className="font-semibold">Communication Data:</span> Preferences for receiving communications from us</li>
                  <li><span className="font-semibold">Payment Information:</span> When you make payments, we process transaction data via our secure payment processor (Razorpay)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>To provide and improve our services</li>
                  <li>To communicate with you about our services</li>
                  <li>To process payments and transactions</li>
                  <li>To comply with legal obligations</li>
                  <li>To analyze and improve our website performance</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Payment Data & Razorpay
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For processing payments, we use Razorpay, a secure payment gateway. When you make a payment:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>Your payment information is collected directly by Razorpay on their secure platform</li>
                  <li>We do not store your complete credit card details, CVV codes, or banking passwords</li>
                  <li>Razorpay may collect additional information necessary to process your transaction in accordance with their privacy policy</li>
                  <li>Transactions are encrypted using industry-standard SSL technology</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  For more information on how Razorpay processes your data, please refer to <a href="https://razorpay.com/privacy/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Razorpay's Privacy Policy</a>.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Data Retention
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We will retain your personal data only for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. For payment data, we keep transaction records for a period of 7 years as required by Indian tax laws and accounting standards.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Your Data Rights
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Under applicable data protection laws, you have rights regarding your personal data, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>The right to access your personal data</li>
                  <li>The right to correction of inaccurate data</li>
                  <li>The right to erasure of your data (in certain circumstances)</li>
                  <li>The right to restrict or object to processing</li>
                  <li>The right to data portability</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  To exercise any of these rights, please contact us at pradeepmajji853@gmail.com.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We use cookies and similar tracking technologies to collect and track information about your browsing activities on our website. You can set your browser to refuse all or some browser cookies, but this may affect certain features of our website.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Security Measures
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, altered, disclosed, or accessed without authorization. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Third-Party Links
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Our website may include links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Updates to This Privacy Policy
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated version will be indicated by an updated "Last Updated" date at the top of this policy.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  Contact Us
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy;
