import { useState, useRef } from 'react';
import { Brain, BarChart, Layers, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(servicesRef, { once: false, amount: 0.1 });
  const [servicesState, setServicesState] = useState([
    {
      icon: Brain,
      title: "AI Content Generation",
      description: "Create hyper-personalized content at scale that resonates with your target audience across all digital touchpoints.",
      features: [
        "Brand voice preservation",
        "Multi-channel optimization",
        "Automated content variations",
        "A/B testing integration"
      ],
      color: "bg-gradient-to-r from-violet-600 to-fuchsia-600",
      accentColor: "violet",
      imageUrl: "/images/mobile-content-creation.svg",
      showMore: false
    },
    {
      icon: BarChart,
      title: "Sentiment Analysis & Adaptation",
      description: "Leverage real-time data to understand audience sentiment and dynamically adjust your messaging for maximum impact.",
      features: [
        "Real-time sentiment tracking",
        "Adaptive content strategy",
        "Competitive intelligence",
        "Engagement optimization"
      ],
      color: "bg-gradient-to-r from-cyan-600 to-blue-600",
      accentColor: "cyan",
      imageUrl: "/images/ai-dashboard.svg",
      showMore: false
    },
    {
      icon: Rocket,
      title: "AI Marketing Automation",
      description: "Deploy sophisticated marketing campaigns with AI-driven personalization and optimization at every touchpoint.",
      features: [
        "Behavioral-based targeting",
        "Conversion path optimization",
        "Performance analytics",
        "Automated campaign adjustments"
      ],
      color: "bg-gradient-to-r from-rose-600 to-orange-600",
      accentColor: "rose",
      imageUrl: "/images/ai-workflow-simple.svg",
      showMore: false
    }
  ]);

  const handleLearnMoreClick = (index: number) => {
    const newServicesState = [...servicesState];
    newServicesState[index].showMore = !newServicesState[index].showMore;
    setServicesState(newServicesState);
  };

  const handleScheduleDemoClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
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

  const services = [
    {
      icon: Brain,
      title: "AI Content Generation",
      description: "Create hyper-personalized content at scale that resonates with your target audience across all digital touchpoints.",
      features: [
        "Brand voice preservation",
        "Multi-channel optimization",
        "Automated content variations",
        "A/B testing integration"
      ],
      color: "bg-gradient-to-r from-violet-600 to-fuchsia-600",
      accentColor: "violet",
      imageUrl: "/images/mobile-content-creation.svg"
    },
    {
      icon: BarChart,
      title: "Sentiment Analysis & Adaptation",
      description: "Leverage real-time data to understand audience sentiment and dynamically adjust your messaging for maximum impact.",
      features: [
        "Real-time sentiment tracking",
        "Adaptive content strategy",
        "Competitive intelligence",
        "Engagement optimization"
      ],
      color: "bg-gradient-to-r from-cyan-600 to-blue-600",
      accentColor: "cyan",
      imageUrl: "/images/ai-dashboard.svg"
    },
    {
      icon: Rocket,
      title: "AI Marketing Automation",
      description: "Deploy sophisticated marketing campaigns with AI-driven personalization and optimization at every touchpoint.",
      features: [
        "Behavioral-based targeting",
        "Conversion path optimization",
        "Performance analytics",
        "Automated campaign adjustments"
      ],
      color: "bg-gradient-to-r from-rose-600 to-orange-600",
      accentColor: "rose",
      imageUrl: "/images/ai-workflow-simple.svg"
    }
  ];    const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
      return (
        <motion.div
          variants={fadeInUp}
          className={`flex flex-col lg:flex-row ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 mb-24 last:mb-0`}
        >
          <div className="lg:w-1/2">
          <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
            <service.icon className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">{service.title}</h3>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 transition-colors duration-300">
            {service.description}
          </p>
          
          <ul className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start">
                <CheckCircle2 className={`w-5 h-5 mr-3 text-${service.accentColor}-500 dark:text-${service.accentColor}-400 flex-shrink-0 mt-1 transition-colors duration-300`} />
                <span className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button onClick={() => handleLearnMoreClick(index)} className={`group inline-flex items-center px-6 py-3 rounded-full 
            text-gray-900 dark:text-white 
            bg-${service.accentColor}-500/10 dark:bg-${service.accentColor}-500/20 
            hover:bg-${service.accentColor}-500/20 dark:hover:bg-${service.accentColor}-500/30 
            border border-${service.accentColor}-500/30 dark:border-${service.accentColor}-500/40 
            transition-all duration-300 shadow-sm hover:shadow-md`}>
            {servicesState[index].showMore ? 'Show Less' : 'Learn More'}
            <ArrowRight className={`ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-${service.accentColor}-600 dark:text-${service.accentColor}-400`} />
          </button>

          {servicesState[index].showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 p-6 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50"
            >
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Detailed Features</h4>
              <p className="text-gray-700 dark:text-gray-300">More detailed information about the service can be shown here. This could include case studies, technical specifications, or client testimonials.</p>
            </motion.div>
          )}
        </div>
        
        <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-105">
          <div className="relative aspect-video w-full h-full">
            <div className={`absolute inset-0 ${service.color} mix-blend-multiply opacity-30`}></div>
            <img 
              src={service.imageUrl} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div ref={servicesRef} className="bg-gray-50 dark:bg-[#0e0e1a] py-24 md:py-32 transition-colors duration-300" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 text-violet-700 dark:text-violet-200 backdrop-blur-sm border border-violet-500/20 mb-6 transition-colors duration-300">
            <Layers className="w-4 h-4 mr-2" />
            AI-Powered Solutions
          </motion.div>
          
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Next-Generation Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Marketing Solutions</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Harness the power of AI to create content that connects, converts, and delivers measurable results.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-24 text-center"
        >
          <div className="p-8 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/10 dark:to-fuchsia-500/10 border border-violet-500/20 dark:border-violet-500/20 transition-colors duration-300 shadow-md hover:shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Ready to transform your digital marketing?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto transition-colors duration-300">
              Our AI-powered solutions adapt to your business needs and scale with your growth.
            </p>
            <button onClick={handleScheduleDemoClick} className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium rounded-full shadow-lg hover:shadow-violet-500/25 transition-all duration-300 flex items-center justify-center mx-auto transform hover:scale-[1.02]">
              Schedule a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
