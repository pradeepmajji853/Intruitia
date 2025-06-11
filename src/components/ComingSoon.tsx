import React, { useState } from 'react';
import { Zap, Lock, Clock, ArrowRight, Sparkles, Users, Settings, BarChart3 } from 'lucide-react';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const upcomingFeatures = [
    {
      icon: Users,
      title: 'Client Dashboard',
      description: 'Comprehensive project management and communication hub',
      features: ['Real-time project tracking', 'File sharing & feedback', 'Team collaboration', 'Progress milestones'],
      eta: 'Q3 2025',
      blur: 'blur-sm'
    },
    {
      icon: Settings,
      title: 'Admin Panel',
      description: 'Powerful backend management for streamlined operations',
      features: ['Client management', 'Project workflows', 'Resource allocation', 'Analytics dashboard'],
      eta: 'Q3 2025',
      blur: 'blur-sm'
    },
    {
      icon: BarChart3,
      title: 'Quote Generator',
      description: 'AI-powered instant project quotes and proposals',
      features: ['Smart pricing engine', 'Custom proposals', 'Contract templates', 'Payment integration'],
      eta: 'Q4 2025',
      blur: 'blur-md'
    },
    {
      icon: Zap,
      title: 'AI Assistant',
      description: 'Intelligent project recommendations and automation',
      features: ['Content suggestions', 'Design recommendations', 'Performance insights', 'Workflow automation'],
      eta: 'Q1 2026',
      blur: 'blur-lg'
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="coming-soon" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-indigo-100 text-indigo-800 rounded-full text-sm font-bold mb-6">
            <Clock className="w-5 h-5 mr-2" />
            Coming Soon
            <Sparkles className="w-4 h-4 ml-2 text-yellow-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The Future is <span className="text-gradient">Almost Here</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the next generation of tools to make your digital transformation journey even more seamless and powerful.
          </p>
        </div>

        {/* Upcoming Features Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {upcomingFeatures.map((feature, index) => (
            <div key={index} className="relative group">
              {/* Blur Overlay */}
              <div className={`absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl z-10 flex items-center justify-center ${feature.blur}`}>
                <div className="text-center">
                  <Lock className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                  <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-bold">
                    {feature.eta}
                  </div>
                </div>
              </div>

              {/* Feature Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-semibold text-gray-900">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2 flex-shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Expected Launch</span>
                    <span className="font-bold text-indigo-600">{feature.eta}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-100">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Be the First to Know</h3>
            <p className="text-gray-600 mb-8">
              Get early access to new features and exclusive updates on our development progress.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                >
                  Notify Me
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center justify-center text-green-600 mb-2">
                  <Sparkles className="w-6 h-6 mr-2" />
                  <span className="font-bold">You're on the list!</span>
                </div>
                <p className="text-green-700">
                  We'll send you updates as soon as new features are available.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Development Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-12">Development Roadmap</h3>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-200 to-purple-200"></div>

              {/* Timeline Items */}
              <div className="space-y-12">
                {[
                  { quarter: 'Q2 2025', title: 'Core Platform Launch', status: 'completed' },
                  { quarter: 'Q3 2025', title: 'Dashboard & Admin Panel', status: 'in-progress' },
                  { quarter: 'Q4 2025', title: 'Quote Generator & Automation', status: 'planned' },
                  { quarter: 'Q1 2026', title: 'AI Assistant & Advanced Features', status: 'planned' }
                ].map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100">
                        <div className="text-lg font-bold text-gray-900 mb-2">{item.title}</div>
                        <div className="text-indigo-600 font-semibold">{item.quarter}</div>
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                          item.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : item.status === 'in-progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-600'
                        }`}>
                          {item.status === 'completed' ? 'Completed' : 
                           item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
