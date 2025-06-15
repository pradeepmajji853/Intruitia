import { BrainCircuit, Orbit, Share2, PenTool, ArrowRight, CheckCircle, Sparkles, Zap, TrendingUp } from 'lucide-react';
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
      icon: <BrainCircuit className="w-8 h-8" />,
      title: 'AI-Powered Content Generation',
      description: 'Leverage cutting-edge generative AI to create personalized, relevant content at scale across all your digital touchpoints.',
      features: ['Hyper-personalized Copy', 'Custom Content Models', 'Brand Voice Preservation', 'Multi-format Content'],
      color: 'from-indigo-500 to-violet-500',
      bgGradient: 'from-indigo-50 to-violet-50',
      highlight: 'Core Service'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Real-time Trend Integration',
      description: 'Stay relevant with content that automatically adapts to emerging trends, audience sentiment, and market dynamics.',
      features: ['Trend Monitoring', 'Sentiment Analysis', 'Dynamic Content Updates', 'Competitive Insights'],
      color: 'from-blue-500 to-indigo-500',
      bgGradient: 'from-blue-50 to-indigo-50',
      highlight: 'Enhanced'
    },
    {
      icon: <Orbit className="w-8 h-8" />,
      title: 'Cross-channel Orchestration',
      description: 'Create cohesive content ecosystems that deliver consistent yet platform-optimized experiences across all customer touchpoints.',
      features: ['Omnichannel Strategy', 'Platform-specific Optimization', 'Unified Analytics', 'Customer Journey Mapping'],
      color: 'from-purple-500 to-blue-500',
      bgGradient: 'from-purple-50 to-blue-50',
      highlight: 'Advanced'
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: 'Human + AI Collaboration',
      description: 'Combine the creative power of expert marketers with AI assistance for content that maintains authentic human connection.',
      features: ['Expert Content Review', 'Creative Direction', 'Strategic Oversight', 'Emotional Intelligence'],
      color: 'from-teal-500 to-emerald-500',
      bgGradient: 'from-teal-50 to-emerald-50',
      highlight: 'Premium'
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Our AI Solutions
          </div>
          <h2 className="text-4xl font-bold text-indigo-900 mb-6">
            Cutting-edge AI-driven <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Marketing Solutions</span>
          </h2>
          <p className="text-xl text-slate-600">
            Transform your marketing with our suite of AI-powered services designed to create personalized, 
            engaging content for your audience.
          </p>
        </div>
        
        {/* New Feature Announcement */}
        <div className="max-w-2xl mx-auto mb-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100 flex items-start shadow-sm hover:shadow-md transition-shadow">
          <Sparkles className="w-6 h-6 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-indigo-800 mb-1">Try Our New AI Content Generator!</h3>
            <p className="text-indigo-700 text-sm mb-2">Create professional marketing content in seconds with our new AI-powered tool.</p>
            <a 
              href="/content-generator" 
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Try it now
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card relative overflow-hidden rounded-2xl transition-all duration-500 ${
                visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${
                hoveredCard === index ? 'scale-105 shadow-2xl z-10' : 'shadow-xl'
              }`}
              style={{ transitionDelay: `${100 * index}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Highlight Label */}
              {service.highlight && (
                <div className="absolute top-5 right-5 z-10">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-full">
                    {service.highlight}
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className={`h-full p-8 bg-gradient-to-br ${service.bgGradient} border border-white/50`}>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-r ${service.color} text-white shadow-lg`}>
                  {service.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.description}</p>

                {/* Features List */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Badges */}
                <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-indigo-100">
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600">AI</div>
                    <div className="text-sm text-slate-500">Powered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600">Fast</div>
                    <div className="text-sm text-slate-500">Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-indigo-600">Scalable</div>
                    <div className="text-sm text-slate-500">Solution</div>
                  </div>
                </div>

                {/* CTA Button */}
                <button 
                  className="group w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-white border border-indigo-200 text-indigo-600 rounded-lg shadow-md font-semibold hover:shadow-lg hover:border-indigo-300 transition-all duration-300">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
