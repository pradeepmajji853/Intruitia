import { useState, useEffect, useRef } from 'react';
import { Check, X, Tag, Zap, Info, AlertCircle, Copy } from 'lucide-react';
import Footer from './Footer';
import Navbar from './Navbar';

const Pricing = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState('web');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const webPackages = [
    {
      name: 'Basic',
      price: '₹20,000',
      description: 'Perfect for small businesses getting started online',
      features: [
        'Responsive 5-page website',
        'Mobile optimization',
        'Basic SEO setup',
        'Contact form',
        'Social media integration',
        '1 month free support',
      ],
      notIncluded: [
        'Content creation',
        'E-commerce functionality',
        'Custom animations',
        'Advanced integrations',
      ],
      popular: false,
      delivery: '2-3 weeks'
    },
    {
      name: 'Professional',
      price: '₹45,000',
      description: 'Comprehensive solution for growing businesses',
      features: [
        'Responsive 10-page website',
        'Mobile optimization',
        'Advanced SEO setup',
        'Contact forms & lead generation',
        'CMS implementation',
        'Social media integration',
        'Blog setup',
        'Google Analytics integration',
        '3 months free support',
      ],
      notIncluded: [
        'Advanced e-commerce',
        'Custom backend development',
      ],
      popular: true,
      delivery: '4-6 weeks'
    },
    {
      name: 'Enterprise',
      price: 'Custom Quote',
      description: 'Tailored solutions for established businesses',
      features: [
        'Custom web application',
        'Advanced functionality',
        'Full e-commerce capabilities',
        'Custom backend development',
        'Third-party integrations',
        'Premium hosting setup',
        'Performance optimization',
        'Security hardening',
        '6 months priority support',
      ],
      notIncluded: [],
      popular: false,
      delivery: '8-12 weeks'
    }
  ];

  const contentPackages = [
    {
      name: 'Content Starter',
      price: '₹15,000',
      description: 'Essential content to establish your brand online',
      features: [
        '5 social media posts',
        '3 blog articles (500 words each)',
        'Basic brand guidelines',
        'Simple logo design',
        'Email template design',
      ],
      notIncluded: [
        'Video production',
        'Animation',
        'Long-form content',
        'Custom illustrations',
      ],
      popular: false,
      delivery: '2-3 weeks'
    },
    {
      name: 'Content Growth',
      price: '₹35,000',
      description: 'Comprehensive content strategy for brand building',
      features: [
        '15 social media posts',
        '5 blog articles (800 words each)',
        '1 promotional video (60 seconds)',
        'Advanced brand guidelines',
        'Professional logo design',
        'Social media cover designs',
        'Email newsletter templates',
      ],
      notIncluded: [
        'Advanced animation',
        'Product photography',
      ],
      popular: true,
      delivery: '4-5 weeks'
    },
    {
      name: 'Content Premium',
      price: 'Custom Quote',
      description: 'Full-scale content production for established brands',
      features: [
        'Custom content strategy',
        '30+ social media posts',
        '10 blog articles (any length)',
        'Video production package',
        'Complete brand identity',
        'Custom illustrations',
        'Print materials design',
        'Social media management',
      ],
      notIncluded: [],
      popular: false,
      delivery: '6-8 weeks'
    }
  ];

  const consultingPackages = [
    {
      name: 'Strategy Session',
      price: '₹10,000',
      description: 'One-time consultation to address specific challenges',
      features: [
        '3-hour consulting session',
        'Problem diagnosis',
        'Solution recommendations',
        'Action plan document',
        'One follow-up call',
      ],
      notIncluded: [
        'Implementation support',
        'Technical development',
        'Ongoing consulting',
        'Team training',
      ],
      popular: false,
      delivery: '1 week'
    },
    {
      name: 'Growth Accelerator',
      price: '₹30,000/month',
      description: 'Ongoing support for startups in growth phase',
      features: [
        'Weekly strategy sessions',
        'Growth metrics analysis',
        'Customer acquisition strategy',
        'Technology stack consulting',
        'Fundraising preparation',
        'Networking opportunities',
      ],
      notIncluded: [
        'Implementation',
        'Direct investor introductions',
      ],
      popular: true,
      duration: '3-month minimum engagement'
    },
    {
      name: 'Full Partnership',
      price: 'Custom Quote',
      description: 'Comprehensive partnership for serious startups',
      features: [
        'Dedicated consulting team',
        'Full business strategy',
        'Implementation support',
        'Investor pitch preparation',
        'Technical co-founder services',
        'MVP development',
        'Market research',
        'Team building assistance',
      ],
      notIncluded: [],
      popular: false,
      duration: 'Custom arrangement'
    }
  ];

  const getActivePackages = () => {
    switch (activeTab) {
      case 'web':
        return webPackages;
      case 'content':
        return contentPackages;
      case 'consulting':
        return consultingPackages;
      default:
        return webPackages;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section 
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-slate-50 to-white relative"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Professional Header */}
          <div className="text-center mb-12">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                <Tag className="w-4 h-4 mr-2" />
                Transparent Pricing
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Our Service Packages
              </h1>
            </div>
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Choose the right package for your business needs. All prices include GST and are in Indian Rupees (₹).
              </p>
            </div>
          </div>

          {/* Service Type Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-slate-100 rounded-lg">
              <button 
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${activeTab === 'web' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setActiveTab('web')}
              >
                Web Development
              </button>
              <button 
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${activeTab === 'content' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setActiveTab('content')}
              >
                Content Creation
              </button>
              <button 
                className={`px-6 py-2 rounded-md font-medium text-sm transition-all ${activeTab === 'consulting' ? 'bg-white shadow text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setActiveTab('consulting')}
              >
                Consulting
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {getActivePackages().map((pkg, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl border ${pkg.popular ? 'border-blue-200 ring-4 ring-blue-50' : 'border-slate-200'} shadow-sm transition-all hover:shadow-md overflow-hidden`}
              >
                {pkg.popular && (
                  <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-3xl font-bold text-slate-900">{pkg.price}</span>
                    {pkg.duration && <span className="text-slate-500 ml-2 pb-1">/ {pkg.duration}</span>}
                  </div>
                  <p className="text-slate-600 mb-6 text-sm">{pkg.description}</p>
                  
                  <div className="border-t border-slate-200 pt-6 mb-6">
                    <h4 className="font-semibold text-sm text-slate-900 mb-3 flex items-center">
                      <Check className="w-4 h-4 text-emerald-500 mr-2" />
                      What's included:
                    </h4>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex text-sm">
                          <Check className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {pkg.notIncluded.length > 0 && (
                      <>
                        <h4 className="font-semibold text-sm text-slate-900 mb-3 flex items-center">
                          <X className="w-4 h-4 text-slate-400 mr-2" />
                          Not included:
                        </h4>
                        <ul className="space-y-3">
                          {pkg.notIncluded.map((feature, i) => (
                            <li key={i} className="flex text-sm">
                              <X className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-500">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  
                  {pkg.delivery && (
                    <div className="flex items-center text-sm text-slate-600 mb-6">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      Estimated delivery: {pkg.delivery}
                    </div>
                  )}
                  
                  <button className={`w-full py-3 rounded-lg font-medium ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'} transition-colors`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <Info className="w-5 h-5 text-blue-600 mr-2" />
                  Payment Terms
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Standard Projects</h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>50% payment upfront to initiate the project</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>25% after initial prototype/draft approval</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>25% before final delivery of the project</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 mb-2">Recurring Services</h4>
                    <ul className="space-y-2 text-slate-600 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Monthly billing on the 1st of each month</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Quarterly payment option with 5% discount</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Annual payment option with 10% discount</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <Zap className="w-5 h-5 text-blue-600 mr-2" />
                  Payment Methods
                </h3>
                <p className="text-slate-600 mb-4">
                  We accept the following payment methods:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                    <p className="font-medium text-slate-800">Credit/Debit Cards</p>
                    <p className="text-xs text-slate-500">Visa, Mastercard, RuPay</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                    <p className="font-medium text-slate-800">UPI</p>
                    <p className="text-xs text-slate-500">GPay, PhonePe, BHIM</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                    <p className="font-medium text-slate-800">Net Banking</p>
                    <p className="text-xs text-slate-500">All major Indian banks</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-center">
                    <p className="font-medium text-slate-800">Bank Transfer</p>
                    <p className="text-xs text-slate-500">NEFT, RTGS, IMPS</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
                  Important Notes
                </h3>
                <ul className="space-y-2 text-slate-600 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>All prices are inclusive of 18% GST</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Prices are valid for 30 days from the date of quotation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Additional requirements beyond the scope will be quoted separately</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Please refer to our <a href="/refund-policy" className="text-blue-600 hover:underline">Refund & Cancellation Policy</a> for more details</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Business Details for Payment */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-8">
            <div className="flex items-start">
              <div className="mr-6">
                <Building className="w-12 h-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Company Bank Account Details
                </h3>
                <p className="text-slate-600 mb-4">
                  For bank transfers, please use the following details:
                </p>
                
                <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4 relative">
                  <button 
                    className="absolute top-3 right-3 p-1 rounded hover:bg-slate-100"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-slate-500" />
                  </button>
                  <ul className="space-y-1 text-sm text-slate-600">
                    <li><span className="font-medium text-slate-700">Account Name:</span> Intruitia Technologies Pvt. Ltd.</li>
                    <li><span className="font-medium text-slate-700">Bank Name:</span> HDFC Bank</li>
                    <li><span className="font-medium text-slate-700">Account Number:</span> 50200012345678</li>
                    <li><span className="font-medium text-slate-700">IFSC Code:</span> HDFC0001234</li>
                    <li><span className="font-medium text-slate-700">Branch:</span> Hitech City, Hyderabad</li>
                    <li><span className="font-medium text-slate-700">Account Type:</span> Current</li>
                  </ul>
                </div>
                
                <p className="text-sm text-slate-600">
                  For any billing questions or assistance, please contact our finance team at 
                  <a href="mailto:billing@intruitia.in" className="text-blue-600 hover:underline ml-1">billing@intruitia.in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;

// Missing component definition
const Clock = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
};
