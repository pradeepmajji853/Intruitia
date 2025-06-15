import { useState, FormEvent, useEffect } from 'react';
import { Send, BarChart3, Users, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

// Interface for form data
interface FormData {
  product: string;
  audience: string;
  platform: string;
  goal: string;
  wordCount: string;
  keyBenefits: string;
}

const AdCopyGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    product: '',
    audience: '',
    platform: 'Facebook',
    goal: 'Increase Sales',
    wordCount: '50-100',
    keyBenefits: ''
  });

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAdCopy, setGeneratedAdCopy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean>(false);

  useEffect(() => {
    setIsApiKeyConfigured(geminiService.isConfigured());
  }, []);

  // Platform options
  const platformOptions = [
    'Facebook',
    'Instagram',
    'Google Ads',
    'LinkedIn',
    'Twitter',
    'TikTok',
    'YouTube'
  ];

  // Goal options
  const goalOptions = [
    'Increase Sales',
    'Generate Leads',
    'Brand Awareness',
    'Website Traffic',
    'App Downloads',
    'Event Registration',
    'Newsletter Signups'
  ];

  // Word count options
  const wordCountOptions = [
    '25-50',
    '50-100', 
    '100-150',
    '150-200'
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate ad copy using Gemini
  const generateAdCopy = async () => {
    if (!geminiService.isConfigured()) {
      setShowApiKeyModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedAdCopy(null);

    try {
      const result = await geminiService.generateAdCopy(formData.product, formData.audience, formData.goal);

      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedAdCopy(result.content);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.product.trim()) {
      setError('Please enter a product or service name');
      return;
    }

    if (!formData.audience.trim()) {
      setError('Please specify your target audience');
      return;
    }

    generateAdCopy();
  };

  // Copy ad copy to clipboard
  const copyToClipboard = async () => {
    if (!generatedAdCopy) return;
    
    try {
      await navigator.clipboard.writeText(generatedAdCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy ad copy: ', err);
    }
  };

  const handleApiKeySet = () => {
    setIsApiKeyConfigured(true);
  };

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white">
      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onApiKeySet={handleApiKeySet}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-semibold mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            AI Ad Copy Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
            Create High-Converting Ad Copy
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Generate compelling ad copy that drives conversions and maximizes your advertising ROI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-green-400" />
                Ad Details
              </h2>
              {!isApiKeyConfigured && (
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Setup API
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="product" className="block text-sm font-semibold text-gray-300 mb-2">
                  Product/Service *
                </label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="e.g., productivity app, fitness course, coffee shop"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-semibold text-gray-300 mb-2">
                  Target Audience *
                </label>
                <input
                  type="text"
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  placeholder="e.g., busy professionals, fitness enthusiasts, small business owners"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="platform" className="block text-sm font-semibold text-gray-300 mb-2">
                    Platform
                  </label>
                  <select
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {platformOptions.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-semibold text-gray-300 mb-2">
                    Goal
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {goalOptions.map(goal => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="wordCount" className="block text-sm font-semibold text-gray-300 mb-2">
                  Word Count
                </label>
                <select
                  id="wordCount"
                  name="wordCount"
                  value={formData.wordCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {wordCountOptions.map(count => (
                    <option key={count} value={count}>{count} words</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="keyBenefits" className="block text-sm font-semibold text-gray-300 mb-2">
                  Key Benefits (Optional)
                </label>
                <textarea
                  id="keyBenefits"
                  name="keyBenefits"
                  value={formData.keyBenefits}
                  onChange={handleChange}
                  placeholder="List the main benefits or unique selling points"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.product.trim() || !formData.audience.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
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

            {/* API Key Status */}
            {!isApiKeyConfigured && (
              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-200 font-medium mb-1">API Key Required</p>
                    <p className="text-yellow-300/80 text-sm">Configure your Gemini API key to enable AI ad copy generation.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-blue-400" />
                Generated Ad Copy
              </h2>
              {generatedAdCopy && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="min-h-[400px] bg-gray-900/50 rounded-xl p-6 border border-gray-600/30">
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-900/20 border border-red-600/30 rounded-lg mb-4">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-200 font-medium">Error</p>
                    <p className="text-red-300/80 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {generatedAdCopy ? (
                <div className="space-y-4">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-400">{formData.platform} Ad Copy</span>
                    </div>
                    <div className="text-white leading-relaxed whitespace-pre-wrap">{generatedAdCopy}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-800/30 rounded-lg p-3">
                      <span className="text-gray-400">Platform:</span>
                      <p className="text-white font-medium">{formData.platform}</p>
                    </div>
                    <div className="bg-gray-800/30 rounded-lg p-3">
                      <span className="text-gray-400">Goal:</span>
                      <p className="text-white font-medium">{formData.goal}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-900/20 border border-green-600/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-green-200 font-medium mb-1">Ad Copy Ready!</p>
                        <p className="text-green-300/80 text-sm">
                          Your ad copy is optimized for {formData.platform} and designed to {formData.goal.toLowerCase()}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                  <BarChart3 className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No ad copy generated yet</p>
                  <p className="text-sm">Fill out the form and click "Generate Ad Copy" to create your advertisement</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Conversion Focused</h3>
            <p className="text-gray-400 text-sm">Ad copy designed to maximize conversions and drive your specific goals</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Audience Targeted</h3>
            <p className="text-gray-400 text-sm">Tailored messaging that resonates with your specific target audience</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform Optimized</h3>
            <p className="text-gray-400 text-sm">Optimized for the specific requirements and best practices of each platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCopyGenerator;
