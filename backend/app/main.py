from fastapi import FastAPI
from app.routers import users, posts
from app.database import Base, engine

# Initialize database
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# Include routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(posts.router, prefix="/posts", tags=["Posts"])

@app.get("/")
def root():
    return {"message": "Wanderluxe Ventures API"}
