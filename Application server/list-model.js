const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('config');

async function listAvailableModels() {
  const apiKey = config.get('your-gemini-Api-Key');
  const genAI = new GoogleGenerativeAI(apiKey);

  try {
    console.log("🔍 Fetching available models for your API Key...");
    
    // This calls the Google API to see what models your key can access
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    console.log("\n✅ AVAILABLE MODELS:");
    console.log("--------------------------------------------------");
    
    data.models.forEach(model => {
      // Look specifically for models that support 'generateContent'
      if (model.supportedGenerationMethods.includes('generateContent')) {
        console.log(`- ID: ${model.name.replace('models/', '')}`);
        console.log(`  Description: ${model.description}`);
        console.log("--------------------------------------------------");
      }
    });

  } catch (error) {
    console.error("❌ FAILED TO LIST MODELS:");
    console.error(error.message);
  }
}

listAvailableModels();