import { ArrowRight, CheckCircle, Users, Target, Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    { icon: Lightbulb, text: 'Innovative Solutions' },
    { icon: Users, text: 'Expert Team' },
    { icon: Target, text: 'Results Driven' }
  ];

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container-professional relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4 mr-2" />
                Professional Digital Solutions
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
                Transforming Ideas Into
                <span className="gradient-text-professional block">Digital Excellence</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                We help startups and businesses build exceptional digital experiences through innovative web development, strategic consulting, and creative solutions.
              </p>
            </div>

            {/* Features */}
            <div className={`grid grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{feature.text}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <button className="btn-professional btn-primary hover-lift group">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-professional btn-secondary hover-lift">
                View Our Work
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={`pt-8 border-t border-slate-200 transition-all duration-1000 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <p className="text-sm text-slate-500 mb-4">Trusted by innovative companies</p>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-600">TechCorp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-600">InnovateLab</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-600">StartupCo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main Card */}
              <div className="card-professional p-8 hover-lift">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="w-12 h-12 gradient-corporate rounded-xl flex items-center justify-center mb-4">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">Project Dashboard</h3>
                      <p className="text-slate-600">Real-time analytics & insights</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">94%</div>
                      <div className="text-sm text-green-600">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Web Development</span>
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">UI/UX Design</span>
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-5/6 h-full bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Consulting</span>
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 card-professional p-4 animate-subtle-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Project Complete</div>
                    <div className="text-xs text-slate-500">2 minutes ago</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 card-professional p-4 animate-subtle-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900">Team Collaboration</div>
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
