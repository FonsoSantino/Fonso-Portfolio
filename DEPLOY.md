# Deployment Guide

## 1. Environment Variables

Ensure these are set in your production environment (Vercel, Railway, etc.):

**Backend:**
- `DATABASE_URL`: Connection string to PostgreSQL (e.g., Supabase, Neon, Railway DB).
- `SECRET_KEY`: Long random string for JWT.
- `OPENAI_API_KEY`: Key from OpenAI platform.
- `FIRST_SUPERUSER`: Admin email.
- `FIRST_SUPERUSER_PASSWORD`: Admin password.
- `BACKEND_CORS_ORIGINS`: JSON list of allowed origins (e.g., `["https://your-frontend.vercel.app"]`).

**Frontend:**
- `NEXT_PUBLIC_API_URL`: URL to your deployed backend (e.g., `https://fonso-backend.up.railway.app/api/v1`).

---

## 2. Deploying Backend (Railway / Fly.io)

**Railway / Render / Fly:**
1. Connect your repository.
2. Point the build context to `backend/`.
3. Set the start command to `./start.sh` (ensure it has executable permissions in repo).
4. Add the Environment Variables listed above.
5. Deploy. The `start.sh` script will automatically run migrations and seed the database.

---

## 3. Deploying Frontend (Vercel)

1. Connect your repository to Vercel.
2. In the Vercel Dashboard, go to **Project Settings**.
3. Set the **Root Directory** to `frontend`.
4. Vercel will then use the `vercel.json` located within that directory.
5. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed backend.
6. Deploy.

---

## 4. Verification

1. Visit the frontend URL.
2. Check if projects load (even if empty list).
3. Try asking the AI Assistant a question.
4. Go to `/login` and sign in with your superuser credentials.
5. Add a project in the Dashboard to verify DB writes.
