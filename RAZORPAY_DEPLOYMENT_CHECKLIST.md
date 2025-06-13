# Intruitia - Razorpay Approval Checklist

This document outlines the key requirements to ensure your website receives Razorpay approval for payment processing in India.

## Website Requirements Checklist

### ✅ Complete Business Information
- **Business Name**: Intruitia
- **Business Type**: Micro Enterprise (Proprietorship)
- **Udyam Registration**: UDYAM-TS-20-0135173
- **PAN**: PPNPK4592C
- **Owner Name**: Majji Pradeep Kumar

### ✅ Required Legal Pages
- **Privacy Policy**: `/privacy-policy` (implemented)
- **Terms & Conditions**: `/terms-and-conditions` (implemented)
- **Refund Policy**: `/refund-policy` (implemented)
- **Cancellation Policy**: `/cancellation-policy` (implemented)
- **About Us / Business Information**: `/about-us` (implemented)
- **Pricing Information**: `/pricing` (implemented)

### ✅ Contact Information
- **Email**: pradeepmajji853@gmail.com
- **Phone**: +91 8184889557
- **Address**: Flat No. 2-90/9/2/1, Jeevan Jyothi Nagar, Suraram Colony, Hyderabad, Telangana 500055, India

### ✅ Payment Information
- Razorpay integration properly mentioned in Privacy Policy
- Clear refund policies in place
- Transparent pricing on services offered

### 🔍 SSL Certificate (Required for Production)
- Ensure your website is served over HTTPS
- For production deployment: purchase an SSL certificate or use free Let's Encrypt
- For testing: Razorpay test mode works on localhost

## Deployment Instructions

1. **SSL Certificate Setup**:
   ```bash
   # If using Netlify, Vercel, or similar platforms, SSL is included
   # If using custom hosting, use Let's Encrypt:
   sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
   ```

2. **Domain Configuration**:
   - Ensure your domain has proper DNS records pointing to your hosting
   - Configure www and non-www versions of your domain

3. **Razorpay Dashboard Setup**:
   - Log in to Razorpay Dashboard
   - Complete the KYC process
   - Add your bank account details
   - Submit your website URL for review

## Important Notes

1. **Consistency is Key**: Ensure business information is consistent across all pages
2. **Complete Transparency**: Make sure all fees, charges, and policies are clearly specified
3. **Mobile Responsiveness**: Your website should work well on mobile devices
4. **Testing**: Test all payment flows using Razorpay test mode before going live
5. **Cookie Consent**: Consider adding a cookie consent banner for GDPR compliance

## Submission Process

1. Complete your website development with all required pages
2. Deploy with SSL certificate
3. Test all functionality
4. Submit for Razorpay review through your Razorpay dashboard
5. Be prepared to make any additional changes requested by Razorpay

---

Last updated: June 13, 2025
