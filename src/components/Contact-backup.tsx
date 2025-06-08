import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Star, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const services = [
    'Web Development',
    'Mobile App Development', 
    'AI/ML Solutions',
    'Data Analytics',
    'Digital Transformation',
    'Consulting',
    'Other'
  ];

  const budgetRanges = [
    '$5K - $15K',
    '$15K - $50K',
    '$50K - $100K',
    '$100K+',
    'Discuss Budget'
  ];

  const timelines = [
    '1-2 months',
    '3-4 months',
    '5-6 months',
    '6+ months',
    'Flexible'
  ];

  if (isSubmitted) {
    return (
      <section 
        className="py-32 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.15) 0, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.15) 0, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(168, 85, 247, 0.1) 0, transparent 50%),
            linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)
          `,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center glass-card-premium p-12 animate-bounce-in">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gradient mb-6">
              Thank You for Reaching Out!
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We've received your message and will get back to you within 24 hours with a detailed proposal tailored to your needs.
            </p>
            <div className="glass-card p-4 rounded-xl inline-block">
              <div className="flex items-center gap-3 text-green-600">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Average Response Time: 6 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" 
      className="py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 75%, rgba(14, 165, 233, 0.15) 0, transparent 50%),
          radial-gradient(circle at 75% 25%, rgba(168, 85, 247, 0.15) 0, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0, transparent 50%),
          linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-80 h-80 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-secondary-400/10 to-accent-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-4s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Professional Header */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 glass-card text-blue-800 rounded-full text-sm font-semibold mb-8 hover-glow">
              <MessageSquare className="w-4 h-4 mr-2 animate-pulse-soft" />
              Get In Touch
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Let's Build Something
              <span className="text-gradient animate-gradient"> Amazing</span>
            </h2>
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your startup with cutting-edge digital solutions? 
              Let's discuss your project and create something extraordinary together.
            </p>
          </div>
        </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? Share your vision with us and get a 
            personalized proposal within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="glass-card p-8 animate-slide-in-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Project Details</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Service Needed *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select Service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Budget</option>
                    {budgetRanges.map((range, index) => (
                      <option key={index} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Select Timeline</option>
                    {timelines.map((timeline, index) => (
                      <option key={index} value={timeline}>{timeline}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Tell us about your project goals, challenges, and requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-3 text-lg py-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Project Details
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & Features */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Contact Info */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Contact Information</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Email</p>
                    <p className="text-slate-600">hello@intruitia.com</p>
                    <p className="text-sm text-slate-500">Response within 6 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Phone</p>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-slate-500">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Location</p>
                    <p className="text-slate-600">San Francisco, CA</p>
                    <p className="text-sm text-slate-500">Remote-first team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Features */}
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">What to Expect</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Free consultation & project analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Detailed proposal within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Transparent pricing & timeline</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Dedicated project manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-700">Regular progress updates</span>
                </div>
              </div>
            </div>

            {/* Response Time Stats */}
            <div className="glass-card p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <h4 className="text-lg font-bold text-slate-800">Quick Response</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-600">6h</div>
                  <div className="text-sm text-slate-600">Avg Response</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">24h</div>
                  <div className="text-sm text-slate-600">Proposal Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
