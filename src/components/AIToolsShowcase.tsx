import { useState, useRef } from 'react';
import { Brain, Hash, MessageCircle, Sparkles, ArrowRight, Video, Megaphone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const AIToolsShowcase = () => {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(showcaseRef, { once: false, amount: 0.1 });
  const [activeTab, setActiveTab] = useState(0);
  
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

  const tools = [
    {
      icon: Video,
      name: "AI Video Editor",
      path: "/ai-video-editor",
      description: "Automatically edit video clips based on trending social media themes like professional, meme, funny, and cinematic styles.",
      features: ["AI-powered editing", "Trend analysis", "Auto music sync", "Quick conversions"],
      screenshot: "/video-editor-screenshot.webp",
      color: "bg-blue-500",
      badge: "Coming Soon"
    },
    {
      icon: Brain,
      name: "Content Generator",
      path: "/content-generator",
      description: "Create compelling, SEO-optimized content for blogs, websites, and marketing materials with AI that adapts to your brand voice.",
      features: ["Custom tone adjustment", "Multiple content lengths", "SEO optimization", "Instant generation"],
      screenshot: "/content-generator-screenshot.svg",
      color: "bg-violet-500"
    },
    {
      icon: Hash,
      name: "Hashtag Generator",
      path: "/hashtag-generator",
      description: "Generate trending, relevant hashtags for any social platform to maximize your content's reach and engagement.",
      features: ["Platform-specific tags", "Trend analysis", "Engagement optimization", "Niche targeting"],
      screenshot: "/hashtag-generator-screenshot.svg",
      color: "bg-green-500"
    },
    {
      icon: MessageCircle,
      name: "Social Media Caption",
      path: "/social-media-caption",
      description: "Craft engaging captions that drive likes, comments, and shares across all major social media platforms.",
      features: ["Platform-tailored content", "Tone customization", "Call-to-action options", "Emoji integration"],
      screenshot: "/social-caption-screenshot.svg",
      color: "bg-fuchsia-500"
    },
    {
      icon: Megaphone,
      name: "Ad Copy Generator",
      path: "/ad-copy-generator",
      description: "Create high-converting advertisement copy that drives sales and maximizes your marketing ROI across all platforms.",
      features: ["Conversion-focused copy", "Platform optimization", "A/B test variations", "Goal-driven content"],
      screenshot: "/images/ai-tools-demo.svg",
      color: "bg-orange-500"
    },
    {
      icon: Search,
      name: "SEO Meta Generator",
      path: "/seo-meta-generator",
      description: "Generate comprehensive SEO meta tags, titles, and descriptions to boost your search engine rankings.",
      features: ["Complete meta package", "Keyword optimization", "HTML-ready code", "Search-friendly content"],
      screenshot: "/images/ai-workflow-simple.svg",
      color: "bg-blue-600"
    }
  ];

  return (
    <div ref={showcaseRef} className="py-24 md:py-32 bg-gradient-to-b from-[#12121e] to-[#0e0e1a]" id="ai-tools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-200 backdrop-blur-sm border border-violet-500/20 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Tools
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6 text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Next-Gen</span> Content Creation Tools
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl max-w-3xl mx-auto mb-12 text-gray-300">
            Our suite of specialized AI tools delivers exceptional content across all digital channels.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-12">
            {tools.map((tool, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <tool.icon className="w-4 h-4 mr-2" />
                {tool.name}
              </button>
            ))}
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="relative aspect-video w-full bg-gradient-to-br from-[#161627] to-[#0e0e1a] p-8">
              <div className={`absolute inset-0 ${tools[activeTab].color} mix-blend-multiply opacity-10`}></div>
              <img
                src={tools[activeTab].screenshot}
                alt={tools[activeTab].name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback to a generic AI image if the specific screenshot doesn't load
                  e.currentTarget.src = "/images/ai-tools-demo.svg";
                }}
              />
            </div>
          </motion.div>
          
          <motion.div
            key={`info-${activeTab}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className={`w-16 h-16 ${tools[activeTab].color} rounded-2xl flex items-center justify-center shadow-lg`}>
              {(() => {
                const IconComponent = tools[activeTab].icon;
                return <IconComponent className="w-8 h-8 text-white" />;
              })()}
            </div>
            
            <h3 className="text-3xl font-bold text-white">
              {tools[activeTab].name}
              {tools[activeTab].badge && (
                <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  {tools[activeTab].badge}
                </span>
              )}
            </h3>
            
            <p className="text-xl text-gray-300">
              {tools[activeTab].description}
            </p>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Key Features:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {tools[activeTab].features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-violet-500 mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <Link
              to={tools[activeTab].path}
              className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${
                tools[activeTab].badge === "Coming Soon"
                  ? "from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"
                  : "from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
              } text-white font-medium rounded-full shadow-lg hover:shadow-violet-500/25 transition-all duration-300 group`}
            >
              {tools[activeTab].badge === "Coming Soon" ? "Join Waitlist" : `Try ${tools[activeTab].name}`}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        {/* Compatible Software Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Works with your favorite editing software
            </h3>
            <p className="max-w-2xl mx-auto text-gray-300">
              Our AI tools seamlessly integrate with industry-standard editing software you already use
            </p>
          </div>
          
          <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
            <img 
              src="/images/content-creation-studio.svg" 
              alt="AI-powered content creation suite" 
              className="w-full h-auto max-w-4xl mx-auto"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-24 text-center"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-4 text-white">Join us on our journey!</h3>
            <p className="mb-8 max-w-2xl mx-auto text-gray-300">
              We're building the future of AI-powered content creation. Be among the first to experience our innovative tools.
            </p>
            <Link
              to="/ai-video-editor"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 inline-flex items-center justify-center"
            >
              Try AI Video Editor
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIToolsShowcase;
