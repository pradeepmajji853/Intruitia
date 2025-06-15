import { useState, FormEvent } from 'react';
import { Send, Hash, Users, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

// Interface for form data
interface FormData {
  topic: string;
  platform: string;
  amount: string;
}

// Interface for API response
interface ApiResponse {
  hashtags: string[];
}

const HashtagGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    platform: 'general',
    amount: '10'
  });

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.topic.trim()) {
      setError('Please enter a topic for hashtag generation');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedHashtags([]);

    try {
      // Create prompt based on form data
      const prompt = createPrompt(formData);
      
      // Generate hashtags
      const response = await generateHashtags(prompt);
      setGeneratedHashtags(response.hashtags);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hashtags. Please try again.');
      console.error('Hashtag generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // API-integrated hashtag generation function
  const generateHashtags = async (prompt: string): Promise<ApiResponse> => {
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
        const hashtagText = data.choices[0].message.content;
        const hashtags = extractHashtags(hashtagText);
        return { hashtags };
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
        const hashtagText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!hashtagText) {
          throw new Error('No hashtags generated from Gemini API');
        }
        
        const hashtags = extractHashtags(hashtagText);
        return { hashtags };
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
        const hashtags = extractHashtags(data.response);
        return { hashtags };
      }
    } catch (error) {
      console.error('Hashtag generation error:', error);
      throw error;
    }
  };

  // Extract hashtags from AI response
  const extractHashtags = (text: string): string[] => {
    // Remove extra text and extract hashtags
    const hashtagMatches = text.match(/#[\w\d_]+/g);
    if (hashtagMatches) {
      return hashtagMatches;
    }
    
    // If no hashtags found with #, try to extract words and add #
    const words = text.split(/[\s,\n]+/).filter(word => word.trim().length > 0);
    return words.slice(0, parseInt(formData.amount)).map(word => {
      const cleanWord = word.replace(/[^\w\d]/g, '');
      return cleanWord ? `#${cleanWord}` : '';
    }).filter(tag => tag.length > 1);
  };

  // Create prompt based on form data
  const createPrompt = (data: FormData): string => {
    let prompt = `Generate ${data.amount} trending hashtags for "${data.topic}"`;
    
    if (data.platform !== 'general') {
      prompt += ` specifically for ${data.platform}`;
    }
    
    prompt += '. Make them relevant, popular, and effective for maximum reach and engagement. Return only the hashtags with # symbol, separated by spaces.';
    
    return prompt;
  };

  // Platform options for dropdown
  const platformOptions = [
    { value: 'general', label: 'General' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Twitter', label: 'Twitter/X' },
    { value: 'LinkedIn', label: 'LinkedIn' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'YouTube', label: 'YouTube' }
  ];

  // Amount options for dropdown
  const amountOptions = [
    { value: '5', label: '5 hashtags' },
    { value: '10', label: '10 hashtags' },
    { value: '15', label: '15 hashtags' },
    { value: '20', label: '20 hashtags' },
    { value: '30', label: '30 hashtags' }
  ];

  // Copy to clipboard functionality
  const copyToClipboard = () => {
    if (generatedHashtags.length > 0) {
      const hashtagText = generatedHashtags.join(' ');
      navigator.clipboard.writeText(hashtagText);
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Hashtag Generator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Generate trending, relevant hashtags to maximize your social media reach and engagement
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <Hash className="w-5 h-5 mr-2 text-indigo-600" />
              Hashtag Parameters
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
                  Topic or Content Theme *
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Digital Marketing, Fashion, Fitness, Technology"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Platform Selection */}
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-300 mb-1">
                  Target Platform
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

              {/* Amount Selection */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
                  Number of Hashtags
                </label>
                <select
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  {amountOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
                    Generate Hashtags
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
                    Our AI analyzes trending hashtags and generates relevant tags that will help increase 
                    your content's visibility and engagement on social media platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-8 relative">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
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
