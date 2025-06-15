import React, { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, Copy, Download, Share } from 'lucide-react';

interface SuccessAnimationProps {
  title?: string;
  message?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  showActions?: boolean;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({
  title = "Content Generated Successfully!",
  message = "Your AI-powered content is ready to use.",
  onCopy,
  onDownload,
  onShare,
  showActions = true
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/50 rounded-xl p-6 text-center relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-2 h-2 bg-green-400/40 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-emerald-400/60 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-green-300/50 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center space-y-4">
          {/* Success Icon with Animation */}
          <div className="relative">
            <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500/30 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-3 h-3 text-emerald-300" />
            </div>
          </div>
          
          {/* Success Message */}
          <div>
            <h3 className="text-lg font-semibold text-green-300 mb-2">
              {title}
            </h3>
            <p className="text-green-200/80 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="flex gap-3 mt-4">
              {onCopy && (
                <button
                  onClick={onCopy}
                  className="inline-flex items-center px-4 py-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 text-green-300 rounded-lg font-medium transition-all hover:scale-105"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </button>
              )}
              
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="inline-flex items-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 rounded-lg font-medium transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              )}
              
              {onShare && (
                <button
                  onClick={onShare}
                  className="inline-flex items-center px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 rounded-lg font-medium transition-all hover:scale-105"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </button>
              )}
            </div>
          )}

          {/* Tips */}
          <div className="text-sm text-green-300/60 mt-4 p-3 bg-green-900/10 rounded-lg border border-green-700/20">
            <p className="font-medium text-green-300/80 mb-1">💡 Pro Tip:</p>
            <p>You can edit the generated content and regenerate for variations!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessAnimation;
