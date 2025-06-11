import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Building, MapPin, TrendingUp, Users } from 'lucide-react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: "Sarah Chen",
      position: "CEO",
      company: "TechFlow Dynamics",
      industry: "SaaS Technology",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b977?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      testimonial: "Intruitia transformed our entire digital infrastructure. Their team delivered a scalable platform that increased our operational efficiency by 300%. The attention to detail and technical expertise exceeded all expectations.",
      project: "Enterprise SaaS Platform",
      results: [
        "300% efficiency increase",
        "Operational optimization", 
        "99.9% uptime achieved"
      ],
      clientSize: "500+ employees"
    },
    {
      name: "Michael Rodriguez", 
      position: "CTO",
      company: "FinanceFirst Capital",
      industry: "Financial Services",
      location: "New York, NY", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      testimonial: "Working with Intruitia was a game-changer for our firm. They built a sophisticated trading platform that handles millions in transactions daily. Their security-first approach and regulatory compliance expertise were exceptional.",
      project: "Trading Platform Development",
      results: [
        "High daily volume",
        "Zero security incidents",
        "95% user satisfaction"
      ],
      clientSize: "200+ employees"
    },
    {
      name: "Emily Watson",
      position: "VP of Operations", 
      company: "HealthCare Innovations",
      industry: "Healthcare Technology",
      location: "Boston, MA",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      testimonial: "Intruitia delivered a HIPAA-compliant patient management system that revolutionized our practice. The user experience is intuitive, and the system has reduced administrative work by 60% while improving patient care quality.",
      project: "Healthcare Management System",
      results: [
        "60% admin reduction",
        "HIPAA compliant",
        "2x patient satisfaction"
      ],
      clientSize: "100+ employees"
    },
    {
      name: "David Park",
      position: "Founder & CEO",
      company: "EcoTech Solutions", 
      industry: "Clean Technology",
      location: "Seattle, WA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      testimonial: "The AI-powered analytics platform Intruitia built for us provides insights we never thought possible. It's helped us optimize our supply chain and reduce waste by 40%. Their innovative approach to problem-solving is remarkable.",
      project: "AI Analytics Platform",
      results: [
        "40% waste reduction",
        "Real-time insights",
        "ROI in 3 months"
      ],
      clientSize: "75+ employees"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section 
      className="py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.15) 0, transparent 50%),
          radial-gradient(circle at 60% 20%, rgba(14, 165, 233, 0.15) 0, transparent 50%),
          radial-gradient(circle at 20% 40%, rgba(20, 184, 166, 0.1) 0, transparent 50%),
          linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-gradient-to-br from-secondary-400/10 to-accent-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-5s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Professional Header */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 glass-card text-purple-800 rounded-full text-sm font-semibold mb-8 hover-glow">
              <Quote className="w-4 h-4 mr-2 animate-pulse-soft" />
              Client Success Stories
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              What Our 
              <span className="text-gradient animate-gradient"> Clients Say</span>
            </h2>
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it. Hear from the business leaders who've 
              transformed their operations and accelerated growth with our innovative solutions.
            </p>
          </div>
        </div>

        {/* Enhanced Main Testimonial */}
        <div className="max-w-6xl mx-auto">
          <div className="glass-card-premium p-12 md:p-16 mb-16 animate-fade-in-scale hover-lift">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Enhanced Testimonial Content */}
              <div className="animate-slide-in-left">
                <div className="flex items-center gap-3 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-7 h-7 text-yellow-400 fill-current animate-pulse-soft"
                    />
                  ))}
                  <span className="text-xl font-bold text-gradient ml-3">
                    {currentTestimonial.rating}.0
                  </span>
                </div>

                <div className="relative mb-10">
                  <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary-200 opacity-50" />
                  <blockquote className="text-2xl md:text-3xl text-slate-800 leading-relaxed pl-8 font-medium">
                    "{currentTestimonial.testimonial}"
                  </blockquote>
                </div>

                {/* Enhanced Client Info */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-1">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-lg text-slate-600 mb-2">
                      {currentTestimonial.position}
                    </p>
                    <div className="flex items-center gap-2 text-primary-600 font-semibold">
                      <Building className="w-5 h-5" />
                      {currentTestimonial.company}
                    </div>
                  </div>
                </div>

                {/* Enhanced Company Details */}
                <div className="grid grid-cols-2 gap-6 p-6 glass-card rounded-xl">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-500" />
                    <div>
                      <span className="text-xs text-slate-500 block">Location</span>
                      <span className="text-sm font-semibold text-slate-700">{currentTestimonial.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-500" />
                    <div>
                      <span className="text-xs text-slate-500 block">Team Size</span>
                      <span className="text-sm font-semibold text-slate-700">{currentTestimonial.clientSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Results */}
              <div className="animate-slide-in-right">
                <div className="glass-card p-6 bg-white/60">
                  <h5 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Project Results
                  </h5>
                  
                  <div className="space-y-4 mb-6">
                    {currentTestimonial.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-700 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-center items-center">
                      <div className="text-center">
                        <p className="text-sm text-slate-500">Project</p>
                        <p className="font-semibold text-slate-800">{currentTestimonial.project}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <button
              onClick={prevSlide}
              className="p-3 glass-card hover-lift transition-all duration-300 hover:bg-blue-50"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-blue-500 scale-125'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 glass-card hover-lift transition-all duration-300 hover:bg-blue-50"
            >
              <ChevronRight className="w-6 h-6 text-slate-600" />
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up animate-delay-300">
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
              <div className="text-slate-600">Happy Clients</div>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-slate-600">Client Satisfaction</div>
            </div>
            <div className="glass-card p-6 text-center hover-lift">
              <div className="text-3xl font-bold text-orange-600 mb-2">24hr</div>
              <div className="text-slate-600">Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
