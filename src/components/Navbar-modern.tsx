import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Command, Plus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, transition: { duration: 0.2 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  const menuItems = [
    { name: 'Home', href: 'home' },
    { name: 'Solutions', href: 'solutions' },
    { name: 'About', href: 'about' },
    { name: 'Contact', href: 'contact' }
  ];

  const aiTools = [
    { name: 'Content Generator', href: '/content-generator' },
    { name: 'Hashtag Generator', href: '/hashtag-generator' },
    { name: 'Social Media Caption', href: '/social-media-caption' },
    { name: 'Ad Copy Generator', href: '/ad-copy-generator' },
    { name: 'SEO Meta Generator', href: '/seo-meta-generator' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0e0e1a]/80 backdrop-blur-xl shadow-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300">
              <Command className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              Intruitia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:text-white font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
            
            {/* AI Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => toggleDropdown('aiTools')}
                className="flex items-center px-4 py-2 rounded-lg text-gray-300 hover:text-white font-medium transition-colors"
              >
                AI Tools <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${activeDropdown === 'aiTools' ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'aiTools' && (
                  <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-64 bg-[#161627] rounded-xl shadow-xl border border-white/10 py-2 backdrop-blur-xl"
                  >
                    {aiTools.map((tool) => (
                      <Link
                        key={tool.name}
                        to={tool.href}
                        className="flex items-center px-6 py-3 hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <Plus className="w-4 h-4 mr-3 text-violet-400" />
                        {tool.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/pricing" className="px-6 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium rounded-full shadow-lg hover:shadow-violet-500/25 transition-all duration-300">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#161627] border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              
              {/* AI Tools Section in Mobile Menu */}
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="px-4 mb-2 font-medium text-violet-400">AI Tools</div>
                {aiTools.map((tool) => (
                  <Link 
                    key={tool.name}
                    to={tool.href} 
                    className="block w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
              
              <Link 
                to="/pricing"
                className="block w-full mt-4 px-4 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium rounded-lg text-center shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
