from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from models import Post, User, Comment
from schemas import PostCreate, PostUpdate, CommentCreate

def get_posts(db: Session, skip: int = 0, limit: int = 10, search: str = ""):
    """Get posts with pagination and search"""
    query = db.query(Post)
    
    if search:
        query = query.filter(
            Post.title.contains(search) | 
            Post.content.contains(search) | 
            Post.author.contains(search)
        )
    
    total = query.count()
    posts = query.offset(skip).limit(limit).all()
    has_more = skip + limit < total
    
    return {
        "posts": posts,
        "total": total,
        "has_more": has_more
    }

def get_post(db: Session, post_id: int) -> Optional[Post]:
    """Get a single post by ID"""
    return db.query(Post).filter(Post.id == post_id).first()

def create_post(db: Session, post: PostCreate, owner_id: int) -> Post:
    """Create a new post"""
    db_post = Post(
        title=post.title,
        content=post.content,
        description=post.description,
        image=post.image,
        author=post.author,
        owner_id=owner_id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_post(db: Session, post_id: int, post: PostUpdate, owner_id: int) -> Optional[Post]:
    """Update a post (only by owner)"""
    db_post = db.query(Post).filter(Post.id == post_id, Post.owner_id == owner_id).first()
    if not db_post:
        return None
    
    update_data = post.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int, owner_id: int) -> bool:
    """Delete a post (only by owner)"""
    db_post = db.query(Post).filter(Post.id == post_id, Post.owner_id == owner_id).first()
    if not db_post:
        return False
    
    db.delete(db_post)
    db.commit()
    return True

def like_post(db: Session, post_id: int) -> Optional[Post]:
    """Like a post (increment likes count)"""
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        return None
    
    db_post.likes += 1
    db.commit()
    db.refresh(db_post)
    return db_post

def get_user_posts(db: Session, user_id: int, skip: int = 0, limit: int = 10) -> List[Post]:
    """Get posts by a specific user"""
    return db.query(Post).filter(Post.owner_id == user_id).offset(skip).limit(limit).all()

# Comment CRUD operations
def get_comments(db: Session, post_id: int, skip: int = 0, limit: int = 10):
    """Get comments for a post with pagination"""
    query = db.query(Comment).filter(Comment.post_id == post_id).order_by(Comment.created_at.desc())
    
    total = query.count()
    comments = query.offset(skip).limit(limit).all()
    has_more = skip + limit < total
    
    return {
        "comments": comments,
        "total": total,
        "has_more": has_more
    }

def create_comment(db: Session, comment: CommentCreate, post_id: int, user_id: int) -> Comment:
    """Create a new comment"""
    db_comment = Comment(
        content=comment.content,
        author=comment.author,
        post_id=post_id,
        user_id=user_id
    )
    db.add(db_comment)
    
    # Update post comments count
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if db_post:
        db_post.comments += 1
    
    db.commit()
    db.refresh(db_comment)
    return db_comment

def delete_comment(db: Session, comment_id: int, user_id: int) -> bool:
    """Delete a comment (only by owner)"""
    db_comment = db.query(Comment).filter(Comment.id == comment_id, Comment.user_id == user_id).first()
    if not db_comment:
        return False
    
    # Update post comments count
    db_post = db.query(Post).filter(Post.id == db_comment.post_id).first()
    if db_post and db_post.comments > 0:
        db_post.comments -= 1
    
    db.delete(db_comment)
    db.commit()
    return True
