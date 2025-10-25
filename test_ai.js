// Simple script to test AI features
// Run this in your browser console on the frontend

async function testAIFeatures() {
  console.log('🤖 Testing AI Features...');
  
  try {
    // Test AI health
    const healthResponse = await fetch('https://wanderluxe-ventures.onrender.com/ai/health');
    const health = await healthResponse.json();
    console.log('✅ AI Health:', health);
    
    // Test AI description generation
    const descriptionResponse = await fetch('https://wanderluxe-ventures.onrender.com/ai/generate-description', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: "I visited the beautiful beaches of Bali and had an amazing time exploring the local culture and cuisine.",
        title: "Bali Adventure"
      })
    });
    const description = await descriptionResponse.json();
    console.log('✅ AI Description:', description);
    
    // Test AI title suggestion
    const titleResponse = await fetch('https://wanderluxe-ventures.onrender.com/ai/suggest-title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: "I visited the beautiful beaches of Bali and had an amazing time exploring the local culture and cuisine.",
        title: "My Trip"
      })
    });
    const title = await titleResponse.json();
    console.log('✅ AI Title:', title);
    
    console.log('🎉 All AI features are working!');
    
  } catch (error) {
    console.error('❌ AI Test Failed:', error);
    console.log('💡 Make sure the backend is running with AI dependencies installed');
  }
}

// Run the test
testAIFeatures();
