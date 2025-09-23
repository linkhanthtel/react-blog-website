#!/usr/bin/env python3

# Test if main.py can be imported without errors
try:
    from main import app
    print("✅ main.py imported successfully")
    print(f"✅ App type: {type(app)}")
    print(f"✅ App title: {app.title}")
    
    # Test if the app has the expected routes
    routes = [route.path for route in app.routes]
    print(f"✅ Routes: {routes}")
    
    # Check if posts route is included
    posts_routes = [route for route in app.routes if hasattr(route, 'path') and '/posts' in route.path]
    print(f"✅ Posts routes: {[route.path for route in posts_routes]}")
    
except Exception as e:
    print(f"❌ Error importing main.py: {e}")
    import traceback
    traceback.print_exc()
