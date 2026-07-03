# Setup Guide — CollgePro Navigator

This guide walks you through setting up the full CollgePro Navigator stack (FastAPI backend + TanStack Start frontend + Supabase + Gemini AI) from scratch.

## Prerequisites

| Tool | Version | Why |
|------|---------|-----|
| Python | >= 3.10 | Backend runs on FastAPI |
| Node.js | >= 20 | Frontend runs on TanStack Start |
| npm or bun | Latest | Package management |
| Supabase account | Free tier | Database + Auth |
| Google AI Studio account | Free tier | Gemini API key |

## Step 1: Clone & Install Dependencies

```bash
# Clone the repo
git clone <repo-url>
cd collgepro-navigator-main

# Frontend dependencies
npm install
# or: bun install

# Backend dependencies
python -m venv backend/venv
source backend/venv/bin/activate  # Linux/Mac
# OR:
backend\venv\Scripts\activate     # Windows

pip install -r backend/requirements.txt
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose a name like "collgepro-navigator")
3. Wait for the database to provision (~2 minutes)
4. Go to **SQL Editor** in the Supabase dashboard
5. Open `backend/supabase_schema.sql` and paste the entire contents
6. Run the SQL — this creates all 17 tables
7. Go to **Project Settings → API** and copy:
   - `Project URL` (looks like `https://xxxxx.supabase.co`)
   - `anon public key` (the `anon` key)
   - `service_role key` (the `service_role` key)

## Step 3: Get a Gemini API Key

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Copy the key (it starts with `AIza...`)
5. This is **completely free** with 15 requests per minute on `gemini-2.0-flash`

## Step 4: Configure Environment

```bash
cd collgepro-navigator-main/backend
copy .env.example .env        # Windows
# OR:
cp .env.example .env          # Linux/Mac
```

Edit `.env` with your actual keys:

```env
# App
APP_NAME=CollgePro Navigator
DEBUG=true
PORT=8000

# Supabase
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-service-role-key-here
SUPABASE_JWT_SECRET=your-jwt-secret-here

# Gemini API (Free Tier)
GEMINI_API_KEY=your-gemini-api-key-here
GEMINI_LLM_MODEL=gemini-2.0-flash
GEMINI_VLM_MODEL=gemini-2.0-flash

# Auth
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Optional: for screen annotation overlay
ANNOTATION_WS_PORT=7780
```

Then create the frontend `.env`:

```bash
cd collgepro-navigator-main
echo VITE_API_URL=http://localhost:8000 > .env
```

## Step 5: Run the Backend

```bash
cd collgepro-navigator-main/backend

# Activate venv (if not already)
source venv/bin/activate   # Linux/Mac
# OR:
venv\Scripts\activate      # Windows

# Set PYTHONPATH so it can find vision_agent (optional)
export PYTHONPATH=$PYTHONPATH:$(pwd)/..    # Linux/Mac
# OR:
set PYTHONPATH=%PYTHONPATH%;%CD%\..        # Windows

# Start the server
uvicorn main:app --reload --port 8000
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

Open Swagger docs at: http://localhost:8000/docs

## Step 6: Run the Frontend

Open a **new terminal**:

```bash
cd collgepro-navigator-main
npm run dev
```

You should see:
```
VITE v6.x  ready in Xms
➜  Local:   http://localhost:8080
```

## Step 7: Verify Everything Works

1. Open `http://localhost:8080` — you should see the login page
2. Open `http://localhost:8000/docs` — you should see the Swagger API docs
3. Try signing up via Swagger: `POST /api/auth/signup`
4. Check Supabase Table Editor — the `profiles` table should have the new user
5. Try logging in via the frontend

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `ModuleNotFoundError: vision_agent` | Set `PYTHONPATH` to include the parent directory |
| `CORS error` | Add `http://localhost:8080` to CORS origins in `main.py` |
| `Gemini API key invalid` | Regenerate key at aistudio.google.com |
| `Supabase connection refused` | Check `SUPABASE_URL` and `SUPABASE_KEY` in `.env` |
| `port 8000 in use` | Use a different port: `uvicorn main:app --reload --port 8001` |
| `npm run dev fails` | Run `npm install` again, check Node.js version >= 20 |
