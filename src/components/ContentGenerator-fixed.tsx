import { useState, FormEvent } from 'react';
import { Send, Type, Users, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

// Define the content types available
type ContentType = 'Blog Post' | 'LinkedIn Post' | 'Tweet' | 'Instagram Caption';

// Interface for form data
interface FormData {
  topic: string;
  audience: string;
  tone: string;
  contentType: ContentType;
}

// Interface for API response
interface ApiResponse {
  content: string;
}

const ContentGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    audience: '',
    tone: '',
    contentType: 'Blog Post'
  });

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
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
      setError('Please enter a topic for your content');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      // Create prompt based on form data
      const prompt = createPrompt(formData);
      
      // Generate content
      const response = await generateContent(prompt);
      setGeneratedContent(response.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content. Please try again.');
      console.error('Content generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // API-integrated content generation function
  const generateContent = async (prompt: string): Promise<ApiResponse> => {
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
            max_tokens: 500
          })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error('OpenAI API error:', errorData);
          throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        return { content: data.choices[0].message.content };
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
              maxOutputTokens: 500,
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Gemini API error:', errorData);
          throw new Error(`API error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!content) {
          throw new Error('No content generated from Gemini API');
        }
        
        return { content };
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
        return { content: data.response };
      }
    } catch (error) {
      console.error('Content generation error:', error);
      throw error;
    }
  };

  // Create prompt based on form data
  const createPrompt = (data: FormData): string => {
    let prompt = `Write a ${data.contentType.toLowerCase()} about "${data.topic}"`;
    
    if (data.audience) {
      prompt += ` for ${data.audience}`;
    }
    
    if (data.tone) {
      prompt += ` in a ${data.tone} tone`;
    }
    
    // Add specific instructions based on content type
    switch (data.contentType) {
      case 'Blog Post':
        prompt += '. Include an engaging introduction, main points with examples, and a compelling conclusion. Make it SEO-friendly and informative.';
        break;
      case 'LinkedIn Post':
        prompt += '. Make it professional, engaging, and include relevant hashtags. Keep it concise but impactful.';
        break;
      case 'Tweet':
        prompt += '. Keep it under 280 characters, make it engaging and include relevant hashtags.';
        break;
      case 'Instagram Caption':
        prompt += '. Make it engaging, include relevant emojis and hashtags. Focus on visual storytelling.';
        break;
    }
    
    return prompt;
  };

  // Content type options for dropdown
  const contentTypeOptions: ContentType[] = ['Blog Post', 'LinkedIn Post', 'Tweet', 'Instagram Caption'];

  // Tone options for dropdown
  const toneOptions = [
    { value: '', label: 'Select tone...' },
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
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">AI Content Generator</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create high-quality, engaging content for your blogs, social media, and marketing campaigns with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <Type className="w-5 h-5 mr-2 text-indigo-600" />
              Content Parameters
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
                  Topic or Subject *
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Content Marketing, Data Analytics, Brand Storytelling"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Audience Input */}
              <div>
                <label htmlFor="audience" className="block text-sm font-medium text-gray-300 mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  placeholder="e.g., Small business owners, Marketing professionals, Students"
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>

              {/* Content Type Selection */}
              <div>
                <label htmlFor="contentType" className="block text-sm font-medium text-gray-300 mb-1">
                  Content Type
                </label>
                <select
                  id="contentType"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                >
                  {contentTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
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
                    Generate Content
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
                    Our AI analyzes your requirements and creates compelling content tailored to your audience, 
                    tone, and platform. Perfect for blogs, social media, and marketing campaigns.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-8 relative">
            <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
              Generated Content
            </h2>

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                <p className="text-gray-300">Creating your content...</p>
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
            {generatedContent && !isLoading && !error && (
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
                  <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">{generatedContent}</div>
                </div>
              </div>
            )}

            {/* Default State */}
            {!generatedContent && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                <MessageSquare className="w-12 h-12 text-gray-500 mb-4" />
                <p className="text-gray-400 text-center">
                  Fill out the form and click "Generate Content" to create your AI-powered content
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Type className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Content Types</h3>
            <p className="text-gray-400">Generate blogs, social posts, tweets, and captions tailored for each platform.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Audience Targeting</h3>
            <p className="text-gray-400">Content crafted specifically for your target audience and business goals.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tone Customization</h3>
            <p className="text-gray-400">Choose from multiple tones to match your brand voice and messaging style.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
