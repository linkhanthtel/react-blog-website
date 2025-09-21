from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    username: str
    password: str

# Post schemas
class PostBase(BaseModel):
    title: str
    content: str
    description: Optional[str] = None
    image: Optional[str] = None
    author: str

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    author: Optional[str] = None

class PostResponse(PostBase):
    id: int
    likes: int
    comments: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    owner_id: int
    
    class Config:
        from_attributes = True

class PostListResponse(BaseModel):
    posts: List[PostResponse]
    total: int
    has_more: bool

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Comment schemas
class CommentBase(BaseModel):
    content: str
    author: str

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: int
    post_id: int
    user_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class CommentListResponse(BaseModel):
    comments: List[CommentResponse]
    total: int
