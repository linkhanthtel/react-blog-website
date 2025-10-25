#!/bin/bash

echo "🤖 Setting up AI features for WanderLuxe Ventures..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed."
    exit 1
fi

echo "✅ Python and Node.js are installed"

# Install backend dependencies
echo "📦 Installing backend AI dependencies..."
cd backend
pip3 install -r requirements.txt

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Go back to root directory
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating .env file..."
    cat > backend/.env << EOF
# Database Configuration
DATABASE_URL=sqlite:///./blog.db

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Services Configuration (optional)
# OPENAI_API_KEY=your-openai-api-key-here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend-domain.com

# Server Configuration
PORT=8000
HOST=0.0.0.0
EOF
    echo "✅ .env file created"
else
    echo "ℹ️  .env file already exists"
fi

echo ""
echo "🎉 AI features setup complete!"
echo ""
echo "🚀 To start the application:"
echo "1. Backend: cd backend && python3 main.py"
echo "2. Frontend: npm start"
echo ""
echo "🤖 AI Features Available:"
echo "• Content Enhancement (titles, descriptions, tags)"
echo "• Smart Recommendations"
echo "• Content Moderation"
echo "• Travel Insights"
echo "• AI-powered trending posts"
echo ""
echo "📖 For more details, see AI_FEATURES.md"
echo ""
echo "💡 Note: AI features work with or without OpenAI API key!"
echo "   Add your OPENAI_API_KEY to backend/.env for enhanced features."
