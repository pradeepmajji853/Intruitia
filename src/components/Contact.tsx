import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, CheckCircle, Clock, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      const response = await fetch('http://localhost:3001/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }
      
      console.log('Form submitted successfully:', data);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'support@intruitia.in',
      description: 'We respond within 24 hours'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office',
      value: 'Suraram, Hyderabad 500055',
      description: 'Telangana, India'
    }
  ];

  const features = [
    {
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      text: 'Free consultation call'
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-600" />,
      text: '24-hour response time'
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      text: 'Dedicated project manager'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-gradient-to-b from-slate-50 to-white relative"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get in 
              <span className="gradient-text-professional"> Touch</span>
            </h2>
          </div>
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business? Let's discuss your project and explore 
              how we can help you achieve your goals with innovative solutions.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Professional Contact Form */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="card-professional p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-professional w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Message Sent Successfully</h3>
                    <p className="mt-1 text-sm text-green-700">
                      Thank you for your message! We'll get back to you within 24 hours. If you don't receive a response, 
                      please contact us directly at support@intruitia.in
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error Sending Message</h3>
                    <p className="mt-1 text-sm text-red-700">
                      {errorMessage || "We couldn't send your message. Please try again or contact us directly at support@intruitia.in"}
                    </p>
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      {feature.icon}
                      <span className="ml-3 text-slate-600">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="card-professional p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                We're here to help transform your business with innovative solutions. 
                Reach out to discuss your project requirements and get a custom quote.
              </p>
            </div>

            {/* Professional Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="card-professional p-6 hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-1">{info.title}</h4>
                      <p className="text-blue-600 font-semibold mb-1">{info.value}</p>
                      <p className="text-slate-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Professional CTA Card */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
              <h4 className="text-xl font-bold text-slate-900 mb-4">
                Ready to Get Started?
              </h4>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Schedule a free consultation call to discuss your project requirements 
                and learn how we can help accelerate your business growth.
              </p>
              <button className="btn-professional">
                Schedule Consultation
                <Clock className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Professional Bottom Section */}
        <div className="mt-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Join hundreds of satisfied clients who have transformed their businesses 
              with our innovative solutions and dedicated support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
