import { ExternalLink, Eye, Calendar, CheckCircle, Star } from 'lucide-react';
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
      title: 'AI Video Editing Platform',
      category: 'AI/ML',
      description: 'Revolutionary AI-powered video editing platform that automatically transforms raw footage into professional, meme, funny, and cinematic styles.',
      image: '/fin images/ai video editor.jpg',
      tags: ['AI Video Editing', 'Machine Learning', 'React', 'Python'],
      duration: 'Long-term',
      features: ['Automated editing', 'Style transformation', 'Trend analysis']
    },
    {
      title: 'AI Content Generation Suite',
      category: 'AI/ML',  
      description: 'Comprehensive AI-powered content creation platform with automated writing, hashtag generation, and social media optimization.',
      image: '/fin images/contwent generation.png',
      tags: ['AI Content', 'NLP', 'React', 'OpenAI'],
      duration: 'Medium-term', 
      features: ['Content generation', 'SEO optimization', 'Multi-platform support']
    },
    {
      title: 'AI Analytics Dashboard',
      category: 'AI/ML',
      description: 'Advanced sentiment analysis and trend prediction platform with real-time content performance insights and audience behavior tracking.',
      image: '/fin images/seo.jpg',
      tags: ['AI Analytics', 'Sentiment Analysis', 'Data Visualization', 'Python'],
      duration: 'Medium-term',
      features: ['Real-time analytics', 'Predictive insights', 'Audience tracking']
    },
    {
      title: 'AI Workflow Automation',
      category: 'AI/ML',
      description: 'Intelligent workflow automation system that streamlines content creation, editing, and publishing processes using advanced AI algorithms.',
      image: '/fin images/marketing automation.jpg',
      tags: ['AI Automation', 'Workflow', 'Content Management', 'API'],
      duration: 'Short-term',
      features: ['Automated workflows', 'Smart processing', 'Integration ready']
    },
    {
      title: 'Neural Network Content Studio',
      category: 'AI/ML',
      description: 'Advanced neural network-powered content creation studio with deep learning capabilities for video, text, and image generation.',
      image: '/images/ai-neural-network.svg',
      tags: ['Neural Networks', 'Deep Learning', 'Content Studio', 'AI'],
      duration: 'Long-term',
      features: ['Neural processing', 'Multi-modal content', 'Real-time generation']
    },
    {
      title: 'Social Media Caption Generator',
      category: 'AI/ML',
      description: 'AI-powered social media caption generator that creates engaging, platform-specific content with trending hashtags and optimized engagement.',
      image: '/fin images/social media captions.jpg',
      tags: ['Social Media', 'AI Content', 'Hashtags', 'Engagement'],
      duration: 'Short-term',
      features: ['Platform optimization', 'Hashtag generation', 'Engagement tracking']
    },
    {
      title: 'AI Ad Copy Generator',
      category: 'AI/ML',
      description: 'Advanced AI system for creating high-converting advertisement copy across multiple platforms with A/B testing and performance optimization.',
      image: '/fin images/ai ad copy generator.jpg',
      tags: ['Ad Copy', 'Conversion Optimization', 'A/B Testing', 'Marketing'],
      duration: 'Medium-term',
      features: ['High conversion rates', 'Multi-platform support', 'Performance analytics']
    }
  ];

  const categories = ['All', 'AI/ML'];

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
              </div>

              {/* Enhanced Project Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-gradient transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Enhanced Project Stats */}
                <div className="grid grid-cols-1 gap-4 mb-6 p-4 glass-card rounded-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary-500" />
                    <div>
                      <span className="text-xs text-slate-500 block">Timeline</span>
                      <span className="text-sm font-semibold text-slate-700">{project.duration}</span>
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

                {/* Key Features */}
                <div className="border-t border-slate-200/50 pt-6">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
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
