import { useState } from 'react';
import { Rocket, Code, Zap, CheckCircle, ArrowRight, Clock, Target, Smartphone } from 'lucide-react';

const MVPService = () => {
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const mvpPlans = [
    {
      id: 'starter',
      name: 'MVP Starter',
      duration: '2-3 weeks',
      description: 'Perfect for testing your core idea',
      features: [
        'Single core feature',
        'Basic UI/UX design',
        'Web application',
        'Basic authentication',
        'Database setup',
        'Deployment on cloud',
        '1 revision cycle',
        'Basic analytics'
      ],
      ideal: 'First-time founders, Idea validation'
    },
    {
      id: 'standard',
      name: 'MVP Standard',
      duration: '4-6 weeks',
      description: 'Comprehensive MVP with multiple features',
      features: [
        '3-5 core features',
        'Professional UI/UX',
        'Web + Mobile responsive',
        'Advanced authentication',
        'Database & API design',
        'Cloud deployment & CDN',
        '2 revision cycles',
        'Analytics & monitoring',
        'User feedback system',
        'Basic admin panel'
      ],
      ideal: 'Growing startups, Market entry',
      popular: true
    },
    {
      id: 'premium',
      name: 'MVP Premium',
      duration: '6-8 weeks',
      description: 'Full-featured MVP ready for scale',
      features: [
        '5-8 core features',
        'Custom UI/UX design',
        'Web + Native mobile apps',
        'Advanced user management',
        'Scalable architecture',
        'Multi-cloud deployment',
        '3 revision cycles',
        'Advanced analytics',
        'Payment integration',
        'Full admin dashboard',
        'API documentation',
        'Performance optimization'
      ],
      ideal: 'Funded startups, Enterprise MVP'
    }
  ];

  const techStack = [
    { name: 'Frontend', options: ['React', 'Next.js', 'Vue.js', 'Angular'] },
    { name: 'Backend', options: ['Node.js', 'Python', 'Go', 'Java'] },
    { name: 'Database', options: ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'] },
    { name: 'Cloud', options: ['AWS', 'Vercel', 'Netlify', 'Google Cloud'] },
    { name: 'Mobile', options: ['React Native', 'Flutter', 'PWA', 'Ionic'] }
  ];

  const process = [
    {
      step: 1,
      title: 'Discovery & Planning',
      duration: '2-3 days',
      description: 'Define requirements, user stories, and technical architecture',
      icon: Target
    },
    {
      step: 2,
      title: 'Design & Prototyping',
      duration: '3-5 days',
      description: 'Create wireframes, mockups, and interactive prototypes',
      icon: Smartphone
    },
    {
      step: 3,
      title: 'Development Sprint',
      duration: '2-5 weeks',
      description: 'Agile development with weekly check-ins and demos',
      icon: Code
    },
    {
      step: 4,
      title: 'Testing & Launch',
      duration: '3-5 days',
      description: 'Quality assurance, deployment, and go-live support',
      icon: Rocket
    }
  ];

  return (
    <section id="mvp-service" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6">
            <Rocket className="w-5 h-5 mr-2" />
            MVP-as-a-Service
            <Zap className="w-4 h-4 ml-2 text-yellow-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            From Idea to <span className="text-gradient">Market in Weeks</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your Minimum Viable Product built by experienced developers. No hiring, no management overhead — just results.
          </p>
        </div>

        {/* MVP Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {mvpPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg scale-105' 
                  : selectedPlan === plan.id 
                    ? 'border-blue-300 shadow-md' 
                    : 'border-gray-200 hover:border-blue-200'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center text-blue-600 mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">{plan.duration}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Ideal For:</h4>
                <p className="text-sm text-gray-600">{plan.ideal}</p>
              </div>

              <button 
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Flexible Tech Stack</h3>
          <div className="grid md:grid-cols-5 gap-6">
            {techStack.map((category, index) => (
              <div key={index} className="text-center">
                <h4 className="font-bold text-gray-900 mb-4">{category.name}</h4>
                <div className="space-y-2">
                  {category.options.map((option, optIndex) => (
                    <div key={optIndex} className="bg-gray-50 rounded-lg p-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Our MVP Development Process</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((phase, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <phase.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {phase.step}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h4>
                <div className="text-blue-600 font-semibold mb-2">{phase.duration}</div>
                <p className="text-gray-600 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Your MVP?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join 50+ successful startups who launched with our MVP service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center">
                Get Free Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-all duration-300">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MVPService;
