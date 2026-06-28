# 🔗 Full-Stack URL Shortener

A highly performant URL Shortener built with a decoupled architecture. This project serves as a foundational MVP to explore and implement advanced System Design concepts like caching, rate limiting, and horizontal scaling.

## 🚀 Tech Stack
*   **Frontend:** Next.js (React), TailwindCSS, Axios
*   **Backend:** Python (FastAPI)
*   **Database:** SQLite
*   **ORM:** Prisma (Prisma Client Python)

## 🏗️ Architecture Overview
This application uses a decoupled microservice architecture:
1.  **FastAPI Backend (Port 8000):** Handles API requests, JSON validation via Pydantic, database operations, and native HTTP 302 Redirects.
2.  **Next.js Frontend (Port 3000):** A Client-side rendered UI that manages React state and communicates with the backend API via Axios. (CORS configured).

## 🛠️ How to Run Locally

### 1. Start the Python Backend
Navigate to the backend directory, push the Prisma schema, and start the Uvicorn server:
```bash
cd backend
prisma db push
uvicorn main:app --reload
