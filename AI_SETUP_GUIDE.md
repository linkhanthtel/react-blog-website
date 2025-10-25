# 🤖 AI Features Setup Guide

## Quick Start

The AI features are implemented but need the backend to be running with AI dependencies. Here's how to get them working:

## 1. Install AI Dependencies

```bash
cd backend
pip install -r requirements.txt
```

## 2. Start the Backend

```bash
cd backend
python main.py
```

The backend will start on `http://localhost:8000` (or the port shown in terminal).

## 3. Start the Frontend

```bash
npm start
```

The frontend will start on `http://localhost:3000`.

## 4. Test AI Features

1. **Go to Blog Management**: Navigate to `/manage-blogs` (you need to be logged in)
2. **Look for AI Test Panel**: You'll see a purple "AI Features Test Panel" at the top
3. **Click "Test AI Features"**: This will test all AI endpoints
4. **Check Navbar**: Look for the AI status indicator (green "AI Online" or red "AI Offline")

## 5. Use AI Features

### In Blog Management:
1. Click "Create New Post"
2. Click "Show AI Assistant" 
3. Use the AI buttons to:
   - Generate descriptions
   - Suggest titles
   - Generate tags
   - Improve content
   - Check content moderation

### In Blog Posts:
- AI-powered recommendations will appear in the sidebar
- AI trending posts will show in the blogs page

## Troubleshooting

### If AI Test Shows "AI Offline":
1. **Check Backend**: Make sure backend is running on port 8000
2. **Check Dependencies**: Run `pip install -r requirements.txt` in backend folder
3. **Check Console**: Look for error messages in browser console
4. **Check Network**: Open browser dev tools and check if API calls are failing

### If AI Features Don't Work:
1. **Backend Not Running**: Start the backend with `python main.py`
2. **Dependencies Missing**: Install AI dependencies
3. **API Connection**: Check if frontend can reach backend API
4. **CORS Issues**: Make sure backend allows frontend origin

## AI Features Available

### ✅ Content Enhancement
- Auto-generate descriptions
- Suggest better titles  
- Generate relevant tags
- Content improvement suggestions
- Content moderation

### ✅ Smart Recommendations
- AI-powered similar posts
- Trending posts algorithm
- Content-based filtering

### ✅ Travel Insights
- Destination insights
- Weather information
- Cultural tips

## Fallback System

The AI features have fallback systems:
- **Without OpenAI API**: Uses local models and rule-based approaches
- **Without AI Services**: Gracefully degrades to basic functionality
- **Error Handling**: Shows helpful error messages

## Optional: Enhanced AI Features

For better AI features, add your OpenAI API key to `backend/.env`:

```env
OPENAI_API_KEY=your-openai-api-key-here
```

Without this, AI features still work but with local models.

## Need Help?

1. Check the browser console for errors
2. Check the backend terminal for error messages
3. Make sure all dependencies are installed
4. Verify the backend is running on the correct port

The AI features are designed to work out of the box with fallback systems, so even if some AI services aren't available, the app will still function normally!
