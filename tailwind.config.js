/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(139, 92, 246)',
          light: 'rgb(167, 139, 250)',
          dark: 'rgb(109, 40, 217)',
        },
        secondary: 'rgb(16, 185, 129)',
        // Dark theme colors only
        theme: {
          bg: {
            DEFAULT: 'var(--bg-color)',
            secondary: 'var(--bg-secondary)',
          },
          text: {
            DEFAULT: 'var(--text-primary)',
            secondary: 'var(--text-secondary)',
            tertiary: 'var(--text-tertiary)',
          },
          border: 'var(--border-color)',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'theme-fade': 'themeFade 0.3s ease-in-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'blink': 'blink 1s step-end infinite',
        'sun-rise': 'sunRise 0.5s ease forwards',
        'moon-rise': 'moonRise 0.5s ease forwards',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        themeFade: {
          '0%': {
            opacity: '0.8',
            transform: 'scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        sunRise: {
          '0%': { transform: 'scale(0.6) rotate(0deg)' },
          '100%': { transform: 'scale(1) rotate(45deg)' },
        },
        moonRise: {
          '0%': { transform: 'scale(0.6) rotate(0deg)' },
          '100%': { transform: 'scale(1) rotate(-45deg)' },
        },
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
};
