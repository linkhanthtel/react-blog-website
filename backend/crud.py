from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from models import Post, User
from schemas import PostCreate, PostUpdate

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
