# Netlify Deployment Instructions

## Option 1: Netlify Drop (No account needed)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the `dist` folder from this project
3. Your site will be instantly published with a Netlify subdomain

## Option 2: Netlify with GitHub Integration

1. Push this repository to GitHub
2. Sign up/Log in to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Select GitHub and authorize Netlify
5. Select your repository
6. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

## Post-Deployment Steps for Razorpay UPI Approval

1. Log in to your Razorpay dashboard
2. Navigate to "Account & Settings" > "Merchant Identification"
3. Add your live website URL
4. Submit your site for review
5. Monitor your dashboard for approval status (typically 2-7 business days)

## Important Notes

- Ensure your site is accessible via the provided Netlify URL
- Netlify automatically provides SSL certificates (HTTPS)
- All policy documents should be accessible via links in the footer
- Keep the site unchanged during the Razorpay review process
- Respond promptly to any queries from the Razorpay team
