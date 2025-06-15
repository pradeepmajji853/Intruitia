import { useState, FormEvent } from 'react';
import { Send, MessageCircle, Users, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

// Interface for form data
interface FormData {
  topic: string;
  platform: string;
  tone: string;
  includeEmojis: boolean;
  includeCallToAction: boolean;
}

// Interface for API response
interface ApiResponse {
  caption: string;
}

const SocialMediaCaption = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    platform: 'general',
    tone: 'professional',
    includeEmojis: false,
    includeCallToAction: false
  });

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedCaption, setGeneratedCaption] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      setError('Please enter a topic for your caption');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedCaption('');

    try {
      // Create prompt based on form data
      const prompt = createPrompt(formData);
      
      // Generate caption
      const response = await generateCaption(prompt);
      setGeneratedCaption(response.caption);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate caption. Please try again.');
      console.error('Caption generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // API-integrated caption generation function
  const generateCaption = async (prompt: string): Promise<ApiResponse> => {
    try {
      const aiProvider = import.meta.env.VITE_AI_PROVIDER || 'openai';
      
      // Use OpenAI API
      if (aiProvider === 'openai') {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 200
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('OpenAI API error:', errorData);
          throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        return { caption: data.choices[0].message.content };
      } 
      // Use Google Gemini API
      else if (aiProvider === 'gemini') {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 200,
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Gemini API error:', errorData);
          throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const caption = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!caption) {
          throw new Error('No caption generated from Gemini API');
        }
        
        return { caption };
      }
      // Use local LLM (Ollama)
      else {
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3.2',
            prompt: prompt,
            stream: false,
          })
        });

        if (!response.ok) {
          throw new Error(`Local API error: ${response.statusText}`);
        }

        const data = await response.json();
        return { caption: data.response };
      }
    } catch (error) {
      console.error('Caption generation error:', error);
      throw error;
    }
  };

  // Create prompt based on form data
  const createPrompt = (data: FormData): string => {
    let prompt = `Create a compelling social media caption about "${data.topic}"`;
    
    if (data.platform !== 'general') {
      prompt += ` for ${data.platform}`;
    }
    
    prompt += ` in a ${data.tone} tone`;
    
    if (data.includeEmojis) {
      prompt += '. Include relevant emojis';
    }
    
    if (data.includeCallToAction) {
      prompt += '. Include a strong call-to-action';
    }
    
    prompt += '. Make it engaging and optimized for maximum engagement.';
    
    return prompt;
  };

  // Platform options for dropdown
  const platformOptions = [
    { value: 'general', label: 'General' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'pinterest', label: 'Pinterest' }
  ];

  // Tone options for dropdown
  const toneOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'excited', label: 'Excited' },
    { value: 'humorous', label: 'Humorous' },
    { value: 'inspirational', label: 'Inspirational' },
    { value: 'informative', label: 'Informative' },
    { value: 'urgent', label: 'Urgent' }
  ];

  // Copy to clipboard functionality
  const copyToClipboard = () => {
    if (generatedCaption) {
      navigator.clipboard.writeText(generatedCaption);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen py-20 mt-16 bg-gradient-to-b from-gray-900 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Social Media Caption Generator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create engaging captions for your social media posts that drive engagement and conversions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-indigo-600" />
              Caption Parameters
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
                  Topic or Content Description *
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  placeholder="e.g., New Product Launch, Remote Work, Summer Collection"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Platform Selection */}
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">
                  Social Media Platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  {platformOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Tone Selection */}
              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-1">
                  Tone & Style
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  {toneOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeEmojis"
                    name="includeEmojis"
                    checked={formData.includeEmojis}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="includeEmojis" className="ml-2 block text-sm text-gray-300">
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
                    className="w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="includeCallToAction" className="ml-2 block text-sm text-gray-300">
                    Include call-to-action
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.topic.trim()}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Generate Caption
                  </>
                )}
              </button>
            </form>

            {/* Information Panel */}
            <div className="mt-8 bg-indigo-900/30 rounded-lg p-4">
              <div className="flex items-start">
                <Users className="w-5 h-5 text-indigo-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-indigo-300">How it works</h3>
                  <p className="mt-1 text-sm text-indigo-200">
                    Our AI analyzes your topic, platform, and tone preferences to create engaging captions 
                    that resonate with your audience and drive meaningful engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-8 relative">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
              Generated Caption
            </h2>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-300">Crafting your engaging caption...</p>
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="bg-red-900/20 border-red-700 border rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
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
                  <span className="text-sm text-gray-400">Click to copy</span>
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
                        Copy
                      </>
                    )}
                  </button>
                </div>
                
                <div className="prose prose-invert max-w-none mt-2 p-6 rounded-lg border border-gray-700 bg-gray-700/30">
                  <p className="text-gray-200 leading-relaxed">{generatedCaption}</p>
                </div>
              </div>
            )}

            {/* Default State */}
            {!generatedCaption && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                <MessageCircle className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-gray-400 text-center">
                  Fill out the form and click "Generate Caption" to create your social media content
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
            <p className="text-gray-400">Captions tailored for each social media platform's unique audience and style.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tone Matching</h3>
            <p className="text-gray-400">Choose from multiple tones to match your brand voice and campaign goals.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Engagement Focused</h3>
            <p className="text-gray-400">AI-powered captions designed to maximize likes, comments, and shares.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCaption;
