# Architecture & Code Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
│                 (React Frontend - Port 5173)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ChatBox Component                                    │  │
│  │  - Displays messages                                 │  │
│  │  - Auto-scrolls to latest                            │  │
│  │  - Shows loading state                               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  InputBox Component                                  │  │
│  │  - Text input field                                  │  │
│  │  - Send button                                       │  │
│  │  - Enter key handling                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                    HTTP POST /api/chat
                   (JSON request/response)
                          │
                          ↓
┌─────────────────────────────────────────────────────────────┐
│              Express Backend (Port 5000)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  index.js - Server Setup                             │  │
│  │  - Middleware (CORS, JSON)                           │  │
│  │  - Route registration                                │  │
│  │  - Error handling                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  routes/chat.js - Route Handler                      │  │
│  │  - POST /api/chat                                    │  │
│  │  - Validates input                                   │  │
│  │  - Calls controller                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  controllers/chatController.js                       │  │
│  │  - System prompt definition                          │  │
│  │  - Groq API call logic                               │  │
│  │  - Error handling                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          │
                  HTTPS to Groq API
                   (Bearer token auth)
                          │
                          ↓
┌─────────────────────────────────────────────────────────────┐
│            Groq API (External Service)                       │
│  - https://api.groq.com/openai/v1/chat/completions         │
│  - Model: mixtral-8x7b-32768                                │
│  - Returns AI-generated response                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Architecture

### Component Hierarchy

```
App.jsx (Root)
├── Sidebar (Chat management)
│   ├── New Chat button
│   └── Clear Chat button
└── Home.jsx (Main page)
    ├── Empty State (Suggested prompts)
    │   └── 5 Suggested buttons
    └── Chat View
        ├── ChatBox.jsx (Messages container)
        │   ├── Message.jsx (User message)
        │   ├── Message.jsx (Bot message)
        │   └── Loading state
        └── InputBox.jsx (Input field)
            ├── Textarea
            └── Send button
```

### State Management

- **App.jsx**: `messages`, `showChat`
- **Home.jsx**: `localMessages`, `isLoading`, `error`
- **InputBox.jsx**: `input`
- **Message.jsx**: `copied`

### Data Flow

1. User types message → InputBox state update
2. User clicks Send → `handleSendMessage()`
3. Message added to state → UI update
4. API call to backend
5. Response received → Message added to state
6. Components re-render with new message

---

## Backend Architecture

### Request/Response Flow

**User sends message:**

```
Frontend sends POST /api/chat
    ↓
routes/chat.js validates & calls controller
    ↓
chatController.sendMessage() executes:
  1. Validates message not empty
  2. Checks API key exists
  3. Calls Groq API with message
  4. Returns response or error
```

**Response Format:**

```json
{
  "reply": "The answer to user's question..."
}
```

### Error Handling

- Empty message: 400 Bad Request
- Missing API key: 500 Internal Server Error
- Invalid API key: 401 Unauthorized
- Rate limit: 429 Too Many Requests
- API error: 500 Internal Server Error

---

## Key Technologies

### Frontend Stack

| Technology   | Purpose           | Why?                   |
| ------------ | ----------------- | ---------------------- |
| React 18     | UI library        | Modern features, hooks |
| Vite         | Build tool        | Fast, optimized builds |
| Tailwind CSS | Styling           | Rapid UI development   |
| ES Modules   | Code organization | Modern JavaScript      |

### Backend Stack

| Technology | Purpose           | Why?                       |
| ---------- | ----------------- | -------------------------- |
| Express    | Web framework     | Lightweight, fast          |
| CommonJS   | Module system     | Industry standard for Node |
| Axios      | HTTP client       | Promise-based, clean API   |
| Dotenv     | Config management | Secure API key handling    |

---

## Code Organization

### Frontend Files (src/)

```
src/
├── App.jsx                  # Root component, layout
├── main.jsx                 # React entry point
├── index.css                # Global styles + Tailwind
├── components/
│   ├── ChatBox.jsx          # Message display (340 LOC)
│   ├── Message.jsx          # Individual message (80 LOC)
│   └── InputBox.jsx         # Input field (70 LOC)
└── pages/
    └── Home.jsx             # Main page & logic (150 LOC)
```

### Backend Files

```
server/
├── index.js                 # Express setup (45 LOC)
├── routes/
│   └── chat.js              # Route definitions (10 LOC)
├── controllers/
│   └── chatController.js    # Chat logic & API (90 LOC)
├── .env                     # Configuration
└── package.json             # Dependencies
```

---

## Key Concepts

### System Prompt Engineering

The chatbot's personality is defined by the system prompt in `chatController.js`:

```javascript
const SYSTEM_PROMPT = `You are a JavaScript interview expert coach...`;
```

