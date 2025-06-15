import { useState, FormEvent, useEffect } from 'react';
import { Send, Search, Globe, Code, Loader2, Copy, CheckCircle2, AlertCircle, Settings } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

// Define content types available
type ContentType = 'Blog Post' | 'Product Page' | 'Service Page' | 'Homepage' | 'Landing Page' | 'Category Page';

// Interface for form data
interface FormData {
  topic: string;
  contentType: ContentType;
  targetKeywords: string;
  description: string;
  industry: string;
  location: string;
}

// Interface for generated SEO content
interface SEOContent {
  title: string;
  metaDescription: string;
  h1: string;
  h2Suggestions: string[];
  keywords: string[];
  htmlMeta: string;
}

const SEOMetaGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    contentType: 'Blog Post',
    targetKeywords: '',
    description: '',
    industry: '',
    location: ''
  });

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seoContent, setSeoContent] = useState<SEOContent | null>(null);
  const [error, setError] = useState<string>('');
  const [copiedSection, setCopiedSection] = useState<string>('');
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

  // Generate SEO content using Gemini
  const generateSEOContent = async () => {
    if (!geminiService.isConfigured()) {
      setShowApiKeyModal(true);
      return;
    }

    if (!formData.topic.trim()) {
      setError('Please enter a topic or page subject');
      return;
    }

    setIsLoading(true);
    setError('');
    setSeoContent(null);

    try {
      const seoData = await geminiService.generateSEOMeta({
        topic: formData.topic,
        contentType: formData.contentType,
        targetKeywords: formData.targetKeywords,
        description: formData.description,
        industry: formData.industry,
        location: formData.location
      });

      if (!seoData || !seoData.title) {
        throw new Error('No SEO content was generated. Please try again.');
      }

      setSeoContent(seoData);
    } catch (error: any) {
      console.error('SEO content generation failed:', error);
      setError(error.message || 'Failed to generate SEO content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateSEOContent();
  };

  // Copy content to clipboard
  const copyToClipboard = async (content: string, section: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(''), 2000);
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
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            SEO Meta Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Generate comprehensive SEO meta tags, titles, descriptions, and keywords to boost your search rankings
          </p>
          
          {/* API Key Setup Button */}
          {!isApiKeyConfigured && (
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg max-w-md mx-auto">
              <div className="flex items-center justify-center text-yellow-400 mb-2">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Setup Required</span>
              </div>
              <p className="text-sm text-yellow-300 mb-3">Configure your Gemini API key to start generating SEO content</p>
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

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Search className="w-6 h-6 mr-3 text-blue-400" />
              Content Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Topic Input */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">
                  Topic/Page Subject *
                </label>
                <input
                  type="text"
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., Best Running Shoes 2024, Digital Marketing Services, React Development Tutorial"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Content Type Selection */}
              <div>
                <label htmlFor="contentType" className="block text-sm font-medium text-gray-300 mb-2">
                  Content Type
                </label>
                <select
                  id="contentType"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Blog Post">Blog Post</option>
                  <option value="Product Page">Product Page</option>
                  <option value="Service Page">Service Page</option>
                  <option value="Homepage">Homepage</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Category Page">Category Page</option>
                </select>
              </div>

              {/* Target Keywords */}
              <div>
                <label htmlFor="targetKeywords" className="block text-sm font-medium text-gray-300 mb-2">
                  Target Keywords
                </label>
                <input
                  type="text"
                  id="targetKeywords"
                  name="targetKeywords"
                  value={formData.targetKeywords}
                  onChange={handleChange}
                  placeholder="e.g., running shoes, best sneakers, athletic footwear"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Content Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief description of your content, product, or service..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Industry */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
                  Industry (Optional)
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g., E-commerce, Healthcare, Technology, Education"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., New York, London, Global, Online"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    Generate SEO Content
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Loading State */}
            {isLoading && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
                  <p className="text-gray-300">Generating SEO-optimized content...</p>
                </div>
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
            {seoContent && !isLoading && !error && (
              <>
                {/* Title */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-blue-400" />
                      SEO Title
                    </h3>
                    <button
                      onClick={() => copyToClipboard(seoContent.title, 'title')}
                      className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {copiedSection === 'title' ? (
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
                  <p className="text-gray-300 bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                    {seoContent.title}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {seoContent.title.length} characters (Recommended: 50-60)
                  </p>
                </div>

                {/* Meta Description */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Search className="w-5 h-5 mr-2 text-green-400" />
                      Meta Description
                    </h3>
                    <button
                      onClick={() => copyToClipboard(seoContent.metaDescription, 'description')}
                      className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {copiedSection === 'description' ? (
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
                  <p className="text-gray-300 bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                    {seoContent.metaDescription}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {seoContent.metaDescription.length} characters (Recommended: 150-160)
                  </p>
                </div>

                {/* H1 Heading */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      H1 Heading
                    </h3>
                    <button
                      onClick={() => copyToClipboard(seoContent.h1, 'h1')}
                      className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {copiedSection === 'h1' ? (
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
                  <p className="text-gray-300 bg-gray-700/30 p-4 rounded-lg border border-gray-600">
                    {seoContent.h1}
                  </p>
                </div>

                {/* H2 Suggestions */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      H2 Heading Suggestions
                    </h3>
                    <button
                      onClick={() => copyToClipboard(seoContent.h2Suggestions.join('\n'), 'h2')}
                      className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {copiedSection === 'h2' ? (
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
                  <div className="space-y-2">
                    {seoContent.h2Suggestions.map((heading, index) => (
                      <div key={index} className="text-gray-300 bg-gray-700/30 p-3 rounded-lg border border-gray-600">
                        {heading}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Recommended Keywords
                    </h3>
                    <button
                      onClick={() => copyToClipboard(seoContent.keywords.join(', '), 'keywords')}
                      className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {copiedSection === 'keywords' ? (
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
                  <div className="flex flex-wrap gap-2">
                    {seoContent.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-sm bg-purple-600/20 text-purple-200 border border-purple-500/30"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* HTML Meta Tags */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Code className="w-5 h-5 mr-2 text-orange-400" />
                      HTML Meta Tags
                    </h3>
                    <button
                      onClick={() => copyToClipboard(seoContent.htmlMeta, 'html')}
                      className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {copiedSection === 'html' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy HTML
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="text-gray-300 bg-gray-900/50 p-4 rounded-lg border border-gray-600 text-sm overflow-x-auto">
                    <code>{seoContent.htmlMeta}</code>
                  </pre>
                </div>
              </>
            )}

            {/* Default State */}
            {!seoContent && !isLoading && !error && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                  <Search className="w-12 h-12 text-gray-500 mb-4" />
                  <p className="text-gray-400 text-center">
                    Fill out the form and click "Generate SEO Content" to create optimized meta tags and content structure
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Search Optimized</h3>
            <p className="text-gray-400">Content optimized for search engines with proper keyword placement and structure.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Complete Meta Tags</h3>
            <p className="text-gray-400">Full set of meta tags including title, description, and ready-to-use HTML code.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-600 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Developer Ready</h3>
            <p className="text-gray-400">Copy-paste HTML meta tags and structured content suggestions for easy implementation.</p>
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

export default SEOMetaGenerator;