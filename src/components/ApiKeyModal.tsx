import { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySet: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Check if API key is already stored
      const storedKey = localStorage.getItem('gemini_api_key');
      if (storedKey) {
        setApiKey(storedKey);
      }
    }
  }, [isOpen]);

  const validateApiKey = async (key: string): Promise<{ isValid: boolean; message: string }> => {
    try {
      // Test the API key with a simple request
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: 'Test API connection - respond with "OK"'
            }]
          }]
        })
      });

      if (response.ok) {
        return { isValid: true, message: 'API key is valid and working!' };
      } else {
        const errorData = await response.json();
        return { isValid: false, message: errorData.error?.message || 'Invalid API key' };
      }
    } catch (error) {
      return { isValid: false, message: 'Failed to validate API key. Please check your internet connection.' };
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setValidationResult({ isValid: false, message: 'Please enter an API key' });
      return;
    }

    setIsValidating(true);
    setValidationResult(null);

    const validation = await validateApiKey(apiKey.trim());
    setValidationResult(validation);

    if (validation.isValid) {
      geminiService.setApiKey(apiKey.trim());
      setTimeout(() => {
        onApiKeySet();
        onClose();
      }, 1500);
    }

    setIsValidating(false);
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Key className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Configure Gemini API</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Enable AI-powered content generation</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">How to get your API key:</p>
                <ol className="text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Google AI Studio</a></li>
                  <li>Sign in with your Google account</li>
                  <li>Click "Create API Key"</li>
                  <li>Copy and paste it below</li>
                </ol>
              </div>
            </div>
          </div>

          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gemini API Key
          </label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {validationResult && (
            <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
              validationResult.isValid 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              {validationResult.isValid ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="text-sm">{validationResult.message}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleSaveApiKey}
            disabled={isValidating}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isValidating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Validating...
              </>
            ) : (
              'Save & Test'
            )}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          Your API key is stored locally and never sent to our servers
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
