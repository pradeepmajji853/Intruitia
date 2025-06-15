# Intruitia - AI-Driven Digital Marketing Agency

A modern, responsive website for an AI-focused digital marketing agency with both frontend and backend functionality.

## Features

### Frontend
- Modern UI with gradients, animations, and responsive design
- AI-focused marketing services presentation
- Contact form with API integration
- Newsletter subscription with real-time validation
- Policy pages (Privacy, Terms, Refund, Cancellation)
- Testimonials carousel
- AI Content Generator for marketing content creation

### Backend
- Express.js server with MongoDB integration
- API endpoints for contact form, newsletter, and payments
- Email notifications for form submissions
- Razorpay payment integration
- Error handling and validation

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Animation and transition effects

### Backend
- Node.js with Express
- MongoDB for database
- Nodemailer for email functionality
- Razorpay for payments
- RESTful API design

## Project Structure

The project is organized into two main parts:

### Frontend (`/src`)
- `components/`: UI components
- `App.tsx`: Main application routing
- `index-ai.css`: Custom styling and animations

### Backend (`/server`)
- `src/controllers/`: API controllers
- `src/models/`: MongoDB schemas
- `src/routes/`: API routes
- `src/utils/`: Utility functions
- `index.js`: Server entry point

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas)
- Razorpay account for payments

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install frontend dependencies
```
cd Intruitia
npm install
```

3. Install backend dependencies
```
cd server
npm install
```

4. Configure environment variables
- Create `.env` file in the server directory with your configuration
- Update email, database, and Razorpay credentials
- For Content Generator, add OpenAI or Gemini API keys (see API_CONFIGURATION.md)

### Running the Application

1. Start the backend server
```
cd server
npm run dev
```

2. Start the frontend development server
```
cd ..
npm run dev
```

3. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## API Endpoints

### Contact Form
- `POST /api/contact/submit`: Submit contact form

### Newsletter
- `POST /api/newsletter/subscribe`: Subscribe to newsletter
- `POST /api/newsletter/unsubscribe`: Unsubscribe from newsletter

### Payments
- `POST /api/razorpay/create-order`: Create a new payment order
- `POST /api/razorpay/verify-payment`: Verify payment status
- `GET /api/razorpay/payment/:orderId`: Get payment details

## Deployment

The application can be deployed using various methods:

### Frontend
- Vercel, Netlify, or any static hosting service

### Backend
- Heroku, Digital Ocean, AWS, or any Node.js hosting service
- MongoDB Atlas for database

## License
This project is licensed under the ISC License.
