from pydantic import BaseModel
from typing import Optional

class BlogPost(BaseModel):
    id: int
    title: str
    content: str
    author: str

class BlogPostCreate(BaseModel):
    title: str
    content: str
    author: str

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
