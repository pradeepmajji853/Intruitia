import { ExternalLink, Github, Eye, CheckCircle, Calendar, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  useEffect(() => {
    // Add any initialization code here if needed
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const projects = [
    {
      title: 'AI Video Editor Platform',
      category: 'AI Solutions',
      description: 'Revolutionary AI-powered video editing platform that automatically transforms raw footage into professional content with trending themes and styles.',
      image: '/fin images/ai video editor.jpg',
      tags: ['AI Video Editing', 'React', 'Python', 'Machine Learning'],
      client: 'Content Creators',
      year: '2024',
      duration: '6 months',
      results: '+300% editing efficiency'
    },
    {
      title: 'AI Content Generation Suite',
      category: 'AI Solutions',  
      description: 'Comprehensive AI-powered content creation platform with automated writing, hashtag generation, social media captions, and SEO optimization.',
      image: '/fin images/contwent generation.png',
      tags: ['AI Content', 'OpenAI', 'React', 'Node.js'],
      client: 'Digital Marketers',
      year: '2024',
      duration: '4 months', 
      results: '+250% content output'
    },
    {
      title: 'AI Analytics Dashboard',
      category: 'AI Solutions',
      description: 'Advanced AI-powered analytics platform with sentiment analysis, trend prediction, and real-time content performance insights.',
      image: '/fin images/seo.jpg',
      tags: ['AI Analytics', 'Sentiment Analysis', 'Data Visualization', 'Python'],
      client: 'Marketing Agencies',
      year: '2024',
      duration: '3 months',
      results: '+400% insight accuracy'
    },
    {
      title: 'AI Workflow Automation',
      category: 'AI Solutions',
      description: 'Intelligent workflow automation system that streamlines content creation, editing, and publishing processes using advanced AI algorithms.',
      image: '/fin images/marketing automation.jpg',
      tags: ['AI Automation', 'Workflow', 'Content Management', 'API Integration'],
      client: 'Content Teams',
      year: '2024',
      duration: '5 months',
      results: '+500% productivity boost'
    }
  ];

  const categories = ['All', 'AI Solutions'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="py-20 bg-[#0e0e1a]"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Professional Header */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500"> Portfolio</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Showcasing successful projects that demonstrate our expertise in delivering 
              high-quality solutions that drive real business results.
            </p>
          </motion.div>

          {/* Professional Filter Buttons */}
          <motion.div 
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                variants={fadeInUp}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md hover:shadow-blue-500/25'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-700/80 border border-transparent'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Professional Project Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${activeFilter}`}
              variants={fadeInUp}
              data-index={index}
              className={`portfolio-card hover-lift bg-slate-800/90 border border-gray-700/50 rounded-lg shadow-md hover:shadow-xl transition-all duration-300`}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden rounded-t-lg mb-6">
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
                <div className="inline-block bg-blue-900/70 text-blue-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {project.category}
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center text-slate-300">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                    <span><strong>Client:</strong> {project.client}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                    <span><strong>Year:</strong> {project.year}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <Award className="w-4 h-4 text-blue-400 mr-2" />
                    <span><strong>Duration:</strong> {project.duration}</span>
                  </div>
                  <div className="flex items-center text-slate-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span><strong>Result:</strong> {project.results}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-700/70 text-slate-300 px-3 py-1 rounded-md text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Professional CTA */}
                <button className="w-full text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-blue-500/25 flex items-center justify-center">
                  View Case Study
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional CTA Section */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-12 max-w-4xl mx-auto shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's collaborate to bring your vision to life with proven expertise, 
              cutting-edge technology, and a commitment to excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-blue-500/25 flex items-center justify-center">
                View All Projects
                <Eye className="w-5 h-5 ml-2" />
              </button>
              <button className="text-blue-400 bg-blue-900/20 hover:bg-blue-900/30 px-6 py-3 rounded-lg font-medium border border-blue-800/50 transition-colors duration-300 flex items-center justify-center">
                Request Quote
                <ExternalLink className="w-5 h-5 ml-2" />  
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
