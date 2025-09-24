# WanderLuxe Ventures Backend API

A modern FastAPI backend for the WanderLuxe Ventures travel blog application.

## Features

- **JWT Authentication** - Secure user authentication with JWT tokens
- **User Management** - User registration and profile management
- **Blog CRUD Operations** - Create, read, update, and delete blog posts
- **Authorization** - Only authenticated users can create, edit, and delete posts
- **SQLite Database** - Lightweight database for development
- **CORS Support** - Configured for React frontend integration

## Setup

1. **Install Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Run the Application**
   ```bash
   python main.py
   ```

   The API will be available at `https://wanderluxe-ventures.onrender.com` (local) or `https://wanderluxe-ventures.onrender.com` (production)

3. **API Documentation**
   - Interactive docs: `https://wanderluxe-ventures.onrender.com/docs` (local) or `https://wanderluxe-ventures.onrender.com/docs` (production)
   - ReDoc: `https://wanderluxe-ventures.onrender.com/redoc` (local) or `https://wanderluxe-ventures.onrender.com/redoc` (production)

## Production Deployment

The API is deployed on Render and available at:
- **Production URL**: `https://wanderluxe-ventures.onrender.com`
- **Interactive docs**: `https://wanderluxe-ventures.onrender.com/docs`
- **ReDoc**: `https://wanderluxe-ventures.onrender.com/redoc`

## API Endpoints

### Authentication
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user info (requires authentication)

### Users
- `POST /users/register` - Register new user

### Posts
- `GET /posts/` - Get all posts (with pagination and search)
- `GET /posts/{post_id}` - Get single post
- `POST /posts/` - Create new post (requires authentication)
- `PUT /posts/{post_id}` - Update post (requires authentication + ownership)
- `DELETE /posts/{post_id}` - Delete post (requires authentication + ownership)
- `POST /posts/{post_id}/like` - Like a post (no authentication required)

## Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `hashed_password` - Bcrypt hashed password
- `is_active` - User status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Posts Table
- `id` - Primary key
- `title` - Post title
- `content` - Post content
- `description` - Post description
- `image` - Image URL/path
- `author` - Author name
- `likes` - Number of likes
- `comments` - Number of comments
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `owner_id` - Foreign key to users table

## Security Features

- **Password Hashing** - Bcrypt for secure password storage
- **JWT Tokens** - Secure authentication tokens
- **Authorization** - Users can only modify their own posts
- **CORS Protection** - Configured for specific origins

## Environment Variables

Create a `.env` file in the backend directory:
```
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
