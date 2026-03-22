#!/bin/bash

# JavaScript Interview Coach - Quick Start Script for Mac/Linux

echo ""
echo "===================================="
echo "JavaScript Interview Coach Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "[1/4] Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi

echo "[2/4] Installing frontend dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo "===================================="
echo "Setup Complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Update server/.env with your Groq API key"
echo "   - Visit https://console.groq.com to get a free API key"
echo ""
echo "2. Start the backend:"
echo "   cd server"
echo "   npm start"
echo ""
echo "3. In another terminal, start the frontend:"
echo "   cd client"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:5173 in your browser"
echo ""
