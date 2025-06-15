import React from 'react';
import { AlertTriangle, RefreshCw, Settings, ExternalLink } from 'lucide-react';

interface ErrorBoundaryProps {
  error: string;
  onRetry?: () => void;
  showApiKeySetup?: boolean;
  onApiKeySetup?: () => void;
}

const ErrorDisplay: React.FC<ErrorBoundaryProps> = ({ 
  error, 
  onRetry, 
  showApiKeySetup = false, 
  onApiKeySetup 
}) => {
  const getErrorMessage = () => {
    if (error.includes('API key')) {
      return {
        title: 'API Key Required',
        message: 'Please configure your Gemini API key to use this AI tool.',
        action: 'Set up API Key',
        actionIcon: Settings,
        actionHandler: onApiKeySetup
      };
    }
    
    if (error.includes('rate limit') || error.includes('quota')) {
      return {
        title: 'Rate Limit Exceeded',
        message: 'You\'ve reached the API usage limit. Please wait a few minutes and try again.',
        action: 'Learn About Limits',
        actionIcon: ExternalLink,
        actionHandler: () => window.open('https://ai.google.dev/pricing', '_blank')
      };
    }
    
    if (error.includes('network') || error.includes('connection')) {
      return {
        title: 'Connection Error',
        message: 'Unable to connect to the AI service. Please check your internet connection.',
        action: 'Retry',
        actionIcon: RefreshCw,
        actionHandler: onRetry
      };
    }
    
    return {
      title: 'Generation Failed',
      message: error || 'An unexpected error occurred while generating content.',
      action: 'Try Again',
      actionIcon: RefreshCw,
      actionHandler: onRetry
    };
  };

  const errorInfo = getErrorMessage();
  const ActionIcon = errorInfo.actionIcon;

  return (
    <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-red-300 mb-2">
            {errorInfo.title}
          </h3>
          <p className="text-red-200/80 leading-relaxed max-w-md">
            {errorInfo.message}
          </p>
        </div>

        <div className="flex gap-3">
          {errorInfo.actionHandler && (
            <button
              onClick={errorInfo.actionHandler}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <ActionIcon className="w-4 h-4 mr-2" />
              {errorInfo.action}
            </button>
          )}
          
          {showApiKeySetup && onApiKeySetup && (
            <button
              onClick={onApiKeySetup}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Set up API Key
            </button>
          )}
        </div>

        <div className="text-sm text-red-300/60 mt-4">
          <p>Need help? <a href="mailto:support@intruitia.com" className="text-red-300 hover:text-red-200 underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
