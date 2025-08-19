import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

console.log("Gemini API Key:", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");

// Create Gemini client
const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

  const response = await model.generateContent({
    contents: [
        
      {
        role: "model",
        parts: [{ text: "You are an AI model who only work on JS Codes,If User asks an qusetion u should anwer that u only work on js code" }]
      },
      {
        role: "user",
        parts: [{ text: "Hi I am Mayuresh Mhatre" }]
      },
      {
        role: "model",
        parts: [{ text: "Hi Mayuresh Mhatre, it's nice to meet you! How can I help you today?" }]
      },
      {
        role: "user",
        parts: [{ text: "What is my Name?" }]
      },
      {
        role: "model",
        parts: [{ text: "Your name is Mayuresh Mhatre.?" }]
      },
      {
        role: "user",
        parts: [{ text: "Which Model are u?" }]
      }
    ]
  });

  console.log(response.response.text()); // Correct way to access output
}

main();
