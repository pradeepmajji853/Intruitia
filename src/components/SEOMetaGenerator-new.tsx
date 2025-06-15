import { useState, FormEvent, useEffect } from 'react';
import { Send, Globe, FileText, MessageSquare, Loader2, Copy, CheckCircle2, AlertCircle, Settings, Search } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

// Interface for form data
interface FormData {
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  platform: string;
  businessType: string;
}

// Interface for parsed meta data
interface MetaData {
  title: string;
  description: string;
  h1: string;
  h2Options: string[];
  keywords: string[];
}

const SEOMetaGenerator = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    pageTitle: '',
    pageDescription: '',
    keywords: '',
    platform: 'Website',
    businessType: ''
  });

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedMeta, setGeneratedMeta] = useState<MetaData | null>(null);
  const [copied, setCopied] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState<boolean>(false);

  useEffect(() => {
    setIsApiKeyConfigured(geminiService.isConfigured());
  }, []);

  // Platform options
  const platformOptions = [
    'Website',
    'E-commerce',
    'Blog',
    'News',
    'Portfolio',
    'Business',
    'Educational',
    'Non-profit',
    'SaaS',
    'Healthcare'
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Parse generated SEO meta content
  const parseSEOContent = (content: string): MetaData => {
    const lines = content.split('\n').filter(line => line.trim());
    const metaData: MetaData = {
      title: '',
      description: '',
      h1: '',
      h2Options: [],
      keywords: []
    };

    let currentSection = '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.toLowerCase().includes('title')) {
        currentSection = 'title';
        const titleMatch = trimmedLine.match(/title[:\-]?\s*(.+)/i);
        if (titleMatch) {
          metaData.title = titleMatch[1].replace(/['"]/g, '');
        }
      } else if (trimmedLine.toLowerCase().includes('description')) {
        currentSection = 'description';
        const descMatch = trimmedLine.match(/description[:\-]?\s*(.+)/i);
        if (descMatch) {
          metaData.description = descMatch[1].replace(/['"]/g, '');
        }
      } else if (trimmedLine.toLowerCase().includes('h1')) {
        currentSection = 'h1';
        const h1Match = trimmedLine.match(/h1[:\-]?\s*(.+)/i);
        if (h1Match) {
          metaData.h1 = h1Match[1].replace(/['"]/g, '');
        }
      } else if (trimmedLine.toLowerCase().includes('h2')) {
        currentSection = 'h2';
        const h2Match = trimmedLine.match(/h2[:\-]?\s*(.+)/i);
        if (h2Match) {
          metaData.h2Options.push(h2Match[1].replace(/['"]/g, ''));
        }
      } else if (trimmedLine.toLowerCase().includes('keyword')) {
        currentSection = 'keywords';
        const keywordMatch = trimmedLine.match(/keyword[s]?[:\-]?\s*(.+)/i);
        if (keywordMatch) {
          const keywords = keywordMatch[1].split(',').map(k => k.trim().replace(/['"]/g, ''));
          metaData.keywords.push(...keywords);
        }
      } else if (currentSection === 'h2' && trimmedLine.startsWith('-')) {
        metaData.h2Options.push(trimmedLine.substring(1).trim());
      } else if (currentSection === 'keywords' && (trimmedLine.startsWith('-') || trimmedLine.includes(','))) {
        const keywords = trimmedLine.replace(/^-\s*/, '').split(',').map(k => k.trim().replace(/['"]/g, ''));
        metaData.keywords.push(...keywords);
      }
    }

    // Fallback parsing if structured content isn't found
    if (!metaData.title && !metaData.description) {
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
      if (sentences.length > 0) {
        metaData.title = sentences[0].trim().slice(0, 60);
        if (sentences.length > 1) {
          metaData.description = sentences.slice(1, 3).join('. ').trim().slice(0, 160);
        }
      }
    }

    return metaData;
  };

  // Generate SEO meta data using Gemini
  const generateSEOMeta = async () => {
    if (!geminiService.isConfigured()) {
      setShowApiKeyModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedMeta(null);

    try {
      const topic = formData.pageTitle || formData.pageDescription;
      const result = await geminiService.generateSEOMeta(topic, formData.keywords);

      if (result.error) {
        setError(result.error);
      } else {
        const parsedMeta = parseSEOContent(result.content);
        setGeneratedMeta(parsedMeta);
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
    
    if (!formData.pageTitle.trim() && !formData.pageDescription.trim()) {
      setError('Please enter either a page title or description');
      return;
    }

    generateSEOMeta();
  };

  // Copy meta data to clipboard
  const copyToClipboard = async () => {
    if (!generatedMeta) return;
    
    const metaHTML = `<!-- SEO Meta Tags -->
<title>${generatedMeta.title}</title>
<meta name="description" content="${generatedMeta.description}">
<meta name="keywords" content="${generatedMeta.keywords.join(', ')}">

<!-- Open Graph / Facebook -->
<meta property="og:title" content="${generatedMeta.title}">
<meta property="og:description" content="${generatedMeta.description}">

<!-- Twitter -->
<meta property="twitter:title" content="${generatedMeta.title}">
<meta property="twitter:description" content="${generatedMeta.description}">

<!-- Headings -->
<h1>${generatedMeta.h1}</h1>`;

    try {
      await navigator.clipboard.writeText(metaHTML);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy meta data: ', err);
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
          <div className="inline-flex items-center px-4 py-2 bg-orange-600/20 text-orange-400 rounded-full text-sm font-semibold mb-4">
            <Search className="w-4 h-4 mr-2" />
            AI SEO Meta Generator
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
            Generate SEO Meta Tags
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create optimized meta titles, descriptions, and headers to boost your search engine rankings
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <MessageSquare className="w-6 h-6 mr-3 text-orange-400" />
                Page Details
              </h2>
              {!isApiKeyConfigured && (
                <button
                  onClick={() => setShowApiKeyModal(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-orange-600/20 text-orange-400 rounded-lg hover:bg-orange-600/30 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  Setup API
                </button>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="pageTitle" className="block text-sm font-semibold text-gray-300 mb-2">
                  Page Topic/Title *
                </label>
                <input
                  type="text"
                  id="pageTitle"
                  name="pageTitle"
                  value={formData.pageTitle}
                  onChange={handleChange}
                  placeholder="e.g., Best Coffee Shops in New York, Digital Marketing Guide"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="pageDescription" className="block text-sm font-semibold text-gray-300 mb-2">
                  Page Description (Optional)
                </label>
                <textarea
                  id="pageDescription"
                  name="pageDescription"
                  value={formData.pageDescription}
                  onChange={handleChange}
                  placeholder="Brief description of what the page is about"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label htmlFor="keywords" className="block text-sm font-semibold text-gray-300 mb-2">
                  Target Keywords
                </label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="e.g., coffee shops, new york, best coffee, specialty coffee"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="platform" className="block text-sm font-semibold text-gray-300 mb-2">
                    Platform Type
                  </label>
                  <select
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {platformOptions.map(platform => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="businessType" className="block text-sm font-semibold text-gray-300 mb-2">
                    Business Type (Optional)
                  </label>
                  <input
                    type="text"
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    placeholder="e.g., restaurant, consulting, tech"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || (!formData.pageTitle.trim() && !formData.pageDescription.trim())}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generate SEO Meta
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
                    <p className="text-yellow-300/80 text-sm">Configure your Gemini API key to enable AI SEO meta generation.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Output */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Globe className="w-6 h-6 mr-3 text-red-400" />
                Generated SEO Meta
              </h2>
              {generatedMeta && (
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
                      Copy HTML
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

              {generatedMeta ? (
                <div className="space-y-6">
                  {/* Title Tag */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-orange-400 mb-2">Title Tag</h3>
                    <p className="text-white">{generatedMeta.title}</p>
                    <p className="text-sm text-gray-400 mt-1">{generatedMeta.title.length} characters</p>
                  </div>

                  {/* Meta Description */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-red-400 mb-2">Meta Description</h3>
                    <p className="text-white">{generatedMeta.description}</p>
                    <p className="text-sm text-gray-400 mt-1">{generatedMeta.description.length} characters</p>
                  </div>

                  {/* H1 Heading */}
                  {generatedMeta.h1 && (
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-blue-400 mb-2">H1 Heading</h3>
                      <p className="text-white">{generatedMeta.h1}</p>
                    </div>
                  )}

                  {/* H2 Options */}
                  {generatedMeta.h2Options.length > 0 && (
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-purple-400 mb-2">H2 Heading Options</h3>
                      <ul className="space-y-2">
                        {generatedMeta.h2Options.map((h2, index) => (
                          <li key={index} className="text-white">• {h2}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Keywords */}
                  {generatedMeta.keywords.length > 0 && (
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-green-400 mb-2">Related Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedMeta.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-orange-900/20 border border-orange-600/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Search className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-orange-200 font-medium mb-1">SEO Meta Generated!</p>
                        <p className="text-orange-300/80 text-sm">
                          Your meta tags are optimized for search engines. Use the "Copy HTML" button to get the complete meta tag code.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                  <Search className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">No SEO meta generated yet</p>
                  <p className="text-sm">Enter your page details and click "Generate SEO Meta" to create optimized tags</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-orange-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">SEO Optimized</h3>
            <p className="text-gray-400 text-sm">Meta tags optimized for search engines following best practices and guidelines</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Social Media Ready</h3>
            <p className="text-gray-400 text-sm">Includes Open Graph and Twitter meta tags for better social media sharing</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Complete Package</h3>
            <p className="text-gray-400 text-sm">Generates titles, descriptions, headings, and keyword suggestions all in one</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOMetaGenerator;
