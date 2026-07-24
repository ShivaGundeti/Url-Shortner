# 🔗 Full-Stack URL Shortener (Cloud-Native Architecture)

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

A highly performant URL Shortener built from the ground up using a decoupled microservices architecture. Designed as a production-ready application to demonstrate expertise in **Full-Stack Development, Cloud Infrastructure, and DevOps (CI/CD)**.

> 🚀 **Live Demo (AWS EC2):** `http://16.171.3.40`
> *(Deployed natively using Docker, Nginx Reverse Proxy, and GitHub Actions)*

---

## 🏗️ Architecture & Infrastructure

Unlike standard Platform-as-a-Service (PaaS) deployments, this application is manually provisioned and orchestrated on a raw Linux cloud server to demonstrate deep system architecture knowledge.

*   **Continuous Integration (CI):** Automated PyTest suite runs on a temporary Ubuntu container on every Pull Request to block broken code.
*   **Continuous Deployment (CD):** GitHub Actions securely SSH's into the AWS EC2 instance, injects environment variables via Secrets, and rebuilds Docker containers for zero-downtime updates.
*   **Containerization:** The entire application (Frontend, Backend, Database, Cache, and Nginx) is orchestrated via a single `docker-compose.yml` file.
*   **Reverse Proxy:** An Nginx container handles port forwarding (Port 80) and seamlessly routes traffic to the internal Next.js and FastAPI services.

---

## 💻 Tech Stack

### Frontend
*   **Framework:** Next.js (React)
*   **Styling:** TailwindCSS
*   **State Management / API:** Axios

### Backend
*   **Framework:** Python (FastAPI)
*   **Database:** PostgreSQL (Migrated from SQLite for production scale)
*   **ORM:** Prisma (Prisma Client Python)
*   **Security:** JWT Authentication & Passlib (Bcrypt) Hashing

### DevOps & Cloud
*   **Infrastructure:** AWS EC2 (`t3.micro`), Docker, Docker Compose
*   **Web Server:** Nginx
*   **Pipelines:** GitHub Actions (`deploy.yml`, `test.yml`)
*   **Testing:** PyTest, HTTPX (FastAPI TestClient)

---

## 🛠️ How to Run Locally

Because the entire infrastructure is containerized, running the application locally takes only one command.

### 1. Clone the repository
```bash
git clone https://github.com/ShivaGundeti/Url-Shortner.git
cd Url-Shortner
```

### 2. Start the Microservices
Make sure Docker Desktop is running on your machine, then execute:
```bash
docker compose up --build
```
This will automatically download the required images, provision the PostgreSQL database, compile the Next.js frontend, and launch the FastAPI backend.

### 3. Access the Application
*   **Frontend UI:** `http://localhost:3000`
*   **Backend API:** `http://localhost:8000`
