# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Get Your API Key

1. Visit [Groq Console](https://console.groq.com)
2. Sign up for free (takes 2 minutes)
3. Copy your API key from the dashboard

### Step 2: Update Configuration

Edit `server/.env`:

```env
GROQ_API_KEY=your_api_key_here
PORT=5000
```

### Step 3: Install & Run

**Option A: Windows**

```bash
# Run the automated setup script
setup.bat

# Then in terminal 1:
cd server
npm start

# In terminal 2:
cd client
npm run dev
```

**Option B: Mac/Linux**

```bash
# Run the automated setup script
chmod +x setup.sh
./setup.sh

# Then in terminal 1:
cd server
npm start

# In terminal 2:
cd client
npm run dev
```

**Option C: Manual**

```bash
# Backend setup
cd server
npm install
npm start

# In another terminal - Frontend
cd client
npm install
npm run dev
```

### Step 4: Open in Browser

Visit: **http://localhost:5173**

---

## 📝 Testing the Chatbot

Try these questions:

- "Explain closures in JavaScript"
- "What is the event loop?"
- "Difference between var, let, and const"
- "What is hoisting?"
- "Ask me a JavaScript interview question"

---

## 🔍 Troubleshooting

### Cannot find module 'express'

```bash
cd server
npm install
```

### Cannot find module 'react'

```bash
cd client
npm install
```

### API key errors

- Double-check your `.env` file in `server/` folder
- Ensure no extra spaces: `GROQ_API_KEY=the_key_here`
- Restart the backend after updating `.env`

### Port already in use

- Backend: Change `PORT` in `.env` (default: 5000)
- Frontend: Vite will use next available port (default: 5173)

### Cannot connect frontend to backend

- Ensure backend is running on port 5000
- Check browser dev console (F12) for CORS errors
- Verify `vite.config.js` has correct proxy

---

## 📊 Project Stats

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Express, Groq API, CommonJS
- **Database**: None (stateless)
- **Authentication**: None (public demo)
- **Lines of Code**: ~800 (minimal but complete)
- **Bundle Size**: ~50KB (optimized)

---

## 📚 File Descriptions

### Frontend Files

- **App.jsx** - Main component with sidebar
- **pages/Home.jsx** - Chat interface and empty state
- **components/ChatBox.jsx** - Message display area
- **components/Message.jsx** - Individual message with copy
- **components/InputBox.jsx** - Message input field

### Backend Files

- **index.js** - Express server setup
- **routes/chat.js** - API route definitions
- **controllers/chatController.js** - Chat logic and Groq API calls

---

## 🎯 Next Steps (Optional Features)

1. **Add persistence**: Save conversations to database (MongoDB/Firebase)
2. **User auth**: Add authentication layer (JWT/Firebase)
3. **Multiple difficulty levels**: Add dropdown selector
4. **Chat history**: Save and retrieve past conversations
5. **Export**: Download conversations as PDF/text
6. **Dark mode**: Add theme toggle
7. **Mobile app**: React Native version
8. **Deployment**: Deploy to Vercel (frontend) + Heroku/Railway (backend)

---

## ⚡ Performance Tips

- Frontend builds to ~50KB gzipped
- Vite provides instant HMR
- Backend responds in <2 seconds typically
- Code is already optimized for production

---

## 📞 Common Questions

**Q: Is this free?**
A: Yes! Groq API has a free tier with generous limits.

**Q: Can I change the chatbot's specialty?**
A: Yes! Edit the system prompt in `server/controllers/chatController.js`

**Q: How do I deploy this?**
A: See Deployment Guide (coming soon)

**Q: Can I use Gemini instead of Groq?**
A: Yes, you'd need to update the API call in `chatController.js`

---

Enjoy building! 🚀
