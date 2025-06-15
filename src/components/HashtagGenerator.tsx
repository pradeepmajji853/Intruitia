import { useState, FormEvent, useEffect } from 'react';
import { Send, Hash, Users, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

// Define the platforms available
type Platform = 'Instagram' | 'Twitter' | 'LinkedIn' | 'TikTok' | 'YouTube' | 'General';

// Interface for form data
interface FormData {
  topic: string;
  platform: Platform;
  amount: number;
  description: string;
}

const HashtagGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    platform: 'Instagram',
    amount: 20,
    description: ''
  });

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
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
      [name]: name === 'amount' ? parseInt(value) || 0 : value
    }));
  };

  // Generate hashtags using Gemini
  const generateHashtags = async () => {
    if (!geminiService.isConfigured()) {
      setShowApiKeyModal(true);
      return;
    }

    if (!formData.topic.trim()) {
      setError('Please enter a topic for your hashtags');
      return;
    }

    if (formData.amount < 1 || formData.amount > 100) {
      setError('Please enter a valid number of hashtags (1-100)');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedHashtags([]);

    try {
      const hashtags = await geminiService.generateHashtags({
        topic: formData.topic,
        platform: formData.platform,
        count: formData.amount,
        description: formData.description
      });

      if (hashtags.length === 0) {
        throw new Error('No hashtags were generated. Please try again.');
      }

      setGeneratedHashtags(hashtags);
    } catch (error: any) {
      console.error('Hashtag generation failed:', error);
      setError(error.message || 'Failed to generate hashtags. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateHashtags();
  };

  // Copy all hashtags to clipboard
  const copyToClipboard = async () => {
    try {
      const hashtagText = generatedHashtags.join(' ');
      await navigator.clipboard.writeText(hashtagText);
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
            AI Hashtag Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate trending, relevant hashtags for any platform to boost your content's reach and engagement
          </p>
          
          {/* API Key Setup Button */}
          {!isApiKeyConfigured && (
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg max-w-md mx-auto">
              <div className="flex items-center justify-center text-yellow-400 mb-2">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Setup Required</span>
              </div>
              <p className="text-sm text-yellow-300 mb-3">Configure your Gemini API key to start generating hashtags</p>
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
              <Hash className="w-6 h-6 mr-3 text-blue-400" />
              Hashtag Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Travel Photography, Fitness Tips, Cooking"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Platform Selection */}
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-2">
                  Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter/X</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="General">General</option>
                </select>
              </div>

              {/* Number of Hashtags */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Hashtags
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Context
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Optional: Add more context about your content, target audience, or specific requirements"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.topic.trim() || !isApiKeyConfigured}
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
                    Generate Hashtags
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
              Generated Hashtags
            </h2>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-300">Finding the perfect hashtags...</p>
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
            {generatedHashtags.length > 0 && !isLoading && !error && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Click to copy all</span>
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
                        Copy All
                      </>
                    )}
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none mt-2 p-6 rounded-lg border border-gray-700 bg-gray-700/30">
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((hashtag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-indigo-600/20 text-indigo-200 border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(hashtag)}
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-400">
                  <p>💡 <strong>Tip:</strong> Click individual hashtags to copy them, or use "Copy All" to get the complete set.</p>
                </div>
              </div>
            )}

            {/* Default State */}
            {generatedHashtags.length === 0 && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                <Hash className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-gray-400 text-center">
                  Fill out the form and click "Generate Hashtags" to get your trending hashtags
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Hash className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Trending Analysis</h3>
            <p className="text-gray-400">AI-powered analysis of current trending hashtags for maximum reach.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform Optimized</h3>
            <p className="text-gray-400">Hashtags tailored for specific social media platforms and their audiences.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Engagement Focused</h3>
            <p className="text-gray-400">Strategic hashtags designed to boost visibility and engagement rates.</p>
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

export default HashtagGenerator;