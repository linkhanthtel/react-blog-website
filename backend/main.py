from fastapi import FastAPI
from database import database, engine, metadata
import auth, crud

# Initialize FastAPI app
app = FastAPI()

# Create database tables on startup
metadata.create_all(engine)

# Include routers for modularity
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(crud.router, prefix="/posts", tags=["Blog Posts"])

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
