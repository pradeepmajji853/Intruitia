import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Wallet, BanknoteIcon, IndianRupee } from 'lucide-react';
import Navbar from './Navbar-ai';
import Footer from './Footer-ai-connected';
import RazorpayPayment from './RazorpayPayment';

const PaymentDemo = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const plans = [
    {
      id: 1,
      name: "Essential AI",
      price: 1999,
      period: "month",
      features: [
        "AI Content Generation (5 posts/week)",
        "Basic Audience Analysis",
        "Social Media Integration",
        "Monthly Performance Report",
        "Email Support"
      ],
      highlight: false
    },
    {
      id: 2,
      name: "Pro AI Suite",
      price: 4999,
      period: "month",
      features: [
        "AI Content Generation (15 posts/week)",
        "Advanced Audience Segmentation",
        "Multi-Channel Content Orchestration",
        "Weekly Performance Reports",
        "A/B Testing for Content",
        "Priority Support"
      ],
      highlight: true
    },
    {
      id: 3,
      name: "Enterprise AI",
      price: 9999,
      period: "month",
      features: [
        "Unlimited AI Content Generation",
        "Real-time Trend Integration",
        "Full-Spectrum Content Orchestration",
        "Custom Analytics Dashboard",
        "Dedicated Success Manager",
        "Strategic Content Planning",
        "24/7 Priority Support"
      ],
      highlight: false
    }
  ];

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
    // Scroll to form
    document.getElementById('customer-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Scroll to payment section
    document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePaymentSuccess = (data: any) => {
    console.log("Payment successful:", data);
    setPaymentSuccess(true);
    
    // Redirect to success page after a delay
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  const selectedPlanData = plans.find(plan => plan.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              AI-Powered Marketing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Pricing Plans</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Choose the perfect plan to transform your digital marketing with our AI-driven solutions
            </p>
          </div>
          
          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                  plan.highlight ? 'ring-2 ring-indigo-600 relative' : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 bg-indigo-600 text-white text-center py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-5xl font-bold text-gray-900">₹{plan.price}</span>
                    <span className="text-gray-500 ml-2">/{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="ml-3 text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.highlight 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Customer Information Form */}
          {selectedPlan && (
            <div id="customer-form" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="mt-6 w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          )}
          
          {/* Payment Section */}
          {formSubmitted && selectedPlanData && !paymentSuccess && (
            <div id="payment-section" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
              
              <div className="bg-indigo-50 rounded-lg p-4 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-medium">Selected Plan:</span>
                  <span className="text-indigo-700 font-semibold">{selectedPlanData.name}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-medium">Amount:</span>
                  <span className="text-indigo-700 font-semibold">₹{selectedPlanData.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Billing Cycle:</span>
                  <span className="text-indigo-700 font-semibold">Monthly</span>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="border border-indigo-200 bg-indigo-50 rounded-lg p-3 flex flex-col items-center text-center text-indigo-700">
                    <CreditCard className="w-6 h-6 mb-2" />
                    <span className="text-sm">Credit Card</span>
                  </div>
                  <div className="border border-indigo-200 bg-indigo-50 rounded-lg p-3 flex flex-col items-center text-center text-indigo-700">
                    <BanknoteIcon className="w-6 h-6 mb-2" />
                    <span className="text-sm">Debit Card</span>
                  </div>
                  <div className="border border-indigo-200 bg-indigo-50 rounded-lg p-3 flex flex-col items-center text-center text-indigo-700">
                    <IndianRupee className="w-6 h-6 mb-2" />
                    <span className="text-sm">Net Banking</span>
                  </div>
                  <div className="border border-indigo-600 bg-indigo-100 rounded-lg p-3 flex flex-col items-center text-center text-indigo-700 ring-2 ring-indigo-600">
                    <Wallet className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">UPI</span>
                  </div>
                </div>
              </div>
              
              <RazorpayPayment
                amount={selectedPlanData.price}
                service={selectedPlanData.name}
                description={`${selectedPlanData.name} - Monthly Subscription`}
                customerName={customerInfo.name}
                customerEmail={customerInfo.email}
                customerPhone={customerInfo.phone}
                onSuccess={handlePaymentSuccess}
              />
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>By proceeding with the payment, you agree to our <a href="/terms-and-conditions" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="/refund-policy" className="text-indigo-600 hover:underline">Refund Policy</a>.</p>
              </div>
            </div>
          )}
          
          {/* Success Message */}
          {paymentSuccess && (
            <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-green-800 mb-4">Payment Successful!</h2>
              <p className="text-green-700 mb-6">
                Thank you for subscribing to our {selectedPlanData?.name} plan. You will receive a confirmation email shortly.
              </p>
              <p className="text-green-600 font-medium">
                Redirecting you to the homepage in a few seconds...
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentDemo;
