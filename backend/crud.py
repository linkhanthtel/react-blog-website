from fastapi import APIRouter, HTTPException, Depends
from database import database
from models import posts_table
from schemas import BlogPost, BlogPostCreate
from auth import oauth2_scheme, create_access_token

# Router
router = APIRouter()

@router.get("/", response_model=list[BlogPost])
async def get_posts():
    query = posts_table.select()
    return await database.fetch_all(query)

@router.get("/{post_id}", response_model=BlogPost)
async def get_post(post_id: int):
    query = posts_table.select().where(posts_table.c.id == post_id)
    post = await database.fetch_one(query)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=BlogPost)
async def create_post(post: BlogPostCreate, token: str = Depends(oauth2_scheme)):
    query = posts_table.insert().values(**post.dict())
    post_id = await database.execute(query)
    return {**post.dict(), "id": post_id}

@router.put("/{post_id}", response_model=BlogPost)
async def update_post(post_id: int, updated_post: BlogPostCreate, token: str = Depends(oauth2_scheme)):
    query = posts_table.update().where(posts_table.c.id == post_id).values(**updated_post.dict())
    await database.execute(query)
    return {**updated_post.dict(), "id": post_id}

@router.delete("/{post_id}")
async def delete_post(post_id: int, token: str = Depends(oauth2_scheme)):
    query = posts_table.delete().where(posts_table.c.id == post_id)
    result = await database.execute(query)
    if not result:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}
