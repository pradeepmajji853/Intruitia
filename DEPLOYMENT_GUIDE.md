# Intruitia Website Deployment Guide

## Completed Razorpay UPI Compliance Changes

All required policy updates have been completed:

1. ✅ Created separate Cancellation Policy page
2. ✅ Updated Refund Policy to focus solely on refunds
3. ✅ Enhanced UPI-specific information across all policy documents
4. ✅ Updated navigation and cross-references
5. ✅ Build completed successfully

## Deployment Options

### Option 1: Netlify Deployment (Recommended)
See `NETLIFY_DEPLOYMENT.md` for detailed instructions.

### Option 2: Vercel Deployment
1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel login` and follow authentication steps
4. Run `vercel --prod` from the project directory
5. Alternatively, push to GitHub and use Vercel's GitHub integration

### Option 3: Manual Hosting
1. Upload the contents of the `dist` directory to your web hosting provider
2. Ensure your server is configured to serve `index.html` for all routes
3. Set up proper SSL/HTTPS certificates

## Post-Deployment Razorpay UPI Approval Process

1. Log in to your Razorpay dashboard
2. Navigate to "Account & Settings" > "Merchant Identification"
3. Add your live website URL
4. Submit your site for review
5. Monitor your dashboard for approval status (typically 2-7 business days)

## Verification Checklist

After deployment, verify:
- [ ] Website is accessible via HTTPS
- [ ] All policy pages are accessible via footer links
- [ ] Cancellation Policy page is properly displayed
- [ ] Refund Policy page shows updated content
- [ ] Terms & Conditions page displays enhanced UPI information
- [ ] Privacy Policy includes detailed UPI data handling information

## Support

If you encounter any issues with the deployment or Razorpay approval process, please contact your developer for assistance.

Date: June 13, 2025
