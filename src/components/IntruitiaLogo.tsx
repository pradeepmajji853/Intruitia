import React from 'react';

interface IntruitiaLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'icon' | 'full' | 'compact';
  className?: string;
}

const IntruitiaLogo: React.FC<IntruitiaLogoProps> = ({ 
  size = 'medium', 
  variant = 'icon',
  className = '' 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return variant === 'icon' ? 'w-8 h-8' : 'w-32 h-8';
      case 'large':
        return variant === 'icon' ? 'w-16 h-16' : 'w-56 h-16';
      default:
        return variant === 'icon' ? 'w-12 h-12' : 'w-44 h-12';
    }
  };

  const getLogoSrc = () => {
    // Use the same JPEG logo for all variants
    return "/intruitia.jpeg";
  };

  // Return optimized dark theme logo
  return (
    <div className={`${getSizeClasses()} ${className}`}>
      <img 
        src={getLogoSrc()}
        alt="Intruitia Logo" 
        className="w-full h-full object-contain filter drop-shadow-lg"
        style={{ 
          filter: 'drop-shadow(0 4px 12px rgba(139, 92, 246, 0.3))'
        }}
        onError={(e) => {
          // Fallback error handling
          console.error('Logo failed to load:', e);
        }}
      />
    </div>
  );
};

export default IntruitiaLogo;
