import { ArrowRight, BrainCircuit, Lightbulb, Sparkles, Zap, TrendingUp, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    // Animate text typing effect
    const text = "AI-Driven Content Ecosystems";
    const typingSpeed = 40; // milliseconds per character
    
    let currentCharIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentCharIndex <= text.length) {
        setAnimatedText(text.substring(0, currentCharIndex));
        currentCharIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, []);

  const features = [
    { 
      icon: BrainCircuit, 
      text: 'Hyper-personalized content at scale', 
      color: 'text-indigo-600 bg-indigo-100' 
    },
    { 
      icon: TrendingUp, 
      text: 'Real-time trend & sentiment integration', 
      color: 'text-purple-600 bg-purple-100' 
    },
    { 
      icon: Layers, 
      text: 'Cross-channel content orchestration', 
      color: 'text-blue-600 bg-blue-100' 
    },
    { 
      icon: Sparkles, 
      text: 'Hybrid AI + human creative collaboration', 
      color: 'text-violet-600 bg-violet-100' 
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-violet-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Pre-headline */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4 mr-2" />
                Next-Gen Marketing Agency
              </div>
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 transform transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {animatedText}<span className="animate-blink">|</span>
              </h1>
              <h2 className={`text-3xl md:text-4xl font-bold text-indigo-900 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                for Hyper-Personalized Digital Marketing
              </h2>
              <p className={`text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Enhance your brand's digital presence with content that adapts and engages—powered by cutting-edge generative AI and creative technology.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Book a Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:shadow-lg border border-indigo-100 transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
          
          {/* Features Cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 p-6 border border-indigo-50">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">{feature.text}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
