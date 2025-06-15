# Intruitia Backend Functionality

This document provides an overview of the backend functionality implemented for the Intruitia AI Marketing Agency website.

## API Endpoints

### Contact Form API

**Endpoint:** `/api/contact/submit`
**Method:** POST
**Purpose:** Process contact form submissions

**Functionality:**
- Validates required fields (name, email, message)
- Stores submission in MongoDB database
- Sends notification email to administrator
- Sends confirmation email to user
- Returns success/error status with appropriate message

### Newsletter API

**Endpoint:** `/api/newsletter/subscribe`
**Method:** POST
**Purpose:** Handle newsletter subscriptions

**Functionality:**
- Validates email format
- Checks for existing subscriptions
- Stores subscriber details in MongoDB
- Sends welcome email to new subscribers
- Handles reactivation of previously unsubscribed emails

**Endpoint:** `/api/newsletter/unsubscribe`
**Method:** POST
**Purpose:** Process unsubscription requests

**Functionality:**
- Validates email
- Updates subscription status in database
- Sends confirmation email
- Provides feedback for resubscription

### Razorpay Payment API

**Endpoint:** `/api/razorpay/create-order`
**Method:** POST
**Purpose:** Initialize payment process

**Functionality:**
- Creates order in Razorpay system
- Stores order details in MongoDB
- Returns order information for frontend processing

**Endpoint:** `/api/razorpay/verify-payment`
**Method:** POST
**Purpose:** Verify completed payments

**Functionality:**
- Validates payment signature
- Updates payment status in database
- Returns verification status

**Endpoint:** `/api/razorpay/payment/:orderId`
**Method:** GET
**Purpose:** Retrieve payment details

**Functionality:**
- Fetches payment information by order ID
- Returns payment details including status

## Database Models

### Contact Model
- Name
- Email
- Company (optional)
- Phone (optional)
- Message
- Status (new, in-progress, completed)
- Creation timestamp

### Newsletter Model
- Email
- Name (optional)
- Subscription status
- Timestamps for creation and updates

### Payment Model
- Order ID
- Payment ID
- Razorpay order and payment IDs
- Amount and currency
- Payment status
- Payment method
- Customer details
- Service information
- Timestamps

## Email Functionality

The backend implements email notifications for:
- Contact form submissions (admin notification + user confirmation)
- Newsletter subscriptions (welcome email)
- Newsletter unsubscriptions (confirmation email)

## Security Features

- Input validation and sanitization
- Error handling with appropriate status codes
- Environment variable usage for sensitive credentials
- CORS protection
- Production/development environment distinction

## Deployment Configuration

The backend can be deployed independently or alongside the frontend:
- MongoDB Atlas for database
- Heroku, Digital Ocean, or similar services for hosting
- Environment variable configuration for credentials

## Testing

To test the backend functionality:
1. Start the backend server: `cd server && npm run dev`
2. Use the frontend components that connect to these endpoints
3. For direct API testing, use Postman or similar tools with the following URLs:
   - http://localhost:3001/api/contact/submit
   - http://localhost:3001/api/newsletter/subscribe
   - http://localhost:3001/api/razorpay/create-order
