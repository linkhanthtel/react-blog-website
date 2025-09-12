from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users, posts, auth
from app.database import Base, engine

# Initialize database
Base.metadata.create_all(bind=engine)

# Define allowed origins
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Create FastAPI app
app = FastAPI(
    title="WanderLuxe Ventures API",
    description="A travel blog API with CRUD operations for posts and user management",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(posts.router, prefix="/posts", tags=["Posts"])

@app.get("/")
def root():
    return {
        "message": "WanderLuxe Ventures API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
