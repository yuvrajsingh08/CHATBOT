# Deployment Guide

## 🚀 Deployment Options

### Option 1: Deploy to Vercel + Railway (Recommended)

#### Frontend to Vercel

1. **Create GitHub Repository**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/js-interview-coach.git
   git push -u origin main
   ```

2. **Connect Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Select your repository
   - Set build settings:
     - Framework: Vite
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variable:
     - `VITE_API_URL=your_backend_url`

3. **Update Frontend Config**
   - Edit `client/vite.config.js` to use environment variable:
   ```javascript
   server: {
     proxy: {
       '/api': {
         target: process.env.VITE_API_URL || 'http://localhost:5000',
       },
     },
   },
   ```

#### Backend to Railway

1. **Connect Railway**
   - Visit [railway.app](https://railway.app)
   - Create new project
   - Connect GitHub repository
   - Set environment variables:
     - `GROQ_API_KEY=your_key`
     - `NODE_ENV=production`
     - `PORT=8000`

2. **Configure Build**
   - Root directory: `server`
   - Start command: `npm start`

3. **Get Backend URL**
   - Copy the Railway-provided URL
   - Update frontend CORS and proxy settings

---

### Option 2: Deploy to Heroku

**Heroku has discontinued free tier. Use Railway instead.**

---

### Option 3: Deploy to Render

#### Backend to Render

1. **Sign up at [render.com](https://render.com)**

2. **Create Web Service**
   - Connect GitHub repo
   - Environment: Node.js
   - Build command: `cd server && npm install`
   - Start command: `cd server && npm start`

3. **Set environment variables:**
   ```
   GROQ_API_KEY=your_key
   NODE_ENV=production
   PORT=8000
   ```

#### Frontend to Netlify

1. **Connect to [netlify.com](https://netlify.com)**
   - Connect GitHub
   - Base directory: `client`
   - Build command: `npm run build`
   - Publish directory: `dist`

---

### Option 4: Self-Hosted (VPS/VirtualBox)

#### Prerequisites

- Ubuntu/Linux server (AWS EC2, DigitalOcean, Linode, etc.)
- SSH access
- Domain name (optional)

#### Setup Steps

1. **Connect to Server**

   ```bash
   ssh user@your_server_ip
   ```

2. **Install Dependencies**

   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

3. **Clone Repository**

   ```bash
   git clone https://github.com/yourusername/js-interview-coach.git
   cd js-interview-coach
   ```

4. **Setup Backend**

   ```bash
   cd server
   npm install
   cat > .env << EOF
   GROQ_API_KEY=your_key
   PORT=3001
   NODE_ENV=production
   EOF
   ```

5. **Run with PM2 (Process Manager)**

   ```bash
   sudo npm install -g pm2
   pm2 start index.js --name "chatbot-api"
   pm2 startup
   pm2 save
   ```

6. **Setup Frontend Build**

   ```bash
   cd ../client
   npm install
   npm run build
   ```

7. **Serve Frontend with Nginx**

   ```bash
   sudo apt install nginx
   sudo systemctl start nginx

   # Create nginx config
   sudo tee /etc/nginx/sites-available/chatbot > /dev/null <<EOF
   server {
       listen 80;
       server_name your_domain.com;

       root /path/to/js-interview-coach/client/dist;
       index index.html;

       location / {
           try_files \$uri \$uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:3001;
       }
   }
   EOF

   sudo ln -s /etc/nginx/sites-available/chatbot /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

8. **Setup SSL (Free)**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your_domain.com
   ```

---

## Environment Variables by Platform

### Vercel (Frontend)

```
VITE_API_URL=https://your-backend-url.com
```

### Railway / Render (Backend)

```
GROQ_API_KEY=your_groq_api_key
NODE_ENV=production
PORT=8000
```

### Self-Hosted

```
GROQ_API_KEY=your_groq_api_key
NODE_ENV=production
PORT=3001
```

---

## Pre-Deployment Checklist

- [ ] Remove `nodemon` from backend (use `npm start`)
- [ ] Update CORS origins in `index.js`
- [ ] Set correct API URLs in frontend
- [ ] Test all features locally
- [ ] Remove console.logs (optional)
- [ ] Environment variables set
- [ ] .gitignore excludes `.env` and `node_modules`
- [ ] README updated with production URL
- [ ] Test error handling
- [ ] Test loading states

---

## Production Optimization

### Frontend

```bash
cd client
npm run build
# Creates optimized dist/ folder
```

### Backend

```javascript
// Update CORS in server/index.js
app.use(
  cors({
    origin: ["https://your-frontend-domain.com"],
    credentials: true,
  }),
);
```

---

## Monitoring & Maintenance

### Setup Error Tracking

1. Sign up at [sentry.io](https://sentry.io)
2. Add to backend:
   ```bash
   npm install @sentry/node
   ```
3. Add to frontend:
   ```bash
   npm install @sentry/react
   ```

### Setup Logging

- Railway: Integrated logging
- Render: Integrated logging
- Self-hosted: Use `pm2 logs` or ELK stack

### Performance Monitoring

- Use Vercel Analytics for frontend
- Use Railway/Render dashboards for backend
- Monitor API response times

---

## Scaling Strategy

### Phase 1: MVP (Current Setup)

- Single backend instance
- Stateless API
- Client-side state only

### Phase 2: Persistence

- Add database (MongoDB/Firebase)
- Store conversation history
- Add user authentication

### Phase 3: Advanced

- Multiple backend instances + load balancer
- Redis caching
- CDN for static assets
- Advanced analytics

---

## Troubleshooting Deployment

### CORS Errors

- Add frontend URL to CORS whitelist in backend
- Update in `server/index.js`

### Environment Variables Not Loading

- Restart the process/deployment
- Verify variable names (case-sensitive)
- Use dashboard/CLI to verify variables set

### 502 Bad Gateway

- Check backend is running
- Verify port is correct
- Check logs for errors

### Blank Frontend

- Check build command succeeded
- Verify correct root directory
- Check dist/ folder exists
- Browser cache - try hard refresh

### API Returns 500 Error

- Verify Groq API key is valid
- Check rate limits
- Review backend logs
- Test with curl:
  ```bash
  curl -X POST http://localhost:5000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"message":"test"}'
  ```

---

## Cost Estimates (Monthly)

| Service  | Free Tier       | Paid          |
| -------- | --------------- | ------------- |
| Vercel   | 100GB bandwidth | $0+           |
| Railway  | $5 credit       | $5-100+       |
| Render   | N/A             | $7+           |
| Groq API | ~10k req/month  | Pay per usage |

---

## Recommended Production Stack

1. **Frontend**: Vercel (free, fast, easy)
2. **Backend**: Railway (simple, affordable)
3. **Database**: Firebase or MongoDB Atlas
4. **Monitoring**: Vercel Analytics + Railway logs
5. **Domain**: Namecheap or similar ($10/year)

**Estimated Cost**: ~$0-15/month

---

## Deployment Checklist After Going Live

- [ ] Test from different locations/devices
- [ ] Monitor error tracking (Sentry)
- [ ] Check API response times
- [ ] Monitor Groq API quota usage
- [ ] Verify SSL certificate valid
- [ ] Test all UI features
- [ ] Verify suggested prompts work
- [ ] Test error recovery
- [ ] Monitor backend logs
- [ ] Setup scheduled backups (if using database)

---

Don't forget to update your GitHub README with the live production URL!
