from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from models import User, Post
from schemas import PostCreate, PostUpdate, PostResponse, PostListResponse, CommentCreate, CommentResponse, CommentListResponse
from crud import get_posts, get_post, create_post, update_post, delete_post, like_post, get_comments, create_comment, delete_comment
from routers.auth import get_current_active_user

router = APIRouter(prefix="/posts", tags=["posts"])

@router.get("/", response_model=PostListResponse)
async def read_posts(
    skip: int = 0, 
    limit: int = 10, 
    search: str = "", 
    db: Session = Depends(get_db)
):
    """Get all posts with pagination and search"""
    result = get_posts(db, skip=skip, limit=limit, search=search)
    return PostListResponse(
        posts=result["posts"],
        total=result["total"],
        has_more=result["has_more"]
    )

@router.get("/{post_id}", response_model=PostResponse)
async def read_post(post_id: int, db: Session = Depends(get_db)):
    """Get a single post by ID"""
    post = get_post(db, post_id=post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.post("/", response_model=PostResponse)
async def create_new_post(
    post: PostCreate, 
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new post (requires authentication)"""
    return create_post(db=db, post=post, owner_id=current_user.id)

@router.put("/{post_id}", response_model=PostResponse)
async def update_existing_post(
    post_id: int,
    post: PostUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a post (requires authentication and ownership)"""
    updated_post = update_post(db=db, post_id=post_id, post=post, owner_id=current_user.id)
    if updated_post is None:
        raise HTTPException(
            status_code=404, 
            detail="Post not found or you don't have permission to edit this post"
        )
    return updated_post

@router.delete("/{post_id}")
async def delete_existing_post(
    post_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a post (requires authentication and ownership)"""
    success = delete_post(db=db, post_id=post_id, owner_id=current_user.id)
    if not success:
        raise HTTPException(
            status_code=404,
            detail="Post not found or you don't have permission to delete this post"
        )
    return {"message": "Post deleted successfully"}

@router.post("/{post_id}/like", response_model=PostResponse)
async def like_a_post(post_id: int, db: Session = Depends(get_db)):
    """Like a post (no authentication required)"""
    liked_post = like_post(db=db, post_id=post_id)
    if liked_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return liked_post

# Comment endpoints
@router.get("/{post_id}/comments", response_model=CommentListResponse)
async def get_post_comments(
    post_id: int,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get comments for a post"""
    # Check if post exists
    post = get_post(db, post_id=post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    result = get_comments(db, post_id=post_id, skip=skip, limit=limit)
    return CommentListResponse(
        comments=result["comments"],
        total=result["total"]
    )

@router.post("/{post_id}/comments", response_model=CommentResponse)
async def create_post_comment(
    post_id: int,
    comment: CommentCreate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a comment on a post (requires authentication)"""
    # Check if post exists
    post = get_post(db, post_id=post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return create_comment(
        db=db, 
        comment=comment, 
        post_id=post_id, 
        user_id=current_user.id
    )

@router.delete("/{post_id}/comments/{comment_id}")
async def delete_post_comment(
    post_id: int,
    comment_id: int,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a comment (requires authentication and ownership)"""
    success = delete_comment(db=db, comment_id=comment_id, user_id=current_user.id)
    if not success:
        raise HTTPException(
            status_code=404,
            detail="Comment not found or you don't have permission to delete this comment"
        )
    return {"message": "Comment deleted successfully"}
