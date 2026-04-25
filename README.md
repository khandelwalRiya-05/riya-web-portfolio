# 🚀 Professional Portfolio — AI/ML & Full-Stack Engineer

A production-ready personal portfolio built with **React.js** (frontend) and **Go** (backend), featuring smooth animations, a clean light theme, and full contact form functionality.

---

## 📁 Repository Structure

```
portfolio/
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx / .css
│   │   │   ├── Hero.jsx / .css
│   │   │   ├── Experience.jsx / .css
│   │   │   ├── Projects.jsx / .css
│   │   │   ├── Skills.jsx / .css
│   │   │   ├── Education.jsx / .css
│   │   │   ├── Contact.jsx / .css
│   │   │   └── Footer.jsx / .css
│   │   ├── hooks/
│   │   │   └── usePortfolio.js
│   │   ├── App.jsx / App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── Dockerfile
│   └── nginx.conf
│
├── backend/                   # Go backend API
│   ├── cmd/
│   │   └── main.go            # Entry point
│   ├── internal/
│   │   ├── handler/
│   │   │   └── handler.go     # HTTP handlers
│   │   └── model/
│   │       └── model.go       # Data models
│   ├── go.mod
│   ├── go.sum
│   └── Dockerfile
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start — Run Locally

### Prerequisites
- **Node.js** v18+ and npm
- **Go** v1.21+
- Git

---

### Step 1 — Clone / Set up the project

```bash
# If starting from scratch, initialize git
git init portfolio
cd portfolio
# Copy all files into this directory
```

---

### Step 2 — Personalize Your Data

**Edit your info in two places:**

1. **Backend** — `backend/internal/handler/handler.go`  
   Update the `GetPortfolio` function with your real name, email, GitHub, LinkedIn, etc.

2. **Frontend fallback** — `frontend/src/hooks/usePortfolio.js`  
   Update the `FALLBACK_DATA` object (this is used if the backend is unreachable).

---

### Step 3 — Start the Go Backend

```bash
cd backend

# Download dependencies
go mod tidy

# Run the server
go run ./cmd/main.go
```

The API will be live at: **http://localhost:8080**

Test it:
```bash
curl http://localhost:8080/api/portfolio
curl http://localhost:8080/health
```

---

### Step 4 — Start the React Frontend

Open a **new terminal**:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will open at: **http://localhost:3000**

> The Vite dev server automatically proxies `/api/*` requests to `http://localhost:8080`, so both run seamlessly together.

---

## 🐳 Run with Docker (Full Stack)

Make sure **Docker** and **Docker Compose** are installed.

```bash
# From the project root
docker-compose up --build
```

- Frontend → http://localhost:3000  
- Backend API → http://localhost:8080

To stop:
```bash
docker-compose down
```

---

## 🔧 Customization Guide

### Update Your Personal Info
Edit `backend/internal/handler/handler.go` — the `GetPortfolio` function returns all your data as JSON. Change:
- `Name`, `Email`, `LinkedIn`, `GitHub`, `Location`
- `Education`, `Experience`, `Projects`, `Skills`

### Add a Profile Photo
1. Place your photo in `frontend/src/assets/photo.jpg`
2. Import and use it in `Hero.jsx` inside the `.hero-avatar` div

### Change Colors
All colors are CSS variables in `frontend/src/index.css` under `:root`. Change `--accent` to your preferred brand color.

### Add More Projects / Experience
Just add more objects to the `projects` or `experience` arrays in `handler.go`.

---

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
# Output is in frontend/dist/
```

### Backend
```bash
cd backend
go build -o portfolio ./cmd/main.go
./portfolio
```

---

## 🚀 Deploy

### Option A — Vercel (Frontend) + Render (Backend)

**Backend on Render:**
1. Create a new Web Service on [render.com](https://render.com)
2. Connect your GitHub repo
3. Set Build Command: `cd backend && go build -o app ./cmd/main.go`
4. Set Start Command: `./backend/app`
5. Copy the deployed URL (e.g. `https://portfolio-api.onrender.com`)

**Frontend on Vercel:**
1. Go to [vercel.com](https://vercel.com) → New Project
2. Set Root Directory: `frontend`
3. Add Environment Variable:  
   `VITE_API_URL=https://portfolio-api.onrender.com`
4. Update `usePortfolio.js` to use `import.meta.env.VITE_API_URL + '/api/portfolio'`

### Option B — VPS with Docker
```bash
# On your server
git clone <your-repo>
cd portfolio
docker-compose up -d --build
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS Modules |
| Animations | CSS keyframes, Canvas API, IntersectionObserver |
| Backend | Go 1.21, net/http, rs/cors |
| Container | Docker, Docker Compose, Nginx |
| Fonts | DM Serif Display + DM Sans (Google Fonts) |

## 🔐 GitHub-Ready Setup

Before pushing to GitHub:

1. Commit code, configs, and env templates only. Keep real secrets out of the repo.
2. Do not commit `backend/.env`, `frontend/.env`, `node_modules`, or `dist`.
3. Copy the example env files:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env`
4. For production deployments, set `VITE_API_BASE_URL` to your deployed backend URL.

Local development still works with the Vite proxy when `VITE_API_BASE_URL` is empty.

---

## 📬 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Returns all portfolio data |
| POST | `/api/contact` | Receives contact form submissions |
| GET | `/health` | Health check |

**Contact POST body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hi, I'd like to hire you!"
}
```

---

## ✅ Features

- ✅ Sticky animated navbar with mobile hamburger menu  
- ✅ Hero with particle canvas animation + floating tech chips  
- ✅ Tabbed experience section  
- ✅ Project cards with hover effects and scroll reveal  
- ✅ Dynamic skill pills with color-coded categories  
- ✅ Education section with CGPA badge  
- ✅ Working contact form (logs to backend console)  
- ✅ Fully responsive (mobile, tablet, desktop)  
- ✅ Graceful fallback if backend is offline  
- ✅ Production Docker setup with Nginx  