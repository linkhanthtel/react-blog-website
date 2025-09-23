# Render Deployment Guide

## Environment Variables

Set these environment variables in your Render dashboard:

- `DATABASE_URL`: `sqlite:///./blog.db` (or your preferred database URL)
- `SECRET_KEY`: A secure random string for JWT tokens (generate with: `openssl rand -hex 32`)
- `ALGORITHM`: `HS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES`: `30`
- `ALLOWED_ORIGINS`: `http://localhost:3000,https://your-frontend-domain.onrender.com` (comma-separated list)

## Build Command

**Recommended (minimal versions, no compilation):**
```bash
pip install -r requirements-minimal.txt
```

**Alternative:**
```bash
pip install -r requirements.txt
```

**If you encounter Rust compilation issues:**
```bash
pip install -r requirements-render.txt
```

## Start Command

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## Notes

- The app uses Python 3.9.18 (specified in runtime.txt)
- All packages use pre-compiled wheels (no Rust compilation needed)
- Pydantic v1.10.12 is used for better compatibility
- The app creates a SQLite database automatically
- Static files are served from the `/uploads` directory

## Troubleshooting

### Rust Compilation Issues
If you see Rust/Cargo errors during build:
1. Use `requirements-render.txt` instead of `requirements.txt`
2. Ensure Python 3.11.7 is being used (check runtime.txt)
3. Try adding `--no-cache-dir` to pip install command

### Python Version Issues
If Render is still using Python 3.13:
1. Delete and recreate the service on Render
2. Ensure `runtime.txt` is in the root of your backend directory
3. Check that the file contains exactly `python-3.11.7`

### Build Command for Render
If the default build fails, try:
```bash
pip install --no-cache-dir -r requirements-render.txt
```
