import { Video, Code, Lightbulb, ArrowRight, CheckCircle, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Services = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
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
      stats: { projects: '150+', satisfaction: '98%' },
      price: 'Starting at $2,999',
      color: 'blue'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies to give your startup a competitive online presence.',
      features: ['Responsive Websites', 'Web Applications', 'Landing Pages', 'Performance Optimization'],
      stats: { projects: '200+', satisfaction: '99%' },
      price: 'Starting at $4,999',
      color: 'indigo'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Startup Consulting',
      description: 'Strategic guidance and digital transformation consulting to help entrepreneurs navigate the complexities of building a successful business.',
      features: ['Digital Strategy', 'Technology Consulting', 'Launch Planning', 'Growth Strategy'],
      stats: { projects: '100+', satisfaction: '97%' },
      price: 'Starting at $1,999',
      color: 'slate'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 bg-gradient-to-b from-white to-slate-50 relative"
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
          <div className="animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our 
              <span className="gradient-text-professional"> Services</span>
            </h2>
          </div>
          <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions designed to accelerate your startup's growth 
              with proven methodologies and cutting-edge technologies.
            </p>
          </div>
        </div>

        {/* Professional Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card card-professional hover-lift ${
                visibleCards.includes(index) ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Service Content */}
              <div className="p-8">
                {/* Professional Icon */}
                <div className={`bg-${service.color}-100 text-${service.color}-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-110`}>
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-center text-slate-600"
                    >
                      <CheckCircle className={`w-5 h-5 text-${service.color}-600 mr-3 flex-shrink-0`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className={`w-4 h-4 text-${service.color}-600 mr-1`} />
                      <span className="text-2xl font-bold text-slate-900">{service.stats.projects}</span>
                    </div>
                    <span className="text-sm text-slate-500">Projects</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className={`w-4 h-4 text-${service.color}-600 mr-1`} />
                      <span className="text-2xl font-bold text-slate-900">{service.stats.satisfaction}</span>
                    </div>
                    <span className="text-sm text-slate-500">Satisfaction</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-lg font-semibold text-slate-900">{service.price}</span>
                </div>

                {/* Professional CTA Button */}
                <button className="btn-professional w-full group">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Professional CTA Section */}
        <div className="text-center">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-slate-600 mb-6">
                Let's discuss how our services can accelerate your startup's growth and help you achieve your business objectives.
              </p>
              <button className="btn-professional inline-flex items-center">
                Get Custom Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
