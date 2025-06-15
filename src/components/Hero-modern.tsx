import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Brain, Sparkles, BarChart, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isInView, setIsInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsInView(true);
    
    // Animate text typing effect
    const text = "TRANSFORM VIDEOS WITH AI";
    const typingSpeed = 35; // milliseconds per character
    
    let currentCharIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentCharIndex <= text.length) {
        setAnimatedText(text.substring(0, currentCharIndex));
        currentCharIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  const [animatedText, setAnimatedText] = useState('');
  
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
  
  const features = [
    {
      icon: Video,
      title: "AI Video Editing",
      description: "Automatically edit videos with trending styles",
      color: "bg-gradient-to-br from-blue-600 to-cyan-600",
      badge: "Coming Soon"
    },
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Content that evolves with your audience",
      color: "bg-gradient-to-br from-purple-600 to-indigo-600"
    },
    {
      icon: BarChart,
      title: "Data-Driven",
      description: "Strategy backed by real-time insights",
      color: "bg-gradient-to-br from-cyan-600 to-blue-600"
    }
  ];

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0e0e1a]" id="home">
      {/* Modern Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0e0e1a]"></div>
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-200 backdrop-blur-sm border border-violet-500/20 mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            The Future of Content Creation
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              {animatedText}<span className="animate-blink">|</span>
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10"
          >
            Upload your videos and watch AI transform them with trending styles like professional, meme, funny, and cinematic themes.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/ai-video-editor" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-full shadow-lg hover:shadow-blue-500/25 transform hover:translate-y-[-2px] transition-all duration-300 flex items-center">
              Try AI Video Editor
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <button className="px-8 py-4 border border-violet-500/30 text-white font-medium rounded-full hover:bg-violet-500/20 transition-all duration-300 shadow-sm hover:shadow-md">
              View Solutions
            </button>
          </motion.div>
        </motion.div>
        
        {/* Feature Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="glass-card p-8 rounded-2xl hover:translate-y-[-10px] transition-all duration-500 shadow-md hover:shadow-lg border border-white/10"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
                {feature.badge && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    {feature.badge}
                  </span>
                )}
              </h3>
              
              <p className="text-gray-300 mb-6">
                {feature.description}
              </p>
              
              {index === 0 ? (
                <Link to="/ai-video-editor" className="group flex items-center text-blue-400 font-medium">
                  Join Waitlist
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button className="group flex items-center text-violet-400 font-medium">
                  Learn more
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
