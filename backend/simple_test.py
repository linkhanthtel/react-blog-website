#!/usr/bin/env python3

from database import SessionLocal
from crud import get_posts
from schemas import PostListResponse

def test_simple():
    db = SessionLocal()
    try:
        # Test get_posts
        result = get_posts(db, skip=0, limit=5)
        print(f"get_posts result type: {type(result)}")
        print(f"get_posts result keys: {result.keys()}")
        print(f"posts type: {type(result['posts'])}")
        print(f"first post type: {type(result['posts'][0])}")
        
        # Test PostListResponse
        response = PostListResponse(
            posts=result["posts"],
            total=result["total"],
            has_more=result["has_more"]
        )
        print(f"PostListResponse created successfully")
        print(f"Response type: {type(response)}")
        print(f"Response posts count: {len(response.posts)}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    test_simple()
