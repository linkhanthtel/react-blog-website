from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PostBase(BaseModel):
    title: str
    content: str
    description: Optional[str] = None
    image: Optional[str] = None
    author: str

class PostCreate(PostBase):
    pass

class PostUpdate(PostBase):
    title: Optional[str] = None
    content: Optional[str] = None

class Post(PostBase):
    id: int
    owner_id: int
    likes: int
    comments: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    posts: List[Post] = []

    class Config:
        orm_mode = True
