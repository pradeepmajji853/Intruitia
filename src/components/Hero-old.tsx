import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        animation: 'backgroundFloat 20s ease-in-out infinite'
      }}></div>
      
      {/* Interactive Cursor Follow Effect */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transform: 'translate3d(0, 0, 0)'
        }}
      ></div>
      
      {/* 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rotate-45 animate-float-delayed opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-float-slow opacity-60"></div>
        <div className="absolute top-60 left-1/3 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rotate-12 animate-float opacity-60"></div>
        <div className="absolute bottom-60 right-1/3 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-float-delayed opacity-60"></div>
      </div>
      
      {/* Enhanced Gradient Orbs with 3D effect */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse-slow transform-gpu"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-delayed transform-gpu"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-spin-slow"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Animated Title with 3D Effect */}
          <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight perspective-1000">
              <span className="inline-block animate-fade-in-up">Welcome to</span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent block mt-2 animate-gradient-x text-8xl md:text-9xl font-black tracking-tight transform hover:scale-105 transition-transform duration-300">
                Intruitia
              </span>
            </h1>
          </div>
          
          {/* Enhanced Subtitle with Typewriter Effect */}
          <div className={`transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              A fresh startup dedicated to empowering entrepreneurs with 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-semibold"> innovative web solutions</span>, 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> creative content</span>, and 
              <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text font-semibold"> strategic launch support</span>. 
              Let's build something amazing together.
            </p>
          </div>

          {/* Enhanced CTA Buttons with 3D Effects */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={scrollToContact}
              className="group relative bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 hover:from-blue-700 hover:via-cyan-600 hover:to-purple-700 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 animate-pulse-glow"
            >
              <Sparkles className="w-5 h-5 animate-spin-slow" />
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </button>
            
            <button className="group relative text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:-translate-y-1">
              <Zap className="w-5 h-5 inline mr-2 group-hover:animate-bounce" />
              Learn More
              <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-400/30 rounded-full transition-all duration-300"></div>
            </button>
          </div>

          {/* Enhanced Stats with 3D Cards */}
          <div className={`mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Fresh</div>
              <div className="text-slate-400 group-hover:text-slate-300 transition-colors">Ideas & Innovation</div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dedicated</div>
              <div className="text-slate-400 group-hover:text-slate-300 transition-colors">Team & Support</div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="group text-center bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-400/30 transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20">
              <div className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Passionate</div>
              <div className="text-slate-400 group-hover:text-slate-300 transition-colors">About Your Success</div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;