# Razorpay Integration Guide for Intruitia

This guide provides detailed instructions for implementing and testing Razorpay payments in the Intruitia website.

## Prerequisites

Before integrating Razorpay:

1. Register for a Razorpay account at [razorpay.com](https://razorpay.com)
2. Complete the KYC process
3. Obtain API keys (Key ID and Secret) from the Razorpay Dashboard
4. Enable UPI payment method in your Razorpay account

## Implementation Steps

### 1. Backend Setup

The backend integration is already implemented in:
- `/server/src/controllers/razorpayController.js`
- `/server/src/routes/razorpay.js`
- `/server/src/models/Payment.js`

Ensure your environment variables are set correctly:

```
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 2. Frontend Implementation

Create a new component for handling payments:

```tsx
// src/components/RazorpayPayment.tsx
import { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentProps {
  amount: number;
  service: string;
  description?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}

const RazorpayPayment = ({
  amount,
  service,
  description,
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onFailure
}: PaymentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      setPaymentStatus('idle');
      setErrorMessage('');

      // Create order on server
      const response = await fetch('http://localhost:3001/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          service,
          description: description || service,
          customer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone || ''
          }
        }),
      });

      const orderData = await response.json();

      if (!response.ok) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      // Initialize Razorpay options
      const options = {
        key: orderData.data.key,
        amount: orderData.data.amount * 100, // in paisa
        currency: orderData.data.currency,
        name: "Intruitia",
        description: orderData.data.description,
        order_id: orderData.data.order_id,
        prefill: {
          name: orderData.data.name,
          email: orderData.data.email,
          contact: orderData.data.contact,
        },
        theme: {
          color: "#4F46E5", // Indigo color matching site theme
        },
        handler: function (response: any) {
          verifyPayment(response, orderData.data.order_id);
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      // Open Razorpay payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment initiation error:', error);
      setPaymentStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsLoading(false);
      if (onFailure) onFailure(error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (response: any, orderId: string) => {
    try {
      // Verify payment with server
      const verifyResponse = await fetch('http://localhost:3001/api/razorpay/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpayOrderId: orderId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          method: 'upi' // Can be dynamically set based on actual method if available
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(verifyData.message || 'Payment verification failed');
      }

      setPaymentStatus('success');
      if (onSuccess) onSuccess(verifyData.data);
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Payment verification failed');
      if (onFailure) onFailure(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            Pay ₹{amount}
            <ArrowRight className="ml-2 w-5 h-5" />
          </>
        )}
      </button>

      {/* Success Message */}
      {paymentStatus === 'success' && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Payment Successful</h3>
            <p className="mt-1 text-sm text-green-700">
              Thank you for your payment! Your order has been confirmed.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {paymentStatus === 'error' && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Payment Failed</h3>
            <p className="mt-1 text-sm text-red-700">
              {errorMessage || "We couldn't process your payment. Please try again or contact support."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RazorpayPayment;
```

### 3. Usage Example

You can use the RazorpayPayment component in any page or component:

```tsx
import RazorpayPayment from './components/RazorpayPayment';

// In your component:
<RazorpayPayment
  amount={1999}
  service="AI Content Strategy Package"
  customerName="John Doe"
  customerEmail="john@example.com"
  customerPhone="9876543210"
  onSuccess={(data) => console.log('Payment successful:', data)}
  onFailure={(error) => console.error('Payment failed:', error)}
/>
```

### 4. UPI Integration Specifics

Razorpay's UPI integration is handled automatically through their checkout interface. However, to optimize for UPI payments:

1. Ensure UPI is enabled in your Razorpay dashboard
2. Consider adding UPI-specific messaging in your UI
3. Test with various UPI apps (GPay, PhonePe, Paytm, BHIM)

### 5. Testing

#### Test Mode

During development, use Razorpay's test mode:

1. Use test API keys (Test Key ID and Test Secret)
2. Use Razorpay's test card numbers and UPI IDs
3. Test success and failure scenarios

#### Test Credentials

**Test Cards:**
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3-digit number
- Name: Any name
- 3D Secure Password: 1234

**Test UPI:**
- UPI ID: success@razorpay
- UPI ID for failure: failure@razorpay

### 6. Go-Live Checklist

Before going live:

1. Switch to production API keys
2. Verify webhook configurations
3. Test the complete payment flow in production
4. Set up proper error handling and logging
5. Implement analytics for payment conversions
6. Review Razorpay's compliance requirements

### 7. Compliance

Ensure your integration complies with:

1. RBI guidelines for payment processing
2. PCI-DSS requirements
3. Data protection regulations
4. Proper display of terms and cancellation policies

### 8. Troubleshooting

Common issues and solutions:

1. **Payment Creation Fails**
   - Verify API keys and credentials
   - Check server connectivity
   - Validate the order data format

2. **Verification Fails**
   - Check signature generation logic
   - Verify webhook URL configuration
   - Ensure payment IDs are correctly passed

3. **UPI-Specific Issues**
   - Ensure UPI is enabled in your Razorpay dashboard
   - Test with multiple UPI apps
   - Check for app-specific timeout issues

## Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [UPI Integration Guide](https://razorpay.com/docs/payments/payment-methods/upi/web/)
- [Testing Guide](https://razorpay.com/docs/payments/payment-methods/cards/test-card-details/)

## Support

For Razorpay-specific issues:
- Contact Razorpay support at support@razorpay.com
- Razorpay dashboard: https://dashboard.razorpay.com/

For Intruitia implementation questions:
- Email: pradeepmajji853@gmail.com
