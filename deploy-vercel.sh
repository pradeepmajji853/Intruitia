#!/bin/bash
# Specialized deployment script for Vercel

echo "=== Intruitia Vercel Deployment Script ==="

# Build the project
echo "Building project for Vercel deployment..."
npm run build

# Create the necessary Vercel configuration in the dist folder
echo "Setting up Vercel routing configuration..."

# Create a 200.html file in the dist directory (fallback for client-side routing)
cp dist/index.html dist/200.html

# Create a _redirects file in the dist directory
echo "/* /index.html 200" > dist/public/_redirects

# Success message
echo "✅ Build completed successfully for Vercel deployment!"
echo "The website has been built to the dist/ directory with special Vercel configurations."

echo ""
echo "⚠️ IMPORTANT: Vercel Deployment Instructions"
echo "1. Push these changes to your GitHub repository"
echo "2. In Vercel, create a new project from your GitHub repository"
echo "3. Set the following build configuration:"
echo "   - Framework Preset: Vite"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "4. Deploy your site"
echo ""
echo "⚠️ IMPORTANT: After Deployment"
echo "1. Test all routes (especially policy pages) to make sure they load correctly"
echo "2. Submit your website for Razorpay review through your Razorpay dashboard"
echo ""
