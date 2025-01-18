from fastapi import FastAPI
from app.routers import users, posts
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

# Initialize database
Base.metadata.create_all(bind=engine)

# Define allowed origins
origins = [
    "http://localhost:3000",
]

# Create FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(posts.router, prefix="/posts", tags=["Posts"])

@app.get("/")
def root():
    return {"message": "Wanderluxe Ventures API"}
