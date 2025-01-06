from pydantic import BaseModel
from typing import List, Optional

class BlogPost(BaseModel):
    id: int
    title: str
    content: str
    author: str
    tags: Optional[List[str]] = []

class BlogPostCreate(BaseModel):
    title: str
    content: str
    author: str
    tags: Optional[List[str]] = []

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str
