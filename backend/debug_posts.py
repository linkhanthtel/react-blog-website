#!/usr/bin/env python3

from fastapi import FastAPI
from fastapi.testclient import TestClient
from routers.posts import router as posts_router
from database import SessionLocal
from crud import get_posts

app = FastAPI()
app.include_router(posts_router, prefix="/posts", tags=["posts"])

client = TestClient(app)

def test_posts_endpoint():
    try:
        response = client.get("/posts/?skip=0&limit=10")
        print(f"Status code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_posts_endpoint()
