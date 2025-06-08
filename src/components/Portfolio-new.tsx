import { ExternalLink, Github, Eye, CheckCircle, Calendar, Award } from 'lucide-react';
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
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'Modern e-commerce platform built with React and Node.js, featuring secure payment processing, inventory management, and responsive design.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      client: 'TechStore Inc.',
      year: '2024',
      duration: '3 months',
      results: '+150% sales growth'
    },
    {
      title: 'SaaS Dashboard',
      category: 'Web Development',  
      description: 'Comprehensive analytics dashboard for SaaS companies with real-time data visualization, user management, and advanced reporting features.',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Chart.js'],
      client: 'DataViz Pro',
      year: '2024',
      duration: '4 months', 
      results: '40% efficiency increase'
    },
    {
      title: 'Brand Identity System',
      category: 'Content Creation',
      description: 'Complete brand identity development including logo design, style guide, marketing materials, and digital asset creation for startup launch.',
      image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Branding', 'Logo Design', 'Style Guide', 'Marketing'],
      client: 'GreenTech Innovations',
      year: '2024',
      duration: '2 months',
      results: '300% brand recognition'
    },
    {
      title: 'Video Marketing Campaign',
      category: 'Content Creation',
      description: 'Multi-platform video marketing campaign including promotional videos, social media content, and animated explainer videos.',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Video Production', 'Animation', 'Social Media', 'Marketing'],
      client: 'Startup Labs',
      year: '2024',
      duration: '6 weeks',
      results: '500% engagement boost'
    }
  ];

  const categories = ['All', 'Web Development', 'Content Creation'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="py-20 bg-white relative"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Our 
              <span className="gradient-text-professional"> Portfolio</span>
            </h2>
          </div>
          <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Showcasing successful projects that demonstrate our expertise in delivering 
              high-quality solutions that drive real business results.
            </p>
          </div>

          {/* Professional Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Professional Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${activeFilter}`}
              data-index={index}
              className={`portfolio-card card-professional hover-lift ${
                visibleProjects.includes(index) ? 'animate-fadeInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
                
                {/* Professional Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-3">
                      <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/30 transition-all duration-300">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/30 transition-all duration-300">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                      <button className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-lg hover:bg-white/30 transition-all duration-300">
                        <Github className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {project.category}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center text-slate-600">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                    <span><strong>Client:</strong> {project.client}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                    <span><strong>Year:</strong> {project.year}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Award className="w-4 h-4 text-blue-600 mr-2" />
                    <span><strong>Duration:</strong> {project.duration}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span><strong>Result:</strong> {project.results}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Professional CTA */}
                <button className="btn-professional w-full">
                  View Case Study
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Professional CTA Section */}
        <div className="text-center">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-slate-900 mb-6">
                Ready to Start Your Next Project?
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's collaborate to bring your vision to life with proven expertise, 
                cutting-edge technology, and a commitment to excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-professional">
                  View All Projects
                  <Eye className="w-5 h-5 ml-2" />
                </button>
                <button className="btn-secondary">
                  Request Quote
                  <ExternalLink className="w-5 h-5 ml-2" />  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
