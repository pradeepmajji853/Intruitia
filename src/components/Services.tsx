import { Video, Code, Lightbulb, ArrowRight, CheckCircle, TrendingUp, Sparkles, Zap, Star } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const services = [
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Content Creation',
      description: 'Professional video content, social media graphics, and compelling brand stories that help your startup stand out and connect with your audience.',
      features: ['Professional Video Editing', 'Social Media Graphics', 'Brand Storytelling', 'Content Strategy'],
      stats: { projects: '150+', satisfaction: '98%', growth: '+250%' },
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      highlight: 'Most Popular'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies to give your startup a competitive online presence.',
      features: ['Responsive Websites', 'Web Applications', 'Landing Pages', 'Performance Optimization'],
      stats: { projects: '200+', satisfaction: '99%', growth: '+180%' },
      color: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
      highlight: 'Premium'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Startup Consulting',
      description: 'Strategic guidance and digital transformation consulting to help entrepreneurs navigate the complexities of building a successful business.',
      features: ['Digital Strategy', 'Technology Consulting', 'Launch Planning', 'Growth Strategy'],
      stats: { projects: '100+', satisfaction: '97%', growth: '+300%' },
      color: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      highlight: 'Best Value'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.15) 0, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(20, 184, 166, 0.1) 0, transparent 50%),
          linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-10 w-48 h-48 bg-gradient-to-br from-secondary-400/10 to-accent-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-4s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
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
              <Sparkles className="w-4 h-4 mr-2 animate-pulse-soft" />
              Premium Services
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Our 
              <span className="text-gradient animate-gradient"> Services</span>
            </h2>
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive digital solutions designed to accelerate your startup's growth 
              and establish a strong market presence through innovative technology and strategic insights.
            </p>
          </div>
        </div>

        {/* Enhanced Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card card-professional hover-lift group relative overflow-hidden ${
                visibleCards.includes(index) 
                  ? `animate-fade-in-scale animate-delay-${(index + 1) * 100}` 
                  : 'opacity-0'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Service Highlight Badge */}
              {service.highlight && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="badge-primary animate-bounce-in">
                    {service.highlight}
                  </span>
                </div>
              )}

              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Icon with Enhanced Animation */}
                <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-bounce-in transition-all duration-300 ${hoveredCard === index ? 'animate-float' : ''}`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-gradient transition-all duration-300">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>

                {/* Enhanced Features List */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 group-hover:animate-slide-in-left" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Enhanced Stats */}
                <div className="flex justify-between items-center mb-6 p-4 bg-white/50 rounded-xl border border-white/20">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gradient">{service.stats.projects}</div>
                    <div className="text-xs text-slate-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gradient">{service.stats.satisfaction}</div>
                    <div className="text-xs text-slate-600">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold stats-highlight text-xs">{service.stats.growth}</div>
                    <div className="text-xs text-slate-600">Growth</div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <button className={`w-full btn-primary group-hover:bg-gradient-to-r group-hover:${service.color} transition-all duration-300`}>
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call-to-Action Section */}
        <div className="text-center">
          <div className="glass-card p-12 rounded-3xl max-w-4xl mx-auto">
            <div className="animate-fade-in-up">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Ready to Transform Your
                <span className="text-gradient"> Startup?</span>
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join 200+ successful startups who have accelerated their growth with our comprehensive digital solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary group">
                  Schedule Free Consultation
                  <Zap className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="btn-secondary group">
                  View Success Stories
                  <TrendingUp className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="section-divider"></div>
    </section>
  );
};

export default Services;
