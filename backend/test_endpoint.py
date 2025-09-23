#!/usr/bin/env python3

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import get_db
from crud import get_posts
from schemas import PostListResponse

app = FastAPI()

@app.get("/test-posts")
async def test_posts(db: Session = Depends(get_db)):
    """Test posts endpoint"""
    try:
        result = get_posts(db, skip=0, limit=5)
        return PostListResponse(
            posts=result["posts"],
            total=result["total"],
            has_more=result["has_more"]
        )
    except Exception as e:
        return {"error": str(e), "type": type(e).__name__}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
