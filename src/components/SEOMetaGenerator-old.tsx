import { useState, FormEvent } from 'react';
import { Send, Globe, FileText, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

// Interface for form data
interface FormData {
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  platform: string;
}

// Interface for API response
interface ApiResponse {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
}

const SEOMetaGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    pageTitle: '',
    pageDescription: '',
    keywords: '',
    platform: 'Website'
  });

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedMeta, setGeneratedMeta] = useState<ApiResponse | null>(null);
  const [copied, setCopied] = useState(false);

  // Platform options
  const platformOptions = [
    'Website',
    'E-commerce',
    'Blog',
    'News',
    'Portfolio',
    'Business',
    'Educational',
    'Non-profit'
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCopied(false);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate optimized SEO meta data
      const keywordList = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
      
      // Create SEO-optimized title (under 60 characters)
      let optimizedTitle = formData.pageTitle;
      if (optimizedTitle.length > 55) {
        optimizedTitle = optimizedTitle.substring(0, 52) + '...';
      }
      
      // Create SEO-optimized description (under 160 characters)
      let optimizedDescription = formData.pageDescription;
      if (optimizedDescription.length > 155) {
        optimizedDescription = optimizedDescription.substring(0, 152) + '...';
      }
      
      // Generate mock SEO response
      const mockResponse: ApiResponse = {
        title: optimizedTitle,
        description: optimizedDescription,
        keywords: keywordList.slice(0, 10), // Limit to 10 keywords
        ogTitle: optimizedTitle,
        ogDescription: optimizedDescription
      };
      
      setGeneratedMeta(mockResponse);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to generate SEO meta tags. Please try again later.';
      setError(errorMessage);
      console.error('SEO generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate meta tags HTML
  const generateMetaHTML = () => {
    if (!generatedMeta) return '';
    
    return `<!-- Primary Meta Tags -->
<title>${generatedMeta.title}</title>
<meta name="title" content="${generatedMeta.title}" />
<meta name="description" content="${generatedMeta.description}" />
<meta name="keywords" content="${generatedMeta.keywords.join(', ')}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://yourdomain.com/" />
<meta property="og:title" content="${generatedMeta.ogTitle}" />
<meta property="og:description" content="${generatedMeta.ogDescription}" />
<meta property="og:image" content="https://yourdomain.com/images/og-image.jpg" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://yourdomain.com/" />
<meta property="twitter:title" content="${generatedMeta.ogTitle}" />
<meta property="twitter:description" content="${generatedMeta.ogDescription}" />
<meta property="twitter:image" content="https://yourdomain.com/images/twitter-image.jpg" />`;
  };

  // Copy to clipboard functionality
  const copyToClipboard = async () => {
    const metaHTML = generateMetaHTML();
    if (metaHTML) {
      try {
        await navigator.clipboard.writeText(metaHTML);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = metaHTML;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-900 py-20 mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            SEO Meta Generator
          </h1>
          <p className="text-lg text-gray-300">
            Generate optimized meta tags to improve your website's search engine visibility
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800 border border-white/10 rounded-2xl shadow-lg p-8">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-400" />
              Page Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  name="pageTitle"
                  value={formData.pageTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Best AI Tools for Content Creation"
                  maxLength={60}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.pageTitle.length}/60 characters (recommended)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Page Description *
                </label>
                <textarea
                  name="pageDescription"
                  value={formData.pageDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="e.g., Discover powerful AI tools that help content creators generate high-quality content faster and more efficiently."
                  maxLength={160}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  {formData.pageDescription.length}/160 characters (recommended)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Keywords *
                </label>
                <textarea
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="e.g., AI tools, content creation, automation, productivity, marketing"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Separate keywords with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Platform Type *
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {platformOptions.map(platform => (
                    <option key={platform} value={platform} className="bg-gray-700 text-white">
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.pageTitle || !formData.pageDescription || !formData.keywords}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate Meta Tags
                  </>
                )}
              </button>
            </form>

            {/* Information Panel */}
            <div className="mt-8 bg-blue-900/30 border border-blue-800/50 rounded-lg p-6">
              <div className="flex items-start">
                <Globe className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-300">SEO Best Practices</h3>
                  <p className="text-sm text-blue-300 mt-1">
                    Keep titles under 60 characters and descriptions under 160 characters for optimal search engine display.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gray-800 border border-white/10 rounded-2xl shadow-lg p-8 relative">
            <h2 className="text-white text-xl font-semibold mb-6 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-400" />
              Generated Meta Tags
            </h2>

            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-400 text-center">
                  Generating optimized SEO meta tags...
                </p>
              </div>
            )}

            {error && !isLoading && (
              <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-400">Generation Failed</h3>
                  <p className="text-sm text-red-300 mt-1">{error}</p>
                </div>
              </div>
            )}

            {generatedMeta && !isLoading && (
              <div className="space-y-6">
                <div className="absolute top-0 right-0">
                  <button
                    onClick={copyToClipboard}
                    className="mt-8 mr-8 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                    title="Copy HTML to clipboard"
                  >
                    {copied ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <Copy className="w-5 h-5 text-gray-400 group-hover:text-white" />
                    )}
                  </button>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Title Tag</h3>
                    <p className="text-white font-medium">{generatedMeta.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {generatedMeta.title.length} characters
                    </p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Meta Description</h3>
                    <p className="text-gray-300">{generatedMeta.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {generatedMeta.description.length} characters
                    </p>
                  </div>

                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {generatedMeta.keywords.map((keyword, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* HTML Code */}
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">HTML Meta Tags</h3>
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap overflow-x-auto">
                    {generateMetaHTML()}
                  </pre>
                </div>

                <div className="mt-4 text-sm">
                  <p className="text-gray-400">
                    Generated for {formData.platform} • {generatedMeta.keywords.length} keywords
                  </p>
                </div>
              </div>
            )}

            {!generatedMeta && !isLoading && !error && (
              <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-600 rounded-lg">
                <Globe className="w-12 h-12 mb-4 text-gray-500" />
                <p className="text-gray-400 text-center">
                  Your optimized meta tags will appear here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SEO Optimized</h3>
            <p className="text-gray-400">
              Automatically optimized for search engine guidelines and best practices.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ready to Use</h3>
            <p className="text-gray-400">
              Copy and paste the generated HTML directly into your website's head section.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Social Media Ready</h3>
            <p className="text-gray-400">
              Includes Open Graph and Twitter Card meta tags for social sharing optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOMetaGenerator;
