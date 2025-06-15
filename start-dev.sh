#!/bin/bash

# Start the backend server
echo "Starting backend server..."
cd "$(dirname "$0")/server" || exit
npm install
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 5

# Start the frontend server
echo "Starting frontend server..."
cd "$(dirname "$0")" || exit
npm install
npm run dev &
FRONTEND_PID=$!

# Function to handle termination
cleanup() {
  echo "Shutting down servers..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Set up trap to handle Ctrl+C
trap cleanup INT TERM

# Wait for user to terminate
echo "✅ Intruitia is running!"
echo "Backend API: http://localhost:3001"
echo "Frontend: Check the URL from Vite output (usually http://localhost:5173 or similar)"
echo "Press Ctrl+C to stop all servers"

wait
