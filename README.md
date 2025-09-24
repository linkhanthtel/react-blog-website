# 🚀 WanderLuxe Ventures

A modern, full-stack travel blog application built with React and FastAPI.

## ✨ Features

- 🎨 **Modern UI** - Beautiful, responsive design with dark/light mode
- 📝 **Blog Management** - Full CRUD operations for blog posts
- 🔐 **User Authentication** - JWT-based authentication system
- 🔍 **Search & Filter** - Advanced search functionality
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Optimized with modern technologies

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Beautiful iconography

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite/PostgreSQL** - Database
- **JWT** - Authentication
- **Pydantic** - Data validation

## 🚀 Quick Start

### Backend Setup
```bash
cd backend

# Install dependencies
pip3 install -r requirements.txt

# Start backend server
python3 run.py
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Start frontend server
npm start
```

## 📍 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: https://wanderluxe-ventures.onrender.com
- **API Documentation**: https://wanderluxe-ventures.onrender.com/docs

## 🧪 Testing

### Test Backend API
```bash
# Test health endpoint
curl https://wanderluxe-ventures.onrender.com/health

# Test root endpoint
curl https://wanderluxe-ventures.onrender.com/

# Test posts endpoint
curl https://wanderluxe-ventures.onrender.com/posts/
```

## 📁 Project Structure

```
react-blog-website/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── pages/             # Route components
│   ├── context/           # React context providers
│   └── images/            # Static images
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── routers/       # API route handlers
│   │   ├── models.py      # Database models
│   │   ├── schemas.py     # API schemas
│   │   └── main.py        # FastAPI app
│   ├── requirements.txt   # Python dependencies
│   └── run.py            # Backend startup script
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user info

### Users
- `POST /users/register` - Register new user
- `GET /users/me` - Get current user

### Posts
- `GET /posts/` - Get all posts (with pagination and search)
- `GET /posts/{post_id}` - Get single post
- `POST /posts/` - Create new post (requires auth)
- `PUT /posts/{post_id}` - Update post (requires auth)
- `DELETE /posts/{post_id}` - Delete post (requires auth)
- `POST /posts/{post_id}/like` - Like a post

## 🎨 Frontend Components

### Pages
- **Home** - Landing page with hero section and featured content
- **Blogs** - Blog listing with search functionality
- **SinglePost** - Individual blog post view
- **About** - Company information
- **Contact** - Contact form
- **Destination** - Travel destinations showcase
- **Join** - Community joining form

### Components
- **Navbar** - Responsive navigation with dark mode toggle
- **Footer** - Site footer with social links
- **Sidebar** - Reusable sidebar component
- **Article** - Individual article display
- **ArticleCard** - Article card for listings

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `hashed_password` - Bcrypt hashed password

### Posts Table
- `id` - Primary key
- `title` - Post title
- `content` - Post content
- `description` - Post description
- `image` - Image URL/path
- `author` - Author name
- `owner_id` - Foreign key to users table
- `likes` - Number of likes
- `comments` - Number of comments
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## 🧹 Cleanup

To clean up the application:

```bash
# Stop servers (Ctrl+C in terminal)
# Remove Python cache
find . -name "__pycache__" -type d -exec rm -rf {} +
find . -name "*.pyc" -type f -delete

# Remove node_modules (optional)
rm -rf node_modules

# Remove database (optional)
rm -f backend/test.db
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push changes to main branch
2. Vercel will auto-deploy

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy using the platform's CLI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🎉**
