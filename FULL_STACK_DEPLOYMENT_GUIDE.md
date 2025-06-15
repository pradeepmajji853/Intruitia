# Intruitia Full-Stack Deployment Guide

This guide provides comprehensive instructions for deploying both the frontend and backend components of the Intruitia website.

## Prerequisites

Before deploying, ensure you have:

- Node.js (v14 or later)
- MongoDB Atlas account
- Razorpay account with API credentials
- Vercel, Netlify, or similar hosting service account
- Domain name (optional but recommended)

## Deployment Options

### Option 1: Combined Deployment (Vercel)

Vercel can host both the frontend and backend together with serverless functions.

1. Configure `vercel.json` for the Express API
2. Set up environment variables in Vercel dashboard
3. Deploy using the Vercel CLI or GitHub integration

### Option 2: Separate Deployments (Recommended)

#### Backend Deployment (Node.js server)

1. **Prepare Backend for Production**

   ```bash
   cd server
   npm install
   ```

2. **Set Up Environment Variables**

   Create a `.env` file with the following variables:
   ```
   PORT=3001
   NODE_ENV=production
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://your-frontend-domain.com
   ```

3. **Deploy to Hosting Service**

   **Heroku:**
   ```bash
   heroku create intruitia-api
   git subtree push --prefix server heroku main
   heroku config:set $(cat .env | xargs)
   ```

   **Digital Ocean App Platform:**
   - Create a new app in Digital Ocean
   - Connect to your GitHub repository
   - Set the source directory to `/server`
   - Configure environment variables

   **AWS Elastic Beanstalk:**
   - Install EB CLI
   - Configure EB environment
   - Deploy with `eb deploy`

#### Frontend Deployment

1. **Prepare Frontend for Production**

   Update API endpoints in the frontend code to point to your deployed backend URL:

   ```javascript
   // Update in all API calls
   const API_URL = 'https://your-backend-api.com';
   fetch(`${API_URL}/api/contact/submit`, ...)
   ```

2. **Build the Frontend**

   ```bash
   npm run build
   ```

3. **Deploy to Hosting Service**

   **Vercel:**
   ```bash
   vercel --prod
   ```

   **Netlify:**
   ```bash
   netlify deploy --prod
   ```

## Post-Deployment Tasks

1. **Set Up Domain and SSL**
   - Configure your custom domain in your hosting service
   - Ensure SSL is enabled (Let's Encrypt is usually provided automatically)

2. **Test All Functionality**
   - Contact form submission
   - Newsletter subscription
   - Payment processing

3. **Set Up Monitoring**
   - Configure error logging with Sentry or LogRocket
   - Set up uptime monitoring

4. **Performance Optimization**
   - Enable Gzip/Brotli compression
   - Set up proper caching headers
   - Implement CDN if needed

## Troubleshooting

### Common Backend Issues

1. **MongoDB Connection Errors**
   - Verify MongoDB connection string
   - Ensure IP whitelist includes your server IP

2. **Email Sending Failures**
   - Check email service credentials
   - Verify app password for Gmail

3. **Razorpay Integration Issues**
   - Confirm API keys are correct
   - Ensure webhook URLs are properly configured

### Common Frontend Issues

1. **API Connection Errors**
   - Check CORS configuration
   - Verify API endpoint URLs

2. **Build Failures**
   - Clear cache and node_modules
   - Update dependencies

## Security Considerations

1. **API Security**
   - Implement rate limiting
   - Set up CORS properly
   - Use HTTPS for all communications

2. **Data Protection**
   - Sanitize all user inputs
   - Implement proper validation
   - Secure sensitive data in database

3. **Payment Security**
   - Follow Razorpay security guidelines
   - Keep API keys secure
   - Implement proper verification

## Maintenance Plan

1. **Regular Updates**
   - Schedule monthly dependency updates
   - Apply security patches promptly

2. **Backup Strategy**
   - Set up automated database backups
   - Implement backup verification process

3. **Scaling Considerations**
   - Monitor performance metrics
   - Plan for increased traffic scenarios

## Support Contacts

For deployment assistance, contact:
- Technical Support: pradeepmajji853@gmail.com
- Razorpay Integration Help: support@razorpay.com
