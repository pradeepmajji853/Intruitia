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
    // Use custom SVG logos that match the website theme
    if (variant === 'icon') {
      return "/images/intruitia-icon-custom.svg";
    } else {
      return "/images/intruitia-logo-custom.svg";
    }
  };

  // Return optimized custom SVG logo
  return (
    <div className={`${getSizeClasses()} ${className}`}>
      <img 
        src={getLogoSrc()}
        alt="Intruitia Logo" 
        className="w-full h-full object-contain"
        onError={(e) => {
          // Fallback error handling
          console.error('Logo failed to load:', e);
          // Fallback to the old logo if custom logos fail
          e.currentTarget.src = "/fin images/logo.png";
        }}
      />
    </div>
  );
};

export default IntruitiaLogo;
