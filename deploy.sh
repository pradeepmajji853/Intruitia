#!/bin/bash

# Intruitia Website Deployment Script
# Professional Animated Website - Production Ready

echo "🚀 Intruitia Website - Production Deployment"
echo "=============================================="

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build
echo "🔨 Building for production..."
npm run build

# Check build size
echo "📊 Build analysis..."
ls -lh dist/

echo "✅ Build completed successfully!"
echo ""
echo "📁 Production files are in ./dist/"
echo "🌐 Ready to deploy to your hosting platform"
echo ""
echo "🎯 Deployment Options:"
echo "   • Netlify: netlify deploy --prod --dir=dist"
echo "   • Vercel: vercel --prod"
echo "   • AWS S3: aws s3 sync dist/ s3://your-bucket-name"
echo "   • GitHub Pages: Deploy ./dist contents"
echo ""
echo "🎉 Intruitia Professional Website - Deployment Ready!"
