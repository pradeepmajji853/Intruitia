import { useState, useRef } from 'react';
import { MailIcon, Phone, MapPin, MessageSquare, Send, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const contactRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contactRef, { once: false, amount: 0.1 });
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
    
    // Reset submission status after a delay
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    { 
      icon: MailIcon, 
      title: 'Email Us', 
      info: 'support@intruitia.in',
      description: 'Our support team will get back to you within 24 hours.'
    },
    { 
      icon: Phone, 
      title: 'Call Us', 
      info: '+91 8184889557',
      description: 'Monday to Friday, 9:00 AM - 6:00 PM IST.'
    },
    { 
      icon: MapPin, 
      title: 'Visit Us', 
      info: 'Hyderabad, India',
      description: 'Suraram, Hyderabad 500055, Telangana'
    }
  ];

  return (
    <div ref={contactRef} className="bg-gray-50 dark:bg-[#12121e] py-24 md:py-32 transition-colors duration-300" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/20 dark:to-fuchsia-500/20 text-violet-600 dark:text-violet-200 backdrop-blur-sm border border-violet-500/20 mb-6 transition-colors duration-300 shadow-sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Let's Connect
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Transform</span> Your Digital Strategy?
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Get in touch with our team of AI and marketing experts to discuss how we can help you achieve your business goals.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/10 dark:to-fuchsia-500/10 rounded-2xl p-8 border border-violet-500/20 dark:border-violet-500/20 mb-8 shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">Get a Personalized Demo</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-8 transition-colors duration-300">
                See how our AI-powered solutions can work specifically for your business with a customized demo.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project and goals..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full px-6 py-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center
                    ${isSubmitted 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg hover:shadow-violet-500/25'
                    } transform hover:scale-[1.02]`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Request a Demo
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 dark:border-white/10 hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.01]"
              >
                <div className="flex items-start">
                  <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg p-3 mr-4 shadow-md">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">{item.title}</h4>
                    <p className="text-violet-600 dark:text-violet-400 font-medium mb-2 transition-colors duration-300">{item.info}</p>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              variants={fadeInUp}
              className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/10 dark:to-fuchsia-500/10 rounded-xl p-8 border border-violet-500/20 dark:border-violet-500/20 mt-8 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Looking for customer support?</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
                Our support team is available 24/7 to help you with any questions or issues.
              </p>
              <button className="inline-flex items-center text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium transition-colors group">
                Visit Support Center
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
