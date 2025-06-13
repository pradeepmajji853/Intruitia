import { Linkedin, Instagram, Youtube, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="ml-2 text-xl font-bold">Intruitia</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              A fresh startup dedicated to empowering entrepreneurs with innovative web solutions and creative content.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@startuplab.com"
                className="bg-slate-800 p-3 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Mobile Apps</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Content Creation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Brand Strategy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3 text-slate-400">
              <p>pradeepmajji853@gmail.com</p>
              <p>+91 8184889557</p>
              <p>Suraram, Hyderabad 500055</p>
              <p>Telangana, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 Intruitia. All rights reserved. | UDYAM-TS-20-0135173
          </p>
          <div className="flex flex-wrap space-x-4 md:space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/refund-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Refund Policy
            </Link>
            <Link to="/cancellation-policy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Cancellation Policy
            </Link>
            <Link to="/about-us" className="text-slate-400 hover:text-white text-sm transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;