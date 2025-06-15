import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users, Award, ArrowRight, Brain, Heart, Lightbulb } from 'lucide-react';

const AboutUs = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
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
    <section id="about" ref={sectionRef} className="py-24 bg-[#0e0e1a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-900/20 rounded-bl-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-900/20 rounded-tr-full opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-800">
              <div className="aspect-video bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600 relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Brain className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <div className="text-2xl font-bold">AI-Powered Innovation</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="lg:pl-8"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center px-4 py-2 bg-indigo-900/30 text-indigo-300 rounded-full text-sm font-semibold mb-4">
                <Heart className="w-4 h-4 mr-2" />
                About Intruitia
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Transforming Ideas Into 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 block">
                  Digital Reality
                </span>
              </h2>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                We're a passionate team of innovators, designers, and technologists committed to pushing the boundaries of what's possible. Our mission is to empower businesses and creators with cutting-edge AI tools that simplify complex processes and unlock new levels of creativity.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-start space-x-4 mt-8">
              <div className="bg-blue-900/30 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Human-Centered Innovation</h3>
                <p className="text-slate-300">
                  We believe technology should enhance human creativity, not replace it. Every tool we build is designed with the user experience at its core.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-start space-x-4 mt-6">
              <div className="bg-purple-900/30 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Precision & Quality</h3>
                <p className="text-slate-300">
                  From concept to deployment, we maintain the highest standards of quality in everything we create, ensuring reliable and effective solutions.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-start space-x-4 mt-6">
              <div className="bg-cyan-900/30 p-3 rounded-lg">
                <Lightbulb className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Continuous Evolution</h3>
                <p className="text-slate-300">
                  The digital landscape evolves rapidly, and so do we. We're constantly learning, adapting, and improving to stay ahead of the curve.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8">
              <button className="group flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-medium rounded-full shadow-lg transition-all duration-300">
                Join Our Mission
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Our Focus Section */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-4 gap-8 mt-20"
        >
          {[
            { icon: Users, label: "Team Focus", value: "Quality" },
            { icon: Award, label: "Our Approach", value: "Innovation" },
            { icon: Target, label: "Goal", value: "Excellence" },
            { icon: Brain, label: "Expertise", value: "AI & Tech" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="text-center p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
