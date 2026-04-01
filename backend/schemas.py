from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List
from datetime import datetime, date

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
        orm_mode = True

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
        orm_mode = True

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
        orm_mode = True

class CommentListResponse(BaseModel):
    comments: List[CommentResponse]
    total: int


# Appointment / booking
ALLOWED_SERVICE_TYPES = frozenset({"plan_trip", "book_now", "consultation", "general"})


class AppointmentCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    appointment_date: date
    appointment_time: str
    service_type: str = "general"
    notes: Optional[str] = None

    @validator("full_name", "phone")
    def strip_strings(cls, v):
        if isinstance(v, str):
            v = v.strip()
        if not v:
            raise ValueError("must not be empty")
        return v

    @validator("service_type")
    def validate_service(cls, v):
        if v not in ALLOWED_SERVICE_TYPES:
            raise ValueError(f"service_type must be one of: {', '.join(sorted(ALLOWED_SERVICE_TYPES))}")
        return v


class AppointmentResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    appointment_date: date
    appointment_time: str
    service_type: str
    notes: Optional[str] = None
    status: str
    user_id: Optional[int] = None
    created_at: datetime

    class Config:
        orm_mode = True


class AppointmentListResponse(BaseModel):
    appointments: List[AppointmentResponse]
    total: int
