# 🚀 AI Resume Builder  
**An AI-powered full-stack web app that creates professional resumes in minutes**

🌐 Live App: https://ai-resume-builder-inky-two.vercel.app  
🧠 Backend API: https://ai-resume-builder-3344.onrender.com  

---

## 📌 About the Project

**AI Resume Builder** is a full-stack web application that allows users to generate high-quality, professional resumes using Artificial Intelligence.

Users simply enter their personal details, skills, experience, and projects — the AI processes this data and returns a clean, well-formatted resume ready to download or copy.

The system is designed with a **scalable backend**, **cloud-hosted AI**, and **modern frontend** to mimic how real SaaS AI products are built.

---

## 🧠 Key Features

- ✨ AI-generated professional resumes  
- 📝 Simple form-based resume input  
- ⚡ Fast response using cloud-hosted backend  
- 🌐 Fully deployed (Vercel + Render)  
- 📄 Clean, copy-ready resume output  
- 🔒 CORS-enabled secure API communication  
- 🖥️ Responsive UI  

---

## 🏗️ Tech Stack

### Frontend
- React.js  
- Vite  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- OpenAI / LLM API  
- CORS  
- Deployed on Render  

### Deployment
- Frontend: **Vercel**  
- Backend: **Render**

---

## 🧩 System Architecture
```
User
↓
React Frontend (Vercel)
↓ API Call
Express Backend (Render)
↓
LLM (AI Model)
↓
Generated Resume
↓
Frontend UI
```


This architecture keeps the **AI and business logic centralized in the backend**, which is how real-world AI SaaS platforms are designed.

---

## 🛠️ How It Works

1. User fills in resume details (name, skills, experience, projects, etc.)
2. Frontend sends this data to the backend via REST API
3. Backend sends formatted prompt to the AI model
4. AI generates a professional resume
5. Backend sends the result back to frontend
6. User views and copies their resume

---

## ⚙️ Local Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AgniAditya/AI-Resume-Builder.git
cd AI-Resume-Builder
```

### 2️⃣ Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 3️⃣ Backend Setup
```bash
cd server
npm install
node index.js
```

### 🌍 Deployment

- Frontend hosted on Vercel

- Backend hosted on Render

- CORS configured so the frontend can securely communicate with backend

### 🧑‍💻 Author

Aditya Agnihotri |
Full-Stack | AI

GitHub: https://github.com/AgniAditya