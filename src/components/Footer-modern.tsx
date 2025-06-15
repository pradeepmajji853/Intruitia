import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Command, Twitter, Linkedin, Instagram, Github, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      
      // Reset status after a delay
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };
  
  const navigation = {
    company: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' }
    ],
    services: [
      { name: 'AI Content Creation', href: '#' },
      { name: 'Sentiment Analysis', href: '#' },
      { name: 'Marketing Automation', href: '#' },
      { name: 'Consulting Services', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Webinars', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-and-conditions' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Cancellation Policy', href: '/cancellation-policy' }
    ]
  };
  
  const socialMedia = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' }
  ];

  return (
    <footer className="bg-[#0e0e1a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Command className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
                Intruitia
              </span>
            </div>
            
            <p className="text-gray-400 mb-8 max-w-md">
              Transforming digital marketing with AI-powered content ecosystems that adapt, engage, and convert with unparalleled precision.
            </p>
            
            <div className="flex space-x-4">
              {socialMedia.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest insights on AI-powered marketing.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  className={`px-4 rounded-r-lg font-medium transition-colors flex items-center justify-center ${
                    isSubscribed
                      ? 'bg-green-600 text-white'
                      : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                  }`}
                >
                  {isSubscribed ? 'Subscribed!' : <Send className="w-5 h-5" />}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-green-400 text-sm">
                  Thank you for subscribing! Check your inbox for confirmation.
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/10">
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-6">Legal</h3>
            <ul className="space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="text-gray-400 hover:text-violet-400 transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Intruitia. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-violet-400 text-sm transition-colors duration-300">
              Cookie Settings
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-400 text-sm transition-colors duration-300">
              Accessibility
            </a>
            <a href="#" className="text-gray-400 hover:text-violet-400 text-sm transition-colors duration-300">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
