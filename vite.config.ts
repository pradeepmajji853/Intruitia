import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['lucide-react', 'framer-motion'],
          'ai-tools': [
            './src/components/ContentGenerator.tsx',
            './src/components/HashtagGenerator.tsx', 
            './src/components/SocialMediaCaption.tsx',
            './src/components/AdCopyGenerator.tsx',
            './src/components/SEOMetaGenerator.tsx',
            './src/services/geminiService.ts'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
