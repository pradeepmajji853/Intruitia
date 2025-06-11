import { useState } from 'react';
import { Cloud, Server, Shield, Zap, CheckCircle, ArrowRight, Globe, Lock, Gauge, Layers } from 'lucide-react';

const CloudDeployments = () => {
  const [selectedCloud, setSelectedCloud] = useState('aws');

  const cloudProviders = [
    {
      id: 'aws',
      name: 'Amazon Web Services',
      logo: '🟡',
      description: 'Industry-leading cloud platform with 200+ services',
      features: ['Auto-scaling', 'Global CDN', 'Managed databases', 'Serverless functions'],
      bestFor: 'Enterprise applications, Complex architectures'
    },
    {
      id: 'vercel',
      name: 'Vercel',
      logo: '⚡',
      description: 'Perfect for frontend and full-stack applications',
      features: ['Instant deployments', 'Edge functions', 'Built-in analytics', 'Team collaboration'],
      bestFor: 'React/Next.js apps, Jamstack sites'
    },
    {
      id: 'netlify',
      name: 'Netlify',
      logo: '🟢',
      description: 'All-in-one platform for modern web projects',
      features: ['Continuous deployment', 'Form handling', 'Split testing', 'Edge functions'],
      bestFor: 'Static sites, JAMstack applications'
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean',
      logo: '🔵',
      description: 'Simple cloud infrastructure for developers',
      features: ['Droplets (VMs)', 'Managed databases', 'Kubernetes', 'Spaces (storage)'],
      bestFor: 'Startups, Simple deployments'
    }
  ];

  const deploymentTypes = [
    {
      icon: Globe,
      title: 'Static Sites',
      description: 'Lightning-fast static websites with global CDN',
      features: ['Instant global deployment', 'Automatic HTTPS', 'Form handling', 'Analytics'],
      examples: ['Landing pages', 'Portfolios', 'Documentation', 'Blogs']
    },
    {
      icon: Server,
      title: 'Full-Stack Apps',
      description: 'Complete web applications with backend services',
      features: ['Database integration', 'API endpoints', 'Authentication', 'File storage'],
      examples: ['SaaS platforms', 'E-commerce', 'Social apps', 'Dashboards']
    },
    {
      icon: Zap,
      title: 'Serverless Functions',
      description: 'Auto-scaling functions that run on demand',
      features: ['Pay per execution', 'Zero maintenance', 'Instant scaling', 'Multiple runtimes'],
      examples: ['APIs', 'Webhooks', 'Data processing', 'Automation']
    },
    {
      icon: Layers,
      title: 'Microservices',
      description: 'Distributed architecture for complex applications',
      features: ['Independent scaling', 'Technology diversity', 'Fault isolation', 'Team autonomy'],
      examples: ['Enterprise apps', 'E-commerce platforms', 'IoT systems', 'Data pipelines']
    }
  ];

  const process = [
    {
      step: 1,
      title: 'Analysis & Planning',
      description: 'Assess your application architecture and requirements',
      duration: '1-2 days'
    },
    {
      step: 2,
      title: 'Infrastructure Setup',
      description: 'Configure cloud resources and deployment pipelines',
      duration: '2-3 days'
    },
    {
      step: 3,
      title: 'Deployment & Testing',
      description: 'Deploy your application and run comprehensive tests',
      duration: '1-2 days'
    },
    {
      step: 4,
      title: 'Monitoring & Optimization',
      description: 'Set up monitoring and optimize for performance',
      duration: '1 day'
    }
  ];

  const benefits = [
    { icon: Gauge, title: 'Performance', description: 'Global CDN and edge optimization' },
    { icon: Shield, title: 'Security', description: 'SSL certificates and security headers' },
    { icon: Zap, title: 'Scalability', description: 'Auto-scaling based on traffic' },
    { icon: Lock, title: 'Reliability', description: '99.9% uptime with redundancy' }
  ];

  return (
    <section id="cloud-deploy" className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-cyan-100 text-cyan-800 rounded-full text-sm font-bold mb-6">
            <Cloud className="w-5 h-5 mr-2" />
            Cloud Deployments
            <Zap className="w-4 h-4 ml-2 text-yellow-500" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Deploy with <span className="text-gradient">Confidence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From simple static sites to complex microservices — we handle your cloud deployment so you can focus on building great products.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Deployment Types */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {deploymentTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-3xl p-8 shadow-xl border border-cyan-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {type.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Perfect For</h4>
                  <div className="flex flex-wrap gap-2">
                    {type.examples.map((example, eIndex) => (
                      <span key={eIndex} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cloud Providers */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-cyan-100 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Choose Your Cloud Platform</h3>
          
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {cloudProviders.map((provider) => (
              <div
                key={provider.id}
                onClick={() => setSelectedCloud(provider.id)}
                className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                  selectedCloud === provider.id
                    ? 'border-cyan-500 bg-cyan-50 shadow-md'
                    : 'border-gray-200 hover:border-cyan-300 hover:shadow-sm'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{provider.logo}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{provider.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{provider.description}</p>
                  <div className="text-xs text-cyan-600 font-medium">{provider.bestFor}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Provider Details */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
            <div className="text-center mb-4">
              <h4 className="text-xl font-bold text-gray-900">
                {cloudProviders.find(p => p.id === selectedCloud)?.name} Features
              </h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {cloudProviders.find(p => p.id === selectedCloud)?.features.map((feature, index) => (
                <div key={index} className="flex items-center bg-white rounded-lg p-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-12">Our Deployment Process</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-xl">{phase.step}</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                    {phase.duration}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{phase.title}</h4>
                <p className="text-gray-600 text-sm">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Go Live?</h3>
            <p className="text-lg mb-6 opacity-90">
              Deploy your application to the cloud with zero downtime and maximum performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-cyan-600 px-8 py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center">
                Start Deployment
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-cyan-600 transition-all duration-300">
                View Infrastructure Examples
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudDeployments;
