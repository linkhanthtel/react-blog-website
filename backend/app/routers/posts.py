from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.Post])
def fetch_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Fetch a list of posts with pagination.
    """
    return crud.get_posts(db, skip=skip, limit=limit)

@router.get("/{post_id}", response_model=schemas.Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    """
    Fetch a single post by its ID.
    """
    db_post = crud.get_post(db, post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@router.post("/", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), user_id: int = 1):  # Simulated user ID
    """
    Create a new post.
    """
    return crud.create_post(db, post, user_id)

@router.put("/{post_id}", response_model=schemas.Post)
def update_post(post_id: int, post: schemas.PostUpdate, db: Session = Depends(get_db), user_id: int = 1):
    """
    Update an existing post by its ID.
    """
    db_post = crud.get_post(db, post_id)
    if not db_post or db_post.owner_id != user_id:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    return crud.update_post(db, post_id, post)

@router.delete("/{post_id}", response_model=dict)
def delete_post(post_id: int, db: Session = Depends(get_db), user_id: int = 1):
    """
    Delete a post by its ID.
    """
    db_post = crud.get_post(db, post_id)
    if not db_post or db_post.owner_id != user_id:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    crud.delete_post(db, post_id)
    return {"message": "Post deleted successfully"}
