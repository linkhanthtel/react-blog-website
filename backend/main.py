from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Secret key to encode and decode JWT tokens
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Initialize FastAPI app
app = FastAPI()

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# In-memory data stores
users_db = {
    "user1": {
        "username": "user1",
        "hashed_password": pwd_context.hash("password1"),
    }
}
blog_posts = []

# Pydantic models
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

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str
    password: str

# Utility functions
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(username: str, password: str):
    user = users_db.get(username)
    if user and verify_password(password, user["hashed_password"]):
        return user
    return None

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = users_db.get(token_data.username)
    if user is None:
        raise credentials_exception
    return user

# Endpoints
@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/posts", response_model=List[BlogPost])
async def get_posts():
    return blog_posts

@app.get("/posts/{post_id}", response_model=BlogPost)
async def get_post(post_id: int):
    post = next((post for post in blog_posts if post.id == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.post("/posts", response_model=BlogPost)
async def create_post(post: BlogPostCreate, current_user: User = Depends(get_current_user)):
    new_post = BlogPost(id=len(blog_posts) + 1, **post.dict())
    blog_posts.append(new_post)
    return new_post

@app.put("/posts/{post_id}", response_model=BlogPost)
async def update_post(post_id: int, updated_post: BlogPostCreate, current_user: User = Depends(get_current_user)):
    post = next((post for post in blog_posts if post.id == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.title = updated_post.title
    post.content = updated_post.content
    post.author = updated_post.author
    post.tags = updated_post.tags
    return post

@app.delete("/posts/{post_id}", response_model=BlogPost)
async def delete_post(post_id: int, current_user: User = Depends(get_current_user)):
    post = next((post for post in blog_posts if post.id == post_id), None)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    blog_posts.remove(post)
    return post

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
