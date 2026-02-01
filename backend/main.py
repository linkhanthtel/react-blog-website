import os
from pathlib import Path

# Load .env from backend directory (when running from project root or backend)
env_path = Path(__file__).resolve().parent / ".env"
if env_path.exists():
    from dotenv import load_dotenv
    load_dotenv(env_path)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi import UploadFile, File
from fastapi.responses import FileResponse
from database import engine, Base
from routers import auth, users, posts
import uuid
from PIL import Image, ImageDraw, ImageFont
import io

# Import models to ensure they are registered with SQLAlchemy
from models import User, Post, Comment

# Create database tables
Base.metadata.create_all(bind=engine)

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Create FastAPI app
app = FastAPI(
    title="WanderLuxe Ventures API",
    description="A modern travel blog API with authentication and CRUD operations",
    version="1.0.0"
)

# CORS middleware for React frontend
allowed_origins = [
    "http://localhost:3000",
    "https://react-blog-website-omega.vercel.app",  # React dev server
    "https://www.wanderluxe.live",
]

# Add any additional origins from environment variable
if os.environ.get("ALLOWED_ORIGINS"):
    allowed_origins.extend(os.environ.get("ALLOWED_ORIGINS").split(","))

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for serving uploaded images
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(posts.router)

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "Welcome to WanderLuxe Ventures API"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}

@app.get("/api/placeholder/{width}/{height}")
async def get_placeholder_image(width: int, height: int):
    """Generate a placeholder image"""
    try:
        # Create a simple placeholder image
        img = Image.new('RGB', (width, height), color='#f3f4f6')
        draw = ImageDraw.Draw(img)
        
        # Add some text
        try:
            # Try to use a default font
            font = ImageFont.load_default()
        except:
            font = None
        
        text = f"{width}x{height}"
        if font:
            # Get text bounding box
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            
            # Center the text
            x = (width - text_width) // 2
            y = (height - text_height) // 2
            draw.text((x, y), text, fill='#9ca3af', font=font)
        else:
            # Fallback without font
            draw.text((width//4, height//2), text, fill='#9ca3af')
        
        # Save to bytes
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        img_byte_arr = img_byte_arr.getvalue()
        
        return FileResponse(
            io.BytesIO(img_byte_arr),
            media_type="image/png",
            filename=f"placeholder_{width}x{height}.png"
        )
    except Exception as e:
        # Return a simple 1x1 pixel if PIL fails
        return FileResponse(
            io.BytesIO(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\nIDATx\x9cc```\x00\x00\x00\x04\x00\x01\xdd\x8d\xb4\x1c\x00\x00\x00\x00IEND\xaeB`\x82'),
            media_type="image/png"
        )

@app.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    """Upload an image file"""
    # Validate file type
    if not file.content_type.startswith('image/'):
        return {"error": "File must be an image"}
    
    # Generate unique filename
    file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)
    
    try:
        # Save file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Return the URL to access the image
        image_url = f"/uploads/{unique_filename}"
        return {
            "message": "Image uploaded successfully",
            "filename": unique_filename,
            "url": image_url,
            "size": len(content)
        }
    except Exception as e:
        return {"error": f"Failed to upload image: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    import os
    
    # Get port from environment variable (for Render) or default to 8000
    port = int(os.environ.get("PORT", 8000))
    # Bind to 0.0.0.0 for Render, 127.0.0.1 for local development
    host = "0.0.0.0" if os.environ.get("RENDER") else "127.0.0.1"
    
    uvicorn.run(app, host=host, port=port)
