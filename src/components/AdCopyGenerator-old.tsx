import { useState, FormEvent } from 'react';
import { Send, BarChart3, Users, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

// Interface for form data
interface FormData {
  product: string;
  audience: string;
  platform: string;
  goal: string;
  wordCount: string;
}

// Interface for API response
interface ApiResponse {
  adCopy: string;
}

const AdCopyGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    product: '',
    audience: '',
    platform: 'Facebook',
    goal: 'Increase Sales',
    wordCount: '50-100'
  });

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAdCopy, setGeneratedAdCopy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Platform options
  const platformOptions = [
    'Facebook',
    'Instagram',
    'Google Ads',
    'LinkedIn',
    'Twitter',
    'TikTok'
  ];

  // Goal options
  const goalOptions = [
    'Increase Sales',
    'Generate Leads',
    'Brand Awareness',
    'Website Traffic',
    'App Downloads',
    'Event Registration'
  ];

  // Word count options
  const wordCountOptions = [
    '25-50',
    '50-100',
    '100-150',
    '150-200'
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCopied(false);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Return mock response based on form data
      let mockAdCopy = '';
      
      if (formData.goal === 'Increase Sales') {
        mockAdCopy = `## TRANSFORM YOUR RESULTS WITH ${formData.product.toUpperCase()}

Looking for a game-changer in ${formData.product}? Discover what thousands of ${formData.audience} already know.

Our innovative solution helps you achieve better results in less time, with features specifically designed for people like you.

✅ 30% improved efficiency
✅ User-friendly interface
✅ Expert support included

LIMITED TIME OFFER: Get 15% off your first purchase today!

👉 Shop now and see the difference.`;
      } else if (formData.goal === 'Generate Leads') {
        mockAdCopy = `## FREE GUIDE: ${formData.product.toUpperCase()} SECRETS REVEALED

Attention ${formData.audience}! Unlock the strategies that top performers don't want you to know.

Download our comprehensive guide on ${formData.product} and learn:
• Advanced techniques to outperform competitors
• Common mistakes to avoid
• Step-by-step implementation plan

Get instant access to exclusive insights that can transform your approach.

📧 Enter your email to download now - it's completely FREE!`;
      } else if (formData.goal === 'Brand Awareness') {
        mockAdCopy = `## INTRODUCING ${formData.product.toUpperCase()} - THE FUTURE IS HERE

${formData.audience}, meet your new favorite solution! We're revolutionizing the industry with cutting-edge technology.

🚀 Industry-leading innovation
🎯 Designed specifically for ${formData.audience}
⭐ Trusted by thousands worldwide

Join the community that's already experiencing the difference. See why we're the talk of the industry.

🔔 Follow us for the latest updates and exclusive content!`;
      } else {
        mockAdCopy = `## DISCOVER ${formData.product.toUpperCase()} TODAY

Perfect for ${formData.audience} who want to ${formData.goal.toLowerCase()}.

🎯 Targeted solution for your specific needs
💡 Smart features that save you time
🔒 Secure and reliable technology

Ready to take the next step? Join thousands who have already made the smart choice.

✨ Start your journey today!`;
      }
      
      setGeneratedAdCopy(mockAdCopy);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate ad copy. Please try again later.';
      setError(errorMessage);
      console.error('Ad copy generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    if (generatedAdCopy) {
      try {
        await navigator.clipboard.writeText(generatedAdCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = generatedAdCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-900 py-20 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            AI Ad Copy Generator
          </h1>
          <p className="text-lg text-gray-300">
            Create compelling advertisements that convert viewers into customers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 border border-white/10 rounded-2xl shadow-lg p-8">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-indigo-400" />
              Campaign Details
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product/Service *
                </label>
                <textarea
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="e.g., Marketing Automation Software, Fitness Program"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Audience *
                </label>
                <textarea
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={2}
                  placeholder="e.g., Small Business Owners, Fitness Enthusiasts"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Platform *
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  {platformOptions.map(platform => (
                    <option key={platform} value={platform} className="bg-gray-700 text-white">
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Campaign Goal *
                </label>
                <select
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  {goalOptions.map(goal => (
                    <option key={goal} value={goal} className="bg-gray-700 text-white">
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Word Count *
                </label>
                <select
                  name="wordCount"
                  value={formData.wordCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  {wordCountOptions.map(count => (
                    <option key={count} value={count} className="bg-gray-700 text-white">
                      {count} words
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.product || !formData.audience}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Ad Copy
                  </>
                )}
              </button>
            </form>

            {/* Information Panel */}
            <div className="mt-8 bg-indigo-900/30 border border-indigo-800/50 rounded-lg p-6">
              <div className="flex items-start">
                <BarChart3 className="w-5 h-5 text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-indigo-300">How it works</h3>
                  <p className="text-sm text-indigo-300 mt-1">
                    Our AI analyzes your product, target audience, and campaign goals to create compelling ad copy optimized for your chosen platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gray-800 border border-white/10 rounded-2xl shadow-lg p-8 relative">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-400" />
              Generated Ad Copy
            </h2>

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-400 text-center">
                  Creating compelling ad copy for your campaign...
                </p>
              </div>
            )}

            {error && !isLoading && (
              <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-400">Generation Failed</h3>
                  <p className="text-sm text-red-300 mt-1">{error}</p>
                </div>
              </div>
            )}

            {generatedAdCopy && !isLoading && (
              <div className="space-y-4">
                <div className="absolute top-0 right-0">
                  <button
                    onClick={copyToClipboard}
                    className="mt-8 mr-8 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    )}
                  </button>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-6">
                  <div className="prose prose-invert max-w-none">
                    {generatedAdCopy.split('\n').map((line, index) => (
                      <p 
                        key={index} 
                        className={
                          line.trim() === '' 
                            ? 'my-2' 
                            : line.startsWith('#') 
                              ? 'text-lg font-bold text-white my-3' 
                              : 'text-gray-300 my-2'
                        }
                      >
                        {line.replace(/^#+\s*/, '')}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm">
                  <p className="text-gray-400">
                    Generated for {formData.platform} • {formData.goal} • {formData.wordCount} words
                  </p>
                </div>
              </div>
            )}

            {!generatedAdCopy && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                <BarChart3 className="w-12 h-12 mb-4 text-gray-500" />
                <p className="text-gray-400 text-center">
                  Your generated ad copy will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform-Optimized</h3>
            <p className="text-gray-400">
              Copy tailored for each social media platform's unique audience and format requirements.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Audience-Focused</h3>
            <p className="text-gray-400">
              Compelling messages that resonate with your specific target audience and drive action.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Goal-Oriented</h3>
            <p className="text-gray-400">
              Strategic copy designed to achieve your specific campaign objectives and KPIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCopyGenerator;
