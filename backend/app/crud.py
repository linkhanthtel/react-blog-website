from fastapi import APIRouter, HTTPException, Depends
from app.database import database
from app.models import posts_table
from app.schemas import BlogPost, BlogPostCreate
from app.auth import oauth2_scheme

router = APIRouter()

@router.get("/", response_model=list[BlogPost])
async def get_posts():
    return await database.fetch_all(posts_table.select())

@router.get("/{post_id}", response_model=BlogPost)
async def get_post(post_id: int):
    post = await database.fetch_one(posts_table.select().where(posts_table.c.id == post_id))
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=BlogPost)
async def create_post(post: BlogPostCreate):
    query = posts_table.insert().values(**post.dict())
    post_id = await database.execute(query)
    return {**post.dict(), "id": post_id}

@router.delete("/{post_id}")
async def delete_post(post_id: int):
    query = posts_table.delete().where(posts_table.c.id == post_id)
    result = await database.execute(query)
    if not result:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}
