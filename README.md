# React + Vite

# 🎬 YouTube Clone – Frontend (React + Redux + Tailwind)

This repository contains the **frontend** of a YouTube Clone built using **React**, **Redux Toolkit**, **Tailwind CSS**, and **React Router**. The app connects to a backend REST API and provides users with a responsive, dynamic, and interactive experience similar to YouTube.

---

## 📌 Project Purpose

This frontend project demonstrates:

- SPA (Single Page Application) architecture
- User authentication with token handling
- Media upload and playback integration
- State management using Redux
- Fully responsive UI using Tailwind CSS
- Secure interaction with backend APIs

---

## 🛠️ Tech Stack

| Layer       | Technology       |
| ----------- | ---------------- |
| UI Library  | React            |
| Styling     | Tailwind CSS     |
| Routing     | React Router DOM |
| State Mgmt  | Redux Toolkit    |
| HTTP Client | Axios            |
| Build Tool  | Vite             |

---

## ✨ Features (Frontend)

- ✅ User Login / Register (JWT-based)
- ✅ Upload videos with title, description, thumbnail
- ✅ Watch video with player UI
- ✅ Like / Dislike (toggle functionality)
- ✅ Add / Delete Comments
- ✅ View User Channel & Videos
- ✅ Responsive design across devices
- ✅ Axios interceptor for token handling
- ✅ Client-side routing with protected routes

---

## 📁 Folder Structure

youtube-clone-frontend/
├── public/
├── src/
│ ├── assets/ # Icons, images
│ ├── components/ # Reusable UI components (Navbar, Sidebar, etc.)
│ ├── pages/ # Route-specific views (Feed, Watch, Upload, etc.)
│ ├── redux/ # Redux slices, store
│ ├── hooks/ # Custom hooks (e.g., fetch, auth)
│ ├── App.jsx # Main app layout & routes
│ └── main.jsx # Entry point
├── .env
├── tailwind.config.js
└── vite.config.js

//here in this project i use the youtube dummy Api to populate the feed page since the also make all those functionalities that are required to perform the crud operations to make a robust full stack project .

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/youtube-clone-frontend.git
cd youtube-clone-frontend


2️⃣ Install Dependencies

npm install

3️⃣ Create .env File

VITE_API_BASE_URL=http://localhost:5000/api
Replace with your deployed backend URL in production.

🚀 Running the App

npm run dev
Visit: http://localhost:5173

🔐 Authentication Flow
User logs in → JWT token is stored in cookies



Protected routes redirect unauthenticated users to login page

📌 Routes Overview
Path	Description
/	Home Feed
/login	Login Page
/register	Signup Page
/upload	Upload a new video
/watch/:id	Video player page
/profile	Your channel page (private)
/channel/:id	Public creator's channel

```
