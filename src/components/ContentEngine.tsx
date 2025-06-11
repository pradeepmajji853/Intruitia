import React, { useState } from 'react';
import { TrendingUp, Target, PenTool, Zap, CheckCircle, ArrowRight, BarChart3, Users, MessageSquare, Eye } from 'lucide-react';

const ContentEngine = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('blog');

  const contentStrategies = [
    {
      id: 'blog',
      name: 'Blog Content',
      icon: PenTool,
      description: 'SEO-optimized articles that drive organic traffic',
      metrics: { traffic: '+150%', leads: '+80%', engagement: '+120%' },
      services: [
        'Keyword research & strategy',
        'High-quality article writing',
        'SEO optimization',
        'Content calendar planning',
        'Performance tracking'
      ]
    },
    {
      id: 'social',
      name: 'Social Media',
      icon: Users,
      description: 'Engaging social content that builds communities',
      metrics: { followers: '+200%', engagement: '+180%', shares: '+90%' },
      services: [
        'Content strategy & planning',
        'Visual content creation',
        'Community management',
        'Hashtag optimization',
        'Analytics & reporting'
      ]
    },
    {
      id: 'email',
      name: 'Email Marketing',
      icon: MessageSquare,
      description: 'Personalized email campaigns that convert',
      metrics: { openRate: '35%+', clickRate: '12%+', conversion: '8%+' },
      services: [
        'Email sequence design',
        'Newsletter creation',
        'A/B testing',
        'Segmentation strategy',
        'Automation setup'
      ]
    },
    {
      id: 'video',
      name: 'Video Content',
      icon: Eye,
      description: 'Compelling video content for maximum impact',
      metrics: { views: '+300%', retention: '75%+', conversion: '+250%' },
      services: [
        'Script writing',
        'Video production',
        'Motion graphics',
        'Platform optimization',
        'Performance analysis'
      ]
    }
  ];

  const conversionFunnel = [
    {
      stage: 'Awareness',
      description: 'Attract potential customers with valuable content',
      tactics: ['SEO-optimized blog posts', 'Social media content', 'YouTube videos', 'Podcast appearances'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      stage: 'Interest',
      description: 'Engage audience with targeted, relevant content',
      tactics: ['Email newsletters', 'Webinars', 'Case studies', 'Product demos'],
      color: 'from-cyan-500 to-teal-500'
    },
    {
      stage: 'Consideration',
      description: 'Nurture prospects with educational content',
      tactics: ['Comparison guides', 'Free trials', 'Consultations', 'Testimonials'],
      color: 'from-teal-500 to-green-500'
    },
    {
      stage: 'Conversion',
      description: 'Convert prospects into paying customers',
      tactics: ['Landing pages', 'Special offers', 'Urgency campaigns', 'Retargeting'],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const tools = [
    { name: 'Content Management', tools: ['WordPress', 'Ghost', 'Contentful', 'Strapi'] },
    { name: 'SEO & Analytics', tools: ['Google Analytics', 'SEMrush', 'Ahrefs', 'Search Console'] },
    { name: 'Email Marketing', tools: ['Mailchimp', 'ConvertKit', 'ActiveCampaign', 'Klaviyo'] },
    { name: 'Social Media', tools: ['Buffer', 'Hootsuite', 'Later', 'Sprout Social'] },
    { name: 'Design & Video', tools: ['Canva', 'Figma', 'Adobe Creative', 'Loom'] }
  ];

  const results = [
    { metric: '10x', label: 'Content Output', description: 'Faster content creation with AI assistance' },
    { metric: '5x', label: 'Engagement Rate', description: 'Higher audience engagement across platforms' },
    { metric: '300%', label: 'Lead Generation', description: 'Increase in qualified leads from content' },
    { metric: '150%', label: 'Conversion Rate', description: 'Better conversion from content to sales' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-orange-100 text-orange-800 rounded-full text-sm font-bold mb-6">
            <TrendingUp className="w-5 h-5 mr-2" />
            Content-to-Conversion Engine
            <Zap className="w-4 h-4 ml-2 text-yellow-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Content That <span className="text-gradient">Converts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your content strategy into a revenue-generating machine with data-driven content that guides prospects through every stage of the buyer's journey.
          </p>
        </div>

        {/* Results Metrics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {results.map((result, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 group-hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-gradient mb-2">{result.metric}</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{result.label}</div>
                <div className="text-sm text-gray-600">{result.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Strategy Selector */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Choose Your Content Strategy</h3>
          
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {contentStrategies.map((strategy) => (
              <div
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy.id)}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                  selectedStrategy === strategy.id
                    ? 'border-orange-500 bg-orange-50 shadow-md scale-105'
                    : 'border-gray-200 hover:border-orange-300 hover:shadow-sm'
                }`}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <strategy.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{strategy.name}</h4>
                  <p className="text-sm text-gray-600">{strategy.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Strategy Details */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8">
            {(() => {
              const selected = contentStrategies.find(s => s.id === selectedStrategy);
              return (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">What We Deliver</h4>
                    <ul className="space-y-3">
                      {selected?.services.map((service, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Expected Results</h4>
                    <div className="space-y-4">
                      {Object.entries(selected?.metrics || {}).map(([key, value], index) => (
                        <div key={index} className="bg-white rounded-lg p-4 flex items-center justify-between">
                          <span className="font-medium text-gray-700 capitalize">{key}</span>
                          <span className="font-bold text-orange-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Content-to-Conversion Funnel</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-br ${stage.color} rounded-2xl p-6 text-white mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  <h4 className="font-bold text-lg mb-2">{stage.stage}</h4>
                  <p className="text-sm opacity-90 mb-4">{stage.description}</p>
                  <div className="text-xs space-y-1">
                    {stage.tactics.slice(0, 2).map((tactic, tIndex) => (
                      <div key={tIndex} className="bg-white/20 rounded px-2 py-1">
                        {tactic}
                      </div>
                    ))}
                  </div>
                </div>
                {index < conversionFunnel.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 mx-auto hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Platforms */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-orange-100 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Our Content Tech Stack</h3>
          <div className="grid md:grid-cols-5 gap-6">
            {tools.map((category, index) => (
              <div key={index} className="text-center">
                <h4 className="font-bold text-gray-900 mb-4">{category.name}</h4>
                <div className="space-y-2">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="bg-orange-50 rounded-lg p-2 text-sm text-gray-700 hover:bg-orange-100 transition-colors">
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Our Content Process</h3>
          <div className="grid md:grid-cols-6 gap-4">
            {[
              'Strategy & Research',
              'Content Planning',
              'Creation & Production',
              'Optimization & SEO',
              'Distribution',
              'Analytics & Improvement'
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <p className="text-sm font-medium text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Content?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join businesses generating 10x more leads with strategic content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center">
                Start Content Strategy
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-orange-600 transition-all duration-300">
                View Content Samples
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentEngine;
