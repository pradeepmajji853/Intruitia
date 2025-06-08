import React from 'react';

interface Client {
  name: string;
  logo: string;
  industry: string;
  project: string;
}

const ClientScrollBar: React.FC = () => {
  // Enhanced client data with fake company logos - SVG-based clean logos
  const clients: Client[] = [
    {
      name: 'TechFlow Solutions',
      logo: 'https://img.shields.io/badge/TechFlow-Solutions-2563EB?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
      industry: 'Enterprise Software',
      project: 'AI Analytics Platform'
    },
    {
      name: 'DataViz Analytics',
      logo: 'https://img.shields.io/badge/DataViz-Analytics-0EA5E9?style=for-the-badge&logo=chart-line&logoColor=white',
      industry: 'Data Analytics',
      project: 'Business Intelligence'
    },
    {
      name: 'CloudSync Systems',
      logo: 'https://img.shields.io/badge/CloudSync-Systems-10B981?style=for-the-badge&logo=cloud&logoColor=white',
      industry: 'Cloud Solutions',
      project: 'Infrastructure Platform'
    },
    {
      name: 'FinanceHub Pro',
      logo: 'https://img.shields.io/badge/FinanceHub-Pro-F59E0B?style=for-the-badge&logo=dollar-sign&logoColor=white',
      industry: 'Fintech',
      project: 'Payment Gateway'
    },
    {
      name: 'HealthTech Labs',
      logo: 'https://img.shields.io/badge/HealthTech-Labs-EF4444?style=for-the-badge&logo=heart&logoColor=white',
      industry: 'Healthcare Tech',
      project: 'Telemedicine App'
    },
    {
      name: 'EduLearn Platform',
      logo: 'https://img.shields.io/badge/EduLearn-Platform-8B5CF6?style=for-the-badge&logo=book-open&logoColor=white',
      industry: 'EdTech',
      project: 'Learning Management'
    },
    {
      name: 'RetailMax Global',
      logo: 'https://img.shields.io/badge/RetailMax-Global-06B6D4?style=for-the-badge&logo=shopping-cart&logoColor=white',
      industry: 'E-commerce',
      project: 'Marketplace Platform'
    },
    {
      name: 'GreenEnergy Co',
      logo: 'https://img.shields.io/badge/GreenEnergy-Co-059669?style=for-the-badge&logo=leaf&logoColor=white',
      industry: 'Clean Energy',
      project: 'Smart Grid System'
    },
    {
      name: 'PropTech Ventures',
      logo: 'https://img.shields.io/badge/PropTech-Ventures-7C3AED?style=for-the-badge&logo=building&logoColor=white',
      industry: 'Real Estate',
      project: 'Property Management'
    },
    {
      name: 'LogiFlow Systems',
      logo: 'https://img.shields.io/badge/LogiFlow-Systems-DC2626?style=for-the-badge&logo=truck&logoColor=white',
      industry: 'Logistics',
      project: 'Fleet Management'
    },
    {
      name: 'MediaStream Plus',
      logo: 'https://img.shields.io/badge/MediaStream-Plus-DB2777?style=for-the-badge&logo=play&logoColor=white',
      industry: 'Media Streaming',
      project: 'Content Platform'
    },
    {
      name: 'AutoTech Innovations',
      logo: 'https://img.shields.io/badge/AutoTech-Innovations-1D4ED8?style=for-the-badge&logo=car&logoColor=white',
      industry: 'Automotive Tech',
      project: 'Connected Vehicles'
    }
  ];

  // Duplicate the array for seamless looping
  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've partnered with forward-thinking companies across various industries to deliver exceptional digital solutions
          </p>
        </div>

        {/* Continuous Scrolling Container */}
        <div className="client-scroll-container-premium">
          <div 
            className="client-scroll-track-premium"
            onMouseEnter={() => {
              const track = document.querySelector('.client-scroll-track-premium') as HTMLElement;
              if (track) track.style.animationPlayState = 'paused';
            }}
            onMouseLeave={() => {
              const track = document.querySelector('.client-scroll-track-premium') as HTMLElement;
              if (track) track.style.animationPlayState = 'running';
            }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="client-logo-premium group"
                title={`${client.name} - ${client.industry} | ${client.project}`}
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="h-8 w-auto mx-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Client Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up animate-delay-100">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">12+</div>
            <div className="text-gray-600 font-medium">Active Clients</div>
          </div>
          <div className="animate-fade-in-up animate-delay-200">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">98%</div>
            <div className="text-gray-600 font-medium">Client Satisfaction</div>
          </div>
          <div className="animate-fade-in-up animate-delay-300">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">24+</div>
            <div className="text-gray-600 font-medium">Projects Delivered</div>
          </div>
          <div className="animate-fade-in-up animate-delay-400">
            <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">150%</div>
            <div className="text-gray-600 font-medium">Avg. Growth Achieved</div>
          </div>
        </div>

        {/* Client Testimonial Preview */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-blue-100 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-700 font-medium italic mb-6">
              "Intruitia transformed our digital presence completely. Their attention to detail and technical expertise exceeded our expectations."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                alt="Client testimonial"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-gray-800">Sarah Chen</div>
                <div className="text-sm text-gray-600">CEO, TechFlow Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientScrollBar;
