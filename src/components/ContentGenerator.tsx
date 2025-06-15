import { useState, FormEvent } from 'react';
import { Send, Type, Users, MessageSquare, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ErrorDisplay from './ErrorDisplay';

// Define the content types available
type ContentType = 'Blog Post' | 'LinkedIn Post' | 'Tweet' | 'Instagram Caption';

// Interface for form data
interface FormData {
  topic: string;
  audience: string;
  tone: string;
  contentType: ContentType;
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

  // Generate content using Gemini
  const generateContent = async () => {
    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      let result;
      
      switch (formData.contentType) {
        case 'Blog Post':
          result = await geminiService.generateBlogPost(formData.topic, formData.audience, formData.tone);
          if (result.error) {
            setError(result.error);
          } else {
            setGeneratedContent(result.content);
          }
          break;
        case 'LinkedIn Post':
          const linkedinContent = await geminiService.generateSocialMediaPost({
            topic: formData.topic,
            platform: 'LinkedIn',
            tone: formData.tone || 'professional',
            audience: formData.audience,
            includeEmojis: false,
            includeCallToAction: true
          });
          setGeneratedContent(linkedinContent);
          break;
        case 'Tweet':
          const twitterContent = await geminiService.generateSocialMediaPost({
            topic: formData.topic,
            platform: 'Twitter',
            tone: formData.tone || 'casual',
            audience: formData.audience,
            includeEmojis: true,
            includeCallToAction: true
          });
          setGeneratedContent(twitterContent);
          break;
        case 'Instagram Caption':
          const instagramContent = await geminiService.generateSocialMediaPost({
            topic: formData.topic,
            platform: 'Instagram',
            tone: formData.tone || 'casual',
            audience: formData.audience,
            includeEmojis: true,
            includeCallToAction: true
          });
          setGeneratedContent(instagramContent);
          break;
        default:
          result = await geminiService.generateBlogPost(formData.topic, formData.audience, formData.tone);
          if (result.error) {
            setError(result.error);
          } else {
            setGeneratedContent(result.content);
          }
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
      setError('Please enter a topic');
      return;
    }

    generateContent();
  };

  // Copy content to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e1a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-semibold mb-4">
            <Type className="w-4 h-4 mr-2" />
            AI Content Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Create Amazing Content with AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Generate high-quality blog posts, social media content, and marketing copy using advanced AI technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-400" />
                Content Details
              </h2>
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
                  placeholder="e.g., How to start a successful startup"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="contentType" className="block text-sm font-semibold text-gray-300 mb-2">
                  Content Type
                </label>
                <select
                  id="contentType"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Blog Post">Blog Post</option>
                  <option value="LinkedIn Post">LinkedIn Post</option>
                  <option value="Tweet">Tweet</option>
                  <option value="Instagram Caption">Instagram Caption</option>
                </select>
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-semibold text-gray-300 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  id="audience"
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  placeholder="e.g., entrepreneurs, small business owners"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  <option value="">Select tone...</option>
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="authoritative">Authoritative</option>
                  <option value="conversational">Conversational</option>
                  <option value="enthusiastic">Enthusiastic</option>
                </select>
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
                    Generate Content
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Output */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Users className="w-6 h-6 mr-3 text-purple-400" />
                Generated Content
              </h2>
              {generatedContent && (
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
                <ErrorDisplay 
                  error={error}
                  onRetry={generateContent}
                />
              )}

              {generatedContent ? (
                <div className="space-y-4">
                  <div className="prose prose-invert max-w-none">
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                          <Type className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-400">{formData.contentType}</span>
                      </div>
                      <div className="text-white leading-relaxed whitespace-pre-wrap">{generatedContent}</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-blue-200 font-medium mb-1">Content Generated Successfully!</p>
                        <p className="text-blue-300/80 text-sm">
                          Your {(formData.contentType || 'content').toLowerCase()} is ready to use. Feel free to edit and customize it further.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                  <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No content generated yet</p>
                  <p className="text-sm">Fill out the form and click "Generate Content" to create your content</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Type className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Content Types</h3>
            <p className="text-gray-400 text-sm">Generate blog posts, social media content, and more with one tool</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Audience Focused</h3>
            <p className="text-gray-400 text-sm">Content tailored to your specific target audience and goals</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Tone Customizable</h3>
            <p className="text-gray-400 text-sm">Choose from various tones to match your brand voice</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
