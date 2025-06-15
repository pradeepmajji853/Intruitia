import { useState, FormEvent, useEffect } from 'react';
import { Send, MessageCircle, Users, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

// Interface for form data
interface FormData {
  topic: string;
  platform: string;
  tone: string;
  includeEmojis: boolean;
  includeCallToAction: boolean;
  targetAudience: string;
}

const SocialMediaCaption = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    platform: 'Instagram',
    tone: 'professional',
    includeEmojis: false,
    includeCallToAction: false,
    targetAudience: ''
  });

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean>(false);

  useEffect(() => {
    setIsApiKeyConfigured(geminiService.isConfigured());
  }, []);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Generate social media caption
  const generateCaption = async () => {
    if (!geminiService.isConfigured()) {
      setShowApiKeyModal(true);
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedCaption('');

    try {
      // Create enhanced prompt for better captions
      let prompt = `Create a ${formData.tone} social media caption for ${formData.platform} about "${formData.topic}"`;
      
      if (formData.targetAudience) {
        prompt += ` targeting ${formData.targetAudience}`;
      }

      prompt += `.\n\nRequirements:\n`;
      
      // Platform-specific requirements
      switch (formData.platform) {
        case 'Instagram':
          prompt += `- Optimized for Instagram (engaging, visual storytelling)\n`;
          prompt += `- Include relevant hashtags\n`;
          break;
        case 'Twitter':
          prompt += `- Keep under 280 characters\n`;
          prompt += `- Twitter/X optimized style\n`;
          break;
        case 'LinkedIn':
          prompt += `- Professional tone suitable for LinkedIn\n`;
          prompt += `- Focus on thought leadership\n`;
          break;
        case 'Facebook':
          prompt += `- Facebook-optimized format\n`;
          prompt += `- Community-focused approach\n`;
          break;
        case 'TikTok':
          prompt += `- TikTok style caption\n`;
          prompt += `- Engaging and trendy\n`;
          break;
      }

      if (formData.includeEmojis) {
        prompt += `- Include relevant emojis naturally\n`;
      }

      if (formData.includeCallToAction) {
        prompt += `- Include a compelling call-to-action\n`;
      }

      prompt += `- Make it engaging and shareable\n`;
      prompt += `- Ensure the tone is ${formData.tone}`;

      const result = await geminiService.generateSocialMediaPost(formData.platform, formData.topic, formData.tone);

      if (result.error) {
        setError(result.error);
      } else {
        setGeneratedCaption(result.content);
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
      setError('Please enter a topic for your caption');
      return;
    }

    generateCaption();
  };

  // Copy caption to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy caption: ', err);
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
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold mb-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            AI Social Media Caption Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Create Engaging Social Media Captions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Generate compelling captions that drive engagement across all social media platforms
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-400" />
                Caption Details
              </h2>
              {!isApiKeyConfigured && (
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Setup API
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="topic" className="block text-sm font-semibold text-gray-300 mb-2">
                  Topic/Content *
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., new product launch, behind the scenes"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter/X</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="TikTok">TikTok</option>
                </select>
              </div>

              <div>
                <label htmlFor="tone" className="block text-sm font-semibold text-gray-300 mb-2">
                  Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="enthusiastic">Enthusiastic</option>
                  <option value="conversational">Conversational</option>
                  <option value="humorous">Humorous</option>
                  <option value="inspirational">Inspirational</option>
                </select>
              </div>

              <div>
                <label htmlFor="targetAudience" className="block text-sm font-semibold text-gray-300 mb-2">
                  Target Audience (Optional)
                </label>
                <input
                  type="text"
                  id="targetAudience"
                  name="targetAudience"
                  value={formData.targetAudience}
                  onChange={handleChange}
                  placeholder="e.g., young professionals, fitness enthusiasts"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeEmojis"
                    name="includeEmojis"
                    checked={formData.includeEmojis}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="includeEmojis" className="ml-2 text-sm text-gray-300">
                    Include emojis
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeCallToAction"
                    name="includeCallToAction"
                    checked={formData.includeCallToAction}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="includeCallToAction" className="ml-2 text-sm text-gray-300">
                    Include call-to-action
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.topic.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Caption
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
                    <p className="text-yellow-300/80 text-sm">Configure your Gemini API key to enable AI caption generation.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-purple-400" />
                Generated Caption
              </h2>
              {generatedCaption && (
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

              {generatedCaption ? (
                <div className="space-y-4">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-400">{formData.platform} Caption</span>
                    </div>
                    <p className="text-white leading-relaxed whitespace-pre-wrap">{generatedCaption}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium mb-1">Caption Ready!</p>
                        <p className="text-blue-300/80 text-sm">
                          Your caption is optimized for {formData.platform}. Feel free to customize it further before posting.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                  <MessageCircle className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No caption generated yet</p>
                  <p className="text-sm">Fill out the form and click "Generate Caption" to create your social media post</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform Specific</h3>
            <p className="text-gray-400 text-sm">Captions optimized for each platform's unique style and character limits</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Engagement Focused</h3>
            <p className="text-gray-400 text-sm">Designed to maximize likes, comments, and shares on your posts</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tone Customizable</h3>
            <p className="text-gray-400 text-sm">Match your brand voice with customizable tone and style options</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCaption;