This ensures responses are specialized and interview-focused.

### Stateless Architecture

- Backend doesn't store previous messages
- History stored only in frontend state
- Scales easily; no database needed
- Perfect for demo/MVP

### API Key Security

- Keys stored in `.env` file (never committed)
- Frontend doesn't know the key
- Backend uses key securely

### Loading States

- Shows "Thinking..." animation while waiting
- Disables input during submission
- Provides user feedback

---

## Component Deep Dive

### ChatBox.jsx

- Container for all messages
- Auto-scrolls to latest message
- Shows loading indicator
- Shows error messages
- Renders Message components in loop

### Message.jsx

- Renders single message
- Different styling for user vs bot
- Copy button for bot messages
- Simple markdown support (bold text)
- Handles line breaks properly

### InputBox.jsx

- Textarea with auto-expand
- Handles Enter key (Shift+Enter for newline)
- Disabled while loading
- Clear input after send
- Send button validation

### Home.jsx

- Empty state with suggested prompts
- Chat state management
- API communication
- Error handling & retry

---

## API Integration

### Groq API Details

- **Endpoint**: `https://api.groq.com/openai/v1/chat/completions`
- **Model**: `mixtral-8x7b-32768` (fast, capable)
- **Authentication**: Bearer token in headers
- **Format**: OpenAI-compatible API

### Request Structure

```javascript
{
  model: "mixtral-8x7b-32768",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userMessage }
  ],
  temperature: 0.7,      // Balanced creativity
  max_tokens: 1000       // Response length limit
}
```

---

## Production Considerations

### Scaling

- **Current**: Single backend instance, stateless
- **Scale up**: Add load balancer, multiple instances
- **Database**: Add MongoDB/Firebase for chat history
- **Caching**: Add Redis for frequent questions

### Security

- Add HTTPS/SSL
- Implement rate limiting
- Add authentication
- Validate all inputs
- Add CORS restrictions (specify frontend URLs)

### Performance

- Frontend bundle: ~50KB gzipped
- Backend response: ~1-3 seconds (API dependent)
- Database queries: Not applicable (stateless)

### Monitoring

- Add error tracking (Sentry)
- Log API usage
- Monitor response times
- Track errors and failures

---

## Customization Guide

### Change Chatbot Specialty

Edit `chatController.js` SYSTEM_PROMPT:

```javascript
const SYSTEM_PROMPT = `You are a [NEW_SPECIALTY] expert...`;
```

### Change UI Colors

Edit `client/src/index.css`:

```css
background: linear-gradient(135deg, #NEW_COLOR1 0%, #NEW_COLOR2 100%);
```

### Change Suggested Prompts

Edit `client/src/pages/Home.jsx`:

```javascript
const SUGGESTED_PROMPTS = [
  "Your custom prompt 1",
  "Your custom prompt 2",
  // ...
];
```

### Change Model

Edit `chatController.js`:

```javascript
model: "llama-2-70b-chat", // Different Groq model
```

### Change API (Groq → OpenAI/Gemini)

Update endpoint and auth in `chatController.js`

---

## Dependency Analysis

### Frontend Dependencies

- **react@18.2.0**: Core library (tiny runtime)
- **react-dom@18.2.0**: DOM rendering
- **lucide-react**: (Available but not used, can remove)

### Backend Dependencies

- **express@4.18.2**: Web framework
- **cors@2.8.5**: Cross-origin handling
- **dotenv@16.0.3**: Environment variables
- **axios@1.4.0**: HTTP requests (used for API calls)

### Dev Dependencies

- **vite@4.4.5**: Build tool
- **@vitejs/plugin-react@4.0.3**: React support
- **tailwindcss@3.3.0**: CSS framework
- **postcss@8.4.24**: CSS processing
- **autoprefixer@10.4.14**: Vendor prefixes

---

## Testing the Application

### Manual Testing Checklist

- [ ] Frontend loads without errors
- [ ] Suggested prompts appear on startup
- [ ] Clicking prompt sends message
- [ ] Loading animation shows
- [ ] Response appears in chat
- [ ] User message on right, bot on left
- [ ] Copy button works
- [ ] Clear chat button works
- [ ] New chat button works
- [ ] Enter key sends message
- [ ] Shift+Enter creates newline

### Error Testing

- [ ] Invalid API key shows error
- [ ] No internet connection shows error
- [ ] Empty message doesn't send
- [ ] Rate limit error handled gracefully

---

## Environment Checklist

### Required

- Node.js v14+
- npm v6+
- Groq API key

### Optional

- Nodemon (for backend auto-reload)
- VS Code extensions (optional)

---

This architecture is production-ready, scalable, and easy to maintain!
