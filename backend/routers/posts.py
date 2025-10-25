from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
from models import User, Post
from schemas import PostCreate, PostUpdate, PostResponse, PostListResponse, CommentCreate, CommentResponse, CommentListResponse
from crud import get_posts, get_post, create_post, update_post, delete_post, like_post, get_comments, create_comment, delete_comment
from routers.auth import get_current_active_user
from ai_service import ai_service

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

# AI-Powered Recommendation Endpoints
@router.get("/{post_id}/recommendations")
async def get_post_recommendations(
    post_id: int,
    limit: int = 5,
    db: Session = Depends(get_db)
):
    """Get AI-powered similar post recommendations"""
    # Get the target post
    target_post = get_post(db, post_id=post_id)
    if target_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Get all other posts
    all_posts_result = get_posts(db, skip=0, limit=100, search="")
    all_posts = all_posts_result["posts"]
    
    # Filter out the target post
    other_posts = [post for post in all_posts if post["id"] != post_id]
    
    # Get similar posts using AI
    target_content = f"{target_post['title']} {target_post['content']} {target_post.get('description', '')}"
    similar_posts = ai_service.find_similar_posts(target_content, other_posts, limit)
    
    return {
        "target_post": target_post,
        "recommendations": similar_posts,
        "total_recommendations": len(similar_posts)
    }

@router.get("/trending/ai")
async def get_ai_trending_posts(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """Get AI-powered trending posts based on content quality and engagement"""
    # Get all posts
    all_posts_result = get_posts(db, skip=0, limit=100, search="")
    all_posts = all_posts_result["posts"]
    
    # Score posts based on multiple factors
    scored_posts = []
    for post in all_posts:
        score = 0
        
        # Engagement score (likes + comments)
        engagement_score = post.get('likes', 0) * 2 + post.get('comments', 0) * 3
        score += engagement_score
        
        # Content quality score (based on length and structure)
        content_length = len(post.get('content', ''))
        if content_length > 500:
            score += 10
        if content_length > 1000:
            score += 20
        
        # Title quality (length and keywords)
        title_length = len(post.get('title', ''))
        if 30 <= title_length <= 60:  # SEO-friendly length
            score += 5
        
        # Has description
        if post.get('description'):
            score += 5
        
        # Has image
        if post.get('image'):
            score += 3
        
        scored_posts.append({
            **post,
            'ai_score': score
        })
    
    # Sort by AI score and return top posts
    trending_posts = sorted(scored_posts, key=lambda x: x['ai_score'], reverse=True)[:limit]
    
    return {
        "trending_posts": trending_posts,
        "total_posts": len(all_posts),
        "algorithm": "AI-powered scoring based on engagement, content quality, and SEO factors"
    }
