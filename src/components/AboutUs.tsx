import { useState, useEffect, useRef } from 'react';
import { Building, Users, Award, Map } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const AboutUs = () => {
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
        className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative transition-colors duration-300"
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
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-4 transition-colors duration-300">
                <Building className="w-4 h-4 mr-2" />
                Our Company
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                About Intruitia
              </h1>
            </div>
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg text-slate-600 dark:text-slate-300 transition-colors duration-300">
                Digital Excellence Through Innovation
              </p>
            </div>
          </div>

          <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-colors duration-300`}>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center transition-colors duration-300">
                  <Building className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                  Company Overview
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 transition-colors duration-300">
                  Intruitia is a registered Micro Enterprise based in Hyderabad, India. Founded in 2025, we specialize in computer programming, video production, and digital solutions for startups and established businesses alike.
                </p>
                <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 mt-6 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 transition-colors duration-300">Company Details</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Legal Name:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">Intruitia</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Business Type:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">Micro Enterprise (Proprietorship)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Registration Date:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">June 7, 2025</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Incorporation Date:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">June 1, 2025</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Udyam Registration:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">UDYAM-TS-20-0135173</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">PAN:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">PPNPK4592C</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                  Our Mission
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 transition-colors duration-300">
                  At Intruitia, our mission is to empower businesses with innovative digital solutions that drive growth, enhance customer experiences, and facilitate digital transformation. We believe in creating technology that solves real business challenges while being accessible, user-friendly, and scalable.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                  We're committed to delivering exceptional value through a combination of technical expertise, creative thinking, and business acumen, ensuring our clients stay ahead in today's rapidly evolving digital landscape.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center transition-colors duration-300">
                  <Users className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                  Our Team
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 transition-colors duration-300">
                  Our team consists of experienced professionals with diverse backgrounds in software development, design, marketing, and business consulting. Led by our founding team, we bring together expertise from various industries to deliver comprehensive solutions for our clients.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Pradeep Kumar Majji</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm mb-3 transition-colors duration-300">Founder & CEO</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm transition-colors duration-300">
                      With over 8 years of experience in web development and digital marketing, Pradeep leads our strategic vision and technical direction.
                    </p>
                  </div>
                  
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Sai Akhil</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm mb-3 transition-colors duration-300">CTO & Technical Lead</p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm transition-colors duration-300">
                      A software engineering expert with specialization in modern web technologies, AI integration, and scalable architecture.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center transition-colors duration-300">
                  <Award className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                  Our Expertise
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 transition-colors duration-300">
                  Intruitia specializes in delivering high-quality services across three core areas:
                </p>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Web Development</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm transition-colors duration-300">
                      We build modern, responsive websites and web applications using the latest technologies and best practices. From corporate websites to complex web applications, our development team ensures performance, security, and scalability.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Content Creation</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm transition-colors duration-300">
                      Our creative team produces engaging video content, graphics, and written materials that tell your brand story and connect with your audience. We focus on creating content that drives engagement and supports your business goals.
                    </p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2 transition-colors duration-300">Startup Consulting</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm transition-colors duration-300">
                      We provide strategic guidance to help startups navigate the challenges of building and scaling a business. From digital strategy to technology selection, our consultants offer practical advice based on real-world experience.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center transition-colors duration-300">
                  <Map className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
                  Our Location
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 transition-colors duration-300">
                  Our headquarters are located in Hyderabad, one of India's leading technology hubs. While we maintain a physical office for our team, we work remotely with clients across India and internationally.
                </p>

                <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3 transition-colors duration-300">Contact Information</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Office Address:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">
                        Flat No. 2-90/9/2/1, Jeevan Jyothi Nagar<br />
                        Suraram Colony, Suraram<br />
                        Hyderabad, Telangana 500055<br />
                        India
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Email:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">support@intruitia.in</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-600 dark:text-slate-400 font-semibold min-w-32 transition-colors duration-300">Working Hours:</span>
                      <span className="text-slate-800 dark:text-slate-200 transition-colors duration-300">Monday to Friday, 9:00 AM - 6:00 PM IST</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                  Our Commitment
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                  We are committed to providing exceptional service, maintaining transparent communication, and delivering results that exceed our clients' expectations. Our success is measured by the success of our clients, and we take pride in building long-term relationships based on trust, quality, and mutual growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
