import { Linkedin, Instagram, Twitter, Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import IntruitiaLogo from './IntruitiaLogo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsSubscribing(true);
    setSubscribeStatus('idle');
    
    try {
      const response = await fetch('http://localhost:3001/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }
      
      setSubscribeStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscribeStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay at the forefront of AI marketing</h3>
              <p className="text-indigo-200">
                Subscribe to our newsletter for the latest insights, trends, and innovations in AI-driven marketing.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 flex-grow bg-white/10 backdrop-blur-sm border border-white/20 text-white"
                  />
                  <button 
                    type="submit"
                    disabled={isSubscribing}
                    className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-indigo-50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
                
                {/* Success Message */}
                {subscribeStatus === 'success' && (
                  <div className="mt-2 bg-green-800/30 border border-green-700/50 rounded-lg p-3 flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="text-sm text-green-300">
                        Thanks for subscribing! You'll receive our next newsletter soon.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Error Message */}
                {subscribeStatus === 'error' && (
                  <div className="mt-2 bg-red-800/30 border border-red-700/50 rounded-lg p-3 flex items-start">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="text-sm text-red-300">
                        {errorMessage || "We couldn't subscribe you. Please try again."}
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-4">
              <IntruitiaLogo 
                size="small" 
                variant="icon" 
                className="mr-2"
              />
              <span className="ml-2 text-xl font-bold">Intruitia</span>
            </div>
            <p className="text-indigo-200 mb-6 leading-relaxed">
              Revolutionizing digital marketing with AI-driven, hyper-personalized content ecosystems that adapt, engage, and convert.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-indigo-800 p-3 rounded-lg hover:bg-indigo-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-indigo-800 p-3 rounded-lg hover:bg-indigo-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-indigo-800 p-3 rounded-lg hover:bg-indigo-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:pradeepmajji853@gmail.com"
                className="bg-indigo-800 p-3 rounded-lg hover:bg-indigo-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Solutions</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">AI Content Generation</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">Trend Integration</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">Content Orchestration</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">AI + Human Collaboration</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">AI Marketing Guide</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors">Marketing Insights</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-3 text-indigo-200">
              <p>pradeepmajji853@gmail.com</p>
              <p>+91 8184889557</p>
              <p>Suraram, Hyderabad 500055</p>
              <p>Telangana, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-indigo-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-200 text-sm">
            © 2025 Intruitia. All rights reserved. | UDYAM-TS-20-0135173
          </p>
          <div className="flex flex-wrap space-x-4 md:space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/refund-policy" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Refund Policy
            </Link>
            <Link to="/cancellation-policy" className="text-indigo-200 hover:text-white text-sm transition-colors">
              Cancellation Policy
            </Link>
            <Link to="/about-us" className="text-indigo-200 hover:text-white text-sm transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
