# JavaScript Interview Coach - Chatbot Application

A production-ready, niche chatbot web application built with React, Express, and Groq API. Specializes in helping users prepare for JavaScript interviews.

## 🎯 Features

✨ **Smart JavaScript Interview Coaching**

- Clear explanations with code examples
- Follow-up questions for deeper learning
- Practice questions for hands-on learning
- Difficulty adaptation (beginner to advanced)

🎨 **Beautiful, Modern UI**

- Centered chat interface inspired by ChatGPT
- Smooth animations and transitions
- Dark sidebar with chat management
- Responsive design for all devices

⚡ **Production-Ready**

- Error handling and retry logic
- Rate limiting awareness
- Clean, modular code architecture
- Environment variable configuration

## 🛠️ Tech Stack

### Frontend

- React 18 with Hooks
- Vite (fast build tool)
- Tailwind CSS (utility-first styling)
- Modern, functional components

### Backend

- Node.js + Express
- CommonJS (require/module.exports)
- Axios for HTTP requests
- Dotenv for configuration

### LLM Integration

- Groq API (free, fast API)
- Mixtral-8x7b-32768 model
- Custom system prompt for specialization

## 📁 Project Structure

```
CHATBOT/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx          # Message display area
│   │   │   ├── Message.jsx          # Individual message component
│   │   │   └── InputBox.jsx         # Input field component
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main page with empty state
│   │   ├── App.jsx                  # Root component
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Tailwind + custom styles
│   ├── public/                      # Static assets
│   ├── package.json
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── index.html                   # HTML template
│
└── server/                          # Express Backend
    ├── controllers/
    │   └── chatController.js        # Chat logic and API calls
    ├── routes/
    │   └── chat.js                  # API routes
    ├── index.js                     # Express server setup
    ├── package.json
    └── .env                         # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Groq API key (free from https://www.groq.com/openrouter/)

### Step 1: Get Groq API Key

1. Visit [Groq Console](https://console.groq.com)
2. Sign up for free
3. Copy your API key

### Step 2: Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create/update .env file with your API key
# Edit .env and add:
# GROQ_API_KEY=your_api_key_here
# PORT=5000
# NODE_ENV=development

# Start backend server (development)
npm start

# OR with auto-reload (requires nodemon)
npm run dev
```

Backend will be running on `http://localhost:5000`

### Step 3: Setup Frontend

```bash
# In another terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be running on `http://localhost:5173`

## 🔧 Configuration

### Backend (.env file)

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
NODE_ENV=development
```

**Required:** Set `GROQ_API_KEY` for the app to work.

## 📝 API Documentation

### POST /api/chat

Send a message to the chatbot and get a response.

**Request:**

```json
{
  "message": "Explain closures in JavaScript"
}
```

**Response:**

```json
{
  "reply": "Closures are a fundamental concept in JavaScript..."
}
```

**Error Response:**

```json
{
  "error": "Invalid API key" | "Rate limit exceeded" | "Failed to get response from AI"
}
```

## 🎮 Usage

1. **Start both servers** (backend on 5000, frontend on 5173)
2. Open frontend in browser (http://localhost:5173)
3. Choose from suggested prompts or type your own question
4. Get responses instantly from the JavaScript Interview Coach

### Sidebar Features

- **New Chat** - Start a fresh conversation
- **Clear Chat** - Clear current conversation

### Message Features

- **Copy Button** - Copy bot responses to clipboard
- **Code Blocks** - Properly formatted JavaScript code
- **Smooth Scrolling** - Auto-scroll to latest message
- **Loading State** - Visual feedback while waiting

## 🧠 System Prompt

The chatbot uses a specialized system prompt:

```
You are a JavaScript interview expert coach. Your role is to help
candidates prepare for JavaScript interviews.

Guidelines:
1. Explain concepts clearly with real-world examples and code snippets
2. After answering, ask a follow-up question to deepen understanding
3. If the user asks for practice, give interview questions first
4. Keep responses well-structured and concise
5. Adapt to user's level (beginner/intermediate/advanced)
6. Be encouraging and supportive
```

This ensures specialized, interview-focused responses.

## 📦 Production Build

### Build Frontend

```bash
cd client
npm run build
```

This creates an optimized build in `client/dist/`

### Run Backend in Production

```bash
cd server
NODE_ENV=production npm start
```

## 🐛 Troubleshooting

### Issue: "API key not configured"

- Check `.env` file in `server/` directory
- Ensure `GROQ_API_KEY=your_key` is set
- Restart backend server

### Issue: Frontend can't connect to backend

- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify `vite.config.js` proxy is correct

### Issue: Rate limit errors

- Groq has free tier limits
- Wait a moment before retrying
- Consider upgrading API plan

### Issue: "Failed to get response"

- Check internet connection
- Verify API key is valid
- Check server logs for detailed error

## 🎯 Key Features Implemented

✅ **Frontend**

- Empty state with suggested prompts
- Chat UI with user/bot message distinction
- Smooth animations and transitions
- Copy response functionality
- Loading/error states
- Sidebar with new chat/clear options
- Auto-scroll to latest messages
- Responsive design

✅ **Backend**

- Express server with CORS enabled
- Chat route with error handling
- Custom system prompt for specialization
- Groq API integration
- Environment variable configuration
- Health check endpoint
- Rate limit awareness

✅ **UX/DX**

- Clean, modern design
- Professional purple gradient
- Accessible color scheme
- Fast Vite build
- Hot module reloading (HMR)
- Tailwind CSS for styling

## 📝 Code Quality

- Clean, modular architecture
- Separation of concerns
- Proper error handling
- Comments where needed
- Production-ready code
- No external UI library dependencies (pure React + Tailwind)

## 🔐 Security Notes

- API keys stored in `.env` (never commit to git)
- Groq API handles authentication
- Input validation on backend
- CORS enabled for development
- Adjust CORS for production URLs

## 📄 License

Free to use and modify

## 🤝 Contributing

Feel free to extend this project:

1. Add more suggested prompts
2. Implement message history/persistence
3. Add user authentication
4. Create different difficulty levels
5. Add export conversation feature
6. Implement dark/light theme toggle

## 📞 Support

If you encounter issues:

1. Check troubleshooting section
2. Verify API key is valid
3. Check Node.js and npm versions
4. Review error messages in console/terminal
5. Ensure ports 5000 and 5173 are available

---

**Made with ❤️ for JavaScript developers**
