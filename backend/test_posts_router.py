#!/usr/bin/env python3

from fastapi import FastAPI
from routers.posts import router as posts_router

app = FastAPI()
app.include_router(posts_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8002)
