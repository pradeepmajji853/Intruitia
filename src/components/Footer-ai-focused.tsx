import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Github, Send, ArrowRight } from 'lucide-react';
import IntruitiaLogo from './IntruitiaLogo';
import EarlyAccessPopup from './EarlyAccessPopup';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store email in localStorage for now - replace with actual backend
      const existingEmails = JSON.parse(localStorage.getItem('earlyAccessEmails') || '[]');
      existingEmails.push({ email, timestamp: new Date().toISOString(), source: 'footer' });
      localStorage.setItem('earlyAccessEmails', JSON.stringify(existingEmails));
      
      setIsSubscribed(true);
      setEmail('');
      
      // Reset status after a delay
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };
  
  const navigation = {
    legal: [
      { name: 'Terms & Conditions', href: '/terms-and-conditions' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Cancellation Policy', href: '/cancellation-policy' },
      { name: 'About Us', href: '/about-us' }
    ]
  };
  
  const socialMedia = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' }
  ];

  return (
    <>
      <footer className="bg-[#0e0e1a] border-t border-white/10" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <IntruitiaLogo 
                  size="medium" 
                  variant="full" 
                  className="shadow-lg"
                />
              </div>
              
              <p className="text-gray-400 mb-8 max-w-md">
                Revolutionizing content creation with AI-powered tools. Experience the future of video editing and content generation.
              </p>
              
              <div className="flex space-x-4 mb-8">
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

              <button 
                onClick={() => setShowPopup(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium rounded-full shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
              >
                Get Early Access
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get notified when our AI video editing tool launches.
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
                    Thank you for subscribing! We'll notify you when we launch.
                  </p>
                )}
              </form>
            </div>
          </div>
          
          {/* Legal Links Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-400 text-sm mb-3">
                  &copy; {new Date().getFullYear()} Intruitia. All rights reserved.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {navigation.legal.map((item) => (
                    <Link 
                      key={item.name}
                      to={item.href} 
                      className="text-gray-400 hover:text-violet-400 text-sm transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="text-left md:text-right">
                <p className="text-gray-400 text-sm mb-1">Contact Us</p>
                <a 
                  href="mailto:support@intruitia.in" 
                  className="text-violet-400 hover:text-violet-300 text-sm transition-colors duration-300"
                >
                  support@intruitia.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Early Access Popup */}
      <EarlyAccessPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />
    </>
  );
};

export default Footer;
