import { useState, useEffect, useRef } from 'react';
import { Menu, X, BrainCircuit, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAiToolsOpen(false);
      }
    };
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
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/10 backdrop-blur-xl shadow-xl border-b border-white/20' 
        : 'bg-white/5 backdrop-blur-2xl shadow-lg border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-black bg-gradient-to-r from-indigo-800 to-purple-700 bg-clip-text text-transparent">
              Intruitia
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Solutions', 'About', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-slate-700 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50`}
              >
                {item}
              </button>
            ))}
            
            {/* AI Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setAiToolsOpen(!aiToolsOpen)}
                className="flex items-center text-slate-700 hover:text-indigo-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-indigo-50"
              >
                AI Tools <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${aiToolsOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {aiToolsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  <Link
                    to="/content-generator"
                    className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setAiToolsOpen(false)}
                  >
                    Content Generator
                  </Link>
                  <Link
                    to="/hashtag-generator"
                    className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setAiToolsOpen(false)}
                  >
                    Hashtag Generator
                  </Link>
                  <Link
                    to="/social-media-caption"
                    className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setAiToolsOpen(false)}
                  >
                    Social Media Caption
                  </Link>
                  <Link
                    to="/ad-copy-generator"
                    className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setAiToolsOpen(false)}
                  >
                    Ad Copy Generator
                  </Link>
                  <Link
                    to="/seo-meta-generator"
                    className="block px-4 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => setAiToolsOpen(false)}
                  >
                    SEO Meta Generator
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
              Book a Consultation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-indigo-50 text-indigo-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen border-b border-slate-200' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {['Home', 'Solutions', 'About', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="block w-full text-left px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
            >
              {item}
            </button>
          ))}
          
          {/* AI Tools Section in Mobile Menu */}
          <div className="border-t border-slate-100 pt-4">
            <div className="px-4 mb-2 font-semibold text-indigo-600">AI Tools</div>
            <Link 
              to="/content-generator" 
              className="block w-full text-left px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Content Generator
            </Link>
            <Link 
              to="/hashtag-generator" 
              className="block w-full text-left px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Hashtag Generator
            </Link>
            <Link 
              to="/social-media-caption" 
              className="block w-full text-left px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Social Media Caption
            </Link>
            <Link 
              to="/ad-copy-generator" 
              className="block w-full text-left px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Ad Copy Generator
            </Link>
            <Link 
              to="/seo-meta-generator" 
              className="block w-full text-left px-4 py-3 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              SEO Meta Generator
            </Link>
          </div>
          
          <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Book a Consultation
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
