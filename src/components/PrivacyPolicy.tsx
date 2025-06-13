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
                Last Updated: June 13, 2025
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
                  This Privacy Policy describes how Intruitia and its affiliates (collectively "Intruitia", "we," "our," or "us") collect, use, share, protect or otherwise process your information/personal data through our website https://www.intruitia.in/ (hereinafter referred to as "Platform"). Please note that you may be able to browse certain sections of the Platform without registering with us.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We do not offer any product/service under this Platform outside India and your personal data will primarily be stored and processed in India.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  By visiting this Platform, providing your information or availing any product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of India including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Information We Collect
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We collect your personal data when you use our Platform, services or otherwise interact with us during the course of our relationship. Some of the information that we may collect includes but is not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li><span className="font-semibold">Contact Information:</span> Name, email address, phone number, company name</li>
                  <li><span className="font-semibold">Technical Data:</span> IP address, browser type, device information</li>
                  <li><span className="font-semibold">Usage Data:</span> Information about how you use our website and services</li>
                  <li><span className="font-semibold">Communication Data:</span> Preferences for receiving communications from us</li>
                  <li><span className="font-semibold">Payment Information:</span> When you make payments, we process transaction data via our secure payment processor (Razorpay)</li>
                  <li><span className="font-semibold">Identification:</span> Some sensitive personal data may be collected with your consent, such as your bank account or credit/debit card or other payment instrument information</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  You always have the option to not provide information by choosing not to use a particular service or feature on the Platform. We may track your behavior, preferences, and other information that you choose to provide on our Platform.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  If you receive an email or a call from a person/association claiming to be Intruitia seeking any personal data like debit/credit card PIN, net-banking or mobile banking password, we request you to never provide such information. If you have already revealed such information, report it immediately to an appropriate law enforcement agency.
                </p>
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
                  <li>To assist sellers and business partners in handling and fulfilling orders</li>
                  <li>To enhance customer experience</li>
                  <li>To resolve disputes and troubleshoot problems</li>
                  <li>To detect and protect us against error, fraud and other criminal activity</li>
                  <li>To enforce our terms and conditions</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  You understand that your access to these products/services may be affected in the event permission is not provided to us.
                </p>
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
                  <li>We do not store your complete credit card details, CVV codes, UPI PINs, or banking passwords</li>
                  <li>Razorpay may collect additional information necessary to process your transaction in accordance with their privacy policy</li>
                  <li>Transactions are encrypted using industry-standard SSL technology</li>
                  <li>For UPI payments, we may receive your UPI ID, transaction reference number, and payment status</li>
                  <li>Payment information is only used to process your transactions and for record-keeping as required by law</li>
                </ul>
                <p className="text-slate-600 leading-relaxed mb-4">
                  For more information on how Razorpay processes your data, please refer to <a href="https://razorpay.com/privacy/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Razorpay's Privacy Policy</a>.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Your UPI data is handled in compliance with the National Payments Corporation of India (NPCI) guidelines and the Payment and Settlement Systems Act, 2007. We implement appropriate security measures to protect your payment information from unauthorized access or disclosure.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Sharing Your Information
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We may share your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                  <li>With our corporate entities, affiliates, and business partners to provide services</li>
                  <li>With third-party service providers, including payment processors like Razorpay</li>
                  <li>To comply with legal obligations or respond to legal process</li>
                  <li>To protect our rights, privacy, safety or property</li>
                  <li>In connection with the sale or transfer of all or part of our business</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  We may disclose personal data to government agencies or other authorized law enforcement agencies if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal process.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Data Retention and Deletion
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  We will retain your personal data only for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. For payment data, we keep transaction records for a period of 7 years as required by Indian tax laws and accounting standards.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  You have an option to delete your account by contacting us. This action would result in you losing all information related to your account. You may write to us at the contact information provided below to assist you with these requests. We may, in the event of any pending grievance, claims, pending payments or any other services, refuse or delay deletion of the account. Once the account is deleted, you will lose access to the account.
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
                  Consent
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  By visiting our Platform or providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information on the Platform in accordance with this Privacy Policy. If you disclose to us any personal data relating to other people, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  You, while providing your personal data over the Platform or any partner platforms or establishments, consent to us (including our other corporate entities, affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy. You have an option to withdraw your consent by writing to us at the contact information provided below.
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
                <p className="text-slate-600 leading-relaxed mb-4">
                  To protect your personal data from unauthorized access or disclosure, loss or misuse, we adopt reasonable security practices and procedures. Once your information is in our possession or whenever you access your account information, we adhere to our security guidelines to protect it against unauthorized access and offer the use of a secure server.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  However, the transmission of information is not completely secure for reasons beyond our control. By using the Platform, the users accept the security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.
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
                  Contact Us & Grievance Officer
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                  <p className="font-semibold text-slate-900 mb-1">Intruitia</p>
                  <p className="text-slate-600">Grievance Officer: Majji Pradeep Kumar</p>
                  <p className="text-slate-600">Email: pradeepmajji853@gmail.com</p>
                  <p className="text-slate-600">Phone: +91 8184889557 (Monday - Friday, 9:00 - 18:00)</p>
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
