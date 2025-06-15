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

  // Parse hashtags from AI response
  const parseHashtags = (content: string): string[] => {
    // Try to find existing hashtags first
    const hashtagRegex = /#[\w\d_]+/g;
    const matches = content.match(hashtagRegex) || [];
    
    if (matches.length > 0) {
      return matches.slice(0, formData.amount);
    }
    
    // If no hashtags found, try to extract words and add #
    const lines = content.split('\n').filter(line => line.trim().length > 0);
    const hashtags: string[] = [];
    
    for (const line of lines) {
      const words = line.split(/[\s,\n]+/).filter(word => word.length > 0);
      for (const word of words) {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        if (cleanWord && hashtags.length < formData.amount) {
          hashtags.push(`#${cleanWord}`);
        }
      }
      if (hashtags.length >= formData.amount) break;
    }
    
    return hashtags;
  };

  // Generate hashtags using Gemini
  const generateHashtags = async () => {
    if (!geminiService.isConfigured()) {
      setShowApiKeyModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedHashtags([]);

    try {
      // Create content string for hashtag generation
      let content = formData.topic;
      if (formData.description) {
        content += `. ${formData.description}`;
      }

      const result = await geminiService.generateHashtags(content, formData.platform);

      if (result.error) {
        setError(result.error);
      } else {
        const hashtags = parseHashtags(result.content);
        setGeneratedHashtags(hashtags);
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
    
    if (!formData.topic.trim()) {
      setError('Please enter a topic for your hashtags');
      return;
    }

    if (formData.amount < 1 || formData.amount > 50) {
      setError('Please enter a valid number of hashtags (1-50)');
      return;
    }

    generateHashtags();
  };

  // Copy hashtags to clipboard
  const copyToClipboard = async () => {
    try {
      const hashtagText = generatedHashtags.join(' ');
      await navigator.clipboard.writeText(hashtagText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy hashtags: ', err);
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
          <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full text-sm font-semibold mb-4">
            <Hash className="w-4 h-4 mr-2" />
            AI Hashtag Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            Generate Trending Hashtags
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Boost your social media reach with AI-generated hashtags tailored for your content and platform
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-purple-400" />
                Content Details
              </h2>
              {!isApiKeyConfigured && (
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Setup API
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="topic" className="block text-sm font-semibold text-gray-300 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., fitness motivation, travel photography"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="platform" className="block text-sm font-semibold text-gray-300 mb-2">
                  Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter/X</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="TikTok">TikTok</option>
                  <option value="YouTube">YouTube</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-semibold text-gray-300 mb-2">
                  Number of Hashtags
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="1"
                  max="50"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
                  Additional Context (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your content style, target audience, or specific niche"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.topic.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
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

            {/* API Key Status */}
            {!isApiKeyConfigured && (
              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-200 font-medium mb-1">API Key Required</p>
                    <p className="text-yellow-300/80 text-sm">Configure your Gemini API key to enable AI hashtag generation.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-pink-400" />
                Generated Hashtags
              </h2>
              {generatedHashtags.length > 0 && (
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
                      Copy All
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

              {generatedHashtags.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((hashtag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 px-3 py-1.5 rounded-full text-sm font-medium border border-purple-500/30 hover:bg-purple-600/30 transition-colors cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(hashtag)}
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Hash className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium mb-1">Pro Tip</p>
                        <p className="text-blue-300/80 text-sm">
                          Click individual hashtags to copy them, or use the "Copy All" button to copy all hashtags at once.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                  <Hash className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No hashtags generated yet</p>
                  <p className="text-sm">Enter your content details and click "Generate Hashtags" to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Hash className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform Optimized</h3>
            <p className="text-gray-400 text-sm">Hashtags tailored for each social media platform's algorithm and best practices</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-pink-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Trending Focus</h3>
            <p className="text-gray-400 text-sm">AI-powered hashtags that focus on current trends and maximum engagement</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Context Aware</h3>
            <p className="text-gray-400 text-sm">Understands your content context to generate highly relevant hashtags</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashtagGenerator;
