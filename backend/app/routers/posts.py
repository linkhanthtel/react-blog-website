from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.Post])
def fetch_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_posts(db, skip=skip, limit=limit)

@router.post("/", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), user_id: int = 1):  # Simulated user ID
    return crud.create_post(db, post, user_id)

@router.put("/{post_id}", response_model=schemas.Post)
def update_post(post_id: int, post: schemas.PostUpdate, db: Session = Depends(get_db), user_id: int = 1):
    db_post = crud.update_post(db, post_id, post)
    if not db_post or db_post.owner_id != user_id:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    return db_post

@router.delete("/{post_id}", response_model=dict)
def delete_post(post_id: int, db: Session = Depends(get_db), user_id: int = 1):
    db_post = crud.delete_post(db, post_id)
    if not db_post or db_post.owner_id != user_id:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    return {"message": "Post deleted successfully"}
