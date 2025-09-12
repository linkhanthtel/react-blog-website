from sqlalchemy.orm import Session
from sqlalchemy import desc
from app import models, schemas
from app.auth import hash_password
from typing import List, Optional

# User CRUD operations
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

# Post CRUD operations
def get_post(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def get_posts(db: Session, skip: int = 0, limit: int = 10, search: Optional[str] = None):
    query = db.query(models.Post)
    if search:
        query = query.filter(
            models.Post.title.contains(search) | 
            models.Post.content.contains(search) |
            models.Post.author.contains(search)
        )
    return query.order_by(desc(models.Post.created_at)).offset(skip).limit(limit).all()

def get_posts_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 10):
    return db.query(models.Post).filter(models.Post.owner_id == user_id).order_by(desc(models.Post.created_at)).offset(skip).limit(limit).all()

def create_post(db: Session, post: schemas.PostCreate, user_id: int):
    db_post = models.Post(**post.dict(), owner_id=user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_post(db: Session, post_id: int, post: schemas.PostUpdate, user_id: int):
    db_post = db.query(models.Post).filter(models.Post.id == post_id, models.Post.owner_id == user_id).first()
    if db_post:
        update_data = post.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_post, key, value)
        db.commit()
        db.refresh(db_post)
    return db_post

def delete_post(db: Session, post_id: int, user_id: int):
    db_post = db.query(models.Post).filter(models.Post.id == post_id, models.Post.owner_id == user_id).first()
    if db_post:
        db.delete(db_post)
        db.commit()
    return db_post

def like_post(db: Session, post_id: int):
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if db_post:
        db_post.likes += 1
        db.commit()
        db.refresh(db_post)
    return db_post

def get_posts_count(db: Session, search: Optional[str] = None):
    query = db.query(models.Post)
    if search:
        query = query.filter(
            models.Post.title.contains(search) | 
            models.Post.content.contains(search) |
            models.Post.author.contains(search)
        )
    return query.count()
