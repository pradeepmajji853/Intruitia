import { useState, useEffect } from 'react';
import { Key, Settings, CheckCircle, AlertCircle, X } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import ApiKeyModal from './ApiKeyModal';

interface ApiKeyStatusProps {
  className?: string;
}

const ApiKeyStatus: React.FC<ApiKeyStatusProps> = ({ className = '' }) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsConfigured(geminiService.isConfigured());
  }, []);

  const handleApiKeySet = () => {
    setIsConfigured(true);
    setShowModal(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    geminiService.setApiKey('');
    setIsConfigured(false);
  };

  if (isConfigured) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center px-3 py-1 bg-green-900/30 border border-green-700/50 rounded-lg text-green-300">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">API Key Configured</span>
          <button
            onClick={handleClearApiKey}
            className="ml-2 p-1 hover:bg-green-800/30 rounded transition-colors"
            title="Clear API Key"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center px-3 py-1 bg-yellow-900/30 border border-yellow-700/50 rounded-lg text-yellow-300">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">API Key Required</span>
          <button
            onClick={() => setShowModal(true)}
            className="ml-2 p-1 hover:bg-yellow-800/30 rounded transition-colors"
            title="Configure API Key"
          >
            <Settings className="w-3 h-3" />
          </button>
        </div>
      </div>

      <ApiKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onApiKeySet={handleApiKeySet}
      />
    </>
  );
};

export default ApiKeyStatus;
