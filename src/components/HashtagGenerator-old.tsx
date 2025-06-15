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

// Interface for API response
interface ApiResponse {
  hashtags: string[];
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

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseInt(value) || 0 : value
    }));
  };

  // API call functions
  const callOpenAI = async (prompt: string): Promise<string[]> => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';
    return parseHashtags(content);
  };

  const callGemini = async (prompt: string): Promise<string[]> => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API key not configured');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return parseHashtags(content);
  };

  const callLocalAPI = async (prompt: string): Promise<string[]> => {
    const response = await fetch('/api/generate-hashtags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Local API error: ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    return data.hashtags;
  };

  // Parse hashtags from API response
  const parseHashtags = (content: string): string[] => {
    const hashtagRegex = /#[\w\d_]+/g;
    const matches = content.match(hashtagRegex) || [];
    
    // If no hashtags found with #, try to extract words and add #
    if (matches.length === 0) {
      const words = content.split(/[\s,\n]+/).filter(word => word.length > 0);
      return words.slice(0, formData.amount).map(word => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        return cleanWord ? `#${cleanWord}` : '';
      }).filter(Boolean);
    }
    
    return matches.slice(0, formData.amount);
  };

  // Generate hashtags prompt
  const generatePrompt = (data: FormData): string => {
    let prompt = `Generate ${data.amount} trending hashtags for "${data.topic}"`;
    
    if (data.platform !== 'General') {
      prompt += ` specifically for ${data.platform}`;
    }
    
    if (data.description) {
      prompt += `. Additional context: ${data.description}`;
    }

    prompt += `. Return only hashtags with # symbol, one per line. Focus on trending, relevant, and engaging hashtags that will maximize reach and engagement.`;

    // Add platform-specific guidelines
    switch (data.platform) {
      case 'Instagram':
        prompt += ' Include a mix of popular, niche, and branded hashtags suitable for Instagram.';
        break;
      case 'Twitter':
        prompt += ' Keep hashtags concise and trending for Twitter/X.';
        break;
      case 'LinkedIn':
        prompt += ' Focus on professional and industry-relevant hashtags for LinkedIn.';
        break;
      case 'TikTok':
        prompt += ' Include viral and trend-focused hashtags popular on TikTok.';
        break;
      case 'YouTube':
        prompt += ' Include discovery-focused hashtags suitable for YouTube content.';
        break;
    }

    return prompt;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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
      const prompt = generatePrompt(formData);
      let hashtags: string[] = [];

      // Try different API endpoints in order of preference
      try {
        hashtags = await callOpenAI(prompt);
      } catch (openAIError) {
        console.log('OpenAI failed, trying Gemini:', openAIError);
        try {
          hashtags = await callGemini(prompt);
        } catch (geminiError) {
          console.log('Gemini failed, trying local API:', geminiError);
          hashtags = await callLocalAPI(prompt);
        }
      }

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
    </div>
  );
};

export default HashtagGenerator;