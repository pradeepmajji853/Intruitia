import { useState, FormEvent } from 'react';
import { Send, MessageCircle, Users, MessageSquare, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

// Define the platforms available
type Platform = 'Instagram' | 'Twitter' | 'LinkedIn' | 'Facebook' | 'TikTok' | 'General';
type Tone = 'Professional' | 'Casual' | 'Funny' | 'Inspirational' | 'Educational' | 'Promotional';

// Interface for form data
interface FormData {
  topic: string;
  platform: Platform;
  tone: Tone;
  audience: string;
  includeEmojis: boolean;
  includeCallToAction: boolean;
  callToActionText: string;
}

const SocialMediaCaption = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    platform: 'Instagram',
    tone: 'Professional',
    audience: '',
    includeEmojis: true,
    includeCallToAction: false,
    callToActionText: ''
  });

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

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

  // Generate caption using Gemini
  const generateCaption = async () => {
    if (!formData.topic.trim()) {
      setError('Please enter a topic for your caption');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedCaption('');

    try {
      const caption = await geminiService.generateSocialMediaPost({
        topic: formData.topic,
        platform: formData.platform,
        tone: formData.tone,
        audience: formData.audience,
        includeEmojis: formData.includeEmojis,
        includeCallToAction: formData.includeCallToAction,
        callToActionText: formData.callToActionText
      });

      if (!caption || caption.trim() === '') {
        throw new Error('No caption was generated. Please try again.');
      }

      setGeneratedCaption(caption);
    } catch (error: any) {
      console.error('Caption generation failed:', error);
      setError(error.message || 'Failed to generate caption. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateCaption();
  };

  // Copy caption to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Get platform character limit info
  const getCharacterLimit = (platform: Platform): string => {
    switch (platform) {
      case 'Twitter': return '280 characters';
      case 'Instagram': return '2,200 characters';
      case 'LinkedIn': return '3,000 characters';
      case 'Facebook': return '63,206 characters';
      case 'TikTok': return '300 characters';
      default: return 'No specific limit';
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Social Media Caption Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Create engaging, platform-optimized captions that boost your social media presence and drive engagement
          </p>
          
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MessageCircle className="w-6 h-6 mr-3 text-blue-400" />
              Caption Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                  Topic/Content *
                </label>
                <textarea
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  rows={3}
                  placeholder="e.g., New product launch, Behind-the-scenes content, Motivational quote, Tutorial announcement..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
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
                  <option value="Instagram">Instagram ({getCharacterLimit('Instagram')})</option>
                  <option value="Twitter">Twitter/X ({getCharacterLimit('Twitter')})</option>
                  <option value="LinkedIn">LinkedIn ({getCharacterLimit('LinkedIn')})</option>
                  <option value="Facebook">Facebook ({getCharacterLimit('Facebook')})</option>
                  <option value="TikTok">TikTok ({getCharacterLimit('TikTok')})</option>
                  <option value="General">General ({getCharacterLimit('General')})</option>
                </select>
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
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Funny">Funny</option>
                  <option value="Inspirational">Inspirational</option>
                  <option value="Educational">Educational</option>
                  <option value="Promotional">Promotional</option>
                </select>
              </div>

              {/* Target Audience */}
              <div>
                <label htmlFor="audience" className="block text-sm font-medium text-gray-300 mb-2">
                  Target Audience (Optional)
                </label>
                <input
                  type="text"
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  placeholder="e.g., Young professionals, Fitness enthusiasts, Tech startups..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Options */}
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
                  <label htmlFor="includeEmojis" className="ml-3 text-sm text-gray-300">
                    Include emojis 😊
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
                  <label htmlFor="includeCallToAction" className="ml-3 text-sm text-gray-300">
                    Include call-to-action
                  </label>
                </div>

                {/* CTA Text Input */}
                {formData.includeCallToAction && (
                  <div className="ml-7">
                    <input
                      type="text"
                      id="callToActionText"
                      name="callToActionText"
                      value={formData.callToActionText}
                      onChange={handleChange}
                      placeholder="e.g., Visit our website, Follow for more, Link in bio..."
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.topic.trim()}
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
                    Generate Caption
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
              Generated Caption
            </h2>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-300">Crafting the perfect caption...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-red-900/20 border-red-700 border rounded-lg p-4 flex items-start">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400 font-bold">!</div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-400">Generation Failed</h3>
                  <p className="mt-1 text-sm text-red-300">{error}</p>
                </div>
              </div>
            )}

            {/* Success State */}
            {generatedCaption && !isLoading && !error && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {generatedCaption.length} characters
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
                        Copy Caption
                      </>
                    )}
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <div className="p-6 rounded-lg border border-gray-700 bg-gray-700/30 text-gray-200 whitespace-pre-wrap">
                    {generatedCaption}
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-400">
                  <p>💡 <strong>Tip:</strong> Review and customize the caption to match your brand voice before posting.</p>
                </div>
              </div>
            )}

            {/* Default State */}
            {!generatedCaption && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                <MessageCircle className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-gray-400 text-center">
                  Fill out the form and click "Generate Caption" to create your engaging social media post
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Platform Optimized</h3>
            <p className="text-gray-400">Captions tailored for each platform's character limits and best practices.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Audience Targeted</h3>
            <p className="text-gray-400">Content customized for your specific audience and brand voice.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Engagement Focused</h3>
            <p className="text-gray-400">Designed to maximize likes, comments, shares, and overall engagement.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCaption;