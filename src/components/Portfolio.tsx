import { ExternalLink, Eye, Calendar, Star, TrendingUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProjects(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const projects = document.querySelectorAll('.portfolio-card');
    projects.forEach(project => observer.observe(project));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'FinTech Dashboard Platform',
      category: 'Web Development',
      description: 'Advanced financial analytics dashboard with real-time trading data, portfolio management, and AI-powered insights for institutional investors.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'TypeScript', 'D3.js', 'WebSocket'],
      client: 'Apex Capital',
      year: '2024',
      duration: '4 months',
      results: '+250% user engagement',
      rating: 5.0,
      testimonial: 'Exceeded all expectations with outstanding performance'
    },
    {
      title: 'E-Commerce Marketplace',
      category: 'Web Development',  
      description: 'Multi-vendor marketplace platform with advanced search, payment processing, inventory management, and vendor analytics dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
      client: 'MarketHub Pro',
      year: '2024',
      duration: '5 months', 
      results: '+180% sales conversion',
      rating: 4.9,
      testimonial: 'Revolutionary platform that transformed our business'
    },
    {
      title: 'Healthcare Management System',
      category: 'Web Development',
      description: 'Comprehensive healthcare platform with patient records, appointment scheduling, telemedicine integration, and compliance management.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'Express', 'MongoDB', 'HIPAA'],
      client: 'MedTech Solutions',
      year: '2024',
      duration: '6 months',
      results: '99.9% uptime achieved',
      rating: 5.0,
      testimonial: 'Flawless execution with exceptional attention to detail'
    },
    {
      title: 'AI Content Management Platform',
      category: 'AI/ML',
      description: 'AI-powered content creation and management platform with automated writing, SEO optimization, and multi-channel publishing capabilities.',
      image: 'https://images.unsplash.com/photo-1677442136019-162d119a5639?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'TensorFlow', 'React', 'OpenAI'],
      client: 'ContentMax AI',
      year: '2024',
      duration: '3 months',
      results: '+300% content efficiency',
      rating: 4.8,
      testimonial: 'Game-changing solution for content creation'
    },
    {
      title: 'Real Estate Investment Platform',
      category: 'FinTech',
      description: 'Investment platform for real estate crowdfunding with property analytics, investment tracking, and automated portfolio management.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      tags: ['Vue.js', 'Laravel', 'MySQL', 'Blockchain'],
      client: 'PropInvest Pro',
      year: '2024',
      duration: '4 months',
      results: 'Platform successfully launched',
      rating: 4.9,
      testimonial: 'Outstanding platform with incredible ROI tracking'
    },
    {
      title: 'Supply Chain Analytics',
      category: 'Data Analytics',
      description: 'Advanced supply chain optimization platform with predictive analytics, inventory forecasting, and real-time logistics tracking.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Apache Spark', 'React', 'AWS'],
      client: 'LogiFlow Systems',
      year: '2024',
      duration: '5 months',
      results: '35% efficiency improvement',
      rating: 5.0,
      testimonial: 'Transformed our entire supply chain operations'
    }
  ];

  const categories = ['All', 'Web Development', 'AI/ML', 'FinTech', 'Data Analytics'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      className="py-32 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.15) 0, transparent 50%),
          radial-gradient(circle at 70% 20%, rgba(14, 165, 233, 0.15) 0, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0, transparent 50%),
          linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(241, 245, 249, 0.9) 100%)
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-56 h-56 bg-gradient-to-br from-secondary-400/10 to-accent-400/10 rounded-full animate-float blur-xl" style={{ animationDelay: '-5s' }}></div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Professional Header */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 glass-card text-purple-800 rounded-full text-sm font-semibold mb-8 hover-glow">
              <Eye className="w-4 h-4 mr-2 animate-pulse-soft" />
              Featured Work
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6">
              Our 
              <span className="text-gradient animate-gradient"> Portfolio</span>
            </h2>
          </div>
          <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Showcasing successful projects that have helped startups scale and grow their digital presence 
              through innovative solutions and strategic implementation.
            </p>
          </div>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up animate-delay-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === category
                  ? 'btn-primary transform scale-105 shadow-2xl'
                  : 'glass-card text-slate-700 hover:glass-card-premium hover:text-primary-600 border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`portfolio-card glass-card-premium hover-lift group cursor-pointer overflow-hidden ${
                visibleProjects.includes(index) 
                  ? `animate-fade-in-scale animate-delay-${(index + 1) * 100}` 
                  : 'opacity-0'
              }`}
              data-index={index}
            >
              {/* Enhanced Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Enhanced Action Buttons */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-4">
                    <button className="p-4 glass-card hover-glow rounded-full transform hover:scale-110 transition-all duration-300">
                      <Eye className="w-6 h-6 text-white" />
                    </button>
                    <button className="p-4 glass-card hover-glow rounded-full transform hover:scale-110 transition-all duration-300">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </div>

                {/* Premium Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge-premium">
                    {project.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center glass-card px-3 py-2 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm font-bold text-white">{project.rating}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Project Content */}
              <div className="p-8">
                {/* Client & Year */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                    {project.client}
                  </span>
                  <span className="text-sm text-slate-500 font-medium">{project.year}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Enhanced Project Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 glass-card rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <div>
                      <span className="text-xs text-slate-500 block">Duration</span>
                      <span className="text-sm font-semibold text-slate-700">{project.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div>
                      <span className="text-xs text-slate-500 block">Result</span>
                      <span className="text-sm font-bold text-green-600">{project.results}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 rounded-full text-xs font-semibold hover:from-primary-200 hover:to-secondary-200 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Enhanced Client Testimonial */}
                <div className="border-t border-slate-200/50 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {project.client.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 italic leading-relaxed">
                        "{project.testimonial}"
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(project.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 animate-fade-in-up animate-delay-500">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-slate-600 mb-6">
              Join our satisfied clients and transform your business with our expert solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Your Project
              </button>
              <button className="btn-secondary">
                View All Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
