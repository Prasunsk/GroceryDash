// test-gemini.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('config'); // Use config instead of dotenv

async function verifyGemini() {
  // Use the exact key name you have in config/default.json
  const apiKey = config.get('your-gemini-Api-Key'); 
  
  if (!apiKey || apiKey === "your_actual_key_here") {
    console.error("❌ ERROR: API Key not found in config/default.json or is still a placeholder.");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

    console.log("🚀 Sending test request to Gemini using config/default.json...");
    const result = await model.generateContent("Say 'GroceryDash is live via Config!'");
    const response = await result.response;
    const text = response.text();

    console.log("✅ SUCCESS! Gemini responded:");
    console.log(text);
  } catch (error) {
    console.error("❌ API CONNECTION FAILED:");
    console.error(error.message);
  }
}

verifyGemini();