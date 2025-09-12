from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app import crud, schemas
from app.database import get_db
from app.auth import get_current_user
from app.models import User

router = APIRouter()

@router.get("/", response_model=dict)
def get_posts(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Get all posts with pagination and optional search.
    """
    posts = crud.get_posts(db, skip=skip, limit=limit, search=search)
    total = crud.get_posts_count(db, search=search)
    
    return {
        "posts": posts,
        "total": total,
        "skip": skip,
        "limit": limit,
        "has_more": skip + limit < total
    }

@router.get("/{post_id}", response_model=schemas.PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db)):
    """
    Get a single post by ID.
    """
    post = crud.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=schemas.PostResponse)
def create_post(
    post: schemas.PostCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new post.
    """
    return crud.create_post(db, post, current_user.id)

@router.put("/{post_id}", response_model=schemas.PostResponse)
def update_post(
    post_id: int, 
    post: schemas.PostUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing post.
    """
    db_post = crud.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this post")
    
    updated_post = crud.update_post(db, post_id, post, current_user.id)
    if not updated_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return updated_post

@router.delete("/{post_id}")
def delete_post(
    post_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a post.
    """
    db_post = crud.get_post(db, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    if db_post.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this post")
    
    crud.delete_post(db, post_id, current_user.id)
    return {"message": "Post deleted successfully"}

@router.post("/{post_id}/like", response_model=schemas.PostResponse)
def like_post(post_id: int, db: Session = Depends(get_db)):
    """
    Like a post.
    """
    post = crud.like_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.get("/user/{user_id}", response_model=list[schemas.PostResponse])
def get_user_posts(
    user_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Get posts by a specific user.
    """
    posts = crud.get_posts_by_user(db, user_id, skip=skip, limit=limit)
    return posts
