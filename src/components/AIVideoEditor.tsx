import { useState, useEffect } from 'react';
import { 
  Video, 
  Upload, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  ThumbsUp, 
  Clock, 
  CheckCircle, 
  Film, 
  Scissors, 
  MessageSquare, 
  Music,
  Settings,
  AlertCircle,
  Send,
  Loader2,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

// Video Concept Generator Component
const VideoConceptGenerator = () => {
  const [formData, setFormData] = useState({
    topic: '',
    platform: 'Instagram',
    duration: '30-60 seconds',
    style: 'trending'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [concept, setConcept] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);

  useEffect(() => {
    setIsApiKeyConfigured(geminiService.isConfigured());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateConcept = async () => {
    if (!geminiService.isConfigured()) {
      setShowApiKeyModal(true);
      return;
    }

    if (!formData.topic.trim()) {
      setError('Please enter a video topic');
      return;
    }

    setIsLoading(true);
    setError('');
    setConcept('');

    try {
      const videoIdea = await geminiService.generateVideoIdea({
        topic: formData.topic,
        platform: formData.platform,
        duration: formData.duration,
        style: formData.style
      });

      if (!videoIdea) {
        throw new Error('No video concept was generated. Please try again.');
      }

      setConcept(videoIdea);
    } catch (error: any) {
      console.error('Video concept generation failed:', error);
      setError(error.message || 'Failed to generate video concept. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(concept);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleApiKeySet = () => {
    setIsApiKeyConfigured(true);
    setShowApiKeyModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!isApiKeyConfigured && (
        <div className="mb-8 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg max-w-md mx-auto">
          <div className="flex items-center justify-center text-yellow-400 mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Setup Required</span>
          </div>
          <p className="text-sm text-yellow-300 mb-3">Configure your Gemini API key to start generating video concepts</p>
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="flex items-center justify-center w-full bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Setup API Key
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <Video className="w-6 h-6 mr-3 text-blue-400" />
            Video Details
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Video Topic *
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="e.g., Morning routine, Product review, Cooking tutorial..."
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
                <option value="Facebook">Facebook</option>
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="15-30 seconds">15-30 seconds</option>
                <option value="30-60 seconds">30-60 seconds</option>
                <option value="1-3 minutes">1-3 minutes</option>
                <option value="3-5 minutes">3-5 minutes</option>
                <option value="5+ minutes">5+ minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Style
              </label>
              <select
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="trending">Trending</option>
                <option value="professional">Professional</option>
                <option value="funny">Funny/Entertaining</option>
                <option value="educational">Educational</option>
                <option value="cinematic">Cinematic</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
            </div>

            <button
              onClick={generateConcept}
              disabled={isLoading || !formData.topic.trim() || !isApiKeyConfigured}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Generate Video Concept
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center">
            <Sparkles className="w-6 h-6 mr-3 text-green-400" />
            AI-Generated Concept
          </h3>

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-300">Creating your video concept...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="bg-red-900/20 border-red-700 border rounded-lg p-4 flex items-start">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-400" />
              <div className="ml-3">
                <h4 className="text-sm font-medium text-red-400">Generation Failed</h4>
                <p className="mt-1 text-sm text-red-300">{error}</p>
              </div>
            </div>
          )}

          {concept && !isLoading && !error && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Ready to use concept
                </span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1 rounded-md text-sm transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-1 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy Concept
                    </>
                  )}
                </button>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <div className="p-6 rounded-lg border border-slate-600 bg-slate-700/30 text-slate-200 whitespace-pre-wrap">
                  {concept}
                </div>
              </div>
              
              <div className="mt-4 text-sm text-slate-400">
                <p>💡 <strong>Tip:</strong> Use this concept as a starting point and adapt it to your unique style and brand.</p>
              </div>
            </div>
          )}

          {!concept && !isLoading && !error && (
            <div className="flex flex-col items-center justify-center h-64 border border-dashed border-slate-600 rounded-lg">
              <Video className="w-12 h-12 text-slate-500 mb-4" />
              <p className="text-slate-400 text-center">
                Fill out the form and click "Generate Video Concept" to get AI-powered video ideas
              </p>
            </div>
          )}
        </div>
      </div>

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onApiKeySet={handleApiKeySet}
      />
    </div>
  );
};


const AIVideoEditor = () => {
  
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('professional');

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate selected theme
    const interval = setInterval(() => {
      setSelectedTheme(prev => {
        const themes = ['professional', 'trending', 'meme', 'cinematic', 'social'];
        const currentIndex = themes.indexOf(prev);
        return themes[(currentIndex + 1) % themes.length];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const videoThemes = [
    { 
      id: 'professional',
      name: 'Professional', 
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-600',
      description: 'Corporate videos, interviews, presentations'
    },
    { 
      id: 'trending',
      name: 'Trending', 
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-blue-600',
      description: 'Current social media trends and challenges'
    },
    { 
      id: 'meme',
      name: 'Meme & Funny', 
      icon: <ThumbsUp className="w-6 h-6" />,
      color: 'from-orange-500 to-red-600',
      description: 'Comedic edits with popular meme formats'
    },
    { 
      id: 'cinematic',
      name: 'Cinematic', 
      icon: <Film className="w-6 h-6" />,
      color: 'from-green-500 to-teal-600',
      description: 'Movie-like edits with dramatic effects'
    },
    { 
      id: 'social',
      name: 'Social Story', 
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-600',
      description: 'Perfect for Instagram, TikTok, and Snapchat'
    }
  ];

  const features = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: 'Easy Upload',
      description: 'Simply upload your raw video clips and let our AI take care of the rest'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI-Powered Editing',
      description: 'Our advanced AI analyzes your content and applies the perfect edits based on your chosen theme'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Trend Analysis',
      description: 'Automatically incorporates current social media trends into your videos'
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: 'Auto Music Sync',
      description: 'Matches beats with cuts and transitions for professional-quality results'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Time-Saving',
      description: 'What would take hours of editing is done in minutes with our AI technology'
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'Smart Cuts',
      description: 'Intelligent editing that focuses on the best moments in your footage'
    }
  ];

  return (
    <section 
      id="ai-video-editor"
      className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '-3s' }}></div>
        
        {/* Video Frames Animation */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="absolute animate-float opacity-20"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 3) * 20}%`,
              animationDelay: `${index * 1.5}s`,
              animationDuration: `${15 + index}s`
            }}
          >
            <div className="w-40 h-24 border-4 border-blue-500/30 rounded-lg transform rotate-3"></div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Coming Soon Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-2 rounded-full text-sm font-bold bg-blue-500/20 text-blue-300 animate-pulse-slow">
            <Sparkles className="w-4 h-4 mr-2" />
            COMING SOON
            <Sparkles className="w-4 h-4 ml-2" />
          </div>
        </div>

        {/* Main Header */}
        <div className="text-center mb-12">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                AI Video Editor
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-slate-300">
              Upload your clips and our AI will automatically edit professional videos based on trending social media styles
            </p>
          </div>
        </div>

        {/* Demo Video UI */}
        <div className="mb-24 relative">
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Video Preview Area */}
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-blue-900 relative">
              {/* Video Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center animate-pulse border border-blue-400/30 cursor-pointer">
                  <Video className="w-12 h-12 text-white" />
                </div>
              </div>

              {/* Video Editing Animation */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Timeline Animation */}
                <div className="absolute bottom-6 left-6 right-6 h-8 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/50 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 w-1/3 rounded-full animate-timeline-progress"></div>
                  
                  {/* Clip Markers */}
                  {[...Array(8)].map((_, index) => (
                    <div 
                      key={index}
                      className="absolute top-0 bottom-0 w-1 bg-white/20"
                      style={{ left: `${10 + index * 12}%` }}
                    ></div>
                  ))}
                </div>

                {/* Theme Indicator */}
                <div className="absolute top-6 left-6 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/50 text-white text-sm font-medium flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${videoThemes.find(t => t.id === selectedTheme)?.color} mr-2 animate-pulse`}></div>
                  {videoThemes.find(t => t.id === selectedTheme)?.name} Theme
                </div>

                {/* Processing Indicator */}
                <div className="absolute top-6 right-6 px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/50 text-white text-sm font-medium flex items-center">
                  <Zap className="w-4 h-4 text-yellow-400 mr-2 animate-pulse" />
                  AI Processing...
                </div>
              </div>
            </div>

            {/* Video Theme Selector */}
            <div className="p-6 flex flex-wrap gap-4 justify-center">
              {videoThemes.map((videoTheme) => (
                <button
                  key={videoTheme.id}
                  onClick={() => setSelectedTheme(videoTheme.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                    selectedTheme === videoTheme.id
                      ? `bg-gradient-to-r ${videoTheme.color} text-white shadow-lg`
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {videoTheme.icon}
                  {videoTheme.name}
                </button>
              ))}
            </div>
          </div>

          {/* Floating Features Cards */}
          <div className="hidden md:block">
            {videoThemes.map((videoTheme, index) => (
              <div
                key={videoTheme.id}
                className={`absolute rounded-xl backdrop-blur-sm border shadow-lg p-4 max-w-xs transition-all duration-500 ${
                  selectedTheme === videoTheme.id ? 'opacity-100 scale-100 z-10' : 'opacity-50 scale-95 z-0'
                } bg-slate-800/70 border-slate-700`}
                style={{
                  top: `${(index % 2 === 0 ? -20 : -40) - index * 5}px`,
                  left: `${20 + index * 18}%`,
                  transform: `rotate(${-5 + index * 2}deg)`
                }}
              >
                <p className="text-sm text-slate-300">
                  {videoTheme.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Key Features
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Video Concept Generator */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                AI Video Concept Generator
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get AI-powered video ideas, scripts, and editing suggestions while you wait for the full editor
            </p>
          </div>

          <VideoConceptGenerator />
        </div>

        {/* Early Access CTA */}
        <div className="text-center">
          <div className="p-10 rounded-3xl relative overflow-hidden bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-800/50">
            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, index) => (
                <div
                  key={index}
                  className="absolute w-2 h-2 rounded-full bg-blue-500/20"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${5 + Math.random() * 10}s`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Be the First to Experience
                <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  AI-Powered Video Editing
                </span>
              </h2>
              
              <p className="text-xl max-w-2xl mx-auto mb-10 text-slate-300">
                Join our exclusive early access list to try our AI Video Editor before the public launch.
              </p>
              
              <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4 items-center">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-6 py-4 rounded-full text-lg bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 whitespace-nowrap flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Get Early Access
                </button>
              </div>
              
              <p className="mt-6 text-sm text-slate-400">
                We'll notify you when we're ready for beta testers. No spam, we promise!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIVideoEditor;
