import { useState, FormEvent, useEffect } from 'react';
import { Send, Megaphone, Target, TrendingUp, Loader2, Copy, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

// Define the platforms and goals available
type Platform = 'Google Ads' | 'Facebook Ads' | 'Instagram Ads' | 'LinkedIn Ads' | 'Twitter Ads' | 'General';
type Goal = 'Sales' | 'Lead Generation' | 'Brand Awareness' | 'Website Traffic' | 'App Downloads' | 'Event Promotion';
type AdFormat = 'Headline' | 'Description' | 'Complete Ad' | 'Call-to-Action';

// Interface for form data
interface FormData {
  product: string;
  platform: Platform;
  goal: Goal;
  adFormat: AdFormat;
  targetAudience: string;
  keyBenefits: string;
  tone: string;
  budget: string;
  additionalInfo: string;
}

const AdCopyGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    product: '',
    platform: 'Google Ads',
    goal: 'Sales',
    adFormat: 'Complete Ad',
    targetAudience: '',
    keyBenefits: '',
    tone: 'persuasive',
    budget: '',
    additionalInfo: ''
  });

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedAdCopy, setGeneratedAdCopy] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean>(false);

  useEffect(() => {
    setIsApiKeyConfigured(geminiService.isConfigured());
  }, []);

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

    if (!formData.product.trim()) {
      setError('Please enter a product or service description');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedAdCopy('');

    try {
      const adCopy = await geminiService.generateAdCopy({
        product: formData.product,
        platform: formData.platform,
        goal: formData.goal,
        adFormat: formData.adFormat,
        targetAudience: formData.targetAudience,
        keyBenefits: formData.keyBenefits,
        tone: formData.tone,
        budget: formData.budget,
        additionalInfo: formData.additionalInfo
      });

      if (!adCopy || adCopy.trim() === '') {
        throw new Error('No ad copy was generated. Please try again.');
      }

      setGeneratedAdCopy(adCopy);
    } catch (error: any) {
      console.error('Ad copy generation failed:', error);
      setError(error.message || 'Failed to generate ad copy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateAdCopy();
  };

  // Copy ad copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedAdCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleApiKeySet = () => {
    setIsApiKeyConfigured(true);
    setShowApiKeyModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            AI Ad Copy Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create high-converting ad copy that drives results across all major advertising platforms
          </p>
          
          {/* API Key Setup Button */}
          {!isApiKeyConfigured && (
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg max-w-md mx-auto">
              <div className="flex items-center justify-center text-yellow-400 mb-2">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Setup Required</span>
              </div>
              <p className="text-sm text-yellow-300 mb-3">Configure your Gemini API key to start generating ad copy</p>
              <button
                onClick={() => setShowApiKeyModal(true)}
                className="flex items-center justify-center w-full bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Setup API Key
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Megaphone className="w-6 h-6 mr-3 text-blue-400" />
              Ad Campaign Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Input */}
              <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-300 mb-2">
                  Product/Service *
                </label>
                <textarea
                  id="product"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., E-commerce fitness app, Organic skincare products, Digital marketing course..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  required
                />
              </div>

              {/* Platform Selection */}
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-2">
                  Advertising Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Google Ads">Google Ads</option>
                  <option value="Facebook Ads">Facebook Ads</option>
                  <option value="Instagram Ads">Instagram Ads</option>
                  <option value="LinkedIn Ads">LinkedIn Ads</option>
                  <option value="Twitter Ads">Twitter Ads</option>
                  <option value="General">General</option>
                </select>
              </div>

              {/* Goal Selection */}
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-2">
                  Campaign Goal
                </label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Sales">Sales</option>
                  <option value="Lead Generation">Lead Generation</option>
                  <option value="Brand Awareness">Brand Awareness</option>
                  <option value="Website Traffic">Website Traffic</option>
                  <option value="App Downloads">App Downloads</option>
                  <option value="Event Promotion">Event Promotion</option>
                </select>
              </div>

              {/* Ad Format Selection */}
              <div>
                <label htmlFor="adFormat" className="block text-sm font-medium text-gray-300 mb-2">
                  Ad Format
                </label>
                <select
                  id="adFormat"
                  name="adFormat"
                  value={formData.adFormat}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Complete Ad">Complete Ad</option>
                  <option value="Headline">Headline Only</option>
                  <option value="Description">Description Only</option>
                  <option value="Call-to-Action">Call-to-Action Only</option>
                </select>
              </div>

              {/* Target Audience */}
              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-300 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  placeholder="e.g., Working mothers aged 25-40, Tech entrepreneurs, Small business owners..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Key Benefits */}
              <div>
                <label htmlFor="keyBenefits" className="block text-sm font-medium text-gray-300 mb-2">
                  Key Benefits/Features
                </label>
                <textarea
                  id="keyBenefits"
                  name="keyBenefits"
                  value={formData.keyBenefits}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., 30-day money-back guarantee, Free shipping, 24/7 customer support, Expert-led training..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Tone Selection */}
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="persuasive">Persuasive</option>
                  <option value="urgent">Urgent</option>
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="emotional">Emotional</option>
                  <option value="informative">Informative</option>
                </select>
              </div>

              {/* Budget (Optional) */}
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                  Budget Range (Optional)
                </label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g., $500-1000/month, Under $50, Premium pricing..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Additional Info */}
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific requirements, competitor information, unique selling points, or constraints..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.product.trim() || !isApiKeyConfigured}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
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
          </div>

          {/* Results Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Generated Ad Copy
            </h2>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-300">Creating converting ad copy...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-red-900/20 border-red-700 border rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-400">Generation Failed</h3>
                  <p className="mt-1 text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Success State */}
            {generatedAdCopy && !isLoading && !error && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {generatedAdCopy.length} characters
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-1 text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Ad Copy
                      </>
                    )}
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div className="p-6 rounded-lg border border-gray-700 bg-gray-700/30 text-gray-200 whitespace-pre-wrap">
                    {generatedAdCopy}
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-400">
                  <p>💡 <strong>Tip:</strong> Test multiple variations of your ad copy to find the highest-performing version.</p>
                </div>
              </div>
            )}

            {/* Default State */}
            {!generatedAdCopy && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                <Megaphone className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-gray-400 text-center">
                  Fill out the form and click "Generate Ad Copy" to create your high-converting advertisement
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Conversion Optimized</h3>
            <p className="text-gray-400">Ad copy designed specifically to drive conversions and achieve your campaign goals.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform Specific</h3>
            <p className="text-gray-400">Tailored for each advertising platform's best practices and audience behavior.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Performance Focused</h3>
            <p className="text-gray-400">Created using proven marketing psychology and high-converting copy principles.</p>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onApiKeySet={handleApiKeySet}
      />
    </div>
  );
};

export default AdCopyGenerator;