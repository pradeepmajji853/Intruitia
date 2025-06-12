#!/bin/bash
# Deployment script for Intruitia website with Razorpay requirements
# This script handles the build process and deployment preparation

echo "=== Intruitia Deployment Script ==="
echo "Building project for production deployment..."

# Build the project
npm run build

# Success message
echo "✅ Build completed successfully!"
echo "The website has been built to the dist/ directory."

echo "=== Razorpay Requirements Checklist ==="
echo "1. ✅ Required legal pages are included"
echo "2. ✅ Business information is properly displayed (Intruitia - Micro Enterprise)"
echo "3. ✅ UDYAM Registration details are included (UDYAM-TS-20-0135173)"
echo "4. ✅ Contact information is consistent across the site"
echo "5. ✅ Refund & cancellation policy is in place"
echo "6. ✅ Privacy policy includes payment data handling"
echo "7. ✅ Owner information displayed (Majji Pradeep Kumar)"

echo ""
echo "⚠️ IMPORTANT: SSL Certificate"
echo "When deploying to production, ensure your site is served over HTTPS."
echo "- If using Netlify, Vercel, or similar platforms, SSL is included"
echo "- If using custom hosting, obtain an SSL certificate via Let's Encrypt or similar provider"

echo ""
echo "⚠️ IMPORTANT: Domain Verification"
echo "Ensure your domain has proper DNS records and your website is accessible at your domain."
echo ""

echo "📝 For more details, see RAZORPAY_DEPLOYMENT_CHECKLIST.md"
echo ""

# Prompt for deployment confirmation
read -p "Would you like to deploy this build now? (y/n): " confirm
if [[ $confirm == [Yy]* ]]; then
  echo "Please specify your deployment method (netlify, vercel, ftp, etc.):"
  read deployment_method
  
  case $deployment_method in
    netlify)
      echo "Deploying to Netlify..."
      # Add Netlify deployment command here if you have Netlify CLI installed
      # netlify deploy --prod
      echo "For Netlify deployment, use the Netlify dashboard or Netlify CLI"
      ;;
    vercel)
      echo "Deploying to Vercel..."
      # Add Vercel deployment command here if you have Vercel CLI installed
      # vercel --prod
      echo "For Vercel deployment, use the Vercel dashboard or Vercel CLI"
      ;;
    ftp)
      echo "For FTP deployment, use your FTP client to upload the dist/ directory"
      ;;
    *)
      echo "Custom deployment selected. Deploy the dist/ directory to your hosting provider"
      ;;
  esac
else
  echo "Deployment canceled. You can deploy manually when ready."
fi

echo ""
echo "Once deployed, submit your website for Razorpay review through your Razorpay dashboard."
