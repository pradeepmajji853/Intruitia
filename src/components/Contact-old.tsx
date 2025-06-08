import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles, Zap, Heart, MessageCircle, Calendar, Star, Rocket } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
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
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    alert('Thank you for your message! We\'ll get back to you soon. 🚀');
  };

  const contactInfo = [
    {
      icon: <Mail className="w-7 h-7" />,
      title: 'Email',
      value: 'hello@intruitia.com',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Drop us a line anytime!'
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Call us for quick chat'
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: 'Location',
      value: 'San Francisco, CA',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Where innovation happens'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zm-15 0l15 15v-30l-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'backgroundFloat 20s ease-in-out infinite'
        }}></div>
      </div>

      {/* Interactive Mouse Gradient */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-particle-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                Let's Connect
              </span>
              <div className="absolute -top-4 -right-8 animate-bounce">
                <Heart className="w-12 h-12 text-red-400 animate-pulse" />
              </div>
            </h2>
          </div>
          <div className={`transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              We're 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> excited to hear </span>
              about your project and explore how we can help bring your 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> vision to life</span>
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Enhanced Contact Form */}
          <div className={`transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-all duration-500 hover-3d">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-[2px]">
                <div className="w-full h-full bg-slate-900 rounded-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <MessageCircle className="w-8 h-8 text-blue-400 animate-bounce" />
                  <h3 className="text-3xl font-bold text-white">
                    Send us a message
                  </h3>
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-spin-slow" />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 hover:bg-white/15"
                      placeholder="John Doe"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 hover:bg-white/15"
                      placeholder="john@example.com"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <div className="relative">
                    <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-purple-400" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-400 resize-none hover:bg-white/15"
                      placeholder="Tell us about your amazing project ideas..."
                    ></textarea>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Sending Magic...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-6 h-6 animate-bounce" />
                        Send Message
                        <Send className="w-6 h-6" />
                      </>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 rounded-2xl blur opacity-0 hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                  </button>
                </form>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-xl"></div>
            </div>
          </div>

          {/* Enhanced Contact Information */}
          <div className={`space-y-8 transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                <h3 className="text-3xl font-bold text-white">
                  Get in Touch
                </h3>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                We're here to help bring your 
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> startup vision </span>
                to life. Whether you need development, content creation, or strategic guidance, our passionate team is ready to collaborate and make magic happen! ✨
              </p>
            </div>

            {/* Enhanced Contact Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover-lift"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-r ${info.gradient} text-white w-16 h-16 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 animate-pulse-slow`}>
                      {info.icon}
                      <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1">{info.title}</h4>
                      <p className="text-blue-300 font-semibold text-lg">{info.value}</p>
                      <p className="text-slate-400 text-sm mt-1">{info.description}</p>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                    </div>
                  </div>
                  
                  {/* Hover Glow */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${info.gradient} blur-xl`}></div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Card */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 animate-gradient-x"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-8 h-8 animate-bounce" />
                  <h4 className="text-2xl font-bold">Ready to Start?</h4>
                  <Rocket className="w-6 h-6 animate-pulse" />
                </div>
                <p className="mb-6 opacity-90 text-lg leading-relaxed">
                  Book a free consultation call to discuss your project and get a custom quote. 
                  Let's turn your dreams into reality! 🌟
                </p>
                <button className="group bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center gap-3 hover:scale-105">
                  <Star className="w-5 h-5 group-hover:animate-spin" />
                  Schedule Call
                  <Zap className="w-5 h-5 group-hover:animate-bounce" />
                </button>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-4 right-4 animate-float">
                <Heart className="w-6 h-6 text-red-300 opacity-60" />
              </div>
              <div className="absolute bottom-4 left-4 animate-float-delayed">
                <Star className="w-8 h-8 text-yellow-300 opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Section */}
        <div className="mt-20 text-center">
          <div className="flex justify-center gap-6 mb-8">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.3}s` }}
              ></div>
            ))}
          </div>
          <p className="text-slate-400 text-lg">
            <Heart className="w-5 h-5 inline text-red-400 mr-2" />
            Made with love by the Intruitia team
            <Sparkles className="w-5 h-5 inline text-yellow-400 ml-2" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;