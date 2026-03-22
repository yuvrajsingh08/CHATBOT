# ✅ Getting Started Checklist

Complete these steps in order to get your JavaScript Interview Coach running!

---

## 📋 Pre-Setup (5 minutes)

- [ ] **Check Node.js is installed**

  ```bash
  node --version  # Should be v14 or higher
  npm --version   # Should be v6 or higher
  ```

  If not installed: https://nodejs.org/

- [ ] **Get Groq API Key** (free)
  1. Visit https://console.groq.com
  2. Create free account
  3. Copy your API key
  4. Save it someplace safe (you'll need it soon)

---

## 🚀 Option A: Automated Setup (2 minutes)

### Windows

```bash
# 1. Open Command Prompt or PowerShell
# 2. Navigate to the CHATBOT folder
cd d:\Web\Task\CHATBOT

# 3. Run setup script
setup.bat

# Done! Follow the on-screen instructions
```

### Mac/Linux

```bash
# 1. Open Terminal
# 2. Navigate to the CHATBOT folder
cd /path/to/CHATBOT

# 3. Make script executable
chmod +x setup.sh

# 4. Run it
./setup.sh

# Done! Follow the on-screen instructions
```

---

## 🚀 Option B: Manual Setup (5 minutes)

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

✅ Should complete without errors

### Step 2: Install Frontend Dependencies

```bash
cd ../client
npm install
```

✅ Should complete without errors

### Step 3: Return to root

```bash
cd ..
```

---

## 🔑 Add Your API Key (Required)

1. Open `server/.env` in text editor
2. Find this line:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
3. Replace with your actual key:
   ```
   GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. **Save the file**

✅ API key configured!

---

## 🎮 Start the Application

### Terminal 1 (Backend) - Keep open

```bash
cd server
npm start
```

Wait for:

```
Server running on http://localhost:5000
```

✅ Backend is running!

### Terminal 2 (Frontend) - Keep open

```bash
cd client
npm run dev
```

Wait for:

```
  VITE v4.4.5  ready in 234 ms

  ➜  Local:   http://localhost:5173/
```

✅ Frontend is running!

---

## 🌐 Open in Browser

1. **Click this link:** http://localhost:5173

   OR manually type it in your browser

2. You should see:
   - Title: "JavaScript Interview Coach"
   - Subtitle: "Practice, learn, and crack your JS interviews"
   - 5 buttons with suggested prompts

3. **Try asking:**
   - "Explain closures in JavaScript"
   - "What is the event loop?"
   - Any JavaScript question!

✅ Application is working!

---

## 🧪 Quick Test Checklist

After opening the app, verify:

- [ ] Page loads without errors
- [ ] You see the title and subtitle
- [ ] You see 5 suggested prompt buttons
- [ ] Clicking a button sends the message
- [ ] "Thinking..." animation appears
- [ ] Bot response appears after 2-5 seconds
- [ ] Your message is on the right (blue)
- [ ] Bot message is on the left (gray)
- [ ] "Copy" button appears on bot messages
- [ ] Dark sidebar appears on the left
- [ ] "New Chat" button works
- [ ] "Clear Chat" button works

If all check ✅ - **You're ready to go!**

---

## 🛑 Troubleshooting Quick Guide

### Problem: "Cannot find module 'express'"

**Solution:**

```bash
cd server
npm install
npm start
```

### Problem: "Cannot find module 'react'"

**Solution:**

```bash
cd client
npm install
npm run dev
```

### Problem: "API key not configured" error in browser

**Solution:**

1. Edit `server/.env`
2. Add your Groq API key
3. **Restart backend** (stop and run `npm start` again)

### Problem: Cannot connect to backend

**Solution:**

- Make sure backend is running (`node server/index.js`)
- Make sure it shows "Server running on http://localhost:5000"
- Check that frontend shows port 5173 (not 5174)

### Problem: Port 5000 or 5173 already in use

**Solution:**
Edit `server/.env`:

```
PORT=3001  # Change to unused port
```

Then restart backend.

### Problem: "Rate limit exceeded"

**Solution:**

- Free Groq tier has limits
- Wait 1-2 minutes and try again
- Or upgrade your Groq plan

---

## ✨ You're All Set!

Now you can:

1. **Practice:** Ask any JavaScript interview question
2. **Learn:** Get explanations with code examples
3. **Customize:** Edit system prompt for different specialties
4. **Deploy:** Follow DEPLOYMENT.md to go live
5. **Extend:** Add features like chat history, auth, etc.

---

## 📚 Next Steps

### Basic

- [ ] Test all 5 suggested prompts
- [ ] Ask your own questions
- [ ] Try the "Clear Chat" button

### Intermediate

- [ ] Read ARCHITECTURE.md to understand code
- [ ] Customize the system prompt
- [ ] Change UI colors

### Advanced

- [ ] Read DEPLOYMENT.md
- [ ] Deploy to Vercel (frontend) + Railway (backend)
- [ ] Add database for chat history
- [ ] Add authentication

---

## 🎓 Files to Review

| File            | Purpose             | When          |
| --------------- | ------------------- | ------------- |
| README.md       | Overview & features | Now           |
| QUICKSTART.md   | Fast setup guide    | If stuck      |
| ARCHITECTURE.md | How it works        | After testing |
| DEPLOYMENT.md   | Going to production | When ready    |

---

## 💡 Pro Tips

1. **Multiple questions per session:** Just keep typing and hitting Enter
2. **Copy responses:** Use the Copy button to save interesting responses
3. **New conversation:** Click "New Chat" to start fresh
4. **Better responses:** Be specific in your questions
5. **Code examples:** Bot will provide JavaScript code blocks

---

## ❓ FAQ

**Q: Is this free?**
A: Yes! Groq API has free tier with generous limits.

**Q: Can I change the chatbot's personality?**
A: Yes! Edit the system prompt in `server/controllers/chatController.js`

**Q: Can I use a different API (OpenAI, Gemini)?**
A: Yes! You'd need to update `chatController.js` with the new API endpoint and auth.

**Q: Can I save conversations?**
A: Not yet. You'd need to add a database (Firebase, MongoDB, etc.)

**Q: Can I deploy this online?**
A: Yes! See DEPLOYMENT.md for full instructions.

---

## 🚨 Important Reminders

⚠️ **Keep API Key Secret**

- Never share `server/.env` file
- Never commit `.env` to Git
- Keep API key private

⚠️ **Running Terminals**

- Keep both backend AND frontend terminals open
- Don't close either while testing
- Stop with Ctrl+C

⚠️ **Check Your Ports**

- Backend: Usually port 5000
- Frontend: Usually port 5173
- If ports are different, that's okay (both will show)

---

## 🎉 Success!

You now have a fully functional JavaScript Interview Coach!

**Join the next level:** Read DEPLOYMENT.md to put this online.

---

**Questions?** Check the relevant documentation file or review the code comments.

**Ready?** Go open http://localhost:5173 and start learning JavaScript! 🚀
