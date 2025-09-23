# Render Deployment Guide

## Environment Variables

Set these environment variables in your Render dashboard:

- `DATABASE_URL`: `sqlite:///./blog.db` (or your preferred database URL)
- `SECRET_KEY`: A secure random string for JWT tokens (generate with: `openssl rand -hex 32`)
- `ALGORITHM`: `HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`
- `ALLOWED_ORIGINS`: `http://localhost:3000,https://your-frontend-domain.onrender.com` (comma-separated list)

## Build Command

```bash
pip install -r requirements.txt
```

## Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Notes

- The app uses Python 3.11.9 (specified in runtime.txt)
- Pillow version 10.4.0 is compatible with Python 3.11
- The app creates a SQLite database automatically
- Static files are served from the `/uploads` directory
