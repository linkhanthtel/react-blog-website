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
from ai_service import ai_service
from pydantic import BaseModel
from typing import List, Dict, Optional
import uuid
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
import io

# Import models to ensure they are registered with SQLAlchemy
from models import User, Post, Comment

# AI Request/Response Models
class AIContentRequest(BaseModel):
    content: str
    title: Optional[str] = ""
    destination: Optional[str] = ""

class AIDescriptionResponse(BaseModel):
    description: str

class AITitleResponse(BaseModel):
    title: str

class AITagsResponse(BaseModel):
    tags: List[str]

class AIContentImprovementResponse(BaseModel):
    grammar_fixes: List[str]
    readability_score: str
    suggestions: List[str]
    missing_elements: List[str]

class AISimilarPostsRequest(BaseModel):
    content: str
    top_k: int = 5

class AISimilarPostsResponse(BaseModel):
    similar_posts: List[Dict]

class AIContentModerationResponse(BaseModel):
    is_safe: bool
    confidence: float
    issues: List[str]
    toxic_score: float

class AITravelInsightsResponse(BaseModel):
    best_time: str
    attractions: str
    tips: str
    budget: str
    etiquette: str

class AIWeatherInsightsResponse(BaseModel):
    location: str
    current_weather: str
    recommendation: str
    packing_tip: str

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

# AI Endpoints
@app.post("/ai/generate-description", response_model=AIDescriptionResponse)
async def generate_description(request: AIContentRequest):
    """Generate AI-powered description for blog content"""
    description = await ai_service.generate_description(request.content, request.title)
    return AIDescriptionResponse(description=description)

@app.post("/ai/suggest-title", response_model=AITitleResponse)
async def suggest_title(request: AIContentRequest):
    """Suggest AI-powered title for blog content"""
    title = await ai_service.suggest_title(request.content, request.title)
    return AITitleResponse(title=title)

@app.post("/ai/generate-tags", response_model=AITagsResponse)
async def generate_tags(request: AIContentRequest):
    """Generate AI-powered tags for blog content"""
    tags = await ai_service.generate_tags(request.content, request.title)
    return AITagsResponse(tags=tags)

@app.post("/ai/improve-content", response_model=AIContentImprovementResponse)
async def improve_content(request: AIContentRequest):
    """Get AI-powered content improvement suggestions"""
    improvements = await ai_service.improve_content(request.content)
    return AIContentImprovementResponse(**improvements)

@app.post("/ai/similar-posts", response_model=AISimilarPostsResponse)
async def find_similar_posts(request: AISimilarPostsRequest):
    """Find similar posts using AI content similarity"""
    # Get all posts from database
    from database import get_db
    from crud import get_posts
    db = next(get_db())
    all_posts_result = get_posts(db, skip=0, limit=100, search="")
    all_posts = all_posts_result["posts"]
    
    similar_posts = ai_service.find_similar_posts(request.content, all_posts, request.top_k)
    return AISimilarPostsResponse(similar_posts=similar_posts)

@app.post("/ai/moderate-content", response_model=AIContentModerationResponse)
async def moderate_content(request: AIContentRequest):
    """Moderate content for inappropriate material"""
    moderation_result = ai_service.moderate_content(request.content)
    return AIContentModerationResponse(**moderation_result)

@app.post("/ai/travel-insights", response_model=AITravelInsightsResponse)
async def get_travel_insights(request: AIContentRequest):
    """Get AI-generated travel insights for a destination"""
    insights = await ai_service.generate_travel_insights(request.destination or "destination", request.content)
    return AITravelInsightsResponse(**insights)

@app.post("/ai/weather-insights", response_model=AIWeatherInsightsResponse)
async def get_weather_insights(request: AIContentRequest):
    """Get weather insights for a location"""
    weather = await ai_service.get_weather_insights(request.destination or "location")
    return AIWeatherInsightsResponse(**weather)

@app.get("/ai/health")
async def ai_health_check():
    """Check AI service health"""
    return {
        "openai_available": ai_service.openai_client is not None,
        "sentence_model_available": ai_service.sentence_model is not None,
        "moderation_available": ai_service.moderation_pipeline is not None,
        "status": "AI services initialized"
    }

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
