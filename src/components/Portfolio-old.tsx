import { ExternalLink, Github, Eye, Star, Zap, Sparkles, Trophy } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
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
      title: 'Modern Landing Page',
      category: 'Web Development',
      description: 'Responsive landing page with modern design principles, smooth animations, and optimized performance for maximum conversion.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Tailwind CSS', 'Vite', 'Responsive'],
      gradient: 'from-blue-600 via-cyan-500 to-teal-500',
      icon: '🌐',
      stats: { views: '2.3K', likes: '450', comments: '89' }
    },
    {
      title: 'Portfolio Website',
      category: 'Web Development',
      description: 'Clean, professional portfolio website showcasing creative work with interactive elements and smooth user experience.',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['TypeScript', 'CSS3', 'Responsive', 'Interactive'],
      gradient: 'from-purple-600 via-pink-500 to-red-500',
      icon: '💼',
      stats: { views: '1.8K', likes: '320', comments: '64' }
    },
    {
      title: 'Brand Identity Design',
      category: 'Content Creation',
      description: 'Complete brand identity package including logo design, color palette, typography, and comprehensive brand guidelines.',
      image: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Branding', 'Design', 'Graphics', 'Identity'],
      gradient: 'from-green-600 via-emerald-500 to-cyan-500',
      icon: '🎨',
      stats: { views: '3.1K', likes: '680', comments: '112' }
    },
    {
      title: 'Social Media Content',
      category: 'Content Creation',
      description: 'Engaging social media graphics, video content, and animated posts designed for maximum engagement and brand awareness.',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Video Editing', 'Graphics', 'Social Media', 'Animation'],
      gradient: 'from-orange-600 via-yellow-500 to-red-500',
      icon: '📱',
      stats: { views: '4.2K', likes: '890', comments: '156' }
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
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M50 50l20-20v40l-20-20zm-20 0l20 20v-40l-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'backgroundFloat 25s ease-in-out infinite'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          >
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 relative">
              <span className="bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Our Portfolio
              </span>
              <div className="absolute -top-2 -right-8 animate-bounce">
                <Trophy className="w-12 h-12 text-yellow-500" />
              </div>
            </h2>
          </div>
          <div className="animate-slide-in-left">
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Showcasing our passion for 
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold"> clean design</span>, 
              <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold"> modern technology</span>, and 
              <span className="text-transparent bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text font-semibold"> creative solutions</span>
            </p>
          </div>

          {/* Enhanced Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg animate-pulse-glow'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border-2 border-slate-200 hover:border-blue-300'
                } transform hover:scale-105 hover:-translate-y-1`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Sparkles className="w-5 h-5 inline mr-2" />
                {category}
                {activeFilter === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 -z-10"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Project Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${activeFilter}`}
              data-index={index}
              className={`portfolio-card group relative perspective-1000 ${
                visibleProjects.includes(index) ? 'animate-bounce-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Card Container with 3D Effect */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover-3d border border-slate-100 hover:border-slate-200">
                
                {/* Enhanced Image Section */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0 group-hover:opacity-80 transition-all duration-500`}></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce-in">
                    {project.icon}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 animate-bounce-in">
                      <Eye className="w-6 h-6" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 animate-bounce-in">
                      <ExternalLink className="w-6 h-6" />
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-110 animate-bounce-in">
                      <Github className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-white text-sm font-medium">
                        <Star className="w-4 h-4 inline mr-1" />
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Enhanced Content Section */}
                <div className="p-8">
                  {/* Category Badge */}
                  <div className={`inline-block bg-gradient-to-r ${project.gradient} text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-shimmer`}>
                    {project.category}
                  </div>
                  
                  {/* Title with Hover Effect */}
                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {project.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-slate-600 mb-6 leading-relaxed text-lg group-hover:text-slate-700 transition-colors duration-300">
                    {project.description}
                  </p>

                  {/* Enhanced Tags */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-200 transition-all duration-300 cursor-pointer hover:scale-105"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced CTA */}
                  <button className={`group/btn w-full bg-gradient-to-r ${project.gradient} text-white px-6 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 hover-glow`}>
                    <Zap className="w-5 h-5 group-hover/btn:animate-spin" />
                    View Project Details
                    <Sparkles className="w-5 h-5 group-hover/btn:animate-bounce" />
                  </button>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${project.gradient} blur-xl pointer-events-none`}></div>

                {/* Floating Particles */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, particleIndex) => (
                      <div
                        key={particleIndex}
                        className="absolute animate-particle-float opacity-60"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${particleIndex * 0.2}s`
                        }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-12 border-2 border-transparent bg-clip-border relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-gradient-x"></div>
            
            <div className="relative z-10">
              <h3 className="text-4xl font-black text-slate-800 mb-6 animate-fade-in-up">
                Ready to Start Your 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Next Project?</span>
              </h3>
              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's collaborate and bring your ideas to life with fresh creativity, modern technology, and passionate dedication.
              </p>
              
              <button className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-6 rounded-full font-bold text-xl hover:scale-110 transition-all duration-300 animate-pulse-glow">
                <Sparkles className="w-6 h-6 inline mr-3 animate-spin-slow" />
                Get Started Today
                <Zap className="w-6 h-6 inline ml-3 group-hover:animate-bounce" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 animate-float">
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="absolute bottom-4 left-4 animate-float-delayed">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
