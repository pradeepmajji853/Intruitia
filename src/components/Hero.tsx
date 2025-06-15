import { ArrowRight, BrainCircuit, Lightbulb, Sparkles, Zap, TrendingUp, Layers, CheckCircle, Users, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const animatedStats = {
    projects: 50,
    clients: 20,
    satisfaction: 98
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Animate text typing effect
    const text = "AI-Driven Content Ecosystems for Hyper-Personalized Digital Marketing";
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '-4s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0f2fe' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center px-8 py-4 glass-card-premium text-blue-800 rounded-full text-sm font-bold mb-8 hover-glow shadow-lg">
                <Sparkles className="w-5 h-5 mr-3 animate-pulse-soft text-blue-600" />
                Premium Digital Solutions
                <Zap className="w-5 h-5 ml-3 text-yellow-500 animate-bounce" />
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
                Transforming Ideas Into
                <span className="text-gradient block animate-gradient">Digital Excellence</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                We help startups and businesses build exceptional digital experiences through innovative web development, strategic consulting, and creative solutions.
              </p>
            </div>

            {/* Enhanced Features */}
            <div className={`grid grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              {features.map((feature, index) => (
                <div key={index} className="text-center group hover-scale">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-in transition-all duration-300`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* Animated Statistics */}
            <div className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-scale' : 'opacity-0'}`}>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-gradient mb-1">{animatedStats.projects}+</div>
                  <div className="text-sm text-slate-600 font-medium">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient mb-1">{animatedStats.clients}+</div>
                  <div className="text-sm text-slate-600 font-medium">Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient mb-1">{animatedStats.satisfaction}%</div>
                  <div className="text-sm text-slate-600 font-medium">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <button className="btn-primary group inline-flex items-center justify-center">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary group inline-flex items-center justify-center">
                View Our Work
                <CheckCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>

          {/* Enhanced Visual Dashboard */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main Enhanced Card */}
              <div className="card-professional p-8 hover-lift">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-4 animate-float">
                        <Target className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Project Dashboard</h3>
                      <p className="text-slate-600">Real-time analytics & insights</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gradient">94%</div>
                      <div className="text-sm stats-highlight">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Web Development</span>
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full gradient-primary rounded-full animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">UI/UX Design</span>
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-5/6 h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-shimmer"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Consulting</span>
                      <div className="w-32 h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -right-6 glass-card p-4 animate-float hover-lift">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Project Complete</div>
                    <div className="text-xs text-slate-500">2 minutes ago</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 glass-card p-4 animate-float hover-lift" style={{ animationDelay: '2s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 gradient-accent rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Team Collaboration</div>
                    <div className="text-xs text-slate-500">Active now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
