import os
import json
import asyncio
import numpy as np
from typing import List, Dict, Optional, Tuple
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import openai
import requests
from transformers import pipeline
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        """Initialize AI service with various models and APIs"""
        self.openai_client = None
        self.sentence_model = None
        self.moderation_pipeline = None
        self.embeddings_cache = {}
        
        # Initialize OpenAI if API key is available
        if os.getenv("OPENAI_API_KEY"):
            try:
                self.openai_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
                logger.info("OpenAI client initialized successfully")
            except Exception as e:
                logger.warning(f"Failed to initialize OpenAI client: {e}")
        
        # Initialize sentence transformer for embeddings
        try:
            self.sentence_model = SentenceTransformer('all-MiniLM-L6-v2')
            logger.info("Sentence transformer model loaded successfully")
        except Exception as e:
            logger.warning(f"Failed to load sentence transformer: {e}")
        
        # Initialize content moderation pipeline
        try:
            self.moderation_pipeline = pipeline("text-classification", 
                                              model="unitary/toxic-bert", 
                                              return_all_scores=True)
            logger.info("Content moderation model loaded successfully")
        except Exception as e:
            logger.warning(f"Failed to load moderation model: {e}")

    async def generate_description(self, content: str, title: str = "") -> str:
        """Generate a compelling description from blog content"""
        if not self.openai_client:
            return self._fallback_description(content, title)
        
        try:
            prompt = f"""You are a travel blog assistant. Generate a compelling 1-2 sentence description for this travel blog post.

Title: {title}
Content: {content[:1000]}

Generate a description that:
- Captures the essence of the travel experience
- Is engaging and makes people want to read more
- Is 1-2 sentences long
- Focuses on the unique aspects of the destination or experience

Description:"""

            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional travel blog writer who creates compelling descriptions."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=150,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error generating description: {e}")
            return self._fallback_description(content, title)

    async def suggest_title(self, content: str, current_title: str = "") -> str:
        """Suggest a better, SEO-friendly title for the blog post"""
        if not self.openai_client:
            return self._fallback_title(content, current_title)
        
        try:
            prompt = f"""You are a travel blog SEO expert. Suggest an engaging, SEO-friendly title for this travel blog post.

Current Title: {current_title}
Content: {content[:1000]}

Generate a title that:
- Is engaging and click-worthy
- Contains relevant keywords for SEO
- Is 50-60 characters long
- Captures the main attraction or experience
- Uses power words that inspire travel

Title:"""

            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional travel blog SEO expert who creates compelling, searchable titles."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=100,
                temperature=0.8
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            logger.error(f"Error suggesting title: {e}")
            return self._fallback_title(content, current_title)

    async def generate_tags(self, content: str, title: str = "") -> List[str]:
        """Generate relevant tags for the blog post"""
        if not self.openai_client:
            return self._fallback_tags(content, title)
        
        try:
            prompt = f"""Generate 5-8 relevant tags for this travel blog post. Focus on:
- Destination names
- Activities mentioned
- Travel type (adventure, luxury, budget, etc.)
- Season or time of year
- Travel style

Title: {title}
Content: {content[:1000]}

Return only the tags, separated by commas, no other text:"""

            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a travel blog tagging expert. Generate relevant, searchable tags."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=100,
                temperature=0.5
            )
            
            tags_text = response.choices[0].message.content.strip()
            tags = [tag.strip().lower() for tag in tags_text.split(',') if tag.strip()]
            return tags[:8]  # Limit to 8 tags
        except Exception as e:
            logger.error(f"Error generating tags: {e}")
            return self._fallback_tags(content, title)

    async def improve_content(self, content: str) -> Dict[str, str]:
        """Analyze and suggest improvements for blog content"""
        if not self.openai_client:
            return self._fallback_content_improvement(content)
        
        try:
            prompt = f"""Analyze this travel blog content and provide specific improvement suggestions.

Content: {content}

Provide suggestions for:
1. Grammar and readability improvements
2. Adding more engaging details
3. Better structure or flow
4. Missing information that would be valuable to readers

Format your response as JSON with these keys:
- "grammar_fixes": List of specific grammar issues and fixes
- "readability_score": Score from 1-10
- "suggestions": List of 3-5 specific improvement suggestions
- "missing_elements": List of information that could be added

Response:"""

            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional travel blog editor who provides constructive feedback."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=500,
                temperature=0.3
            )
            
            try:
                return json.loads(response.choices[0].message.content.strip())
            except json.JSONDecodeError:
                return self._fallback_content_improvement(content)
        except Exception as e:
            logger.error(f"Error improving content: {e}")
            return self._fallback_content_improvement(content)

    def get_content_embedding(self, content: str) -> Optional[np.ndarray]:
        """Get embedding vector for content using sentence transformer"""
        if not self.sentence_model:
            return None
        
        try:
            # Use cache if available
            content_hash = hash(content)
            if content_hash in self.embeddings_cache:
                return self.embeddings_cache[content_hash]
            
            # Generate embedding
            embedding = self.sentence_model.encode(content)
            self.embeddings_cache[content_hash] = embedding
            return embedding
        except Exception as e:
            logger.error(f"Error generating embedding: {e}")
            return None

    def find_similar_posts(self, target_content: str, all_posts: List[Dict], top_k: int = 5) -> List[Dict]:
        """Find similar posts based on content similarity"""
        if not self.sentence_model or not all_posts:
            return all_posts[:top_k]
        
        try:
            # Get target embedding
            target_embedding = self.get_content_embedding(target_content)
            if target_embedding is None:
                return all_posts[:top_k]
            
            # Get embeddings for all posts
            post_embeddings = []
            valid_posts = []
            
            for post in all_posts:
                post_content = f"{post.get('title', '')} {post.get('content', '')} {post.get('description', '')}"
                embedding = self.get_content_embedding(post_content)
                if embedding is not None:
                    post_embeddings.append(embedding)
                    valid_posts.append(post)
            
            if not post_embeddings:
                return all_posts[:top_k]
            
            # Calculate similarities
            similarities = cosine_similarity([target_embedding], post_embeddings)[0]
            
            # Get top similar posts
            similar_indices = np.argsort(similarities)[::-1][:top_k]
            similar_posts = [valid_posts[i] for i in similar_indices]
            
            return similar_posts
        except Exception as e:
            logger.error(f"Error finding similar posts: {e}")
            return all_posts[:top_k]

    def moderate_content(self, content: str) -> Dict[str, any]:
        """Check content for inappropriate material"""
        if not self.moderation_pipeline:
            return {"is_safe": True, "confidence": 1.0, "issues": []}
        
        try:
            results = self.moderation_pipeline(content)
            
            # Check for toxic content
            toxic_score = 0
            issues = []
            
            for result in results:
                if result['label'] in ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']:
                    toxic_score = max(toxic_score, result['score'])
                    if result['score'] > 0.5:
                        issues.append(f"{result['label']}: {result['score']:.2f}")
            
            is_safe = toxic_score < 0.5
            confidence = 1.0 - toxic_score
            
            return {
                "is_safe": is_safe,
                "confidence": confidence,
                "issues": issues,
                "toxic_score": toxic_score
            }
        except Exception as e:
            logger.error(f"Error moderating content: {e}")
            return {"is_safe": True, "confidence": 1.0, "issues": []}

    async def generate_travel_insights(self, destination: str, content: str = "") -> Dict[str, str]:
        """Generate travel insights for a destination"""
        if not self.openai_client:
            return self._fallback_travel_insights(destination)
        
        try:
            prompt = f"""Generate helpful travel insights for {destination}. Include:

1. Best time to visit
2. Must-see attractions
3. Local tips and recommendations
4. Budget considerations
5. Cultural etiquette notes

Destination: {destination}
Content context: {content[:500] if content else "General travel information"}

Format as JSON with keys: "best_time", "attractions", "tips", "budget", "etiquette"
"""

            response = self.openai_client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a knowledgeable travel guide who provides practical, helpful travel insights."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=600,
                temperature=0.7
            )
            
            try:
                return json.loads(response.choices[0].message.content.strip())
            except json.JSONDecodeError:
                return self._fallback_travel_insights(destination)
        except Exception as e:
            logger.error(f"Error generating travel insights: {e}")
            return self._fallback_travel_insights(destination)

    async def get_weather_insights(self, location: str) -> Dict[str, str]:
        """Get weather information for a location"""
        try:
            # Using a free weather API (OpenWeatherMap requires API key, so using a simple approach)
            # In production, you'd use a proper weather API
            return {
                "location": location,
                "current_weather": "Sunny, 25°C",
                "recommendation": "Perfect weather for outdoor activities!",
                "packing_tip": "Bring sunscreen and light clothing."
            }
        except Exception as e:
            logger.error(f"Error getting weather insights: {e}")
            return {
                "location": location,
                "current_weather": "Weather data unavailable",
                "recommendation": "Check local weather before traveling",
                "packing_tip": "Pack for various weather conditions"
            }

    # Fallback methods for when AI services are unavailable
    def _fallback_description(self, content: str, title: str) -> str:
        """Generate a simple description when AI is unavailable"""
        words = content.split()[:20]
        return f"Discover {title.lower() if title else 'this amazing destination'} and experience {', '.join(words[:5])}..."

    def _fallback_title(self, content: str, current_title: str) -> str:
        """Generate a simple title when AI is unavailable"""
        if current_title:
            return current_title
        words = content.split()[:5]
        return f"Amazing {', '.join(words[:2])} Experience"

    def _fallback_tags(self, content: str, title: str) -> List[str]:
        """Generate basic tags when AI is unavailable"""
        tags = []
        content_lower = content.lower()
        
        # Basic tag extraction
        if any(word in content_lower for word in ['beach', 'ocean', 'sea', 'coast']):
            tags.append('beach')
        if any(word in content_lower for word in ['mountain', 'hiking', 'trail', 'peak']):
            tags.append('mountain')
        if any(word in content_lower for word in ['city', 'urban', 'downtown']):
            tags.append('city')
        if any(word in content_lower for word in ['food', 'restaurant', 'cuisine', 'eat']):
            tags.append('food')
        if any(word in content_lower for word in ['culture', 'museum', 'history', 'traditional']):
            tags.append('culture')
        
        return tags[:5]

    def _fallback_content_improvement(self, content: str) -> Dict[str, str]:
        """Basic content analysis when AI is unavailable"""
        word_count = len(content.split())
        return {
            "grammar_fixes": ["Check for typos and grammar"],
            "readability_score": "7",
            "suggestions": [
                "Add more descriptive details",
                "Include personal experiences",
                "Add practical travel tips"
            ],
            "missing_elements": ["Travel costs", "Best time to visit", "Local recommendations"]
        }

    def _fallback_travel_insights(self, destination: str) -> Dict[str, str]:
        """Basic travel insights when AI is unavailable"""
        return {
            "best_time": "Spring and Fall for mild weather",
            "attractions": "Check local tourism websites for current attractions",
            "tips": "Research local customs and language basics",
            "budget": "Plan for accommodation, food, and activities",
            "etiquette": "Be respectful of local customs and traditions"
        }

# Create singleton instance
ai_service = AIService()
