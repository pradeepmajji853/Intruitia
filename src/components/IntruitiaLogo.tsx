import React from 'react';

interface IntruitiaLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'icon' | 'full';
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
        return variant === 'icon' ? 'w-8 h-8' : 'w-24 h-8';
      case 'large':
        return variant === 'icon' ? 'w-16 h-16' : 'w-48 h-16';
      default:
        return variant === 'icon' ? 'w-10 h-10' : 'w-30 h-10';
    }
  };

  if (variant === 'full') {
    return (
      <div className={`${getSizeClasses()} ${className}`}>
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Logo Icon */}
          <circle cx="20" cy="20" r="20" fill="url(#gradient1)"/>
          
          {/* Neural Network Pattern */}
          <g fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
            {/* Central Node */}
            <circle cx="20" cy="20" r="2" fill="white"/>
            
            {/* Connection Lines */}
            <line x1="10" y1="12" x2="20" y2="20"/>
            <line x1="30" y1="12" x2="20" y2="20"/>
            <line x1="10" y1="28" x2="20" y2="20"/>
            <line x1="30" y1="28" x2="20" y2="20"/>
            <line x1="8" y1="20" x2="20" y2="20"/>
            <line x1="32" y1="20" x2="20" y2="20"/>
            
            {/* Outer Nodes */}
            <circle cx="10" cy="12" r="1.5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="30" cy="12" r="1.5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="10" cy="28" r="1.5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="30" cy="28" r="1.5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="8" cy="20" r="1.5" fill="rgba(255,255,255,0.9)"/>
            <circle cx="32" cy="20" r="1.5" fill="rgba(255,255,255,0.9)"/>
          </g>
          
          {/* Letter "I" stylized as data flow */}
          <g fill="white">
            <rect x="18" y="8" width="4" height="2" rx="1"/>
            <rect x="18" y="13" width="4" height="14" rx="2"/>
            <rect x="18" y="30" width="4" height="2" rx="1"/>
          </g>
          
          {/* Company Name */}
          <text x="50" y="25" fill="url(#textGradient)" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="700" letterSpacing="-0.02em">
            Intruitia
          </text>
          
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
              <stop offset="50%" style={{stopColor:'#6366f1', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#06b6d4', stopOpacity:1}} />
            </linearGradient>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
              <stop offset="50%" style={{stopColor:'#6366f1', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:'#06b6d4', stopOpacity:1}} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // Icon variant
  return (
    <div className={`${getSizeClasses()} ${className}`}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background Circle with Gradient */}
        <circle cx="20" cy="20" r="20" fill="url(#gradient1)"/>
        
        {/* Neural Network Pattern */}
        <g fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
          {/* Central Node */}
          <circle cx="20" cy="20" r="2" fill="white"/>
          
          {/* Connection Lines */}
          <line x1="10" y1="12" x2="20" y2="20"/>
          <line x1="30" y1="12" x2="20" y2="20"/>
          <line x1="10" y1="28" x2="20" y2="20"/>
          <line x1="30" y1="28" x2="20" y2="20"/>
          <line x1="8" y1="20" x2="20" y2="20"/>
          <line x1="32" y1="20" x2="20" y2="20"/>
          
          {/* Outer Nodes */}
          <circle cx="10" cy="12" r="1.5" fill="rgba(255,255,255,0.9)"/>
          <circle cx="30" cy="12" r="1.5" fill="rgba(255,255,255,0.9)"/>
          <circle cx="10" cy="28" r="1.5" fill="rgba(255,255,255,0.9)"/>
          <circle cx="30" cy="28" r="1.5" fill="rgba(255,255,255,0.9)"/>
          <circle cx="8" cy="20" r="1.5" fill="rgba(255,255,255,0.9)"/>
          <circle cx="32" cy="20" r="1.5" fill="rgba(255,255,255,0.9)"/>
        </g>
        
        {/* Letter "I" stylized as data flow */}
        <g fill="white">
          <rect x="18" y="8" width="4" height="2" rx="1"/>
          <rect x="18" y="13" width="4" height="14" rx="2"/>
          <rect x="18" y="30" width="4" height="2" rx="1"/>
        </g>
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
            <stop offset="50%" style={{stopColor:'#6366f1', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:'#06b6d4', stopOpacity:1}} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default IntruitiaLogo;
