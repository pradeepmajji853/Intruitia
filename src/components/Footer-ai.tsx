import { BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simplified Company Info */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold">Intruitia</span>
          </div>
          <p className="text-indigo-200 max-w-md mx-auto">
            AI-driven content creation solutions for modern businesses.
          </p>
        </div>

        {/* Legal Links and Copyright */}
        <div className="border-t border-indigo-800 pt-8 flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center space-x-4 md:space-x-6">
            <Link to="/about-us" className="text-indigo-200 hover:text-white text-sm transition-colors">
              About Us
            </Link>
            <Link to="/privacy-policy" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/refund-policy" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Refund Policy
            </Link>
            <Link to="/cancellation-policy" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Cancellation Policy
            </Link>
          </div>
          <p className="text-indigo-200 text-sm text-center">
            © 2025 Intruitia. All rights reserved. | UDYAM-TS-20-0135173
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
