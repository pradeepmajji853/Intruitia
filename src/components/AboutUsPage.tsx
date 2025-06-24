import { useState, useEffect, useRef } from 'react';
import { Building, Zap, Target, Heart, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#12121e] to-[#0e0e1a] text-white">
      <section 
        ref={sectionRef}
        className="py-20 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-900/20 rounded-bl-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-900/20 rounded-tr-full opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-200 backdrop-blur-sm border border-violet-500/20 mb-6">
              <Building className="w-4 h-4 mr-2" />
              Our Company
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6 text-white">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Intruitia</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl max-w-3xl mx-auto text-gray-300">
              Revolutionizing content creation with AI-powered innovation
            </motion.p>
          </motion.div>        {/* Company Overview */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Empowering Digital Innovation
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Intruitia is a cutting-edge technology company based in Hyderabad, India, specializing in AI-powered content creation solutions. Founded in 2025, we're on a mission to transform how businesses create, manage, and optimize their digital content.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              As a registered Micro Enterprise (UDYAM-TS-20-0135173), we combine technical expertise with creative innovation to deliver solutions that make content creation accessible, efficient, and powerful for businesses of all sizes.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="relative rounded-2xl p-8 overflow-hidden">
              <img 
                src="/images/content-creation-studio.svg" 
                alt="AI-powered content creation studio showing professional video editing workspace" 
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent rounded-xl"></div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10 mt-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">2025</div>
                  <div className="text-gray-400">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">6+</div>
                  <div className="text-gray-400">AI Tools</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-gray-400">AI-Powered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-400">Available</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

          {/* Our Values */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-white mb-12">
              Our Core Values
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={fadeInUp} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
                <p className="text-gray-300">
                  We push the boundaries of what's possible with AI technology to create breakthrough solutions.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Precision</h3>
                <p className="text-gray-300">
                  Every tool we build is designed with accuracy and reliability at its core.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">User-Centric</h3>
                <p className="text-gray-300">
                  We prioritize user experience and create tools that truly make a difference.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Services Overview */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="mb-20"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-center text-white mb-12">
              What We Do
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">AI Video Editing</h3>
                <p className="text-gray-300 mb-4">
                  Our flagship AI video editor automatically transforms raw footage into professional content based on trending themes and styles.
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  Coming Soon
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Content Generation</h3>
                <p className="text-gray-300 mb-4">
                  AI-powered tools for creating blogs, social media captions, hashtags, ad copy, and SEO-optimized content.
                </p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                  Available Now
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Digital Marketing</h3>
                <p className="text-gray-300">
                  Comprehensive digital marketing solutions including content strategy, social media management, and campaign optimization.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Web Development</h3>
                <p className="text-gray-300">
                  Modern, responsive websites and web applications built with cutting-edge technologies and best practices.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            className="text-center"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-white mb-12">
              Get In Touch
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div variants={fadeInUp} className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                <p className="text-gray-300 text-center">
                  Suraram, Hyderabad 500055<br />
                  Telangana, India
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10">
                <Mail className="w-8 h-8 text-violet-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <a 
                  href="mailto:support@intruitia.in" 
                  className="text-violet-400 hover:text-violet-300 transition-colors"
                >
                  support@intruitia.in
                </a>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="mt-12 p-6 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl border border-violet-500/20">
              <p className="text-white text-lg mb-4">
                Ready to transform your content creation process?
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium rounded-full shadow-lg hover:shadow-violet-500/25 transition-all duration-300">
                Get Early Access
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;