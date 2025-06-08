import { Star, Quote, Heart, Target, Rocket, Shield, Sparkles, Zap, Crown, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Testimonials = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    const cards = document.querySelectorAll('.commitment-card');
    cards.forEach(card => observer.observe(card));

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

    // Auto-rotate active card
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % commitments.length);
    }, 4000);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  const commitments = [
    {
      title: "Fresh Innovation",
      subtitle: "Industry Insight",
      description: "Fresh perspectives and innovative approaches. As a new company, Intruitia brings enthusiasm and cutting-edge solutions to every challenge.",
      icon: <Rocket className="w-8 h-8" />,
      avatar: "I",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      bgGradient: "from-blue-900/20 via-cyan-900/20 to-teal-900/20",
      iconColor: "text-blue-400",
      particles: ['🚀', '💡', '⭐', '✨']
    },
    {
      title: "Quality Focus",
      subtitle: "Tech Community",
      description: "Dedicated team focused on quality over quantity. We take time to understand your vision and deliver solutions that truly make a difference.",
      icon: <Target className="w-8 h-8" />,
      avatar: "T",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      bgGradient: "from-purple-900/20 via-pink-900/20 to-red-900/20",
      iconColor: "text-purple-400",
      particles: ['🎯', '💜', '🔥', '⚡']
    },
    {
      title: "Growth Partnership",
      subtitle: "Startup Ecosystem",
      description: "Young, ambitious, and ready to grow with your business. Intruitia offers competitive rates with premium quality - perfect for startups.",
      icon: <Crown className="w-8 h-8" />,
      avatar: "S",
      gradient: "from-green-500 via-emerald-500 to-cyan-500",
      bgGradient: "from-green-900/20 via-emerald-900/20 to-cyan-900/20",
      iconColor: "text-green-400",
      particles: ['👑', '💚', '🌟', '🌱']
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 relative overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Cpath d='M40 40l20-20v40l-20-20zm-20 0l20 20v-40l-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'backgroundFloat 30s ease-in-out infinite'
        }}></div>
      </div>

      {/* Interactive Mouse Gradient */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>

      {/* Floating Commitment Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-particle-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-6 relative">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                Our Commitment
              </span>
              <div className="absolute -top-4 -right-8 animate-bounce">
                <Shield className="w-12 h-12 text-green-400 animate-pulse" />
              </div>
            </h2>
          </div>
          <div className="animate-slide-in-left">
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              As we start our journey, we're committed to bringing 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> fresh energy</span>, 
              <span className="text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text font-semibold"> innovative solutions</span>, and 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text font-semibold"> dedicated partnership </span>
              to every project
            </p>
          </div>
        </div>

        {/* Enhanced Commitment Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {commitments.map((commitment, index) => (
            <div
              key={index}
              data-index={index}
              className={`commitment-card group relative perspective-1000 ${
                visibleCards.includes(index) ? 'animate-bounce-in' : 'opacity-0'
              } ${
                activeCard === index ? 'scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
              onMouseEnter={() => setActiveCard(index)}
            >
              {/* Card Container with 3D Effect */}
              <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover-3d overflow-hidden">
                
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${commitment.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Enhanced Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`bg-gradient-to-r ${commitment.gradient} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 animate-pulse-slow`}>
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-5 h-5 text-yellow-400 fill-current animate-pulse" 
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{commitment.description}"
                  </p>

                  {/* Enhanced Profile */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${commitment.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 group-hover:scale-110 transition-transform duration-300 relative`}>
                        {commitment.avatar}
                        <div className={`absolute inset-0 bg-gradient-to-r ${commitment.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                          {commitment.title}
                        </div>
                        <div className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                          {commitment.subtitle}
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating Icon */}
                    <div className={`${commitment.iconColor} group-hover:scale-125 transition-transform duration-300 animate-float`}>
                      {commitment.icon}
                    </div>
                  </div>

                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {commitment.particles.map((particle, idx) => (
                      <div
                        key={idx}
                        className="absolute text-2xl animate-float"
                        style={{
                          left: `${20 + idx * 20}%`,
                          top: `${10 + idx * 15}%`,
                          animationDelay: `${idx * 0.5}s`
                        }}
                      >
                        {particle}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${commitment.gradient} blur-xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="relative inline-block">
            {/* Enhanced Rating Badge */}
            <div className="bg-slate-800/50 backdrop-blur-xl border-2 border-slate-700/50 rounded-3xl px-12 py-8 hover:border-slate-600/50 transition-all duration-500 hover:scale-105">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-8 h-8 text-yellow-400 fill-current animate-pulse" 
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <div className="w-px h-8 bg-slate-600"></div>
                <Award className="w-8 h-8 text-purple-400 animate-bounce" />
              </div>
              
              <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                <span className="text-white">Ready to Start</span>
                <Heart className="w-6 h-6 text-red-400 animate-pulse" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Building Together
                </span>
                <Sparkles className="w-6 h-6 text-yellow-400 animate-spin-slow" />
              </div>
              
              <p className="text-slate-400 mt-4 text-lg">
                Join us on this exciting journey of innovation and growth! 🚀
              </p>

              {/* Floating Action Button */}
              <button className="mt-8 group relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:scale-110 transition-all duration-300 animate-pulse-glow">
                <Zap className="w-6 h-6 inline mr-3 group-hover:animate-spin" />
                Start Your Journey
                <Rocket className="w-6 h-6 inline ml-3 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-cyan-700 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 animate-float">
              <Crown className="w-8 h-8 text-yellow-400 opacity-60" />
            </div>
            <div className="absolute -bottom-4 -right-4 animate-float-delayed">
              <Shield className="w-8 h-8 text-green-400 opacity-60" />
            </div>
          </div>

          {/* Bottom Decorative Line */}
          <div className="mt-16 flex justify-center gap-4">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;