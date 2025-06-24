import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import IntruitiaLogo from './IntruitiaLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        ? 'bg-black/10 backdrop-blur-xl shadow-xl border-b border-white/20' 
        : 'bg-black/5 backdrop-blur-2xl shadow-lg border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center group">
            <IntruitiaLogo 
              size="large" 
              variant="full" 
              className="group-hover:scale-105 transition-all duration-300 group-hover:shadow-xl"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {['Home', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-semibold transition-all duration-200 hover:text-blue-400 hover:scale-105 ${
                  scrolled ? 'text-slate-200' : 'text-slate-200'
                } relative group`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-slate-200' : 'text-slate-200'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg mt-2 py-4">
            {/* Main Navigation */}
            {['Home', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block w-full text-left px-4 py-2 text-slate-200 font-medium hover:bg-blue-900/20 hover:text-blue-400 transition-colors duration-300"
              >
                {item}
              </button>
            ))}
            
            {/* Policy Pages */}
            <div className="mt-2 pt-2 border-t border-slate-700">
              <Link 
                to="/pricing" 
                className="block w-full text-left px-4 py-2 text-slate-200 font-medium hover:bg-blue-900/20 hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                to="/about-us" 
                className="block w-full text-left px-4 py-2 text-slate-200 font-medium hover:bg-blue-900/20 hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/privacy-policy" 
                className="block w-full text-left px-4 py-2 text-slate-200 font-medium hover:bg-blue-900/20 hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-and-conditions" 
                className="block w-full text-left px-4 py-2 text-slate-200 font-medium hover:bg-blue-900/20 hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/refund-policy" 
                className="block w-full text-left px-4 py-2 text-slate-200 font-medium hover:bg-blue-900/20 hover:text-blue-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Refund Policy
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;