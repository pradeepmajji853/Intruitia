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
      price: 'Starting at $2,999'
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Modern, responsive websites and web applications built with cutting-edge technologies to give your startup a competitive online presence.',
      features: ['Responsive Websites', 'Web Applications', 'Landing Pages', 'Performance Optimization'],
      stats: { projects: '200+', satisfaction: '99%' },
      price: 'Starting at $4,999'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Startup Consulting',
      description: 'Strategic guidance and digital transformation consulting to help entrepreneurs navigate the complexities of building a successful business.',
      features: ['Digital Strategy', 'Technology Consulting', 'Launch Planning', 'Growth Strategy'],
      stats: { projects: '100+', satisfaction: '97%' },
      price: 'Starting at $1,999'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'backgroundFloat 15s ease-in-out infinite'
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
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-particle-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 12}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Our Services
              </span>
              <div className="absolute -top-4 -right-4 animate-spin-slow">
                <Sparkles className="w-8 h-8 text-yellow-400 opacity-80" />
              </div>
            </h2>
          </div>
          <div className="animate-slide-in-left">
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Empowering startups with 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> cutting-edge solutions </span>
              and fresh perspectives that drive real results
            </p>
          </div>
        </div>

        {/* Enhanced Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card group relative perspective-1000 ${
                visibleCards.includes(index) ? 'animate-bounce-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Card Background with 3D Effect */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover-3d group-hover:bg-white/10">
                
                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${service.gradient} p-[2px]`}>
                  <div className="w-full h-full bg-slate-900 rounded-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced Icon */}
                  <div className={`bg-gradient-to-r ${service.gradient} text-white w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 relative animate-pulse-slow`}>
                    {service.icon}
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    
                    {/* Floating Particles around Icon */}
                    {service.particles.map((particle, idx) => (
                      <div
                        key={idx}
                        className="absolute text-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none animate-float"
                        style={{
                          left: `${20 + idx * 15}%`,
                          top: `${-10 + idx * 5}%`,
                          animationDelay: `${idx * 0.5}s`
                        }}
                      >
                        {particle}
                      </div>
                    ))}
                  </div>
                  
                  {/* Enhanced Title */}
                  <h3 className="text-3xl font-bold text-white mb-6 group-hover:animate-neon-glow">
                    {service.title}
                  </h3>
                  
                  {/* Enhanced Description */}
                  <p className="text-slate-300 mb-8 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Enhanced Features */}
                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-center text-slate-300 group-hover:text-white transition-all duration-300"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className={`w-3 h-3 bg-gradient-to-r ${service.gradient} rounded-full mr-4 animate-pulse`}>
                          <div className={`w-full h-full bg-gradient-to-r ${service.gradient} rounded-full blur animate-pulse`}></div>
                        </div>
                        <span className="relative">
                          {feature}
                          <Star className="w-4 h-4 inline ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-yellow-400" />
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced CTA Button */}
                  <button className={`group/btn relative bg-gradient-to-r ${service.gradient} text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 w-full flex items-center justify-center gap-2 hover-glow`}>
                    <Zap className="w-5 h-5 group-hover/btn:animate-bounce" />
                    Explore Service
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.hoverGradient} rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10`}></div>
                  </button>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${service.gradient} blur-xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="animate-bounce-in">
            <button className="group relative bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white px-12 py-6 rounded-full font-bold text-xl hover:scale-110 transition-all duration-300 animate-pulse-glow">
              <Sparkles className="w-6 h-6 inline mr-3 animate-spin-slow" />
              Get Custom Quote
              <Zap className="w-6 h-6 inline ml-3 group-hover:animate-bounce" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </button>
          </div>
          
          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center gap-8">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;