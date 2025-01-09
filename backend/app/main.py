from fastapi import FastAPI
from app.database import database, engine, metadata
from app import auth, crud

app = FastAPI()

# Create tables if they don't exist
metadata.create_all(engine)

# Routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(crud.router, prefix="/posts", tags=["Posts"])

@app.on_event("startup")
async def startup():
    try:
        await database.connect()
    except Exception as e:
        print(f"Error connecting to the database: {e}")

@app.on_event("shutdown")
async def shutdown():
    try:
        await database.disconnect()
    except Exception as e:
        print(f"Error disconnecting from the database: {e}")
